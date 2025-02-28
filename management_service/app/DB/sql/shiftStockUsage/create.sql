CREATE TABLE shiftStockUsage (
    shiftID INT NOT NULL,
    stockID INT NOT NULL,
    quantity INT NOT NULL,
    recordedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (shiftID, stockID),
    CONSTRAINT fk_shiftStockUsage_shiftID
      FOREIGN KEY (shiftID) 
      REFERENCES shifts(shiftID),
    CONSTRAINT fk_shiftStockUsage_stockID
      FOREIGN KEY (stockID) 
      REFERENCES stock(stockID)
);