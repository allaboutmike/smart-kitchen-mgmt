import {useState} from "react";
import RestaurantSubMenuButton from "./RestaurantSubMenuButton";
import MenuItem from "./MenuItem";
import InteractableOrderItem from "./InteractableOrderItem";

const menuItems =
  "popular, Lunch, Dinner, Breakfast,  Desserts, Appetizers, Side Dishes, Beverages".split(",");
const foodChoices = {
  "popular":
    "Margherita pizza, Beef Wellington, Souvlaki, Moussaka, Fajitas, Fish tacos, Ramen, Sushi rolls, Pho, Beef Bourguignon, Chicken Tikka Masala, Pad Kra Pao, Chicken Shawarma, Gyro, Peking duck, Dim sum, Goulash, Empanadas, Ratatouille, Croque Monsieur, Biryani, Jerk chicken, Tortilla Española, Beef fajitas, Lamb Rogan Josh, Bibimbap, Ceviche, Chiles Rellenos, Ropa Vieja, Coq au Vin".split(","),
  "lunch":
    "Tomatoes, Onions, Garlic, Bell peppers, Carrots, Celery, Spinach, Kale, Lettuce, Broccoli, Cauliflower, Zucchini, Mushrooms, Potatoes, Sweet potatoes, Green beans, Corn, Asparagus, Eggplant".split(
      ","
    ),
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
export default function MenuManagementContainer() {
    const [selectedItem, setSelectedItem] = useState("none");
    const [orderNumber, setOrderNumber] = useState(0);
    const [orderAddedItems, setOrderAddedItems] = useState([{name: "", price: 0, quantity: 0}]);
    const updateOder=(name: string, price: number)=>{
        setOrderAddedItems(currentOrderItems => [...currentOrderItems, {name: name, price: price, quantity: 1}]);
    }
    setOrderNumber(984095);
  return (
    <div>
        <div className="restaurant-sub-menu-container">
            {
                menuItems.map((menuItem, index) => {
                    return <RestaurantSubMenuButton 
                    selected={selectedItem === menuItem} 
                    setCurrentSelection={setSelectedItem} 
                    text={menuItem} 
                    key={index}/>
                }) 
            }
        </div>
        <div className="restaurant-main-food-menu-container">
            <div className="restaurant-current-option-title">{selectedItem} Menu</div>
            <div className="current-menu-items-container">
                {
                    foodChoices[selectedItem.toLowerCase()].map((menuItem: string, index: number) => {
                        return <MenuItem key={index}
                        addedToOrder={false}
                        addItem={updateOder}
                        name={menuItem} 
                        price={index*10} 
                        picture="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHw%3D&w=1000&q=80"/>
                    })
                }
            </div>
        </div>

        <div className="current-order-items-manager">
            <div className="order-header-group">
                <div>Order#{orderNumber}</div>
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
                            return currentOrderItems.filter((orderItem, index) => index !== orderIndex)
                        })
                    }}
                     />
                })}
            </div>

        </div>
    </div>
  );
}


