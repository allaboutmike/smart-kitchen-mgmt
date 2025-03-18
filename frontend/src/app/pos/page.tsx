import Cart, { CartInfo } from '@/components/POS/Cart'
import React from 'react'

export default function POS() {
    const cartInfo: CartInfo={
        orderid: Math.floor(Math.random() * 20)
    }
  return (
    <div>
        <Cart {...cartInfo}/>
    </div>
  )
}
