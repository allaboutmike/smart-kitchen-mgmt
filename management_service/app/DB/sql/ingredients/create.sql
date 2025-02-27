/*
    Creates table ingredients.
*/
CREATE TABLE ingredients (
    ingredientID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ingredientName TEXT NOT NULL,
    thresholdQuantity INT NOT NULL,
    costPerUnit DECIMAL(10, 2) NOT NULL,
    shelfLife INT NOT NULL
);