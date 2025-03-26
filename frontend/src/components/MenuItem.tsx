import React from "react";
import Image from "next/image";
import styles from "../styles/MenuItem.module.css"
export interface MenuItemProps {
    name: string | null | undefined;
    price: string | null | undefined;
    picture: string | null | undefined;
    ingredients?: Array<{
      ingredients: {
        ingredientname: string;
      }
    }>;
    id: string | null | undefined;
    updateItem?: (item: MenuItemProps)=>void;
    modalToggle?: ()=>void;
}
export default function MenuItem(itemInfo: MenuItemProps) {
  const imageSize = 80;
  return (
    <div className={styles.menuItem} onClick={()=> {
      if(itemInfo.updateItem) itemInfo.updateItem(itemInfo)
    }}>
      <span className={styles.menuItemPictureAndPriceGroup}>
        <span className={styles.menuItemPicture}>
          {itemInfo.picture && itemInfo.name && <Image src={itemInfo.picture} width={imageSize} height={imageSize} alt={itemInfo.name}/>}
        </span>
        <span className={styles.menuPricingGroup}>
          <p>Price:</p>
          <p className="menu-item-price">${itemInfo.price}</p>
        </span>
      </span>
      <p className={styles.menuItemName}>{itemInfo.name}</p>
    </div>
  );
}
