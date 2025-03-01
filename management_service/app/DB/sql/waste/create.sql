CREATE TYPE wasteReason AS ENUM (
'Expired', 
'Over-prepped'
);

CREATE TABLE waste (
    wasteID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    stockID INT NOT NULL,
    reason wasteReason NOT NULL,
    wasteTimestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    quantity INT NOT NULL,
    CONSTRAINT fk_waste_stockID 
      FOREIGN KEY (stockID) 
      REFERENCES stock(stockID)
);