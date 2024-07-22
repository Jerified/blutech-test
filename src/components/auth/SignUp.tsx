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


export default function SignUp() {
    
    const { register, handleSubmit, formState: { errors } } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema)});

    const onSubmit: SubmitHandler<SignUpSchemaType> = async (data: FormData) => {
      console.log(data); // Handle form submission here
    };
  return (
    <main className="px-4">
       <h3 className='font-bold tracking-wider text-xl'>Create Account</h3>
       <LoginGoogle />
       <p className='text-gray-300 flex justify-center tracking-wider font-semibold pb-6'> - OR -</p>
       <form onSubmit={handleSubmit(onSubmit)} >
      <div className='flex flex-col'>
        <input className='outline-none ' placeholder='Username' type="text" {...register('username')} />
        <div className=' border-b border-gray-200 pt-2' />
        {errors.username && <span className='text-xs text-red-500 pt-2'>{errors.username.message}</span>}
      </div>
      <div className='flex flex-col mt-10'>
        <input className='outline-none ' type="email" placeholder='Email' {...register('email')} />
        <div className=' border-b border-gray-200 pt-2' />
        {errors.email && <span className='text-xs text-red-500 pt-2'>{errors.email.message}</span>}
      </div>
      <div className='flex flex-col mt-10'>
        <input className='outline-none border-none' type="password" placeholder='Password' {...register('password')} />
        <div className=' border-b border-gray-200 pt-2' />
        {errors.password && <span className='text-xs text-red-500 pt-2'>{errors.password.message}</span>}
      </div>
      <button className=' bg-[#061D1C] mt-10 w-full rounded-[0.16px] text-white py-[10px] font-semibold' type="submit">Create Account</button>
    </form>
    <p className='pt-6 text-gray-600 text-xs font-semibold'>Already have an account? <span className='text-[#061D1C] font-bold cursor-pointer hover:underline-offset-4 hover:underline'>Log in</span></p>
    </main>
  );
}