-- CreateEnum
CREATE TYPE "wastereason" AS ENUM ('Expired', 'Over-prepped');

-- CreateTable
CREATE TABLE "employees" (
    "employeeid" SERIAL NOT NULL,
    "employeerole" TEXT,
    "firstname" TEXT,
    "lastname" TEXT,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("employeeid")
);

-- CreateTable
CREATE TABLE "employeeshifts" (
    "employeeid" INTEGER NOT NULL,
    "shiftid" INTEGER NOT NULL,

    CONSTRAINT "employeeshifts_pkey" PRIMARY KEY ("employeeid","shiftid")
);

-- CreateTable
CREATE TABLE "forecasts" (
    "forecastid" SERIAL NOT NULL,
    "recommendation" TEXT,
    "recommendationfor" TIMESTAMPTZ(6),
    "createdat" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "forecasts_pkey" PRIMARY KEY ("forecastid")
);

-- CreateTable
CREATE TABLE "ingredients" (
    "ingredientid" SERIAL NOT NULL,
    "ingredientname" TEXT NOT NULL,
    "thresholdquantity" INTEGER NOT NULL,
    "costperunit" DECIMAL(10,2) NOT NULL,
    "shelflife" INTEGER NOT NULL,

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("ingredientid")
);

-- CreateTable
CREATE TABLE "menuitemingredients" (
    "menuitemid" INTEGER NOT NULL,
    "ingredientid" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "menuitemingredients_pkey" PRIMARY KEY ("menuitemid","ingredientid")
);

-- CreateTable
CREATE TABLE "menuitems" (
    "menuitemid" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "profit" DECIMAL(10,2) NOT NULL,
    "createdat" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "menuitems_pkey" PRIMARY KEY ("menuitemid")
);

-- CreateTable
CREATE TABLE "orderitems" (
    "orderitemid" SERIAL NOT NULL,
    "orderid" INTEGER NOT NULL,
    "menuitemid" INTEGER NOT NULL,
    "served" BOOLEAN DEFAULT false,
    "servedtimestamp" TIMESTAMPTZ(6),
    "customizationdetail" TEXT,

    CONSTRAINT "orderitems_pkey" PRIMARY KEY ("orderitemid")
);

-- CreateTable
CREATE TABLE "orders" (
    "orderid" SERIAL NOT NULL,
    "ordertimestamp" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("orderid")
);

-- CreateTable
CREATE TABLE "shifts" (
    "shiftid" SERIAL NOT NULL,
    "starttime" TIMESTAMPTZ(6),
    "endtime" TIMESTAMPTZ(6),

    CONSTRAINT "shifts_pkey" PRIMARY KEY ("shiftid")
);

-- CreateTable
CREATE TABLE "shiftstockusage" (
    "shiftid" INTEGER NOT NULL,
    "stockid" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "recordedat" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shiftstockusage_pkey" PRIMARY KEY ("shiftid","stockid")
);

-- CreateTable
CREATE TABLE "stock" (
    "stockid" SERIAL NOT NULL,
    "ingredientid" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "expirationdate" TIMESTAMPTZ(6),
    "receivedtimestamp" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "cost" DECIMAL(10,2) NOT NULL,
    "isexpired" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "stock_pkey" PRIMARY KEY ("stockid")
);

-- CreateTable
CREATE TABLE "waste" (
    "wasteid" SERIAL NOT NULL,
    "stockid" INTEGER NOT NULL,
    "reason" "wastereason" NOT NULL,
    "wastetimestamp" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "waste_pkey" PRIMARY KEY ("wasteid")
);

-- AddForeignKey
ALTER TABLE "employeeshifts" ADD CONSTRAINT "fk_employeeshifts_employeeid" FOREIGN KEY ("employeeid") REFERENCES "employees"("employeeid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "employeeshifts" ADD CONSTRAINT "fk_employeeshifts_shiftid" FOREIGN KEY ("shiftid") REFERENCES "shifts"("shiftid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menuitemingredients" ADD CONSTRAINT "fk_menuitemingredients_ingredientid" FOREIGN KEY ("ingredientid") REFERENCES "ingredients"("ingredientid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menuitemingredients" ADD CONSTRAINT "fk_menuitemingredients_menuitemid" FOREIGN KEY ("menuitemid") REFERENCES "menuitems"("menuitemid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orderitems" ADD CONSTRAINT "fk_menu_item" FOREIGN KEY ("menuitemid") REFERENCES "menuitems"("menuitemid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orderitems" ADD CONSTRAINT "fk_order" FOREIGN KEY ("orderid") REFERENCES "orders"("orderid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "shiftstockusage" ADD CONSTRAINT "fk_shiftstockusage_shiftid" FOREIGN KEY ("shiftid") REFERENCES "shifts"("shiftid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "shiftstockusage" ADD CONSTRAINT "fk_shiftstockusage_stockid" FOREIGN KEY ("stockid") REFERENCES "stock"("stockid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "fk_ingredient" FOREIGN KEY ("ingredientid") REFERENCES "ingredients"("ingredientid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "waste" ADD CONSTRAINT "fk_waste_stockid" FOREIGN KEY ("stockid") REFERENCES "stock"("stockid") ON DELETE NO ACTION ON UPDATE NO ACTION;

