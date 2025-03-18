import React from "react";
import Image from "next/image";
import styles from "../styles/MenuItem.module.css"
interface MenuItemProps {
    name: string;
    price: string;
    picture: string;
}
export default function MenuItem({ name, price, picture }: MenuItemProps) {
  const imageSize = 80;
  return (
    <div className={styles.menuItem}>
      <span className={styles.menuItemPictureAndPriceGroup}>
        <span className={styles.menuItemPicture}>
          <Image src={picture} width={imageSize} height={imageSize} alt={name}/>
        </span>
        <span className={styles.menuPricingGroup}>
          <span>Price:</span>
          <span className="menu-item-price">${price}</span>
        </span>
      </span>
      <span className={styles.menuItemName}>{name}</span>
    </div>
  );
}
