import random
import datetime
import sys
import os
from datetime import timedelta

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from python_services.db_utils import connect_to_db

# Generate 400 random orders with a timestamp between 2025-01-01 and 2025-03-15; more orders on weekends 
NUM_ORDERS = 500 
START_DATE = datetime.datetime(2025, 1, 1)
END_DATE = datetime.datetime(2025, 3, 15)
BATCH_SIZE = 100  # How many records to insert in a single transaction

def random_date():
    """Generate a random date"""
    days = random.randint(0, (END_DATE - START_DATE).days)

    # Generate a random time of day
    hour = random.randint(0, 23)
    
    # Increase probability of busy hours using simple conditionals
    r = random.random()
    if r < 0.4:  # 40% chance to be during peak hours
        # Lunch or dinner peak
        peaks = [12, 13, 18, 19]
        hour = peaks[random.randint(0, len(peaks)-1)]
    elif r < 0.6:  # Additional 20% during secondary peak times
        # Breakfast or evening
        secondary = [8, 9, 17, 20]
        hour = secondary[random.randint(0, len(secondary)-1)]
    
    minutes = random.randint(0, 59)
    seconds = random.randint(0, 59)
    
    return START_DATE + timedelta(days=days, hours=hour, minutes=minutes, seconds=seconds)

def clear_existing_data(conn):
    """Clear existing data from the orders table"""
    try:
        cursor = conn.cursor()
        cursor.execute("TRUNCATE TABLE orders RESTART IDENTITY CASCADE;")
        conn.commit()
        cursor.close()
        print("Cleared existing data from orders table")
        return True
    except Exception as error:
        print(f"Error clearing existing data: {error}")
        conn.rollback()
        return False

def generate_and_insert_orders(conn, num_orders):
    """Generate orders and insert them into the database
    respecting that orderid is an identity column"""
    records_inserted = 0
    batch_items = []
    
    cursor = conn.cursor()
    
    # Generate orders with a weekly pattern (more on weekends)
    try:
        for _ in range(num_orders):
            # Generate order timestamp
            order_date = random_date()
            
            # Weekends have more traffic
            if order_date.weekday() >= 5:  # 5=Saturday, 6=Sunday
                # Weekend - 20% more likely to have an order
                pass
            elif random.random() < 0.2:
                # Skip 20% of weekday orders to simulate higher weekend traffic
                continue
            
            # Order is completed 90% of the time
            is_completed = random.random() < 0.9
            
            # If completed, generate completion timestamp (5-60 minutes after order)
            completed_timestamp = None
            if is_completed:
                minutes_to_complete = random.randint(5, 60)
                completed_timestamp = order_date + timedelta(minutes=minutes_to_complete)
            
            # Add to batch - WITHOUT orderID since it's auto-generated
            batch_items.append((
                order_date,
                is_completed,
                completed_timestamp
            ))
            
            records_inserted += 1
            
            # Process batch if full
            if len(batch_items) >= BATCH_SIZE:
                cursor.executemany("""
                    INSERT INTO orders (
                        ordertimestamp, completed, "completedTimeStamp"
                    ) VALUES (%s, %s, %s)
                """, batch_items)
                
                conn.commit()
                print(f"Inserted {len(batch_items)} records, total: {records_inserted}/{num_orders}")
                batch_items = []
        
        # Insert any remaining items
        if batch_items:
            cursor.executemany("""
                INSERT INTO orders (
                    ordertimestamp, completed, "completedTimeStamp"
                ) VALUES (%s, %s, %s)
            """, batch_items)
            
            conn.commit()
            print(f"Inserted final {len(batch_items)} records, total: {records_inserted}/{num_orders}")
        
        # Get the order ID range
        cursor.execute("SELECT MIN(orderid), MAX(orderid) FROM orders")
        min_id, max_id = cursor.fetchone()
        
        return records_inserted, min_id, max_id
    
    except Exception as e:
        print(f"Error generating and inserting data: {e}")
        print(f"Detailed error: {type(e).__name__}: {str(e)}")
        conn.rollback()
        return 0, None, None
    finally:
        cursor.close()

def check_table_exists(conn):
    """Check if the orders table exists"""
    cursor = conn.cursor()
    try:
        cursor.execute("""
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'orders'
            );
        """)
        orders_exists = cursor.fetchone()[0]
        
        cursor.close()
        if not orders_exists:
            print(f"Required table 'orders' does not exist")
            return False
        return True
    except Exception as error:
        print(f"Error checking tables: {error}")
        return False

def main():
    # Ask for confirmation
    confirmation = input(f"This will generate {NUM_ORDERS} orders. Continue? (y/n): ").lower()
    if confirmation != 'y':
        print("Operation cancelled.")
        return
    
    # Connect to database
    conn = connect_to_db()
    if not conn:
        print("Failed to connect to database. Exiting.")
        return
    
    try:
        # Check if orders table exists
        if not check_table_exists(conn):
            print("Orders table does not exist. Please create the table first.")
            return
        
        # Ask if want to clear existing data
        clear_data = input("Do you want to clear existing data from the orders table? (y/n): ").lower()
        if clear_data == 'y':
            if not clear_existing_data(conn):
                print("Failed to clear existing data. Exiting.")
                return
        
        # Generate and insert orders
        records_inserted, min_order_id, max_order_id = generate_and_insert_orders(
            conn, NUM_ORDERS
        )
        
        if records_inserted > 0:
            print(f"Successfully generated and inserted {records_inserted} orders.")
            print(f"Order IDs range from {min_order_id} to {max_order_id}")
            
            # Run a verification query
            cursor = conn.cursor()
            cursor.execute("SELECT COUNT(*) FROM orders;")
            count = cursor.fetchone()[0]
            cursor.close()
            print(f"Total records in orders table: {count}")
            
            # Save the order ID range to a file for the next script
            with open("order_id_range.txt", "w") as f:
                f.write(f"{min_order_id},{max_order_id}")
            print(f"Saved order ID range to order_id_range.txt")
        else:
            print("Failed to insert data.")
        
    finally:
        # Close connection
        if conn:
            conn.close()
            print("Database connection closed.")

if __name__ == "__main__":
    main()