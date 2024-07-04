import Image from "next/image";

export default function Navbar() {
  return (
    <main className="">
        <Image src='/logo.png' alt='logo' width={100} height={100} className='w-[206px]'/>
    </main>
  );
}
