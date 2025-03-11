import random
import datetime
import sys
import os
from datetime import timedelta
from decimal import Decimal

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from python_services.db_utils import connect_to_db

NUM_STOCK_ENTRIES = 200  # Number of stock entries to generate
BATCH_SIZE = 50  # How many records to insert in a single transaction

# Create a date range for received timestamps
START_DATE = datetime.datetime.now() - timedelta(days=90)  # 90 days ago
END_DATE = datetime.datetime.now()  # Current date

# Shelf life in days for different ingredient categories
SHELF_LIFE = {
    'Buns': (3, 5),           # 3-5 days for buns
    'Patties': (3, 5),        # 3-5 days for patties
    'Chicken': (3, 5),        # 3-5 days for chicken items
    'Fries': (14, 21),        # 14-21 days for fries
    'Cheese': (14, 21),       # 14-21 days for cheese
    'Produce': (3, 10),       # 3-10 days for produce
    'Sauces': (30, 90),       # 30-90 days for sauces
    'Drinks': (14, 180),      # 14-180 days for drinks
    'Other': (14, 30),        # 14-30 days for other items
    'default': (7, 14)        # Default shelf life
}

def get_ingredients_from_db(conn):
    """Fetch ingredients directly from the database"""
    try:
        cursor = conn.cursor()
        # going to use double quotes to ensure that it matches the column names
        cursor.execute("""
            SELECT 
                "ingredientid", 
                "ingredientname", 
                "thresholdquantity", 
                "costperunit", 
                "shelflife", 
                "category"
            FROM ingredients
        """)
        
        ingredients = cursor.fetchall()
        cursor.close()
        
        if not ingredients:
            print("No ingredients found in database. Please populate the ingredients table first.")
            return []
        
        print(f"Successfully fetched {len(ingredients)} ingredients from database.")
        for i in range(min(5, len(ingredients))):
            print(f"Sample ingredient: {ingredients[i]}")
        return ingredients
    
    except Exception as error:
        print(f"Error fetching ingredients: {error}")
        return []

def get_expiration_date(received_date, category, shelf_life_days=None):
    """Calculate expiration date based on ingredient category and received date"""
    if shelf_life_days and shelf_life_days > 0:
        # If shelf life is provided in days, use it
        return received_date + timedelta(days=shelf_life_days)
    
    # Otherwise use category-based shelf life
    if not category:
        category = 'default'
    
    # Determine shelf life range
    min_days, max_days = SHELF_LIFE.get(category, SHELF_LIFE['default'])
    
    # Calculate expiration date
    shelf_life_days = random.randint(min_days, max_days)
    return received_date + timedelta(days=shelf_life_days)

def clear_existing_data(conn):
    """Clear existing data from the stock table"""
    try:
        cursor = conn.cursor()
        cursor.execute("TRUNCATE TABLE stock RESTART IDENTITY CASCADE;")
        conn.commit()
        cursor.close()
        print("Cleared existing data from stock table")
        return True
    except Exception as error:
        print(f"Error clearing existing data: {error}")
        conn.rollback()
        return False

def random_date_between(start_date, end_date):
    """Generate a random date between start_date and end_date"""
    delta = end_date - start_date
    random_days = random.randrange(delta.days)
    random_seconds = random.randrange(86400)  # Seconds in a day
    return start_date + timedelta(days=random_days, seconds=random_seconds)

