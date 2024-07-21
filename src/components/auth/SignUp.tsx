'use client'
import Image from "next/image";
import { useMemo, useState } from "react";
import { FcGoogle } from 'react-icons/fc'
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'


export default function SignUp() {
    
    const SignUpSchema = z.object({
        username: z.string()
        .min(3, {message: 'Username must be at least 3 characters'}).max(20)
        ,
        email: z.string().min(1, {message: 'Email is required'})
        .email('Invalid email address')
        ,
        password: z.string()
        .min(6, {message: 'Password must be at least 6 characters'})
        ,
      });
    
      type SignUpSchemaType = z.infer<typeof SignUpSchema>
    const { register, handleSubmit, formState: { errors } } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema)});

    const onSubmit: SubmitHandler<SignUpSchemaType> = async (data: FormData) => {
      console.log(data); // Handle form submission here
    };
  return (
    <main className="px-4">
       <h3 className='font-bold tracking-wider text-xl'>Create Account</h3>
       <div className='flex items-center gap-2 border border-gray-200 justify-center w-f rounded-lg px-3 py-4 my-12 cursor-pointer hover:transition hover:bg-[#061D1C] hover:text-white font-medium'>
            <FcGoogle className='text-xl' />
            <p className=''>Signup with Google</p>
       </div>
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
      <button className=' bg-[#061D1C] mt-10 w-full rounded-sm text-white py-[10px] font-semibold' type="submit">Create Account</button>
    </form>
    <p className='pt-6 text-gray-600 text-xs font-semibold'>Already have an account? <span className='text-[#061D1C] font-bold cursor-pointer'>Log in</span></p>
    </main>
  );
}