'use client'

import { Product } from "@/types/columns";
import Image from "next/image";
import { useMemo, useState } from "react";
import { IoIosSearch } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { searchAsyncProducts, setItem } from '.././lib/features/productSlice'
import { RootState } from '.././lib/store';

interface navProps {
    filterValue: string;
    setFilterValue: (value: string) => void
}

export default function Navbar() {
  const item = useSelector((state: RootState ) => state.products.item);

    const dispatch = useDispatch();
    // const [searchTerm, setSearchTerm] = useState('')
    // const [filterValue, setFilterValue] = useState('')
    // const hasSearchFilter = Boolean(filterValue)

    // const filteredUser = useMemo(() => {
    //     // if (!setSearchTerm) return products;
    //     // let filteredUsers = [...products]

    //     // if(hasSearchFilter) {
    //     const filteredProducts = products.fil
    //         filteredUsers = filteredUsers.filter(user => 
    //             user.Name.toLowerCase().includes(filterValue.toLowerCase())
    //         )
    //     // }

    //     return products.filter(product => product.Name.toLowerCase().includes(filterValue.toLowerCase()))
    // }, [products, filterValue])
    
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(item)
        // setSearchTerm(e.target.value);
        const res = dispatch(searchAsyncProducts(item));
        console.log(res)
      };
  return (
    <main className="">
        <Image src='/logo.png' alt='logo' width={100} height={100} className='w-[206px]'/>
        <form onSubmit={handleSearch}>
            <input placeholder="Search by patients.." value={item} onChange={(e) => dispatch(setItem(e.target.value))} />
        </form>
    </main>
  );
}
