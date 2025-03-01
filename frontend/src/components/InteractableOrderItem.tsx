"use client";
import { useState } from "react";
interface InteractableOrderItemProps{
    name: string;
    price: number;
    orderIndex: number
    removeItem: (orderIndex: number) => void;
}
export default function InteractableOrderItem({name, orderIndex, price, removeItem}: InteractableOrderItemProps) {
    const [quantity, setQuantity] = useState(1);
    return (
    <div className="interactable-order-item">
        <div className="order-item-top-group">
            <div className="order-item-name">{name}</div>
            <div className="order-item-quantity-group-menu">
                <div className="order-item-quantity">Qty {quantity}</div>
                <button className="order-item-button decrease-buton" onPointerDown={()=>setQuantity(currQuantity => {
                    return currQuantity-1 > 0 ? currQuantity-1 : 1
                })}>-</button>
                <button className="order-item-button increase-button" onPointerDown={()=>setQuantity(currQuantity => currQuantity+1)}>+</button>
            </div>
        </div>
        <div className="remove-and-price-group">
            <div className="order-item-price">${price}</div>
            <button className="order-item-remove-button"
                onPointerDown={() => removeItem(orderIndex)}
            >Remove</button>
        </div>
    </div>
  )
}

