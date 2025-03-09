import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const regularQueenwhichMeal = await prisma.menuitems.create({
    data: {
      name: "Regular Queenwhich Meal",
      price: 0.00,
      profit: 0.00,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Meals"
    }
  })

  const spicyQueenwhichMeal = await prisma.menuitems.create({
    data: {
      name: "Spicy Queenwhich Meal",
      price: 0.00,
      profit: 0.00,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Meals"
    }
  })

  const grilledQueenwhichMeal = await prisma.menuitems.create({
    data: {
      name: "Grilled Queenwhich Meal",
      price: 0.00,
      profit: 0.00,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Meals"
    }
  })

  const deluxeRegularQueenwhichMeal = await prisma.menuitems.create({
    data: {
      name: "Deluxe Regular Queenwhich Meal",
      price: 0.00,
      profit: 0.00,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Meals"
    }
  })

  const deluxeSpicyQueenwhichMeal = await prisma.menuitems.create({
    data: {
      name: "Deluxe Spicy Queenwhich Meal",
      price: 0.00,
      profit: 0.00,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Meals"
    }
  })

  const deluxeGrilledQueenwhichMeal = await prisma.menuitems.create({
    data: {
      name: "Deluxe Grilled Queenwhich Meal",
      price: 0.00,
      profit: 0.00,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Meals"
    }
  })

  const royalNuggetsMealFourPiece = await prisma.menuitems.create({
    data: {
      name: "Royal Nuggets Meal (4 Piece)",
      price: 0.00,
      profit: 0.00,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Meals"
    }
  })

  const royalNuggetsMealEightPiece = await prisma.menuitems.create({
    data: {
      name: "Royal Nuggets Meal (8 Piece)",
      price: 0.00,
      profit: 0.00,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Meals"
    }
  })

  const kidsRoyalNuggetsMeal = await prisma.menuitems.create({
    data: {
      name: "Kids Royal Nuggets Meal",
      price: 0.00,
      profit: 0.00,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Meals"
    }
  })

  const kidsSaladMeal = await prisma.menuitems.create({
    data: {
      name: "Kids Salad Meal",
      price: 0.00,
      profit: 0.00,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Meals"
    }
  })

  const deluxeGardenSaladMeal = await prisma.menuitems.create({
    data: {
      name: "Deluxe Garden Salad Meal",
      price: 0.00,
      profit: 0.00,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Meals"
    }
  })

  const deluxeCrispyGardenSaladMeal = await prisma.menuitems.create({
    data: {
      name: "Deluxe Crispy Garden Salad Meal",
      price: 0.00,
      profit: 0.00,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Meals"
    }
  })

  const regularQueenwhich = await prisma.menuitems.create({
    data: {
      name: "Regular Queenwhich",
      price: 0.00,
      profit: 0.00,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Entrees"
    }
  })

  const spicyQueenwhich = await prisma.menuitems.create({
    data: {
      name: "Spicy Queenwhich",
      price: 0.00,
      profit: 0.00,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Entrees"
    }
  })

  const grilledQueenwhich = await prisma.menuitems.create({
    data: {
      name: "Grilled Queenwhich",
      price: 0.00,
      profit: 0.00,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Entrees"
    }
  })

  const deluxeRegularQueenwhich = await prisma.menuitems.create({
    data: {
      name: "Deluxe Regular Queenwhich",
      price: 0.00,
      profit: 0.00,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Entrees"
    }
  })

  const deluxeSpicyQueenwhich = await prisma.menuitems.create({
    data: {
      name: "Deluxe Spicy Queenwhich",
      price: 0.00,
      profit: 0.00,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Entrees"
    }
  })

  const deluxeGrilledQueenwhich = await prisma.menuitems.create({
    data: {
      name: "Deluxe Grilled Queenwhich",
      price: 0.00,
      profit: 0.00,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Entrees"
    }
  })

  const royalNuggetsFourPiece = await prisma.menuitems.create({
    data: {
      name: "Royal Nuggets (4 Piece)",
      price: 0.00,
      profit: 0.00,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Entrees"
    }
  })

  const royalNuggetsEightPiece = await prisma.menuitems.create({
    data: {
      name: "Royal Nuggets (8 Piece)",
      price: 0.00,
      profit: 0.00,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Entrees"
    }
  })

  const countDannyFriedChickenStrips = await prisma.menuitems.create({
    data: {
      name: "Count Danny Fried Chicken Strips",
      price: 0.00,
      profit: 0.00,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Entrees"
    }
  })

  const deluxeGardenSalad = await prisma.menuitems.create({
    data: {
      name: "Deluxe Garden Salad",
      price: 0.00,
      profit: 0.00,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Salads"
    }
  })

  const deluxeCrispyGardenSalad = await prisma.menuitems.create({
    data: {
      name: "Deluxe Crispy Garden Salad",
      price: 0.00,
      profit: 0.00,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Salads"
    }
  })

  const fries = await prisma.menuitems.create({
    data: {
      name: "Fries",
      price: 0.00,
      profit: 0.00,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Sides"
    }
  })

  const deluxeFries = await prisma.menuitems.create({
    data: {
      name: "Deluxe Fries",
      price: 0.00,
      profit: 0.00,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Sides"
    }
  })

  const gardenSideSalad = await prisma.menuitems.create({
    data: {
      name: "Garden Side Salad",
      price: 0.00,
      profit: 0.00,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Sides"
    }
  })

  const caesarSideSalad = await prisma.menuitems.create({
    data: {
      name: "Caesar Side Salad",
      price: 0.00,
      profit: 0.00,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Sides"
    }
  })

  const appleSlices = await prisma.menuitems.create({
    data: {
      name: "Apple Slices",
      price: 0.00,
      profit: 0.00,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Sides"
    }
  })

  const plainBagOChips = await prisma.menuitems.create({
    data: {
      name: "Plain Bag O' Chips",
      price: 0.00,
      profit: 0.00,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Sides"
    }
  })

  const bottledWater = await prisma.menuitems.create({
    data: {
      name: "Bottled Water",
      price: 0.00,
      profit: 0.00,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Beverages"
    }
  })

  const bubblyWater = await prisma.menuitems.create({
    data: {
      name: "Bubbly Water",
      price: 0.00,
      profit: 0.00,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Beverages"
    }
  })

  const sweetIcedTea = await prisma.menuitems.create({
    data: {
      name: "Sweet Iced Tea",
      price: 0.00,
      profit: 0.00,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Beverages"
    }
  })

  const unsweetenedIcedTea = await prisma.menuitems.create({
    data: {
      name: "Unsweetened Iced Tea",
      price: 0.00,
      profit: 0.00,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Beverages"
    }
  })

  const appleJuice = await prisma.menuitems.create({
    data: {
      name: "Apple Juice",
      price: 0.00,
      profit: 0.00,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Beverages"
    }
  })

  const strawberryMilk = await prisma.menuitems.create({
    data: {
      name: "Strawberry Milk",
      price: 0.00,
      profit: 0.00,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Beverages"
    }
  })
  
}

  main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })