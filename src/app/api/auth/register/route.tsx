import { hash } from 'bcryptjs'
import { NextResponse } from "next/server"
import db  from '@/db/client'
import { SignUpSchema } from '@/lib/validate'
import { ZodError } from 'zod'

export async function POST(req: Request) {
    try {
        const { username, email, password} = SignUpSchema.parse(await req.json())

        console.log(username, email, password)
        const hashed_password = await hash(password, 12)

        const user = await db.user.create({
            data: {
            username,
            email,
            password: hashed_password
        }
    })
    console.log(user)

        return NextResponse.json({
            user: {
                username: user.username, 
                email: user.email
            }
        })
    } catch (error: any) {
        if (error instanceof ZodError) {
            return NextResponse.json({
                status: "error",
                message: "Validation failed",
                errors: error.errors
            }, { status: 400})
    }
    if (error.code === 'P2002') {
        return NextResponse.json({
            status: 'fail',
            message: "user with that email already exists"
        }, { status: 409})
    }

    return NextResponse.json({
        status: "error",
        message: error.mesaage || "Internal Server Error"
    }, { status: 500})
}

}