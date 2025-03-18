export interface MenuItem {
  menuitemid: number;
  customizationdetail: string | null
}
export interface CartInfo{
    orderid: number;
}
export default function Cart(orderInfo: CartInfo) {

  return (
    <div className="grid grid-rows-3 rounded-[8px] outline">
      <h1>Order:#{orderInfo.orderid}</h1>
      <span className=" h-[400px] overflow-y-auto">
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
      <span className="grid grid-rows-2">
        <span>
            <h3>Total</h3>
            <h3>$80.88</h3>
        </span>
        <span>
            <button>Continue</button>
            <button>Cancel</button>
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
            <span>
                <h3>{itemInfo.foodName}</h3>
                <h3>{itemInfo.foodPrice}</h3>
            </span>
            <button>Remove</button>
        </span>
    )
}