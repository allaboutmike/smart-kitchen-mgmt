/*
  Warnings:

  - The values [Nuggets,Chicken Strips] on the enum `ingredientCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ingredientCategory_new" AS ENUM ('Buns', 'Patties', 'Chicken', 'Fries', 'Cheese', 'Produce', 'Sauces', 'Drinks', 'Other');
ALTER TABLE "ingredients" ALTER COLUMN "category" TYPE "ingredientCategory_new" USING ("category"::text::"ingredientCategory_new");
ALTER TYPE "ingredientCategory" RENAME TO "ingredientCategory_old";
ALTER TYPE "ingredientCategory_new" RENAME TO "ingredientCategory";
DROP TYPE "ingredientCategory_old";
COMMIT;

-- AlterTable
ALTER TABLE "menuitems" ADD COLUMN     "isPopular" BOOLEAN NOT NULL DEFAULT false;
