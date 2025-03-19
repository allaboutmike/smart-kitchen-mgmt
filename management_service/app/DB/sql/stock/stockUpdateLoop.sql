DECLARE
    remaining INTEGER := amount_to_deduct;
    current_stock RECORD;
    initial_qty INTEGER;
    used_qty INTEGER;
    results_row RECORD;
BEGIN
    FOR current_stock IN 
        SELECT stockid, quantity 
        FROM stock
        WHERE ingredientid = ingredient_id
          AND isexpired = false
          AND quantity > 0
        ORDER BY receivedtimestamp ASC
    LOOP
        IF remaining <= 0 THEN
            EXIT;
        END IF;        
        initial_qty := current_stock.quantity;
        IF current_stock.quantity >= remaining THEN
            used_qty := remaining;   
            UPDATE stock 
            SET quantity = quantity - remaining
            WHERE stockid = current_stock.stockid;            
            remaining := 0;
        ELSE
            used_qty := current_stock.quantity;
            UPDATE stock 
            SET quantity = 0
            WHERE stockid = current_stock.stockid;          
            remaining := remaining - current_stock.quantity;
        END IF;        
    END LOOP;
END;