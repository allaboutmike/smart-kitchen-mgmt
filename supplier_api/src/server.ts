import express, { Request, Response } from 'express';
import cors from 'cors';
    
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Enable CORS
server.use(cors());



const ingredients = [
  { id: 1, name: 'Regular Bun', pricePerUnit: 0.24, shelfLife: 5 },
  { id: 3, name: 'Crispy Patty', pricePerUnit: 1.25, shelfLife: 3 },
  { id: 6, name: 'Royal Nuggets (Regular)', pricePerUnit: 0.30, shelfLife: 5},
  { id: 9, name: 'Regular Fries', pricePerUnit: 0.06, shelfLife: 14},
  { id: 15, name: 'Lettuce', pricePerUnit: 0.63, shelfLife: 5},
  { id: 21, name: 'BBQ Sauce', pricePerUnit: 0.02, shelfLife: 30},
  { id: 28, name: 'Bottled Water', pricePerUnit: 0.05, shelfLife: 90},
  { id: 33, name: 'Strawberry Milk', pricePerUnit: 0.60, shelfLife: 7},
];


server.post('/cornwallLogistics/orders', async (req: Request, res: Response) => {
  try {
    const { ingredientId, bulkOrderQuantity  } = req.body;
    const ingredient = ingredients.find(ing => ing.id === ingredientId);

    const calculatedPrice = ingredient 
      ? ingredient.pricePerUnit * bulkOrderQuantity 
      : 0;
    
    res.status(201).json({ message: `Your order of ${bulkOrderQuantity} of Ingredient: #${ingredientId} has been received.` });
    
    console.log(`Order shipped: ${bulkOrderQuantity} units of ${ingredient?.name} (ID: ${ingredientId})`)
    setTimeout(async () => {
    await fetch(`${process.env["MANAGEMENT_SERVICE_URL"]}/api/stocks/${ingredientId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredientId,
        bulkOrderQuantity,
        price: calculatedPrice,
        shelfLife: ingredient?.shelfLife   
      }),
    });
    console.log("Order Delivered");
    
  }
  , 30000);

  } catch(error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

server.listen(process.env["PORT"], () => {
  console.log(`Server is running on port ${process.env["PORT"]}`);
  console.log(
    "You can access the server at http://localhost:" + process.env["PORT"]
  );
});