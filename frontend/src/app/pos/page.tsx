"use client"
import Cart, { CartInfo, POSMenuItem } from '@/components/POS/Cart'
import { useFetch } from '@/customHooks/useFetch'
import React from 'react'
// import Image from 'next/image'

const cartInfo: CartInfo={
    orderid: 20
}

export default function POS() {
    
    const {data} = useFetch<{posMenuItem: POSMenuItem[]}>("menuItems")
    const menuItems = data?.posMenuItem

    console.log(`data logged ${data}`)
  return (
    <div className="main-container">
        <Cart {...cartInfo}/>
        <div className="grid gap-[1rem]">
         {
            menuItems && menuItems.map((item, itemIndex)=>{
                return (<span key={itemIndex}>{item.category}</span>)
            })
         }
                
        </div>
    </div>
  )
}
