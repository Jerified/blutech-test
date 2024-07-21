'use client'

import React, {useState, useEffect} from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/table";
import { columns, Product } from "@/types/columns";
import Image from "next/image";
import { useDispatch, useSelector } from 'react-redux'
import { setProducts, getProductsStatus, getProducts } from '.././lib/features/productSlice'
import { RootState } from '.././lib/store';


export default function Department({ products }: { products: Product[] }) {
    const dispatch = useDispatch()
    const Products = useSelector(getProducts);

    // const productStatus = useSelector(getProductsStatus);

    // useEffect(() => {
    //     if (productStatus === 'idle') {
            dispatch(setProducts(products))
    //     }
    // }, [])
    // dispatch(setProducts(products))


    // const product = useSelector(getProducts)

    console.log(Products)

    // const data = 

    return (
        <div>
            <h1 className='w-[169.5px] font-semibold py-6'>Department List</h1>
            <section className="container px-4 mx-auto">
                <div className="flex flex-col">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hiddenmd:rounded-lg">
                                <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 text-[12px]">
                                    <thead className="bg-[#F0F4FE] rounded-[200px] dark:bg-gray-800 h-[50px]">
                                        <tr className="pb-8">
                                            {columns.map((item, index) => (
                                                <th key={index} className="whitespace-nowrap">
                                                    {item.label}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <div className='mt-4' />
                                    <tbody className=" divide-y border rounded-[200px] overflow-hidden divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 pt-10">
                                        {Products.map((product, index) => (
                                            <tr key={product.UPC} className='h-[60px]'>
                                                <td className="w-fit px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200">
                                                    {/* <div className="inline-flex items-center gap-x-3">
                                                        <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />

                                                    </div> */}
                                                    <span>{index + 1}.</span>
                                                </td>
                                                <td className="">
                                                    <Image src={product.Image_1} className="" width={100} height={100} alt={product.Image_1} />
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    {product.SKU}
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    {product.Name}
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 line-clamp-1 ">
                                                    {product.Title}
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 line-clamp">
                                                    <div className='line-clamp-1'>
                                                        {product.Description}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700">
                                                    {product.Brand}
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 ">
                                                    {product["Cost Price"]}
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700">
                                                    {product.Quantity}
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    {product.size}
                                                </td>
                                            </tr>

                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}




