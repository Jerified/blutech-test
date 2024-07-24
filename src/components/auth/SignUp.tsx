'use client'
import Image from "next/image";
import { useMemo, useState } from "react";
import { FcGoogle } from 'react-icons/fc'
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { signIn } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import LoginGoogle from "../LoginGoogle";
import { SignUpSchemaType , SignUpSchema } from "@/lib/validate";
import { toast } from "sonner";
import Link from "next/link";
// import { signIn } from 'next-auth/react'


export default function SignUp() {
    const [submitting, setSubmitting] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema)});

    const onSubmit: SubmitHandler<SignUpSchemaType> = async (data) => {
        try {
            setSubmitting(true)
        const res = await fetch('/api/auth/register', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log(res)

        toast.success('Signup successful', {
            style: { background: 'green'}
        })
        if (!res.ok) {
            const errorData = await res.json();
            console.log(errorData)
            
            if (Array.isArray(errorData.errors) && errorData.errors.length > 0) {
                errorData.errors.forEach((error: any) => {
                    toast.error(error.message)
                })
                return
            }

            toast.error(errorData.message, {
                style: { background: 'red'}
            })
            return;
        }
        signIn(undefined, { callbackUrl: "/"})
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setSubmitting(false)
        }
      console.log(data); // Handle form submission here
    };
  return (
    <main className="px-4">
       <h3 className='font-bold tracking-wider text-xl'>Create Account</h3>
       <LoginGoogle />
       <p className='text-gray-300 flex justify-center tracking-wider font-semibold pb-6'> - OR -</p>
       <form onSubmit={handleSubmit(onSubmit)} >
      <div className='flex flex-col'>
        <input className='outline-none border-none ' placeholder='Username' type="text" {...register('username')} />
        <div className=' border-b border-gray-200 pt-2' />
        {errors.username && <span className='text-xs text-red-500 pt-2'>{errors.username.message}</span>}
      </div>
      <div className='flex flex-col mt-10'>
        <input className='outline-none border-none ' type="email" placeholder='Email' {...register('email')} />
        <div className=' border-b border-gray-200 pt-2' />
        {errors.email && <span className='text-xs text-red-500 pt-2'>{errors.email.message}</span>}
      </div>
      <div className='flex flex-col mt-10'>
        <input className='outline-none border-none' type="password" placeholder='Password' {...register('password')} />
        <div className=' border-b border-gray-200 pt-2' />
        {errors.password && <span className='text-xs text-red-500 pt-2'>{errors.password.message}</span>}
      </div>
      <button disabled={submitting} className=' bg-[#061D1C] mt-10 w-full rounded-[0.16px] text-white py-[10px] font-semibold' type="submit">{submitting? "loading..." : "Create Account"}</button>
    </form>
    <p className='pt-6 text-gray-600 text-xs font-semibold'>Already have an account? <Link href="/signin" className='text-[#061D1C] font-bold cursor-pointer hover:underline-offset-4 hover:underline'>Log in</Link></p>
    </main>
  );
}