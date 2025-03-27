import argparse
import random
import datetime
import sys
import os
from datetime import timedelta

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from python_services.db_utils import connect_to_db

NUM_ITEMS_PER_ORDER_RANGE = (1, 5)  # Min/max items per order
BATCH_SIZE = 100  # How many records to insert in a single transaction

# Common customizations
CUSTOMIZATIONS = [
    "No pickles", "Extra sauce", "No cheese", "Extra cheese", 
    "Spicy level: medium", "No dressing", "Extra salt", "No salt"
]

def get_menu_items_from_db(conn):
    """Fetch menu items from the database"""
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT menuitemid FROM menuitems")
        menu_items = [row[0] for row in cursor.fetchall()]
        cursor.close()
        
        if not menu_items:
            print("No menu items found in database. Using fallback menu items.")
            return list(range(1, 32))  # 1-31 as fallback
        
        print(f"Successfully fetched {len(menu_items)} menu items from database.")
        return menu_items
    
    except Exception as error:
        print(f"Error fetching menu items: {error}")
        return list(range(1, 32))  # 1-31 as fallback

def get_orders_from_db(conn):
    """Fetch orders from the database"""
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT orderid, ordertimestamp, completed FROM orders")
        orders = cursor.fetchall()
        cursor.close()
        
        if not orders:
            print("No orders found in database. Please run the generate_orders.py script first.")
            return []
        
        print(f"Successfully fetched {len(orders)} orders from database.")
        return orders
    
    except Exception as error:
        print(f"Error fetching orders: {error}")
        return []

def clear_existing_data(conn):
    """Clear existing data from the orderItems table"""
    try:
        cursor = conn.cursor()
        cursor.execute("TRUNCATE TABLE orderItems RESTART IDENTITY CASCADE;")
        conn.commit()
        cursor.close()
        print("Cleared existing data from orderItems table")
        return True
    except Exception as error:
        print(f"Error clearing existing data: {error}")
        conn.rollback()
        return False

def generate_and_insert_order_items(conn, menu_items, orders):
    """Generate order items based on existing orders and insert them into the database"""
    
    if not orders:
        print("No orders available to generate items for.")
        return 0
    
    if not menu_items:
        print("No menu items available.")
        return 0
    
    records_inserted = 0
    batch_items = []
    
    cursor = conn.cursor()
    
    # Identify common items (fries, drinks) that can be ordered multiple times
    common_items = []
    for item_id in menu_items:
        # Try to fetch the name to identify common items
        try:
            cursor.execute("SELECT name FROM menuitems WHERE menuitemid = %s", (item_id,))
            result = cursor.fetchone()
            if result:
                name = result[0]
                if any(word in str(name).lower() for word in ['fries', 'water', 'drink', 'side']):
                    common_items.append(item_id)
        except:
            pass  # Skip if we can't get the name
    
    # If we couldn't identify common items, use the first few items
    if not common_items and menu_items:
        common_items = menu_items[:3]
    
    try:
        for order_id, order_timestamp, is_completed in orders:
            # Determine number of items in this order (1-5 items)
            items_in_order = random.randint(NUM_ITEMS_PER_ORDER_RANGE[0], NUM_ITEMS_PER_ORDER_RANGE[1])
            
            # Create the items for this order
            selected_items = []
            
            for _ in range(items_in_order):
                # Randomly select a menu item
                menu_item_id = random.choice(menu_items)
                
                # Avoid duplicates (unless it's common items like fries or drinks)
                if menu_item_id in selected_items and menu_item_id not in common_items:
                    continue
                
                selected_items.append(menu_item_id)
                
                # All items are marked served if the order is completed
                is_served = is_completed
                
                # If served, generate a timestamp 5-15 minutes after order
                served_timestamp = None
                if is_served:
                    minutes_to_serve = random.randint(5, 15)
                    served_timestamp = order_timestamp + timedelta(minutes=minutes_to_serve)
                
                # 20% chance of customization
                customization = None
                if random.random() < 0.2:
                    customization = random.choice(CUSTOMIZATIONS)
                
                # 2% chance the item was returned if it was served
                is_returned = is_served and random.random() < 0.02
                
                # Add to batch items (without orderItemID - let it be auto-generated)
                batch_items.append((
                    order_id,
                    menu_item_id,
                    is_served,
                    served_timestamp,
                    customization,
                    is_returned
                ))
                
                records_inserted += 1
                
                # Process in batches
                if len(batch_items) >= BATCH_SIZE:
                    cursor.executemany("""
                        INSERT INTO orderItems (
                            orderID, menuItemID, served, servedtimestamp, 
                            customizationdetail, returned
                        ) VALUES (%s, %s, %s, %s, %s, %s)
                    """, batch_items)
                    
                    conn.commit()
                    print(f"Inserted {len(batch_items)} records, total: {records_inserted}")
                    batch_items = []
        
        # Insert any remaining items
        if batch_items:
            cursor.executemany("""
                INSERT INTO orderItems (
                    orderID, menuItemID, served, servedtimestamp, 
                    customizationdetail, returned
                ) VALUES (%s, %s, %s, %s, %s, %s)
            """, batch_items)
            
            conn.commit()
            print(f"Inserted final {len(batch_items)} records, total: {records_inserted}")
        
        return records_inserted
    
    except Exception as e:
        print(f"Error generating and inserting data: {e}")
        print(f"Detailed error: {type(e).__name__}: {str(e)}")
        conn.rollback()
        return 0
    finally:
        cursor.close()

