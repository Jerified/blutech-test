'use client'
import Image from "next/image";
import { useMemo, useState } from "react";
import { FcGoogle } from 'react-icons/fc'
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { signIn } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import LoginGoogle from "../LoginGoogle";
import { SignInSchemaType, SignInSchema } from "@/lib/validate";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
// import { signIn } from 'next-auth/react'


export default function SignIn() {
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl')  || '/'
    // || '/profile'
    console.log(callbackUrl)
    const { register, handleSubmit, reset, formState: { errors } } = useForm<SignInSchemaType>({ resolver: zodResolver(SignInSchema) });

    const onSubmit: SubmitHandler<SignInSchemaType> = async (data) => {
        console.log(data);
        try {
            setSubmitting(true)
            const res = await signIn('credentials', {
                // redirect: false,
                email: data.email,
                password: data.password,
                redirectTo: callbackUrl
            })
            setSubmitting(false)
            console.log(res)

            if (!res?.error) {
                toast.success('successfully logged In')
                router.push(callbackUrl)
            } else {
                reset({ password: '' })
                const message = 'Invalid email or password'
                toast.error(message)
                setError(message)
            }
            // toast.success('Signup successful', {
            //     style: { background: 'green'}
            // })
        } catch (error: any) {
            toast.error(error.messasge)
            setError(error.message)
        } finally {
            setSubmitting(false)
        }
    };
    return (
        <main className="px-4">
            <h3 className='font-bold tracking-wider text-xl'>Sign In</h3>
            <LoginGoogle />
            <p className='text-gray-300 flex justify-center tracking-wider font-semibold pb-6'> - OR -</p>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className='flex flex-col mt-10'>
                    <input className='outline-none border-none' type="email" placeholder='Email' {...register('email')} />
                    <div className=' border-b border-gray-200 pt-2' />
                    {errors.email && <span className='text-xs text-red-500 pt-2'>{errors.email.message}</span>}
                </div>
                <div className='flex flex-col mt-10'>
                    <input className='outline-none border-none' type="password" placeholder='Password' {...register('password')} />
                    <div className=' border-b border-gray-200 pt-2' />
                    {errors.password && <span className='text-xs text-red-500 pt-2'>{errors.password.message}</span>}
                </div>
                <button className=' bg-[#061D1C] mt-10 w-full uppercase rounded-[0.16px] text-white py-[10px] font-semibold' type="submit">Sign In</button>
            </form>
            <p className='pt-6 text-gray-600 text-xs font-semibold'>Dont have an account? <Link href="/signup" className='text-[#061D1C] font-bold cursor-pointer hover:underline-offset-4 hover:underline'>Sign up</Link></p>
        </main>
    );
}