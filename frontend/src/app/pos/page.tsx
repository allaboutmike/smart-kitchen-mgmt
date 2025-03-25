"use client";
import Cart, { CartInfo, ItemProps } from "@/components/POS/Cart";
import { useFetch } from "@/customHooks/useFetch";
import { useState } from "react";
import useSelection from "@/customHooks/useSelection";
import type { MenuItemType } from "@/components/MenuManagementContainer";
import SelectableButton from "@/components/SelectableButton";
import styles from "../../styles/MenuManagementContainer.module.css";
import menuItemStyles from "../../styles/MenuItem.module.css"
import Image from "next/image";
import { svgIcons } from "../svgIcons";
import Link from "next/link";
import { useMutation } from '@/customHooks/useMutation'

const menuCategories =
  "Popular, Meals, Entrees, Salads, Sides, Beverages".split(",");
menuCategories.forEach((menuCategory) => menuCategory.trimStart());
export default function POS() {
  const fetchString = "menuItems";
  const { data } = useFetch<{ menuItems: MenuItemType[] }>(fetchString);
  const { updateData: updateOrder } = useMutation("POST", "orders");
  const [addedItems, setAddedItems] = useState<ItemProps[]>([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const { currentSelection, isCurrentSelection, setCurrentSelection } =
    useSelection();
  const menuItems = data?.menuItems;
  const cancelOrder = () => setAddedItems([]);
  const increaseItemQty = (itemName: string) => {
    const items = [...addedItems];
    const itemIndex = items.findIndex((item) => item.foodName === itemName);
    if (items[itemIndex] && items[itemIndex].quantity) {
      items[itemIndex].quantity += 1;
      setAddedItems([...items]);
    }
  };
  const decreaseItemQty = (itemName: string) => {
    const items = [...addedItems];
    const itemIndex = items.findIndex((item) => item.foodName === itemName);
    if (
      items[itemIndex] &&
      items[itemIndex].quantity &&
      items[itemIndex].quantity > 1
    ) {
      items[itemIndex].quantity -= 1;
      setAddedItems([...items]);
    }
  };
  const continueOrder = async () => {
    console.log(addedItems)
    const res = await updateOrder({ orderItems: addedItems })
    if (res.success) {
      setAddedItems([])
    }
  }
  const removeItemFromCart = (itemName: string) => {
    const filteredItems = addedItems.filter(
      (item) => item.foodName !== itemName
    );
    setAddedItems([...filteredItems]);
  };

  const cartInfo: CartInfo = {
    orderid: 939820,
    items: addedItems,
    itemActions: {
      increaseQty: increaseItemQty,
      decreaseQty: decreaseItemQty,
      removeItem: removeItemFromCart,
    },
    continueOrder: continueOrder,
    cancelOrder: cancelOrder,
  };

  const filteredMenuItems =
    currentSelection === "none"
      ? menuItems
      : menuItems?.filter((item) => {
          const optionName = currentSelection.toLowerCase().trim();
          if (optionName === "popular") {
            return item.isPopular === true;
          }
          return item.category.toLowerCase() === optionName;
        });

  const amountOfItemsInCart = addedItems.reduce((prevVal, currVal) => prevVal + (currVal.quantity ?? 0), 0)
  const findElement =(item: MenuItemType)=>{
    return addedItems.find(searchedItem => searchedItem.foodName === item.name)
  }
  const addItemToCart =(item: MenuItemType)=>{
    const newItem: ItemProps = {
      foodName: item.name,
      foodPrice: parseFloat(item.price),
      quantity: 1,
      id:  parseInt(item.menuitemid)
    };
    const allItems = [...addedItems];
    const itemFoundIndex = allItems.findIndex(
      (item) => item.foodName === newItem.foodName
    );
    if (itemFoundIndex >= 0 && itemFoundIndex < allItems.length 
      && allItems[itemFoundIndex]?.quantity !== undefined) {
      allItems[itemFoundIndex].quantity += 1;
      setAddedItems([...allItems]);
    } else {
      setAddedItems((prevItems) => [...prevItems, newItem]);
    }
  }
  
  return (
    <div className="main-container pos-container" onLoad={()=>{
      if(typeof window !== undefined){
        const isMobile = window.innerWidth <= 500;
        setIsCartVisible(!isMobile);
      }
    }}>
      <h1 className="text-[2rem] font-semibold my-[2rem]">POS</h1>
      <div className={styles["restaurant-sub-menu-container"]}>
        {menuCategories.map((menuItem, index) => {
          return (
            <SelectableButton
              selected={isCurrentSelection(menuItem)}
              setCurrentSelection={setCurrentSelection}
              buttonClassName={styles["restaurant-sub-menu-button"]}
              text={menuItem.trimStart()}
              key={index}
            />
          );
        })}
      </div>
      <span className={`${styles["restaurant-current-option-title-pos"]}`}>
            <span>{currentSelection === "none" ? "All" : currentSelection}</span> Menu
      </span>

      <span className="flex gap-[2rem] w-full mobile:w-[100%] justify-center place-items-center p-[20px] mt-[20px]">
        <span
          className={styles["menu-items-container-pos"]}
        >
          {filteredMenuItems?.map((item, index) => {
            const imgSize = 80;
            return (
              <span
                className={menuItemStyles["pos-menu-item"]}
                key={index}
              >
                <Image
                  src={item.pictureUrl}
                  width={imgSize}
                  height={imgSize}
                  alt={item.name}
                />
                <p className={menuItemStyles["menu-item-name-pos"]}>
                  {item.name}
                </p>
                <span className={menuItemStyles["menu-item-price-pos"]}>
                  <p>Price: ${item.price}</p>                  
                </span>
                <button
                  className={menuItemStyles["add-item-button-pos"]}
                  onClick={()=> addItemToCart(item)}
                >
                  Add Item
                </button>
                { 
                  findElement(item)?.quantity &&
                  <span key={findElement(item)?.quantity} className={`${menuItemStyles["elem-bounce"]} ${menuItemStyles["number-indicator"]}`}
                  >
                    <p>{(findElement(item)?.quantity)}</p>
                  </span>
                }
              </span>
            );
          })}
        </span>
        {isCartVisible && <Cart {...cartInfo} />}
      </span>
      <span className="fixed tooltip tooltip-left right-[120px] transition delay-500
      top-[44px] bg-[foreground]" data-tip="Go back to Management Center">
        <Link href="/select-portal" >
          <button className="flex btn  fixed right-[70px] top-[20px] bg-white hover:bg-[--foreground] hover:border-[--foreground]
          z-[--top-most-z-index] w-[fit-content] text-[--foreground] border-[--foreground] hover:text-[white]">
              {svgIcons.backArrow}
          </button>            
        </Link>
      </span>      
      <button
        className={`fixed top-[0px] btn btn-square text-[--foreground] self-end mr-[20px] z-[--top-most-z-index]
         bg-[--background] hover:border-[--foreground] hover:bg-[--foreground] hover:text-white border-[--foreground] mt-[20px] `}
        onClick={() => setIsCartVisible((prevVisibility) => !prevVisibility)}
        aria-label="Cart toggle button"
      >
        {svgIcons.cart}
        { amountOfItemsInCart > 0 && <span key={amountOfItemsInCart} className={`flex justify-center absolute w-[30px] text-[--foreground]
        h-[30px] top-[-15px] right-[-10px] bg-white outline rounded-[50%] ${menuItemStyles["elem-bounce"]}`}>
            <span  className={`self-center text-[--custom-active-red-color] pointer-events-none`}>{amountOfItemsInCart}</span>
          </span>}
      </button>
    </div>
  );
}

