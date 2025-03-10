import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const regularQueenwhichMeal = await prisma.menuitems.upsert({
    where: {menuitemid: 1},
    update: {},   
    create: {
      name: "Regular Queenwhich Meal",
      price: 2.70,
      profit: 0.63,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Meals",
      isPopular: false
    }
  })

  const spicyQueenwhichMeal = await prisma.menuitems.upsert({
    where: {menuitemid: 2},
    update: {},   
    create: {
      name: "Spicy Queenwhich Meal",
      price: 2.95,
      profit: 0.68,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Meals",
      isPopular: true
    }
  })

  const grilledQueenwhichMeal = await prisma.menuitems.upsert({
    where: {menuitemid: 3},
    update: {},   
    create: {
      name: "Grilled Queenwhich Meal",
      price: 3.25,
      profit: 0.73,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Meals",
      isPopular: false
    }
  })

  const deluxeRegularQueenwhichMeal = await prisma.menuitems.upsert({
    where: {menuitemid: 4},
    update: {},   
    create: {
      name: "Deluxe Regular Queenwhich Meal",
      price: 5.38,
      profit: 1.24,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Meals",
      isPopular: true
    }
  })

  const deluxeSpicyQueenwhichMeal = await prisma.menuitems.upsert({
    where: {menuitemid: 5},
    update: {},   
    create: {
      name: "Deluxe Spicy Queenwhich Meal",
      price: 5.65,
      profit: 1.31,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Meals",
      isPopular: true
    }
  })

  const deluxeGrilledQueenwhichMeal = await prisma.menuitems.upsert({
    where: {menuitemid: 6},
    update: {},   
    create: {
      name: "Deluxe Grilled Queenwhich Meal",
      price: 5.84,
      profit: 1.35,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Meals",
      isPopular: false
    }
  })

  const royalNuggetsMealFourPiece = await prisma.menuitems.upsert({
    where: {menuitemid: 7},
    update: {},   
    create: {
      name: "Royal Nuggets Meal (4 Piece)",
      price: 2.34,
      profit: 0.54,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Meals",
      isPopular: false
    }
  })

  const royalNuggetsMealEightPiece = await prisma.menuitems.upsert({
    where: {menuitemid: 8},
    update: {},   
    create: {
      name: "Royal Nuggets Meal (8 Piece)",
      price: 3.90,
      profit: 0.00,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Meals",
      isPopular: true
    }
  })

  const kidsRoyalNuggetsMeal = await prisma.menuitems.upsert({
    where: {menuitemid: 9},
    update: {},   
    create: {
      name: "Kids Royal Nuggets Meal",
      price: 1.82,
      profit: 0.42,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Meals",
      isPopular: true
    }
  })

  const kidsSaladMeal = await prisma.menuitems.upsert({
    where: {menuitemid: 10},
    update: {},   
    create: {
      name: "Kids Salad Meal",
      price: 2.41,
      profit: 0.56,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Meals",
      isPopular: false
    }
  })

  const deluxeGardenSaladMeal = await prisma.menuitems.upsert({
    where: {menuitemid: 11},
    update: {},   
    create: {
      name: "Deluxe Garden Salad Meal",
      price: 5.87,
      profit: 1.36,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Meals",
      isPopular: true
    }
  })

  const deluxeCrispyGardenSaladMeal = await prisma.menuitems.upsert({
    where: {menuitemid: 12},
    update: {},   
    create: {
      name: "Deluxe Crispy Garden Salad Meal",
      price: 5.41,
      profit: 1.25,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Meals",
      isPopular: true
    }
  })

  const regularQueenwhich = await prisma.menuitems.upsert({
    where: {menuitemid: 13},
    update: {},   
    create: {
      name: "Regular Queenwhich",
      price: 1.94,
      profit: 0.45,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Entrees",
      isPopular: true
    }
  })

  const spicyQueenwhich = await prisma.menuitems.upsert({
    where: {menuitemid: 14},
    update: {},   
    create: {
      name: "Spicy Queenwhich",
      price: 2.20,
      profit: 0.51,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Entrees",
      isPopular: true
    }
  })

  const grilledQueenwhich = await prisma.menuitems.upsert({
    where: {menuitemid: 15},
    update: {},   
    create: {
      name: "Grilled Queenwhich",
      price: 2.40,
      profit: 0.56,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Entrees",
      isPopular: false
    }
  })

  const deluxeRegularQueenwhich = await prisma.menuitems.upsert({
    where: {menuitemid: 16},
    update: {},   
    create: {
      name: "Deluxe Regular Queenwhich",
      price: 4.40,
      profit: 1.02,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Entrees",
      isPopular: false
    }
  })

  const deluxeSpicyQueenwhich = await prisma.menuitems.upsert({
    where: {menuitemid: 17},
    update: {},   
    create: {
      name: "Deluxe Spicy Queenwhich",
      price: 4.66,
      profit: 1.08,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Entrees",
      isPopular: true
    }
  })

  const deluxeGrilledQueenwhich = await prisma.menuitems.upsert({
    where: {menuitemid: 18},
    update: {},   
    create: {
      name: "Deluxe Grilled Queenwhich",
      price: 4.85,
      profit: 1.12,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Entrees",
      isPopular: false
    }
  })

  const royalNuggetsFourPiece = await prisma.menuitems.upsert({
    where: {menuitemid: 19},
    update: {},   
    create: {
      name: "Royal Nuggets (4 Piece)",
      price: 1.59,
      profit: 0.37,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Entrees",
      isPopular: false
    }
  })

  const royalNuggetsEightPiece = await prisma.menuitems.upsert({
    where: {menuitemid: 20},
    update: {},   
    create: {
      name: "Royal Nuggets (8 Piece)",
      price: 3.15,
      profit: 0.73,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Entrees",
      isPopular: true
    }
  })

  const countDannyFriedChickenStrips = await prisma.menuitems.upsert({
    where: {menuitemid: 21},
    update: {},   
    create: {
      name: "Count Danny Fried Chicken Strips",
      price: 2.63,
      profit: 0.61,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Entrees",
      isPopular: true
    }
  })

  const deluxeGardenSalad = await prisma.menuitems.upsert({
    where: {menuitemid: 22},
    update: {},   
    create: {
      name: "Deluxe Garden Salad",
      price: 5.35,
      profit: 1.24,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Salads",
      isPopular: false
    }
  })

  const deluxeCrispyGardenSalad = await prisma.menuitems.upsert({
    where: {menuitemid: 23},
    update: {},   
    create: {
      name: "Deluxe Crispy Garden Salad",
      price: 4.89,
      profit: 1.13,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Salads",
      isPopular: true
    }
  })

  const fries = await prisma.menuitems.upsert({
    where: {menuitemid: 24},
    update: {},   
    create: {
      name: "Fries",
      price: 0.24,
      profit: 0.06,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Sides",
      isPopular: true
    }
  })

  const deluxeFries = await prisma.menuitems.upsert({
    where: {menuitemid: 25},
    update: {},   
    create: {
      name: "Deluxe Fries",
      price: 0.47,
      profit: 0.11,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Sides",
      isPopular: false
    }
  })

  const gardenSideSalad = await prisma.menuitems.upsert({
    where: {menuitemid: 26},
    update: {},   
    create: {
      name: "Garden Side Salad",
      price: 1.76,
      profit: 0.41,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Sides",
      isPopular: false
    }
  })

  const caesarSideSalad = await prisma.menuitems.upsert({
    where: {menuitemid: 27},
    update: {},   
    create: {
      name: "Caesar Side Salad",
      price: 1.79,
      profit: 0.42,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Sides",
      isPopular: false
    }
  })

  const appleSlices = await prisma.menuitems.upsert({
    where: {menuitemid: 28},
    update: {},   
    create: {
      name: "Apple Slices",
      price: 0.59,
      profit: 0.14,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Sides",
      isPopular: false
    }
  })

  const plainBagOChips = await prisma.menuitems.upsert({
    where: {menuitemid: 29},
    update: {},   
    create: {
      name: "Plain Bag O' Chips",
      price: 0.04,
      profit: 0.01,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Sides",
      isPopular: false
    }
  })

  const bottledWater = await prisma.menuitems.upsert({
    where: {menuitemid: 30},
    update: {},   
    create: {
      name: "Bottled Water",
      price: 0.07,
      profit: 0.02,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Beverages",
      isPopular: false
    }
  })

  const bubblyWater = await prisma.menuitems.upsert({
    where: {menuitemid: 31},
    update: {},   
    create: {
      name: "Bubbly Water",
      price: 0.40,
      profit: 0.10,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Beverages",
      isPopular: false
    }
  })

  const sweetIcedTea = await prisma.menuitems.upsert({
    where: {menuitemid: 32},
    update: {},   
    create: {
      name: "Sweet Iced Tea",
      price: 0.56,
      profit: 0.16,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Beverages",
      isPopular: true
    }
  })

  const unsweetenedIcedTea = await prisma.menuitems.upsert({
    where: {menuitemid: 33},
    update: {},   
    create: {
      name: "Unsweetened Iced Tea",
      price: 0.56,
      profit: 0.16,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Beverages",
      isPopular: false
    }
  })

  const appleJuice = await prisma.menuitems.upsert({
    where: {menuitemid: 34},
    update: {},   
    create: {
      name: "Apple Juice",
      price: 0.65,
      profit: 0.15,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Beverages",
      isPopular: false
    }
  })

  const strawberryMilk = await prisma.menuitems.upsert({
    where: {menuitemid: 35},
    update: {},   
    create: {
      name: "Strawberry Milk",
      price: 0.78,
      profit: 0.18,
      createdat: new Date(),
      updatedat: new Date(),
      category: "Beverages",
      isPopular: false
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