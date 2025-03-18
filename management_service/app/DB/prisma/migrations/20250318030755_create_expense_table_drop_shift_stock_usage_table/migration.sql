/*
  Warnings:

  - You are about to drop the `shiftstockusage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "shiftstockusage" DROP CONSTRAINT "fk_shiftstockusage_shiftid";

-- DropForeignKey
ALTER TABLE "shiftstockusage" DROP CONSTRAINT "fk_shiftstockusage_stockid";

-- DropTable
DROP TABLE "shiftstockusage";

-- CreateTable
CREATE TABLE "expenses" (
    "expenseid" SERIAL NOT NULL,
    "stockid" INTEGER NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "expensedate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("expenseid")
);

-- CreateIndex
CREATE UNIQUE INDEX "expenses_stockid_key" ON "expenses"("stockid");

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "fk_expenses_stockid" FOREIGN KEY ("stockid") REFERENCES "stock"("stockid") ON DELETE NO ACTION ON UPDATE NO ACTION;
