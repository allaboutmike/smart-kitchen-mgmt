"use client"
import Cart, { CartInfo, ItemProps } from '@/components/POS/Cart'
import { useFetch } from '@/customHooks/useFetch'
import { useState } from 'react'
import useSelection from '@/customHooks/useSelection'
import { MenuItemType } from '@/components/MenuManagementContainer'
import SelectableButton from '@/components/SelectableButton'
import styles from "../../styles/MenuManagementContainer.module.css"
import Image from 'next/image'

const menuCategories =
  "Popular, Meals, Entrees, Salads, Sides, Beverages".split(
    ","
  );
menuCategories.forEach((menuCategory) => menuCategory.trimStart());
export default function POS() {
    
    const fetchString = "menuItems";
    const { data } = useFetch<{ menuItems: MenuItemType[] }>(fetchString);
    const [addedItems, setAddedItems] = useState<ItemProps[]>([])
    const [isCartVisible, setIsCartVisible] = useState(false)
    const {currentSelection, isCurrentSelection, setCurrentSelection} = useSelection();
    const menuItems = data?.menuItems
    const cancelOrder =()=> setAddedItems([])
    const increaseItemQty =(itemName: string)=>{
        const items = [...addedItems]
        const itemIndex = items.findIndex(item=> item.foodName === itemName)
        if(items[itemIndex] && items[itemIndex].quantity){
          items[itemIndex].quantity +=1;
          setAddedItems([...items])
        }
    }
    const decreaseItemQty =(itemName: string)=>{
      const items = [...addedItems]
      const itemIndex = items.findIndex(item=> item.foodName === itemName)
      if(items[itemIndex] && items[itemIndex].quantity && items[itemIndex].quantity > 1) {
        items[itemIndex].quantity -=1;
        setAddedItems([...items])
      }
  }
  const continueOrder =()=>{}
  const removeItemFromCart =(itemName: string)=>{
    const filteredItems = addedItems.filter(item=> item.foodName !== itemName)
    setAddedItems([...filteredItems])
  }
  
  const cartInfo: CartInfo={
    orderid: 939820,
    items: addedItems,
    itemActions: {
      increaseQty: increaseItemQty,
      decreaseQty: decreaseItemQty,
      removeItem: removeItemFromCart
    },
    continueOrder: continueOrder,
    cancelOrder: cancelOrder
  }

  const filteredMenuItems = 
  currentSelection === "none"
  ? menuItems
  : menuItems?.filter(item => {
      const optionName = currentSelection.toLowerCase().trim();
      if (optionName === "popular") {
        return item.isPopular === true;
      }
      return item.category.toLowerCase() === optionName;
    });
  
  
  const svgSize = 20
    console.table(menuItems)
  return (
    <div className="main-container pos-container">
        <button className="btn btn-square text-[--foreground] self-end mr-[20px] bg-[--background] hover:bg-[--foreground] hover:text-white border-[--foreground] mt-[20px]" onClick={()=> setIsCartVisible(prevVisibility=> !prevVisibility)}>
        <svg width={svgSize} height={svgSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 .75H1a1 1 0 0 0-1 1v.5a1 1 0 0 0 1 1h2.012l2.724 11.481A4.25 4.25 0 0 0 9.765 18h7.822a4 4 0 0 0 3.943-3.325l1.256-7.338A2 2 0 0 0 20.814 5H5.997l-.78-3.289A1.25 1.25 0 0 0 4 .75M10 21a2 2 0 1 1-4 0 2 2 0 0 1 4 0m11 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0" fill="currentColor"/></svg>
        </button>
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

        <span className="flex outline gap-[2rem] w-full justify-between place-items-center ml-[-20px] p-[20px] mt-[20px]">
          <span className="grid grid-flow-row-dense tablet:grid-cols-2 mobile:grid-cols-1 
          p-[20px] grid-cols-6 gap-[20px] max-h-[400px] overflow-y-auto" >
           {
            filteredMenuItems?.map((item, index)=>{
              const imgSize = 100;
              return(
                <span className="flex flex-col p-[10px] bg-white outline rounded-md place-content-center" key={index}>
                  <Image src={item.pictureUrl} width={imgSize} height={imgSize} alt={item.name}/>
                  <span className="tablet:text-[0.7rem] text-center">{item.name}</span>
                  <span className="flex flex-col">
                    <span>Price:</span>
                    <span>${item.price}</span>
                  </span>
                  <button className="btn tablet:text-[0.7rem]" onClick={()=>{
                    const newItem: ItemProps = {foodName: item.name, foodPrice: parseFloat(item.price), quantity: 1};
                    const allItems = [...addedItems]
                    const itemFoundIndex = allItems.findIndex(item => item.foodName === newItem.foodName)
                    if(itemFoundIndex >= 0 && itemFoundIndex < allItems.length && allItems[itemFoundIndex]?.quantity !== undefined) {
                      allItems[itemFoundIndex].quantity += 1
                      setAddedItems([...allItems])
                    }
                    else{
                      setAddedItems(prevItems=> [...prevItems, newItem])
                    }
                    
                  }}>Add Item</button>
                </span>
              )
            })
            }
          </span>
            { isCartVisible && <Cart {...cartInfo}/>}
        </span>
    </div>
  )
}

