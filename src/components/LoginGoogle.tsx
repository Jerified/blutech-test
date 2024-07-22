"use client"
import { login } from '@/actions/auth'
// import 
import React from 'react'
import { FcGoogle } from 'react-icons/fc'

const LoginGoogle = () => {
  return (
    <div className='flex items-center gap-2 border border-gray-200 justify-center w-f rounded-lg px-3 py-4 my-12 cursor-pointer hover:transition-colors hover:duration-400 hover:bg-[#061D1C] hover:text-white font-medium' onClick={() => login('google')}>
            <FcGoogle className='text-xl' />
            <p className=''>Signup with Google</p>
       </div>
  )
}

export default LoginGoogle