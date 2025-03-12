import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
//Menu Items
  // Checks db for existing data and if not found, seeds the db with the Regular Queenwhich Meal data
  await prisma.menuitems.upsert({
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
  // Checks db for existing data and if not found, seeds the db with the Spicy Queenwhich Meal data
  await prisma.menuitems.upsert({
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
  // Checks db for existing data and if not found, seeds the db with the Grilled Queenwhich Meal data
  await prisma.menuitems.upsert({
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
  // Checks db for existing data and if not found, seeds the db with the Deluxe Regular Queenwhich Meal data
  await prisma.menuitems.upsert({
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
// Checks db for existing data and if not found, seeds the db with the Deluxe Spicy Queenwhich Meal data
  await prisma.menuitems.upsert({
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
  // Checks db for existing data and if not found, seeds the db with the Deluxe Grilled Queenwhich Meal data
  await prisma.menuitems.upsert({
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
  // Checks db for existing data and if not found, seeds the db with the Royal Nuggets Meal (4 Piece) data
  await prisma.menuitems.upsert({
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
  // Checks db for existing data and if not found, seeds the db with the Royal Nuggets Meal (8 Piece) data
  await prisma.menuitems.upsert({
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
// Checks db for existing data and if not found, seeds the db with the Kids Royal Nuggets Meal data
  await prisma.menuitems.upsert({
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
  // Checks db for existing data and if not found, seeds the db with the Kids Salad Meal data
  await prisma.menuitems.upsert({
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
  // Checks db for existing data and if not found, seeds the db with the Deluxe Garden Salad Meal data
  await prisma.menuitems.upsert({
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
  // Checks db for existing data and if not found, seeds the db with the Deluxe Crispy Garden Salad Meal data
  await prisma.menuitems.upsert({
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
  // Checks db for existing data and if not found, seeds the db with the Regular Queenwhich data
  await prisma.menuitems.upsert({
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
  // Checks db for existing data and if not found, seeds the db with the Spicy Queenwhich data
  await prisma.menuitems.upsert({
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
  // Checks db for existing data and if not found, seeds the db with the Grilled Queenwhich data
  await prisma.menuitems.upsert({
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
  // Checks db for existing data and if not found, seeds the db with the Deluxe Regular Queenwhich data
  await prisma.menuitems.upsert({
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
  // Checks db for existing data and if not found, seeds the db with the Deluxe Spicy Queenwhich data
  await prisma.menuitems.upsert({
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
  // Checks db for existing data and if not found, seeds the db with the Deluxe Grilled Queenwhich data
  await prisma.menuitems.upsert({
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
  // Checks db for existing data and if not found, seeds the db with the Royal Nuggets (4 Piece) data
  await prisma.menuitems.upsert({
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
  // Checks db for existing data and if not found, seeds the db with the Royal Nuggets (8 Piece) data
  await prisma.menuitems.upsert({
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
  // Checks db for existing data and if not found, seeds the db with the Count Danny Fried Chicken Strips data
  await prisma.menuitems.upsert({
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
  // Checks db for existing data and if not found, seeds the db with the Deluxe Garden Salad data
  await prisma.menuitems.upsert({
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
  // Checks db for existing data and if not found, seeds the db with the Deluxe Crispy Garden Salad
  await prisma.menuitems.upsert({
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
  // Checks db for existing data and if not found, seeds the db with the Fries data
  await prisma.menuitems.upsert({
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
  // Checks db for existing data and if not found, seeds the db with the Deluxe Fries data
  await prisma.menuitems.upsert({
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
  // Checks db for existing data and if not found, seeds the db with the Garden Side Salad data
  await prisma.menuitems.upsert({
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
  // Checks db for existing data and if not found, seeds the db with the Caesar Side Salad data
  await prisma.menuitems.upsert({
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
  // Checks db for existing data and if not found, seeds the db with the Apple Slices data
  await prisma.menuitems.upsert({
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
  // Checks db for existing data and if not found, seeds the db with the Plain Bag O' Chips data
  await prisma.menuitems.upsert({
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
  // Checks db for existing data and if not found, seeds the db with the Bottled Water data
  await prisma.menuitems.upsert({
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
  // Checks db for existing data and if not found, seeds the db with the Bubbly Water data
  await prisma.menuitems.upsert({
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
  // Checks db for existing data and if not found, seeds the db with the Sweet Iced Tea data
  await prisma.menuitems.upsert({
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
  // Checks db for existing data and if not found, seeds the db with the Unsweetened Iced Tea data
  await prisma.menuitems.upsert({
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
  // Checks db for existing data and if not found, seeds the db with the Apple Juice data
  await prisma.menuitems.upsert({
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
  // Checks db for existing data and if not found, seeds the db with the Strawberry Milk data
  await prisma.menuitems.upsert({
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
//MenuItemIngredients
  // Checks db for existing data and if not found, seeds the db with the Regular Queenwhich Meal ingredients data
  // Regular Queenwhich Meal-Bun
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 1,
          ingredientid: 1
      }
    },
    update: {},
    create: {
      menuitemid: 1,
      ingredientid: 1,
      quantity: 1
    }
  })
  // Regular Queenwhich Meal-Crispy Patty
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 1,
          ingredientid: 3
      }
    },
    update: {},
    create: {
      menuitemid: 1,
      ingredientid: 3,
      quantity: 1
    }
  })
  // Regular Queenwhich Meal-Fries
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 1,
          ingredientid: 9
      }
    },
    update: {},
    create: {
      menuitemid: 1,
      ingredientid: 9,
      quantity: 3
    }
  })
  // Regular Queenwhich Meal-Sweet Iced Tea
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 1,
          ingredientid: 30
      }
    },
    update: {},
    create: {
      menuitemid: 1,
      ingredientid: 30,
      quantity: 1
    }
  })
  // Checks db for existing data and if not found, seeds the db with the Spicy Queenwhich Meal ingredients data
  // Spicy Queenwhich Meal-Bun
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 2,
          ingredientid: 1
      }
    },
    update: {},
    create: {
      menuitemid: 2,
      ingredientid: 1,
      quantity: 1
    }
  })
  // Spicy Queenwhich Meal-Spicy Patty
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 2,
          ingredientid: 4
      }
    },
    update: {},
    create: {
      menuitemid: 2,
      ingredientid: 4,
      quantity: 1
    }
  })
  // Spicy Queenwhich Meal-Fries
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 2,
          ingredientid: 9
      }
    },
    update: {},
    create: {
      menuitemid: 2,
      ingredientid: 9,
      quantity: 3
    }
  })
  // Spicy Queenwhich Meal-Sweet Iced Tea
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 2,
          ingredientid: 30
      }
    },
    update: {},
    create: {
      menuitemid: 2,
      ingredientid: 30,
      quantity: 1
    }
  })
  // Checks db for existing data and if not found, seeds the db with the Grilled Queenwhich Meal ingredients data
  // Grilled Queenwhich Meal-Bun
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 3,
          ingredientid: 1
      }
    },
    update: {},
    create: {
      menuitemid: 3,
      ingredientid: 1,
      quantity: 1
    }
  })
  // Grilled Queenwhich Meal-Grilled Patty
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 3,
          ingredientid: 5
      }
    },
    update: {},
    create: {
      menuitemid: 3,
      ingredientid: 5,
      quantity: 1
    }
  })
  // Grilled Queenwhich Meal-Fries
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 3,
          ingredientid: 9
      }
    },
    update: {},
    create: {
      menuitemid: 3,
      ingredientid: 9,
      quantity: 3
    }
  })
  // Grilled Queenwhich Meal-Sweet Iced Tea
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 3,
          ingredientid: 30
      }
    },
    update: {},
    create: {
      menuitemid: 3,
      ingredientid: 30,
      quantity: 1
    }
  })
  // Checks db for existing data and if not found, seeds the db with the Deluxe Regular Queenwhich Meal ingredients data
  // Deluxe Regular Queenwhich Meal-Bun
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 4,
          ingredientid: 1
      }
    },
    update: {},
    create: {
      menuitemid: 4,
      ingredientid: 1,
      quantity: 1
    }
  })
  // Deluxe Regular Queenwhich Meal-Crispy Patty
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 4,
          ingredientid: 3
      }
    },
    update: {},
    create: {
      menuitemid: 4,
      ingredientid: 3,
      quantity: 1
    }
  })
  // Deluxe Regular Queenwhich Meal-Lettuce
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 4,
          ingredientid: 15
      }
    },
    update: {},
    create: {
      menuitemid: 4,
      ingredientid: 15,
      quantity: 1
    }
  })
  // Deluxe Regular Queenwhich Meal-Tomato Slice
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 4,
          ingredientid: 18
      }
    },
    update: {},
    create: {
      menuitemid: 4,
      ingredientid: 18,
      quantity: 1
    }
  })
  // Deluxe Regular Queenwhich Meal-American Cheese Slice
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 4,
          ingredientid: 11
      }
    },
    update: {},
    create: {
      menuitemid: 4,
      ingredientid: 11,
      quantity: 1
    }
  })
  // Deluxe Regular Queenwhich Meal-Deluxe Fries
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 4,
          ingredientid: 10
      }
    },
    update: {},
    create: {
      menuitemid: 4,
      ingredientid: 10,
      quantity: 6
    }
  })
  // Deluxe Regular Queenwhich Meal-Sweet Iced Tea
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 4,
          ingredientid: 30
      }
    },
    update: {},
    create: {
      menuitemid: 4,
      ingredientid: 30,
      quantity: 1
    }
  })
  // Checks db for existing data and if not found, seeds the db with the Deluxe Spicy Queenwhich Meal ingredients data
  // Deluxe Spicy Queenwhich Meal-Bun
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 5,
          ingredientid: 1
      }
    },
    update: {},
    create: {
      menuitemid: 5,
      ingredientid: 1,
      quantity: 1
    }
  })
  // Deluxe Spicy Queenwhich Meal-Spicy Patty
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 5,
          ingredientid: 4
      }
    },
    update: {},
    create: {
      menuitemid: 5,
      ingredientid: 4,
      quantity: 1
    }
  })
  // Deluxe Spicy Queenwhich Meal-Lettuce
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 5,
          ingredientid: 15
      }
    },
    update: {},
    create: {
      menuitemid: 5,
      ingredientid: 15,
      quantity: 1
    }
  })
  // Deluxe Spicy Queenwhich Meal-Tomato Slice
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 5,
          ingredientid: 18
      }
    },
    update: {},
    create: {
      menuitemid: 5,
      ingredientid: 18,
      quantity: 1
    }
  })
  // Deluxe Spicy Queenwhich Meal-Pepper Jack Cheese Slice
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 5,
          ingredientid: 13
      }
    },
    update: {},
    create: {
      menuitemid: 5,
      ingredientid: 13,
      quantity: 1
    }
  })
  // Deluxe Spicy Queenwhich Meal-Deluxe Fries
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 5,
          ingredientid: 10
      }
    },
    update: {},
    create: {
      menuitemid: 5,
      ingredientid: 10,
      quantity: 6
    }
  })
  // Deluxe Spicy Queenwhich Meal-Sweet Iced Tea
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 5,
          ingredientid: 30
      }
    },
    update: {},
    create: {
      menuitemid: 5,
      ingredientid: 30,
      quantity: 1
    }
  })
  // Checks db for existing data and if not found, seeds the db with the Deluxe Grilled Queenwhich Meal ingredients data
  // Deluxe Grilled Queenwhich Meal-Bun
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 6,
          ingredientid: 1
      }
    },
    update: {},
    create: {
      menuitemid: 6,
      ingredientid: 1,
      quantity: 1
    }
  })
  // Deluxe Grilled Queenwhich Meal-Grilled Patty
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 6,
          ingredientid: 5
      }
    },
    update: {},
    create: {
      menuitemid: 6,
      ingredientid: 5,
      quantity: 1
    }
  })
  // Deluxe Grilled Queenwhich Meal-Lettuce
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 6,
          ingredientid: 15
      }
    },
    update: {},
    create: {
      menuitemid: 6,
      ingredientid: 15,
      quantity: 1
    }
  })
  // Deluxe Grilled Queenwhich Meal-Tomato Slice
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 6,
          ingredientid: 18
      }
    },
    update: {},
    create: {
      menuitemid: 6,
      ingredientid: 18,
      quantity: 1
    }
  })
  // Deluxe Grilled Queenwhich Meal-American Cheese Slice
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 6,
          ingredientid: 11
      }
    },
    update: {},
    create: {
      menuitemid: 6,
      ingredientid: 11,
      quantity: 1
    }
  })
  // Deluxe Grilled Queenwhich Meal-Deluxe Fries
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 6,
          ingredientid: 10
      }
    },
    update: {},
    create: {
      menuitemid: 6,
      ingredientid: 10,
      quantity: 6
    }
  })
  // Deluxe Grilled Queenwhich Meal-Sweet Iced Tea
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 6,
          ingredientid: 30
      }
    },
    update: {},
    create: {
      menuitemid: 6,
      ingredientid: 30,
      quantity: 1
    }
  })
  // Checks db for existing data and if not found, seeds the db with the Royal Nuggets Meal (4 Piece) ingredients data
  // Royal Nuggets Meal (4 Piece)-Single Order Nuggets
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 7,
          ingredientid: 6
      }
    },
    update: {},
    create: {
      menuitemid: 7,
      ingredientid: 6,
      quantity: 4
    }
  })
  // Royal Nuggets Meal (4 Piece)-BBQ Sauce
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 7,
          ingredientid: 21
      }
    },
    update: {},
    create: {
      menuitemid: 7,
      ingredientid: 21,
      quantity: 1
    }
  })
  // Royal Nuggets Meal (4 Piece)-Regular Fries
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 7,
          ingredientid: 9
      }
    },
    update: {},
    create: {
      menuitemid: 7,
      ingredientid: 9,
      quantity: 3
    }
  })
  // Royal Nuggets Meal (4 Piece)-Sweet Iced Tea
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 7,
          ingredientid: 30
      }
    },
    update: {},
    create: {
      menuitemid: 7,
      ingredientid: 30,
      quantity: 1
    }
  })
  // Checks db for existing data and if not found, seeds the db with the Royal Nuggets Meal (8 Piece) ingredients data
  // Royal Nuggets Meal (8 Piece)-Double Order Nuggets
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 8,
          ingredientid: 7
      }
    },
    update: {},
    create: {
      menuitemid: 8,
      ingredientid: 7,
      quantity: 8
    }
  })
  // Royal Nuggets Meal (8 Piece)-BBQ Sauce
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 8,
          ingredientid: 21
      }
    },
    update: {},
    create: {
      menuitemid: 8,
      ingredientid: 21,
      quantity: 1
    }
  })
  // Royal Nuggets Meal (8 Piece)-Regular Fries
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 8,
          ingredientid: 9
      }
    },
    update: {},
    create: {
      menuitemid: 8,
      ingredientid: 9,
      quantity: 3
    }
  })
  // Royal Nuggets Meal (8 Piece)-Sweet Iced Tea
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 8,
          ingredientid: 30
      }
    },
    update: {},
    create: {
      menuitemid: 8,
      ingredientid: 30,
      quantity: 1
    }
  })
  // Checks db for existing data and if not found, seeds the db with the Kids Royal Nuggets Meal ingredients data
  // Kids Royal Nuggets Meal-Single Order Nuggets
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 9,
          ingredientid: 6
      }
    },
    update: {},
    create: {
      menuitemid: 9,
      ingredientid: 6,
      quantity: 4
    }
  })
  // Kids Royal Nuggets Meal-BBQ Sauce
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 9,
          ingredientid: 21
      }
    },
    update: {},
    create: {
      menuitemid: 9,
      ingredientid: 21,
      quantity: 1
    }
  })
  // Kids Royal Nuggets Meal-Regular Fries
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 9,
          ingredientid: 9
      }
    },
    update: {},
    create: {
      menuitemid: 9,
      ingredientid: 9,
      quantity: 3
    }
  })
  // Checks db for existing data and if not found, seeds the db with the Kids Salad Meal ingredients data
  // Kids Salad Meal-Garden Side Salad
  // Kids Salad Meal-Cherry Tomatoes
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 10,
          ingredientid: 17
      }
    },
    update: {},
    create: {
      menuitemid: 10,
      ingredientid: 17,
      quantity: 4
    }
  })
  // Kids Salad Meal-Carrots
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 10,
          ingredientid: 19
      }
    },
    update: {},
    create: {
      menuitemid: 10,
      ingredientid: 19,
      quantity: 2
    }
  })
  // Kids Salad Meal-Shredded American Cheese
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 10,
          ingredientid: 12
      }
    },
    update: {},
    create: {
      menuitemid: 10,
      ingredientid: 12,
      quantity: 1
    }
  })
  // Kids Salad Meal-Croutons
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 10,
          ingredientid: 34
      }
    },
    update: {},
    create: {
      menuitemid: 10,
      ingredientid: 34,
      quantity: 1
    }
  })
  // Kids Salad Meal-Regular Fries
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 10,
          ingredientid: 9
      }
    },
    update: {},
    create: {
      menuitemid: 10,
      ingredientid: 9,
      quantity: 3
    }
  })
  // Kids Salad Meal-Apple Juice
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 10,
          ingredientid: 32
      }
    },
    update: {},
    create: {
      menuitemid: 10,
      ingredientid: 32,
      quantity: 1
    }
  })
  // Checks db for existing data and if not found, seeds the db with the Deluxe Garden Salad Meal ingredients data
  // Deluxe Garden Salad Meal-Grilled Patty
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 11,
          ingredientid: 5
      }
    },
    update: {},
    create: {
      menuitemid: 11,
      ingredientid: 5,
      quantity: 1
    }
  })
  // Deluxe Garden Salad Meal-Cherry Tomatoes
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 11,
          ingredientid: 17
      }
    },
    update: {},
    create: {
      menuitemid: 11,
      ingredientid: 17,
      quantity: 8
    }
  })
  // Deluxe Garden Salad Meal-Carrots
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 11,
          ingredientid: 19
      }
    },
    update: {},
    create: {
      menuitemid: 11,
      ingredientid: 19,
      quantity: 4
    }
  })
  // Deluxe Garden Salad Meal-Shredded American Cheese
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 11,
          ingredientid: 12
      }
    },
    update: {},
    create: {
      menuitemid: 11,
      ingredientid: 12,
      quantity: 1
    }
  })
  // Deluxe Garden Salad Meal-Croutons
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 11,
          ingredientid: 34
      }
    },
    update: {},
    create: {
      menuitemid: 11,
      ingredientid: 34,
      quantity: 1
    }
  })
  // Deluxe Garden Salad Meal-Sweet Iced Tea
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 11,
          ingredientid: 30
      }
    },
    update: {},
    create: {
      menuitemid: 11,
      ingredientid: 30,
      quantity: 1
    }
  })
  // Checks db for existing data and if not found, seeds the db with the Deluxe Crispy Garden Salad Meal ingredients data
  // Deluxe Crispy Garden Salad Meal-Crispy Patty
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 12,
          ingredientid: 3
      }
    },
    update: {},
    create: {
      menuitemid: 12,
      ingredientid: 3,
      quantity: 1
    }
  })
  // Deluxe Crispy Garden Salad Meal-Cherry Tomatoes
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 12,
          ingredientid: 17
      }
    },
    update: {},
    create: {
      menuitemid: 12,
      ingredientid: 17,
      quantity: 8
    }
  })
  // Deluxe Crispy Garden Salad Meal-Carrots
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 12,
          ingredientid: 19
      }
    },
    update: {},
    create: {
      menuitemid: 12,
      ingredientid: 19,
      quantity: 4
    }
  })
  // Deluxe Crispy Garden Salad Meal-Shredded American Cheese
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 12,
          ingredientid: 12
      }
    },
    update: {},
    create: {
      menuitemid: 12,
      ingredientid: 12,
      quantity: 1
    }
  })
  // Deluxe Crispy Garden Salad Meal-Croutons
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 12,
          ingredientid: 34
      }
    },
    update: {},
    create: {
      menuitemid: 12,
      ingredientid: 34,
      quantity: 1
    }
  })
  // Deluxe Crispy Garden Salad Meal-Sweet Iced Tea
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 12,
          ingredientid: 30
      }
    },
    update: {},
    create: {
      menuitemid: 12,
      ingredientid: 30,
      quantity: 1
    }
  })
  // Checks db for existing data and if not found, seeds the db with the Regular Queenwich ingredients data
  // Regular Queenwich-Bun
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 13,
          ingredientid: 1
      }
    },
    update: {},
    create: {
      menuitemid: 13,
      ingredientid: 1,
      quantity: 1
    }
  })
  // Regular Queenwich-Crispy Patty
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 13,
          ingredientid: 3
      }
    },
    update: {},
    create: {
      menuitemid: 13,
      ingredientid: 3,
      quantity: 1
    }
  })
  // Checks db for existing data and if not found, seeds the db with the Spicy Queenwich ingredients data
  // Spicy Queenwich-Bun
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 14,
          ingredientid: 1
      }
    },
    update: {},
    create: {
      menuitemid: 14,
      ingredientid: 1,
      quantity: 1
    }
  })
  // Spicy Quueenwich-Spicy Patty
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 14,
          ingredientid: 4
      }
    },
    update: {},
    create: {
      menuitemid: 14,
      ingredientid: 4,
      quantity: 1
    }
  })
  // Checks db for existing data and if not found, seeds the db with the Grilled Queenwich ingredients data
  // Grilled Queenwich-Bun
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 15,
          ingredientid: 1
      }
    },
    update: {},
    create: {
      menuitemid: 15,
      ingredientid: 1,
      quantity: 1
    }
  })
  // Grilled Queenwich-Grilled Patty
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 15,
          ingredientid: 5
      }
    },
    update: {},
    create: {
      menuitemid: 15,
      ingredientid: 5,
      quantity: 1
    }
  })
  // Checks db for existing data and if not found, seeds the db with the Deluxe Regular Queenwich ingredients data
  // Deluxe Regular Queenwich-Bun
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 16,
          ingredientid: 1
      }
    },
    update: {},
    create: {
      menuitemid: 16,
      ingredientid: 1,
      quantity: 1
    }
  })
  // Deluxe Regular Queenwich-Crispy Patty
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 16,
          ingredientid: 3
      }
    },
    update: {},
    create: {
      menuitemid: 16,
      ingredientid: 3,
      quantity: 1
    }
  })
  // Deluxe Regular Queenwich-Lettuce
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 16,
          ingredientid: 15
      }
    },
    update: {},
    create: {
      menuitemid: 16,
      ingredientid: 15,
      quantity: 1
    }
  })
  // Deluxe Regular Queenwich-Tomato Slice
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 16,
          ingredientid: 18
      }
    },
    update: {},
    create: {
      menuitemid: 16,
      ingredientid: 18,
      quantity: 1
    }
  })
  // Deluxe Regular Queenwich-American Cheese Slice
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 16,
          ingredientid: 11
      }
    },
    update: {},
    create: {
      menuitemid: 16,
      ingredientid: 11,
      quantity: 1
    }
  })
  // Checks db for existing data and if not found, seeds the db with the Deluxe Spicy Queenwich ingredients data
  // Deluxe Spicy Queenwich-Bun
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 17,
          ingredientid: 1
      }
    },
    update: {},
    create: {
      menuitemid: 17,
      ingredientid: 1,
      quantity: 1
    }
  })
  // Deluxe Spicy Queenwich-Spicy Patty
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 17,
          ingredientid: 4
      }
    },
    update: {},
    create: {
      menuitemid: 17,
      ingredientid: 4,
      quantity: 1
    }
  })
  // Deluxe Spicy Queenwich-Lettuce
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 17,
          ingredientid: 15
      }
    },
    update: {},
    create: {
      menuitemid: 17,
      ingredientid: 15,
      quantity: 1
    }
  })
  // Deluxe Spicy Queenwich-Tomato Slice
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 17,
          ingredientid: 18
      }
    },
    update: {},
    create: {
      menuitemid: 17,
      ingredientid: 18,
      quantity: 1
    }
  })
  // Deluxe Spicy Queenwich-Pepper Jack Cheese Slice
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 17,
          ingredientid: 13
      }
    },
    update: {},
    create: {
      menuitemid: 17,
      ingredientid: 13,
      quantity: 1
    }
  })
  // Checks db for existing data and if not found, seeds the db with the Deluxe Grilled Queenwich ingredients data
  // Deluxe Grilled Queenwich-Bun
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 18,
          ingredientid: 1
      }
    },
    update: {},
    create: {
      menuitemid: 18,
      ingredientid: 1,
      quantity: 1
    }
  })
  // Deluxe Grilled Queenwich-Grilled Patty
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 18,
          ingredientid: 5
      }
    },
    update: {},
    create: {
      menuitemid: 18,
      ingredientid: 5,
      quantity: 1
    }
  })
  // Deluxe Grilled Queenwich-Lettuce
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 18,
          ingredientid: 15
      }
    },
    update: {},
    create: {
      menuitemid: 18,
      ingredientid: 15,
      quantity: 1
    }
  })
  // Deluxe Grilled Queenwich-Tomato Slice
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 18,
          ingredientid: 18
      }
    },
    update: {},
    create: {
      menuitemid: 18,
      ingredientid: 18,
      quantity: 1
    }
  })
  // Deluxe Grilled Queenwich-American Cheese Slice
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 18,
          ingredientid: 11
      }
    },
    update: {},
    create: {
      menuitemid: 18,
      ingredientid: 11,
      quantity: 1
    }
  })
  // Checks db for existing data and if not found, seeds the db with the Royal Nuggets(4pc) ingredients data
  // Royal Nuggets-Single Order Nuggets
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 19,
          ingredientid: 6
      }
    },
    update: {},
    create: {
      menuitemid: 19,
      ingredientid: 6,
      quantity: 4
    }
  })
  // Royal Nuggets-BBQ Sauce
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 19,
          ingredientid: 21
      }
    },
    update: {},
    create: {
      menuitemid: 19,
      ingredientid: 21,
      quantity: 1
    }
  })
  // Checks db for existing data and if not found, seeds the db with the Royal Nuggets(8pc) ingredients data
  // Royal Nuggets-Double Order Nuggets
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 20,
          ingredientid: 7
      }
    },
    update: {},
    create: {
      menuitemid: 20,
      ingredientid: 7,
      quantity: 8
    }
  })
  // Royal Nuggets-BBQ Sauce
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 20,
          ingredientid: 21
      }
    },
    update: {},
    create: {
      menuitemid: 20,
      ingredientid: 21,
      quantity: 1
    }
  })
  // Checks db for existing data and if not found, seeds the db with the Count Danny Fried Chicken Strips ingredients data
  // Count Danny Fried Chicken Strips-Chicken Strips
  await prisma.menuitemingredients.upsert({
    where: {
      menuitemid_ingredientid: {
          menuitemid: 21,
          ingredientid: 8
      }
    },
    update: {},
    create: {
      menuitemid: 21,
      ingredientid: 8,
      quantity: 4
    }
  })
    // Count Danny Fried Chicken Strips-BBQ Sauce
    await prisma.menuitemingredients.upsert({
      where: {
        menuitemid_ingredientid: {
            menuitemid: 21,
            ingredientid: 21
        }
      },
      update: {},
      create: {
        menuitemid: 21,
        ingredientid: 21,
        quantity: 1
      }
    })
    // Checks db for existing data and if not found, seeds the db with the Deluxe Garden Salad ingredients data
    // Deluxe Garden Salad-Grilled Patty
    await prisma.menuitemingredients.upsert({
      where: {
        menuitemid_ingredientid: {
            menuitemid: 22,
            ingredientid: 5
        }
      },
      update: {},
      create: {
        menuitemid: 22,
        ingredientid: 5,
        quantity: 1
      }
    })
    // Deluxe Garden Salad-Cherry Tomatoes
    await prisma.menuitemingredients.upsert({
      where: {
        menuitemid_ingredientid: {
            menuitemid: 22,
            ingredientid: 17
        }
      },
      update: {},
      create: {
        menuitemid: 22,
        ingredientid: 17,
        quantity: 8
      }
    })
    // Deluxe Garden Salad-Carrots
    await prisma.menuitemingredients.upsert({
      where: {
        menuitemid_ingredientid: {
            menuitemid: 22,
            ingredientid: 19
        }
      },
      update: {},
      create: {
        menuitemid: 22,
        ingredientid: 19,
        quantity: 4
      }
    })
    // Deluxe Garden Salad-Shredded American Cheese
    await prisma.menuitemingredients.upsert({
      where: {
        menuitemid_ingredientid: {
            menuitemid: 22,
            ingredientid: 12
        }
      },
      update: {},
      create: {
        menuitemid: 22,
        ingredientid: 12,
        quantity: 1
      }
    })
    // Deluxe Garden Salad-Croutons
    await prisma.menuitemingredients.upsert({
      where: {
        menuitemid_ingredientid: {
            menuitemid: 22,
            ingredientid: 34
        }
      },
      update: {},
      create: {
        menuitemid: 22,
        ingredientid: 34,
        quantity: 1
      }
    })
    // Checks db for existing data and if not found, seeds the db with the Deluxe Crispy Garden Salad ingredients data
    // Deluxe Crispy Garden Salad-Crispy Patty
    await prisma.menuitemingredients.upsert({
      where: {
        menuitemid_ingredientid: {
            menuitemid: 23,
            ingredientid: 3
        }
      },
      update: {},
      create: {
        menuitemid: 23,
        ingredientid: 3,
        quantity: 1
      }
    })
    // Deluxe Crispy Garden Salad-Cherry Tomatoes
    await prisma.menuitemingredients.upsert({
      where: {
        menuitemid_ingredientid: {
            menuitemid: 23,
            ingredientid: 17
        }
      },
      update: {},
      create: {
        menuitemid: 23,
        ingredientid: 17,
        quantity: 8
      }
    })
    // Deluxe Crispy Garden Salad-Carrots
    await prisma.menuitemingredients.upsert({
      where: {
        menuitemid_ingredientid: {
            menuitemid: 23,
            ingredientid: 19
        }
      },
      update: {},
      create: {
        menuitemid: 23,
        ingredientid: 19,
        quantity: 4
      }
    })
    // Deluxe Crispy Garden Salad-Shredded American Cheese
    await prisma.menuitemingredients.upsert({
      where: {
        menuitemid_ingredientid: {
            menuitemid: 23,
            ingredientid: 12
        }
      },
      update: {},
      create: {
        menuitemid: 23,
        ingredientid: 12,
        quantity: 1
      }
    })
    // Deluxe Crispy Garden Salad-Croutons
    await prisma.menuitemingredients.upsert({
      where: {
        menuitemid_ingredientid: {
            menuitemid: 23,
            ingredientid: 34
        }
      },
      update: {},
      create: {
        menuitemid: 23,
        ingredientid: 34,
        quantity: 1
      }
    })
    // Checks db for existing data and if not found, seeds the db with the Fries ingredients data
    // Fries-Regular Fries
    await prisma.menuitemingredients.upsert({
      where: {
        menuitemid_ingredientid: {
            menuitemid: 24,
            ingredientid: 9
        }
      },
      update: {},
      create: {
        menuitemid: 24,
        ingredientid: 9,
        quantity: 3
      }
    })
    // Checks db for existing data and if not found, seeds the db with the Deluxe Fries ingredients data
    // Deluxe Fries-Deluxe Fries
    await prisma.menuitemingredients.upsert({
      where: {
        menuitemid_ingredientid: {
            menuitemid: 25,
            ingredientid: 10
        }
      },
      update: {},
      create: {
        menuitemid: 25,
        ingredientid: 10,
        quantity: 6
      }
    })
    // Checks db for existing data and if not found, seeds the db with the Garden Side Salad ingredients data
    // Garden Side Salad-Cherry Tomatoes
    await prisma.menuitemingredients.upsert({
      where: {
        menuitemid_ingredientid: {
            menuitemid: 26,
            ingredientid: 17
        }
      },
      update: {},
      create: {
        menuitemid: 26,
        ingredientid: 17,
        quantity: 8
      }
    })
    // Garden Side Salad-Carrots
    await prisma.menuitemingredients.upsert({
      where: {
        menuitemid_ingredientid: {
            menuitemid: 26,
            ingredientid: 19
        }
      },
      update: {},
      create: {
        menuitemid: 26,
        ingredientid: 19,
        quantity: 2
      }
    })
    // Garden Side Salad-Shredded American Cheese
    await prisma.menuitemingredients.upsert({
      where: {
        menuitemid_ingredientid: {
            menuitemid: 26,
            ingredientid: 12
        }
      },
      update: {},
      create: {
        menuitemid: 26,
        ingredientid: 12,
        quantity: 1
      }
    })
    // Garden Side Salad-Croutons
    await prisma.menuitemingredients.upsert({
      where: {
        menuitemid_ingredientid: {
            menuitemid: 26,
            ingredientid: 34
        }
      },
      update: {},
      create: {
        menuitemid: 26,
        ingredientid: 34,
        quantity: 1
      }
    })
    // Checks db for existing data and if not found, seeds the db with the Caesar Side Salad ingredients data
    // Caesar Side Salad-Cherry Tomatoes
    await prisma.menuitemingredients.upsert({
      where: {
        menuitemid_ingredientid: {
            menuitemid: 27,
            ingredientid: 17
        }
      },
      update: {},
      create: {
        menuitemid: 27,
        ingredientid: 17,
        quantity: 8
      }
    })
    // Caesar Side Salad-Carrots
    await prisma.menuitemingredients.upsert({
      where: {
        menuitemid_ingredientid: {
            menuitemid: 27,
            ingredientid: 19
        }
      },
      update: {},
      create: {
        menuitemid: 27,
        ingredientid: 19,
        quantity: 2
      }
    })
    // Caesar Side Salad-Shredded American Cheese
    await prisma.menuitemingredients.upsert({
      where: {
        menuitemid_ingredientid: {
            menuitemid: 27,
            ingredientid: 12
        }
      },
      update: {},
      create: {
        menuitemid: 27,
        ingredientid: 12,
        quantity: 1
      }
    })
    // Caesar Side Salad-Croutons
    await prisma.menuitemingredients.upsert({
      where: {
        menuitemid_ingredientid: {
            menuitemid: 27,
            ingredientid: 34
        }
      },
      update: {},
      create: {
        menuitemid: 27,
        ingredientid: 34,
        quantity: 1
      }
    })
    // Caesar Side Salad-Italian Dressing
    await prisma.menuitemingredients.upsert({
      where: {
        menuitemid_ingredientid: {
            menuitemid: 27,
            ingredientid: 25
        }
      },
      update: {},
      create: {
        menuitemid: 27,
        ingredientid: 25,
        quantity: 1
      }
    })
    // Checks db for existing data and if not found, seeds the db with the Apple Slices ingredients data
    // Apple Slices-Apple Slices
    await prisma.menuitemingredients.upsert({
      where: {
        menuitemid_ingredientid: {
            menuitemid: 28,
            ingredientid: 20
        }
      },
      update: {},
      create: {
        menuitemid: 28,
        ingredientid: 20,
        quantity: 1
      }
    })
    // Checks db for existing data and if not found, seeds the db with the Bag O' Chips ingredients data
    // Bag O' Chips-Bag O' Chips
    await prisma.menuitemingredients.upsert({
      where: {
        menuitemid_ingredientid: {
            menuitemid: 29,
            ingredientid: 35
        }
      },
      update: {},
      create: {
        menuitemid: 29,
        ingredientid: 35,
        quantity: 1
      }
    })
    // Checks db for existing data and if not found, seeds the db with the Bottled Water ingredients data
    // Bottled Water-Bottled Water
    await prisma.menuitemingredients.upsert({
      where: {
        menuitemid_ingredientid: {
            menuitemid: 30,
            ingredientid: 28
        }
      },
      update: {},
      create: {
        menuitemid: 30,
        ingredientid: 28,
        quantity: 1
      }
    })
    // Checks db for existing data and if not found, seeds the db with the Bubbly Water ingredients data
    // Bubbly Water-Bubbly Water
    await prisma.menuitemingredients.upsert({
      where: {
        menuitemid_ingredientid: {
            menuitemid: 31,
            ingredientid: 29
        }
      },
      update: {},
      create: {
        menuitemid: 31,
        ingredientid: 29,
        quantity: 1
      }
    })
    // Checks db for existing data and if not found, seeds the db with the Sweet Iced Tea ingredients data
    // Sweet Iced Tea-Sweet Iced Tea
    await prisma.menuitemingredients.upsert({
      where: {
        menuitemid_ingredientid: {
            menuitemid: 32,
            ingredientid: 30
        }
      },
      update: {},
      create: {
        menuitemid: 32,
        ingredientid: 30,
        quantity: 1
      }
    })
    // Checks db for existing data and if not found, seeds the db with the Unsweet Iced Tea ingredients data
    // Unsweet Iced Tea-Unsweet Iced Tea
    await prisma.menuitemingredients.upsert({
      where: {
        menuitemid_ingredientid: {
            menuitemid: 33,
            ingredientid: 31
        }
      },
      update: {},
      create: {
        menuitemid: 33,
        ingredientid: 31,
        quantity: 1
      }
    })
    // Checks db for existing data and if not found, seeds the db with the Apple Juice ingredients data
    // Apple Juice-Apple Juice
    await prisma.menuitemingredients.upsert({
      where: {
        menuitemid_ingredientid: {
            menuitemid: 34,
            ingredientid: 32
        }
      },
      update: {},
      create: {
        menuitemid: 34,
        ingredientid: 32,
        quantity: 1
      }
    })
    // Checks db for existing data and if not found, seeds the db with the Strawberry Milk ingredients data
    // Strawberry Milk-Strawberry Milk
    await prisma.menuitemingredients.upsert({
      where: {
        menuitemid_ingredientid: {
            menuitemid: 35,
            ingredientid: 33
        }
      },
      update: {},
      create: {
        menuitemid: 35,
        ingredientid: 33,
        quantity: 1
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