def generate_and_insert_stock(conn, ingredients, num_entries):
    """Generate stock entries and insert them into the database"""
    if not ingredients:
        print("No ingredients available. Cannot generate stock data.")
        return 0
        
    records_inserted = 0
    batch_items = []
    
    cursor = conn.cursor()
    
    try:
        # Generate entries for each ingredient with varying quantities
        for _ in range(num_entries):
            # Pick a random ingredient
            ingredient = random.choice(ingredients)
            ingredient_id = ingredient[0]
            
            # Extract other fields - handle potential missing values as a failsafe
            # ingredient[1] is the ingredient name, ingredient[2] is the threshold quantity, ingredient[3] is the cost per unit, ingredient[4] is the shelf life, and ingredient[5] is the category
            try:
                threshold_quantity = int(ingredient[2]) if len(ingredient) > 2 and ingredient[2] is not None else 30
            except:
                threshold_quantity = 30
                
            try:
                cost_per_unit = ingredient[3] if len(ingredient) > 3 and ingredient[3] is not None else Decimal('0.1')
                # Make sure cost_per_unit is a Decimal
                if not isinstance(cost_per_unit, Decimal):
                    cost_per_unit = Decimal(str(cost_per_unit))
            except:
                cost_per_unit = Decimal('0.1')
                
            try:
                shelf_life_days = int(ingredient[4]) if len(ingredient) > 4 and ingredient[4] is not None else None
            except:
                shelf_life_days = None
                
            category = ingredient[5] if len(ingredient) > 5 and ingredient[5] is not None else None
            
            # Skip ingredients with zero threshold or cost
            if threshold_quantity == 0 or cost_per_unit == 0:
                continue
                
            # Generate received timestamp (within the last 90 days)
            received_timestamp = random_date_between(START_DATE, END_DATE)
            
            # Calculate expiration date based on shelf life and category
            expiration_date = get_expiration_date(received_timestamp, category, shelf_life_days)
            
            # Determine if expired
            is_expired = expiration_date < datetime.datetime.now()
            
            # Generate quantity - either below threshold, at threshold, or above threshold
            quantity_type = random.choices(
                ["low", "medium", "high"], 
                weights=[0.2, 0.3, 0.5], 
                k=1
            )[0]
            
            if quantity_type == "low":
                # Below threshold (0-80% of threshold)
                quantity = random.randint(1, max(1, int(threshold_quantity * 0.8)))
            elif quantity_type == "medium":
                # Around threshold (80-120% of threshold)
                quantity = random.randint(max(1, int(threshold_quantity * 0.8)), max(2, int(threshold_quantity * 1.2)))
            else:
                # Above threshold (120-200% of threshold)
                quantity = random.randint(max(2, int(threshold_quantity * 1.2)), max(3, int(threshold_quantity * 2)))
                
            # Generate cost based on cost per unit and quantity
            # Add some variation (+/-10%)
            variation = Decimal(str(random.uniform(0.9, 1.1)))
            cost = (cost_per_unit * Decimal(quantity) * variation).quantize(Decimal('0.01'))
            
            # Add to batch
            batch_items.append((
                ingredient_id,
                quantity,
                expiration_date,
                received_timestamp,
                cost,
                is_expired
            ))
            
            records_inserted += 1
            
            # Process batch if full
            if len(batch_items) >= BATCH_SIZE:
                cursor.executemany("""
                    INSERT INTO stock (
                        ingredientid, quantity, expirationdate, receivedtimestamp, 
                        cost, isexpired
                    ) VALUES (%s, %s, %s, %s, %s, %s)
                """, batch_items)
                
                conn.commit()
                print(f"Inserted {len(batch_items)} records, total: {records_inserted}/{num_entries}")
                batch_items = []
        
        # Insert any remaining items
        if batch_items:
            cursor.executemany("""
                INSERT INTO stock (
                    ingredientid, quantity, expirationdate, receivedtimestamp, 
                    cost, isexpired
                ) VALUES (%s, %s, %s, %s, %s, %s)
            """, batch_items)
            
            conn.commit()
            print(f"Inserted final {len(batch_items)} records, total: {records_inserted}/{num_entries}")
        
        return records_inserted
    
    except Exception as e:
        print(f"Error generating and inserting data: {e}")
        print(f"Detailed error: {type(e).__name__}: {str(e)}")
        conn.rollback()
        return 0
    finally:
        cursor.close()

def check_table_exists(conn):
    """Check if the stock table exists"""
    cursor = conn.cursor()
    try:
        cursor.execute("""
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'stock'
            );
        """)
        stock_exists = cursor.fetchone()[0]
        
        cursor.close()
        if not stock_exists:
            print(f"Required table 'stock' does not exist")
            return False
        return True
    except Exception as error:
        print(f"Error checking tables: {error}")
        return False

def main():
    # Ask for confirmation
    confirmation = input(f"This will generate {NUM_STOCK_ENTRIES} stock entries. Continue? (y/n): ").lower()
    if confirmation != 'y':
        print("Operation cancelled.")
        return
    
    # Connect to database
    conn = connect_to_db()
    if not conn:
        print("Failed to connect to database. Exiting.")
        return
    
    try:
        # Check if stock table exists
        if not check_table_exists(conn):
            print("Stock table does not exist. Please create the table first.")
            return
        
        # Ask user if they want to clear existing data
        clear_data = input("Do you want to clear existing data from the stock table? (y/n): ").lower()
        if clear_data == 'y':
            if not clear_existing_data(conn):
                print("Failed to clear existing data. Exiting.")
                return
        
        # Get ingredients directly from the database
        ingredients = get_ingredients_from_db(conn)
        
        if not ingredients:
            print("No ingredients found in the database. Please populate the ingredients table first.")
            return
            
        # Generate and insert stock data
        records_inserted = generate_and_insert_stock(
            conn, ingredients, NUM_STOCK_ENTRIES
        )
        
        if records_inserted > 0:
            print(f"Successfully generated and inserted {records_inserted} stock entries.")
            
            # Run a verification query
            cursor = conn.cursor()
            cursor.execute("SELECT COUNT(*) FROM stock;")
            count = cursor.fetchone()[0]
            cursor.close()
            print(f"Total records in stock table: {count}")
            
            # Check how many are expired
            cursor = conn.cursor()
            cursor.execute("SELECT COUNT(*) FROM stock WHERE isexpired = TRUE;")
            expired_count = cursor.fetchone()[0]
            cursor.close()
            print(f"Expired stock items: {expired_count} ({expired_count/count*100:.1f}%)")
            
            # Check distribution by category
            try:
                cursor = conn.cursor()
                cursor.execute("""
                    SELECT i.category, COUNT(*) 
                    FROM stock s 
                    JOIN ingredients i ON s.ingredientid = i.ingredientid 
                    GROUP BY i.category 
                    ORDER BY COUNT(*) DESC
                """)
                category_counts = cursor.fetchall()
                cursor.close()
                
                print("\nStock Distribution by Category:")
                print("===============================")
                for category, count in category_counts:
                    print(f"{category}: {count} items")
            except Exception as e:
                print(f"Error getting category distribution: {e}")
        else:
            print("Failed to insert data.")
        
    finally:
        # Close connection
        if conn:
            conn.close()
            print("Database connection closed.")

if __name__ == "__main__":
    main()