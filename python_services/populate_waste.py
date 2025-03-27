import os
import argparse
from db_utils import connect_to_db
from datetime import datetime

def move_expired_to_waste(auto_confirm=False, verbose=False):
    """
    Move expired ingredients from stock to the waste table.
    
    Args:
        auto_confirm (bool): Skip confirmation prompts if True
        verbose (bool): Display detailed output if True
    """
    print("==== Moving Expired Ingredients to Waste ====")
    
    # Get database connection
    conn = connect_to_db()
    if not conn:
        print("Failed to connect to database. Please check connection settings.")
        return
    
    cursor = conn.cursor()
    waste_items = []
    
    try:
        # Begin transaction
        cursor.execute("BEGIN;")
        
        # Finds all stock items marked as expired
        cursor.execute("""
        SELECT s.stockid, s.ingredientid, s.quantity, i.ingredientname
        FROM stock s
        JOIN ingredients i ON s.ingredientid = i.ingredientid
        WHERE s.isexpired = TRUE AND s.quantity > 0
        """)
        
        expired_items = cursor.fetchall()
        
        if not expired_items:
            print("No expired ingredients found in stock.")
            cursor.execute("COMMIT;")
            return
        
        print(f"Found {len(expired_items)} expired items in stock.")
        
        # If not auto-confirmed, ask for confirmation
        if not auto_confirm:
            confirmation = input(f"Move {len(expired_items)} expired items to waste? (y/n): ").lower()
            if confirmation != 'y':
                print("Operation cancelled.")
                cursor.execute("ROLLBACK;")
                return
        
        for stock_id, ingredient_id, quantity, ingredient_name in expired_items:
            # Insert into waste table
            cursor.execute("""
            INSERT INTO waste (stockid, reason, quantity)
            VALUES (%s, 'Expired'::wastereason, %s)
            RETURNING wasteid
            """, (stock_id, quantity))
            
            waste_id = cursor.fetchone()[0]
            waste_items.append((waste_id, ingredient_name, quantity))
            
            # Update the stock item (set quantity to 0)
            cursor.execute("""
            UPDATE stock
            SET quantity = 0
            WHERE stockid = %s
            """, (stock_id,))
            
            if verbose:
                print(f"Moved {quantity} units of {ingredient_name} to waste.")
        
        # Commit the transaction
        cursor.execute("COMMIT;")
        print(f"Successfully moved {len(waste_items)} expired items to waste.")
        
        # Display summary if verbose or not auto-confirm
        if verbose or not auto_confirm:
            print("\nWaste Record Summary:")
            print("-" * 50)
            for waste_id, name, qty in waste_items:
                print(f"Waste ID: {waste_id}, Item: {name}, Quantity: {qty}")
        
    except Exception as e:
        cursor.execute("ROLLBACK;")
        print(f"Error moving expired items to waste: {e}")
    finally:
        cursor.close()
        conn.close()
        print("Database connection closed.")

def main():
    parser = argparse.ArgumentParser(description='Move expired ingredients to waste')
    parser.add_argument('--auto-confirm', action='store_true', help='Skip confirmation prompts')
    parser.add_argument('--verbose', action='store_true', help='Display detailed output')
    args = parser.parse_args()
    
    move_expired_to_waste(auto_confirm=args.auto_confirm, verbose=args.verbose)
    
if __name__ == "__main__":
    main()