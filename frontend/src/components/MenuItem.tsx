import React from "react";
import Image from "next/image";
interface MenuItemProps {
    name: string;
    price: number;
    picture: string;
    addedToOrder: boolean;
    addItem: (name: string, price: number) => void;
}
export default function MenuItem({ name, price, picture, addItem }: MenuItemProps) {
  const imageSize = 80;
  return (
    <div className="menu-item">
      <div className="menu-item-picture-and-price-group">
        <div className="menu-item-picture">
          <Image src={picture} width={imageSize} height={imageSize} alt={name}/>
        </div>
        <div className="menu-pricing-group">
          <div>Price:</div>
          <div className="menu-item-price">${price}</div>
        </div>
      </div>
      <div className="menu-item-name">{name}</div>
      <button onPointerDown={() => addItem(name, price)}>Add Item</button>
    </div>
  );
}
