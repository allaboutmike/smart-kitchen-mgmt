import csv
import os
from db_utils import connect_to_db
from psycopg2.extras import execute_values

def import_ingredients_from_csv(csv_file="data/ingredients.csv"):
    """Import ingredients from CSV file into the database"""
    # Create the data directory if it doesn't exist
    script_dir = os.path.dirname(os.path.abspath(__file__))
    data_dir = os.path.join(script_dir, 'data')
    if not os.path.exists(data_dir):
        os.makedirs(data_dir)
        print(f"Created directory: {data_dir}")

    # If no CSV file is specified, use the default path or ask for input
    if csv_file is None:
        default_path = os.path.join(data_dir, 'ingredients.csv')
        if os.path.exists(default_path):
            csv_file = default_path
            print(f"Using CSV file at: {csv_file}")
        else:
            print(f"CSV file not found at {default_path}")
            csv_file = input("Enter the full path to ingredients.csv: ")
    
    # Verify the file exists
    if not os.path.exists(csv_file):
        print(f"Error: File {csv_file} not found.")
        return

    # Get connection using your existing utility
    conn = connect_to_db()
    if not conn:
        print("Failed to connect to database. Please check your connection settings.")
        return
    
    cursor = conn.cursor()
    ingredients = []
    
    print(f"Importing ingredients from {csv_file}...")
    
    try:
        with open(csv_file, 'r', encoding='utf-8') as file:
            reader = csv.reader(file)
            next(reader)  # Skip header row
            
            for row in reader:
                if not row or not row[0].strip():
                    continue  # Skip empty rows
                
                # Extract values from the CSV row
                ingredientname = row[0].strip()
                thresholdquantity = int(row[1]) if row[1].strip() else 0
                costperunit = float(row[2]) if row[2].strip() else 0.0
                shelflife = int(row[3]) if row[3].strip() else 0
                servingSize = row[4].strip() if len(row) > 4 else ''
                category = row[5].strip() if len(row) > 5 else 'OTHER'
                
                ingredients.append((
                    ingredientname,
                    thresholdquantity,
                    costperunit,
                    shelflife,
                    servingSize,
                    category
                ))
        
        if ingredients:
            # Ask if user wants to clear existing data
            should_truncate = input("Do you want to clear existing ingredients data? (y/n): ").lower() == 'y'
            
            if should_truncate:
                cursor.execute("TRUNCATE TABLE ingredients CASCADE")
                print("Ingredients table truncated.")
            
            # Insert the ingredients
            insert_query = """
            INSERT INTO ingredients (
                ingredientname, thresholdquantity, costperunit, 
                shelflife, "servingSize", category
            ) VALUES %s
            """
            execute_values(cursor, insert_query, ingredients)
            conn.commit()
            print(f"Successfully imported {len(ingredients)} ingredients.")
        else:
            print("No ingredients data to import.")
    
    except Exception as e:
        conn.rollback()
        print(f"Error importing ingredients: {e}")
    finally:
        cursor.close()
        conn.close()
        print("Database connection closed.")

def main():
    """Main function to run the data import process"""
    print("==== Importing Ingredients ====")
    import_ingredients_from_csv()
    print("Import process completed.")
            
if __name__ == "__main__":
    main()