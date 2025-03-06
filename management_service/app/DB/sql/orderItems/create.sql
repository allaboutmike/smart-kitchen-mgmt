CREATE TABLE orderItems (
    orderItemID SERIAL PRIMARY KEY,
    orderID INT NOT NULL,
    menuItemID INT NOT NULL,
    served BOOLEAN DEFAULT FALSE,
    servedTimestamp TIMESTAMPTZ,
    customizationDetail TEXT,
    CONSTRAINT fk_order FOREIGN KEY (orderID) REFERENCES orders(orderID),
    CONSTRAINT fk_menu_item FOREIGN KEY (menuItemID) REFERENCES menuItems(menuItemID)
);
