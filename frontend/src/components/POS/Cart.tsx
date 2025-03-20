"use client"
export interface CartContextType{
  cancelOrder: ()=> void;
}
export interface MenuItem {
  menuitemid: number;
  customizationdetail: string | null
}
export interface CartInfo{
    orderid: number;
    items: ItemProps[];
}
export interface POSMenuItem{    
category: string;
createdat: string;
isPopular : boolean;
menuitemid: number;
name: string;
pictureUrl: string;
price: string
profit: string;
updatedat : string;
}

export interface ItemProps{
  foodName: string;
  foodPrice: number;
  quantity?: number;
}
export default function Cart(orderInfo: CartInfo) {
  const cartTotalCost = orderInfo.items.reduce((prevVal, currVal)=> prevVal + currVal.foodPrice, 0).toFixed(2)
  return (
    <div className="flex flex-col px-[40px] gap-[1rem] py-[20px] rounded-[8px] max-w-[500px] min-w-[300px] bg-white h-[500px] outline">
      <span className="max-h-[fit-content] text-2xl">Order:#{orderInfo.orderid}</span>
      <span className="flex flex-col h-[200px] overflow-y-auto">
        {
            orderInfo.items?.map((item, index)=>{
                const currItem: ItemProps={
                    foodName: item.foodName,
                    foodPrice: item.foodPrice,
                    quantity: item.quantity
                }
                return(
                    <ItemComponent key={index} {...currItem} />
                )
            })
        }
      </span>
      <span className="flex flex-col">
        <span className="flex justify-between">
            <span>Total</span>
            <span>${cartTotalCost}</span>
        </span>
        <span className="grid grid-rows-2 w-full gap-[1rem]">
            <button className="btn btn-success text-white">Continue</button>
            <button className="btn btn-error text-white">Cancel</button>
        </span>
      </span>
    </div>
  );
}
const ItemComponent=(itemInfo: ItemProps)=>{
    return(
        <span className="grid grid-rows-2 h-[100px]">
            <span className="flex justify-between">
                <h1 className="text-lg">{itemInfo.foodName}</h1>
                <h3>${itemInfo.foodPrice}</h3>
                <span>
                  <span>Qty: {itemInfo.quantity}</span>
                  <button className="btn btn-outline btn-primary">+</button>
                  <button className="btn btn-outline btn-secondary">-</button>
                </span>
            </span>
            <span className="flex justify-between">
              <button className="btn btn-outline bg-[--remove-button-bg-color] hover:bg-none hover:outline-[--remove-button-bg-color] text-white">Remove</button>
            </span>
        </span>
    )
}