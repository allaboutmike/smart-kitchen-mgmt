"use client";
import {useState} from "react";
import RestaurantSubMenuButton from "./RestaurantSubMenuButton";
import MenuItem from "./MenuItem";
import InteractableOrderItem from "./InteractableOrderItem";

const menuItems =
  "Popular, Lunch, Dinner, Breakfast,  Desserts, Appetizers, Side Dishes, Beverages".split(",");
  menuItems.forEach(menuItems => menuItems.trimStart());
type foodTypes={
    [key: string]: string[],

}
const foodChoices : foodTypes = {
  "popular":
    "Margherita pizza, Beef Wellington, Souvlaki, Moussaka, Fajitas, Fish tacos, Ramen, Sushi rolls, Pho, Beef Bourguignon, Chicken Tikka Masala, Pad Kra Pao, Chicken Shawarma, Gyro, Peking duck, Dim sum, Goulash, Empanadas, Ratatouille, Croque Monsieur, Biryani, Jerk chicken, Tortilla Española, Beef fajitas, Lamb Rogan Josh, Bibimbap, Ceviche, Chiles Rellenos, Ropa Vieja, Coq au Vin".split(","),
  "lunch":
    "Tomatoes, Onions, Garlic, Bell peppers, Carrots, Celery, Spinach, Kale, Lettuce, Broccoli, Cauliflower, Zucchini, Mushrooms, Potatoes, Sweet potatoes, Green beans, Corn, Asparagus, Eggplant".split(","),
  "dinner":
    "Grilled steak, Roast chicken, Baked salmon, Beef stew, Shrimp scampi, Spaghetti Bolognese, Lasagna, Chicken Parmesan, Lamb chops, Pork tenderloin, Vegetarian chili, Stuffed bell peppers, Eggplant Parmesan, Beef tacos, Chicken fajitas, Grilled shrimp, BBQ ribs, Meatloaf, Chicken curry, Beef stir-fry, Pad Thai, Risotto, Paella, Shepherd's pie, Fish and chips, Vegetable stir-fry, Chicken Alfredo, Chicken pot pie, Jambalaya, Shrimp and grits".split(
      ","
    ),
  "breakfast":
    "Eggs, Bacon, Sausage, Pancakes, Waffles, French toast, Oatmeal, Cereal, Yogurt, Fruit, Smoothies, Muffins, Bagels, Toast, Breakfast burritos, Breakfast sandwiches, Quiche, Frittata, Crepes, Omelette, Granola, Croissants, Donuts, Coffee, Tea, Juice, Milk, Water".split(
      ","
    ),
  "desserts":
    "Chocolate cake, Vanilla cake, Cheesecake, Ice cream, Sorbet, Pudding, Pie, Cookies, Brownies, Cupcakes, Muffins, Tiramisu, Cannoli, Macarons, Truffles, Fudge, Baklava, Flan, Creme brulee, Gelato, Frozen yogurt, Churros, Doughnuts, Eclairs, Panna cotta, Rice pudding, Shortcake, Souffle, Strudel, Tart, Trifle, Turnover".split(
      ","
    ),
  "appetizers":
    "Bruschetta, Deviled eggs, Stuffed mushrooms, Spring rolls, Buffalo chicken wings, Mozzarella sticks, Spinach and artichoke dip, Hummus and pita bread, Caprese salad, Cheese platter, Charcuterie board, Stuffed mini bell peppers, Smoked salmon on cucumber slices, Guacamole with tortilla chips, Shrimp cocktail, Jalapeño poppers, Mini quiches, Mini meatballs, Antipasto skewers, Crab cakes, Baked brie with honey, Prosciutto-wrapped melon, Garlic bread, Chicken satay, Seared scallops, Flatbread with toppings, Veggie platter with dip, Fried calamari, Mini sliders, Arancini".split(
      ","
    ),
  "side dishes":
    "Mashed potatoes, Baked sweet potatoes, Roasted Brussels sprouts, Sautéed green beans, Steamed broccoli, Garlic roasted cauliflower, Quinoa salad, Couscous, Brown rice, Wild rice, Baked beans, Macaroni and cheese, Potato salad, Coleslaw, Cornbread, Garlic breadsticks, Stuffed zucchini, Grilled asparagus, Ratatouille, Cauliflower rice, Sweet potato fries, Parmesan roasted carrots, Sautéed spinach with garlic, Lemon herb orzo, Mushroom risotto, Tabouli, Lentil salad, Broccoli slaw, Fried plantains, Mexican street corn".split(
      ","
    ),
  "beverages":
    "Matcha, Earl Grey tea, Rooibos tea, Oolong tea, Chamomile tea, Hibiscus tea, Peppermint tea, Ginger tea, Turmeric latte, Chai latte, Horchata, Agua fresca, Kefir, Buttermilk, Rice milk, Oat milk, Hot cider, Mulled wine, Cucumber water, Lavender lemonade, Cherry juice, Pomegranate juice, Lychee juice, Guava juice, Beet juice, Celery juice, Golden milk, Açaí smoothie, Aloe vera juice, Sparkling lemonade".split(
      ","
    ),
};
type orderType ={
    name: string, price: number, quantity: number
}
export default function MenuManagementContainer() {
    const [selectedItem, setSelectedItem] = useState("none");
    // const [orderNumber, setOrderNumber] = useState(984095);
    const orderNumber = 9384093;
    const [orderAddedItems, setOrderAddedItems] = useState<orderType[]>([]);
    const updateOder=(name: string, price: number)=>{
        setOrderAddedItems(currentOrderItems => [...currentOrderItems, {name: name, price: price, quantity: 1}]);
    }
    
    const optionName = selectedItem.toLowerCase().trimStart();
    const foods = foodChoices[optionName] ? foodChoices[optionName] : [];
  return (
    <div className="restaurant-components-main-container">
        <div className="restaurant-sub-menu-container">
            {
                menuItems.map((menuItem, index) => {
                    return <RestaurantSubMenuButton 
                    selected={selectedItem.trimStart() === menuItem.trimStart()} 
                    setCurrentSelection={setSelectedItem} 
                    text={menuItem.trimStart()} 
                    key={index}/>
                }) 
            }
        </div>
        { foods.length > 0 && <div className="restaurant-main-food-menu-container">
            <div className="restaurant-current-option-title">{selectedItem} Menu</div>
            <div className="current-menu-items-container">
             {
                 foods.map((menuItem: string, index: number) => {
                    const formattedItem = menuItem.trimStart();
                    return <MenuItem key={index}
                    addedToOrder={false}
                    addItem={updateOder}
                    name={formattedItem} 
                    price={index*10} 
                    picture="https://i.imgur.com/D4qu3pD.png"/>
                })
            }
            </div>
        </div>}

        {orderAddedItems.length > 0 && <div className="current-order-items-manager">
            <div className="order-header-group">
                <div>Order: #{orderNumber}</div>
                <span className="line-separator"></span>
            </div>
            <div className="order-items-container">
                {orderAddedItems.map((currentOrder, orderIndex)=>{
                    return <InteractableOrderItem
                    key={orderIndex}
                    name={currentOrder.name}
                    price={currentOrder.price}
                    orderIndex={orderIndex}
                    removeItem={()=>{
                        setOrderAddedItems(currentOrderItems => {
                            return currentOrderItems.filter((orderItem) =>currentOrder.price !== orderItem.price && orderItem.name !== currentOrder.name)
                        })
                    }}
                     />
                })}
            </div>
            <span className="line-separator"></span>
            <div className="order-total-container">
                <div className="order-total-group">
                    <div>Total</div>
                    <div className="order-total-value">$89.99</div>
                </div>
                <div className="order-buttons-group">
                    <button className="order-total-button continue-button">Continue</button>
                    <button className="order-total-button cancel-button">Cancel</button>
                </div>
            </div>
        </div>}
    </div>
  );
}


