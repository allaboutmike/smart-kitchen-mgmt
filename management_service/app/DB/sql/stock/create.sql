CREATE TABLE stock (
    stockID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ingredientID INT NOT NULL,
    quantity INT NOT NULL,
    expirationDate TIMESTAMP WITH TIME ZONE,
    receivedTimestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    cost DECIMAL(10, 2) NOT NULL,
    isExpired BOOLEAN NOT NULL DEFAULT FALSE,

--ingredientsID is referenced
    CONSTRAINT fk_ingredient
      FOREIGN KEY (ingredientID)
      REFERENCES ingredients(ingredientID)
);
