'use client'
import { useMemo, useState } from "react";
import Department from './Department'
import Navbar from './Navbar'


const ProductPage = () => {
    const [filterValue, setFilterValue] = useState('')

  return (
    <>
        {/* <Navbar filterValue={filterValue} />
        <Department setFilterValue={setFilterValue}/> */}
    </>
  )
}

export default ProductPage