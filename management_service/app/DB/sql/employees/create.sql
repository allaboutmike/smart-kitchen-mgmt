CREATE TABLE employees (
    employeeID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    employeeRole TEXT,
    firstName TEXT,
    lastName TEXT
);