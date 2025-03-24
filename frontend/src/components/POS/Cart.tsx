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
  id: number;
}
export default function Cart(orderInfo: CartInfo) {
  const cartTotalCost = orderInfo.items.reduce((prevVal, currVal)=> prevVal + (currVal.quantity? (currVal.foodPrice * currVal.quantity): currVal.foodPrice), 0).toFixed(2)
  const itemsAvailable = orderInfo.items.length;
  return (
    <div className={styles["cart-container"]}>
      <span className={styles["cart-title"]}>Cart</span>
      <span className="flex flex-col h-[400px] gap-[10px] overflow-y-auto outline p-[5px] rounded-[8px]">
        {
            orderInfo.items?.map((item, index)=>{
                const currItem: ItemProps={
                    foodName: item.foodName,
                    foodPrice: item.foodPrice,
                    quantity: item.quantity,
                    actions: orderInfo.itemActions,
                    id: item.id
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
        {itemsAvailable > 0 && <span className="grid grid-rows-2 w-full gap-[1rem]">
            <label 
            className={`btn bg-[--continue-button-color] border-none 
            hover:bg-purple-500 active:bg-[--foreground-2] text-white            
            `}
            htmlFor="continue_order"
            onClick={orderInfo.continueOrder}
            >Buy</label>
            <label className="btn btn-error text-white" htmlFor="cancel-order-modal">Cancel</label>
        </span>}
      </span>
      <OrderPlacedModal />
      <CancelOrderModal modalClassName={"cancel-order-modal"} cancelFunc={orderInfo.cancelOrder}/>
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
                    {(itemInfo.quantity ?? 0) > 1 && <button className="btn btn-outline btn-secondary" onClick={()=>itemInfo.actions?.decreaseQty(itemInfo.foodName)}>-</button>}
                    <button className="btn btn-outline btn-primary"   onClick={()=>itemInfo.actions?.increaseQty(itemInfo.foodName)}>+</button>
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


const OrderPlacedModal =()=>{
  return(
    <>
      <input type="checkbox" id="continue_order" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box bg-white">
          <h3 className="text-xl text-[--foreground] font-bold">Order Status</h3>
          <p className="py-4 text-[--foreground]">Order placed succesfully!</p>
        </div>        
        <label className="modal-backdrop backdrop-blur-sm" htmlFor="continue_order">Close</label>
      </div>
    </>
  )
}
const CancelOrderModal =({modalClassName, cancelFunc}:{modalClassName: string, cancelFunc:()=>void})=>{
  return(
    <>
      <input type="checkbox" id={modalClassName} className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box bg-[white]">
          <h3 className="text-lg text-red-500 font-bold">WARNING!</h3>
          <p className="py-2 text-[--foreground] text-black">Do you want to cancel this order?</p>
          <p className="py-1 text-[--foreground] text-black font-semibold">This action cannot be undone.</p>
          
          <label className="btn modal-backdrop hover:bg-purple-400 text-white bg-red-500 border-none" htmlFor={modalClassName} onClick={cancelFunc}>Yes</label>
          <label className="btn modal-backdrop bg-[--foreground] mt-2
            text-white border-none hover:bg-rose-300             
            " htmlFor={modalClassName}
            >No</label>         
        </div>
        <label className="modal-backdrop backdrop-blur-sm" htmlFor={modalClassName}>Close</label>
      </div>
    </>
  )
}

