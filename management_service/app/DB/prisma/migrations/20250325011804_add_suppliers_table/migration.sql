-- CreateTable
CREATE TABLE "suppliers" (
    "supplierid" SERIAL NOT NULL,
    "suppliername" TEXT NOT NULL,
    "api_url" VARCHAR(500),

    CONSTRAINT "suppliers_pkey" PRIMARY KEY ("supplierid")
);

-- CreateTable
CREATE TABLE "ingredientSuppliers" (
    "ingredientid" INTEGER NOT NULL,
    "supplierid" INTEGER NOT NULL,

    CONSTRAINT "ingredientSuppliers_pkey" PRIMARY KEY ("ingredientid","supplierid")
);

-- AddForeignKey
ALTER TABLE "ingredientSuppliers" ADD CONSTRAINT "fk_ingredientSuppliers_ingredientid" FOREIGN KEY ("ingredientid") REFERENCES "ingredients"("ingredientid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ingredientSuppliers" ADD CONSTRAINT "fk_ingredientSuppliers_supplierid" FOREIGN KEY ("supplierid") REFERENCES "suppliers"("supplierid") ON DELETE NO ACTION ON UPDATE NO ACTION;
