import Image from "next/image";
import Navbar from '../components/Navbar'
import Department from '../components/Department'
import { Product } from "@/types/columns";

export async function getProducts(): Promise<Product[]> {
    const res = await fetch('http://3.88.1.181:8000/products/public/catalog?supplier=FragranceX&first=0&last=5')
    const data = await res.json()
    return data
}


export default async function Home() {

    const products = await getProducts()
    console.log(products)
  return (
    <main className="">
        <Navbar />
        <Department products={products}/>
    </main>
  );
}