def check_table_exists(conn):
    """Check if the orderItems table exists"""
    cursor = conn.cursor()
    try:
        cursor.execute("""
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'orderitems'
            );
        """)
        orderitems_exists = cursor.fetchone()[0]
        
        cursor.close()
        if not orderitems_exists:
            print(f"Required table 'orderItems' does not exist")
            return False
        return True
    except Exception as error:
        print(f"Error checking tables: {error}")
        return False

def main(auto_confirm=False, clear_data=False):
    # Skip confirmation if auto_confirm is True
    if not auto_confirm:
        confirmation = input(f"This will generate order items for existing orders. Continue? (y/n): ").lower()
        if confirmation != 'y':
            print("Operation cancelled.")
            return
    
    # Connect to database
    conn = connect_to_db()
    if not conn:
        print("Failed to connect to database. Exiting.")
        return
    
    try:
        # Check if orderItems table exists
        if not check_table_exists(conn):
            print("OrderItems table does not exist. Please create the table first.")
            return
        
        # Clear data if specified, otherwise ask if not auto-confirmed
        if not auto_confirm:
            clear_data_input = input("Do you want to clear existing data from the orderItems table? (y/n): ").lower()
            clear_data = clear_data_input == 'y'
            
        if clear_data:
            if not clear_existing_data(conn):
                print("Failed to clear existing data. Exiting.")
                return
        
        # Get menu items
        menu_items = get_menu_items_from_db(conn)
        
        # Get orders
        orders = get_orders_from_db(conn)
        
        # Generate and insert order items
        records_inserted = generate_and_insert_order_items(
            conn, menu_items, orders
        )
        
        if records_inserted > 0:
            print(f"Successfully generated and inserted {records_inserted} order items.")
            
            # Run a verification query
            cursor = conn.cursor()
            cursor.execute("SELECT COUNT(*) FROM orderItems;")
            count = cursor.fetchone()[0]
            cursor.close()
            print(f"Total records in orderItems table: {count}")
            
            # Calculate average items per order
            avg_items = records_inserted / len(orders) if orders else 0
            print(f"Average items per order: {avg_items:.2f}")
        else:
            print("Failed to insert data.")
        
    finally:
        # Close connection
        if conn:
            conn.close()
            print("Database connection closed.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Generate random order items')
    parser.add_argument('--auto-confirm', action='store_true', help='Skip confirmation prompts')
    parser.add_argument('--clear-data', action='store_true', help='Clear existing data')
    args = parser.parse_args()
    
    main(auto_confirm=args.auto_confirm, clear_data=args.clear_data)