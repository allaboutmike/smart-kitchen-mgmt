"use client"
export interface MenuItem {
  menuitemid: number;
  customizationdetail: string | null
}
export interface CartInfo{
    orderid: number;
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
export default function Cart(orderInfo: CartInfo) {
  return (
    <div className="flex flex-col px-[40px] gap-[1rem] py-[20px] rounded-[8px] w-[400px] bg-white h-[500px] outline">
      <span className="max-h-[fit-content]">Order:#{orderInfo.orderid}</span>
      <span className=" h-[200px] overflow-y-auto">
        {
            Array.from({length: 20}).map((item, index)=>{
                const currItem: ItemProps={
                    foodName: "someFood",
                    foodPrice: 20
                }
                return(
                    <ItemComponent key={index} {...currItem} />
                )
            })
        }
      </span>
      <span className="flex flex-col">
        <span className="flex justify-between">
            <h3>Total</h3>
            <h3>$80.88</h3>
        </span>
        <span className="grid grid-rows-2 w-full gap-[1rem]">
            <button className="btn">Continue</button>
            <button className="btn">Cancel</button>
        </span>
      </span>
    </div>
  );
}

export interface ItemProps{
    foodName: string;
    foodPrice: number;
}

const ItemComponent=(itemInfo: ItemProps)=>{
    return(
        <span className="grid grid-rows-2 h-[100px]">
            <span className="flex justify-between">
                <h3>{itemInfo.foodName}</h3>
                <h3>{itemInfo.foodPrice}</h3>
            </span>
            <button className="btn">Remove</button>
        </span>
    )
}