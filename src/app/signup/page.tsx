'use client'
import Image from "next/image";
import { useMemo, useState } from "react";
import SignUp from '@/components/auth/SignUp'


export default function signup() {
  return (
    <main className="">  
       <SignUp />
    </main>
  );
}