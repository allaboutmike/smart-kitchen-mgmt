"use client"
import styles from "../../styles/Cart.module.css"
export interface CartContextType{
  cancelOrder: ()=> void;
}
export interface MenuItem {
  menuitemid: number;
  customizationdetail: string | null
}
export interface ItemButtonActions{
  decreaseQty: (itemName: string)=>void;
  increaseQty: (itemName: string)=>void;
  removeItem:  (itemName: string)=>void;
}
export interface CartInfo{
    orderid: number;
    items: ItemProps[];
    continueOrder: ()=>void;
    cancelOrder: ()=>void;
    itemActions: ItemButtonActions;
}
export interface POSMenuItem{    
  category: string;
  createdat: string;
  isPopular : boolean;
  menuitemid: number;
  name: string;
  pictureUrl: string;
  price: string;
  profit: string;
  updatedat : string;
}

export interface ItemProps{
  foodName: string;
  foodPrice: number;
  quantity?: number;
  actions?: ItemButtonActions;
}
export default function Cart(orderInfo: CartInfo) {
  const cartTotalCost = orderInfo.items.reduce((prevVal, currVal)=> prevVal + (currVal.quantity? (currVal.foodPrice * currVal.quantity): currVal.foodPrice), 0).toFixed(2)
  return (
    <div className={styles["cart-container"]}>
      <span className={styles["cart-title"]}>Cart</span>
      <span className="flex flex-col h-[400px] gap-[10px] overflow-y-auto">
        {
            orderInfo.items?.map((item, index)=>{
                const currItem: ItemProps={
                    foodName: item.foodName,
                    foodPrice: item.foodPrice,
                    quantity: item.quantity,
                    actions: orderInfo.itemActions
                }
                return(
                    <ItemComponent key={index} {...currItem} />
                )
            })
        }
      </span>
      <span className="flex flex-col">
        <span className="flex justify-between text-[1.4rem] text-black pb-[10px]">
            <span>Total</span>
            <span>${cartTotalCost}</span>
        </span>
        <span className="grid grid-rows-2 w-full gap-[1rem]">
            <button className="btn bg-[--continue-button-color] border-none hover:bg-purple-500 active:bg-[--foreground-2] text-white">Buy</button>
            <button className="btn btn-error text-white" onClick={()=>orderInfo.cancelOrder()}>Cancel</button>
        </span>
      </span>
    </div>
  );
}
const ItemComponent=(itemInfo: ItemProps)=>{
    return(
        <span className="grid grid-rows-2 h-[100px] py-[10px] px-[10px] mb-[5px]">
            <span className="flex justify-between">
                <span className="flex flex-col">
                  <span className={styles["pos-item-name"]}>{itemInfo.foodName}</span>
                  <span>${itemInfo.quantity? (itemInfo.foodPrice * itemInfo.quantity).toFixed(2): itemInfo.foodPrice}</span>
                </span>
                <span className="flex items-center">
                  <span className="pr-[10px]">{itemInfo.quantity}</span>
                  <span className="flex relative gap-[4px]">
                    <button className="btn btn-outline btn-primary"   onClick={()=>itemInfo.actions?.increaseQty(itemInfo.foodName)}>+</button>
                    <button className="btn btn-outline btn-secondary" onClick={()=>itemInfo.actions?.decreaseQty(itemInfo.foodName)}>-</button>
                  </span>
                </span>
            </span>
            <span className="flex justify-end mt-[5px]">
              <button className="btn btn-outline 
              bg-[--remove-button-bg-color] hover:bg-none hover:outline-[--remove-button-bg-color]
               text-white" onClick={()=>itemInfo.actions?.removeItem(itemInfo.foodName)}>Remove</button>
            </span>
        </span>
    )
}