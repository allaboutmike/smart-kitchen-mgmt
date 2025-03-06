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
      <span className="menu-item-picture-and-price-group">
        <span className="menu-item-picture">
          <Image src={picture} width={imageSize} height={imageSize} alt={name}/>
        </span>
        <span className="menu-pricing-group">
          <span>Price:</span>
          <span className="menu-item-price">${price}</span>
        </span>
      </span>
      <span className="menu-item-name">{name}</span>
      <button onClick={() => addItem(name, price)}>Add Item</button>
    </div>
  );
}
