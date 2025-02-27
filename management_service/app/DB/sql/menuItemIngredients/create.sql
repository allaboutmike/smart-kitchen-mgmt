CREATE TABLE menuItemIngredients (
    menuItemID INT NOT NULL,
    ingredientID INT NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (menuItemID, ingredientID),
    CONSTRAINT fk_menuItemIngredients_menuItemID
      FOREIGN KEY (menuItemID) 
      REFERENCES menuItems(menuItemID),
    CONSTRAINT fk_menuItemIngredients_ingredientID
      FOREIGN KEY (ingredientID) 
      REFERENCES ingredients(ingredientID)
);