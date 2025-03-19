"use client"
import Cart, { CartInfo, POSMenuItem, ItemProps } from '@/components/POS/Cart'
import { useFetch } from '@/customHooks/useFetch'
import { useState } from 'react'
import { createContext } from 'react'
import { CartContextType } from '@/components/POS/Cart'

export default function POS() {
    
    const {data} = useFetch<{posMenuItems: POSMenuItem[]}>("menuItems")
    const [addedItems, setAddedItems] = useState<ItemProps[]>([])
    const [isCartVisible, setIsCartVisible] = useState(false)
    const menuItems = data?.posMenuItems
    const cartInfo: CartInfo={
      orderid: 939820,
      items: addedItems 
  }
  
  const cancelOrder =()=> setAddedItems([])
  const cartContext = createContext<CartContextType | null>(null);
  const svgSize = 20
    console.table(menuItems)
  return (
    <div className="main-container">
        <button className="btn btn-square text-[--foreground] self-end mr-[20px] bg-[--background] hover:bg-[--foreground] hover:text-white border-[--foreground] mt-[20px]" onClick={()=> setIsCartVisible(prevVisibility=> !prevVisibility)}>
        <svg width={svgSize} height={svgSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 .75H1a1 1 0 0 0-1 1v.5a1 1 0 0 0 1 1h2.012l2.724 11.481A4.25 4.25 0 0 0 9.765 18h7.822a4 4 0 0 0 3.943-3.325l1.256-7.338A2 2 0 0 0 20.814 5H5.997l-.78-3.289A1.25 1.25 0 0 0 4 .75M10 21a2 2 0 1 1-4 0 2 2 0 0 1 4 0m11 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0" fill="currentColor"/></svg>
        </button>
        <span className="flex outline gap-[2rem] w-full justify-between place-items-center ml-[-20px] p-[20px] mt-[20px]">
          <span className="grid grid-flow-row-dense tablet:grid-cols-2 mobile:grid-cols-1 
          p-[20px] grid-cols-6 gap-[20px] max-h-[400px] overflow-y-auto" >
           {
            Array.from({length: 200}).fill("Item").map((item, index)=>{
              return(
                <span className="flex flex-col p-[10px] bg-white outline rounded-md place-content-center" key={index}>
                  <span className="tablet:text-[0.7rem] text-center">Food Name</span>
                  <button className="btn tablet:text-[0.7rem]" onClick={()=>{
                    const newItem: ItemProps = {foodName: "Name", foodPrice: 8.88, quantity: 1};
                    setAddedItems(prevItems=> [...prevItems, newItem])
                  }}>Add Item</button>
                </span>
              )
            })
            }
          </span>
          <cartContext.Provider value={{cancelOrder}}>
            { isCartVisible && <Cart {...cartInfo}/>}
          </cartContext.Provider>
        </span>
    </div>
  )
}
