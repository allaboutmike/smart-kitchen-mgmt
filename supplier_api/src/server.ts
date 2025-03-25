import express, { Request, Response } from 'express';
import cors from 'cors';
    
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Enable CORS
server.use(cors());

server.post('/cornwallLogistics/order', async (req: Request, res: Response) => {
  try {
    const { ingredientId, bulkOrderQuantity  } = req.body;
    console.log("Order is going through supplier")
    await fetch(`${process.env["MANAGEMENT_SERVICE_URL"]}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredientId,
        bulkOrderQuantity      
      }),
    });
    res.status(201).json({ message: `Stock order created successfully, Your order of ${bulkOrderQuantity} of Ingredient: #${ingredientId} will ship shortly.` });
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