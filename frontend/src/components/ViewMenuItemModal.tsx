import React from 'react'
import Image from 'next/image'
import {MenuItemProps} from './MenuItem'

export default function ViewMenuItemModal(modalDetails: MenuItemProps) {
    const imgSize = 300;
    console.log(modalDetails)
  return (
    <span className="flex fixed w-full h-full bg-[--white-backdrop] items-center justify-center top-0 left-0 backdrop-blur-sm"
        onKeyDown={(e)=> {
            if(e.key ==='Escape' && modalDetails.modalToggle) modalDetails.modalToggle()
        }}
    >
        <span className="flex relative bg-white m-4 px-[50px] rounded-[10px]  py-[40px] outline">
        <button className="btn absolute bg-[--foreground] border-none top-[20px] text-white right-[20px]" onClick={modalDetails.modalToggle}
            >Exit</button>
            {modalDetails.picture &&<Image
                src={modalDetails.picture}
                width= {imgSize}
                height={imgSize}
                alt="an image"
            />}
            <span className="flex flex-col justify-center ">
                <h1 className="text-[1.2rem] font-semibold mb-[10px] max-w-[200px]">{modalDetails.name}</h1>
                <p className="text-black">ID: {modalDetails.id}</p>
                <p className="text-[1rem] font-semibold text-black">Price: ${modalDetails.price}</p> 
                <h2 className="text-[1rem] font-semibold text-black underline">Ingredients:</h2>
                <ul className="text-black">
                    {modalDetails.ingredients?.map((ingredient, index)=>{
                        return <li key={index}>{ingredient.ingredients.ingredientname}</li>
                    })}
                </ul>               
            </span>
        </span>
        
    </span>
  )
}
