CREATE TABLE employeeShifts (
    employeeID INT NOT NULL,
    shiftID INT NOT NULL,
    PRIMARY KEY (employeeID, shiftID),
    CONSTRAINT fk_employeeShifts_employeeID
      FOREIGN KEY (employeeID) 
      REFERENCES employees(employeeID),
    CONSTRAINT fk_employeeShifts_shiftID
      FOREIGN KEY (shiftID) 
      REFERENCES shifts(shiftID)
);