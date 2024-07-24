import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from '@auth/prisma-adapter'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import  db  from '@/db/client'

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt'},
  providers: [
    Google({
        clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      name: "Sign in",
      id: "credential",
      credentials: {
          email: {
              label: "Email",
              type: "email"
          },
          password: { label: "Password", type: "password"}
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
            return null
        }

        const user = await db.user.findUnique({
            where: {
                email: String(credentials.email)
            }
        })

        if ( !user || !(await bcrypt.compare(String(credentials.password), user.password!))) {
            return null
        }

        return {
            id: user.id,
            email: user.email,
            username: user.username,
            name: user.name,
            randomKey: "Hello nigga"
        }
      }
    })
],
callbacks: {
    authorized({ auth, request: { nextUrl } }) {
        const isLoggedIn = !!auth?.user
        const paths = [ "/profile", ""];
        const isProtected = paths.some((path) => nextUrl.pathname.startsWith(path))

        if ( isProtected && !isLoggedIn ) {
            const redirectUrl = new URL("/api/auth/signin", nextUrl.origin)
            redirectUrl.searchParams.append("callbackUrl", nextUrl.href)
            return Response.redirect(redirectUrl)
        }
        return true
    },
    jwt: ({ token, user }) => {
        if ( user ) {
            const u = user as unknown as any;
            return {
                ...token,
                id: u.id,
                randomKey: u.randomKey,
            };
        }
        return token
    },
    session( params ) {
        return {
            ...params.session,
            user: {
                ...params.session.user,
                id: params.token.id as string,
                randomKey: params.token.randomKey
            }

        }
    }
},
pages: {
    signIn: "/signin"
}
})