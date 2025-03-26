import React from 'react'
import Image from 'next/image'
import {MenuItemProps} from './MenuItem'
import viewModalStyles from '../styles/ViewMenuItemModal.module.css'

export default function ViewMenuItemModal(modalDetails: MenuItemProps) {
    const imgSize = 300;
  return (
    <span className={viewModalStyles["view-menu-item-modal"]}
        onKeyDown={(e)=> {
            if(e.key ==='Escape' && modalDetails.modalToggle) modalDetails.modalToggle()
        }}
    >
        <span className={viewModalStyles["inner-contents-container"]}>
        <button className={viewModalStyles["exit-button"]} onClick={modalDetails.modalToggle}
            >Exit</button>
            {modalDetails.picture &&<Image
                src={modalDetails.picture}
                width= {imgSize}
                height={imgSize}
                alt="an image"
            />}
            <span className={viewModalStyles["product-details-container"]}>
                <h1 className="text-[1.2rem] font-semibold mb-[10px] max-w-[200px] mobile:text-center">{modalDetails.name}</h1>
                <p className="text-black">ID: {modalDetails.id}</p>
                <p className="text-[1rem] font-semibold text-black">Price: ${modalDetails.price}</p> 
                <h2 className="text-[1rem] font-semibold text-black underline">Ingredients:</h2>
                <ul className={viewModalStyles["ingredients-list-container"]}>
                    {modalDetails.ingredients?.map((ingredient, index)=>{
                        return <li key={index}>{ingredient.ingredients.ingredientname}</li>
                    })}
                </ul>               
            </span>
        </span>        
    </span>
  )
}
