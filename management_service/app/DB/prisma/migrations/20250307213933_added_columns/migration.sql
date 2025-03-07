/*
  Warnings:

  - Added the required column `category` to the `ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servingSize` to the `ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `menuitems` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "menuItemCategory" AS ENUM ('Meals', 'Entrees', 'Salads', 'Sides', 'Beverages');

-- CreateEnum
CREATE TYPE "ingredientCategory" AS ENUM ('Buns', 'Patties', 'Nuggets', 'Chicken Strips', 'Fries', 'Cheese', 'Produce', 'Sauces', 'Drinks', 'Other');

-- AlterTable
ALTER TABLE "ingredients" ADD COLUMN     "category" "ingredientCategory" NOT NULL,
ADD COLUMN     "servingSize" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "menuitems" ADD COLUMN     "category" "menuItemCategory" NOT NULL;

-- AlterTable
ALTER TABLE "orderitems" ADD COLUMN     "returned" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "completedTimeStamp" TIMESTAMPTZ(6);
