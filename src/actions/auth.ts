'use server'
import { signIn, signOut } from "@/auth"
import { AuthError } from "next-auth"
import { revalidatePath } from "next/cache"

export const login = async (provider: string) => {
    try {
        await signIn(provider, { redirectTo: '/'})
        revalidatePath('/')
    } catch (error) {
        if (error instanceof AuthError) {
            return 'google login failed'
        }
        throw error
    }
}

export const logout = async () => {
    await signOut({ redirectTo: '/'})
    revalidatePath('/')
}