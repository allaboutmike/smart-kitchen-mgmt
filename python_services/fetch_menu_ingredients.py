import datetime
import psycopg2
import json
from psycopg2.extras import RealDictCursor
from db_utils import connect_to_db


def fetch_menu_items_ingredients():
    """
    Fetch menu items and their ingredient requirements from the database.
    
    The function connects to the database, retrieves all menu items and their
    associated ingredients with quantities, and returns the data in a structured
    dictionary format suitable for ingredient planning and recipe management.
    
    Returns:
    --------
    dict
        Dictionary where menu item names are keys and ingredients (with quantities) are values.
        Structure: {
            'menu_item_name': {
                'ingredient_id': required_quantity,
                ...
            },
            ...
        }
    """
    # Connect to the database using the utility function from db_utils
    print("Connecting to the database...")
    conn = connect_to_db()
    if conn is None:
        print("❌ Failed to connect to the database.")
        return {}  # Return empty dictionary if connection fails
    print("✅ Database connection established")
        
    # Create a database cursor that returns results as dictionaries
    # This makes it easier to access columns by name rather than position
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    # SQL query to get menu items and their ingredients
    # Using ingredientid as both ID and name since the ingredients table 
    # doesn't have a separate name column based on the error message
    query = """
    SELECT 
        mi.menuitemid,                     -- Menu item ID for reference
        m.name as menuitemname,            -- Menu item name to use as dictionary key
        i.ingredientid,                    -- Ingredient ID for reference
        i.ingredientid as ingredientname,  -- Using ID as name since name column doesn't exist
        mi.quantity                        -- Quantity of ingredient needed
    FROM 
        menuitemingredients mi             -- The mapping table linking menu items and ingredients
    JOIN 
        menuitems m ON mi.menuitemid = m.menuitemid   -- Get menu item names
    JOIN 
        ingredients i ON mi.ingredientid = i.ingredientid   -- Get ingredient info
    ORDER BY 
        m.name, i.ingredientid             -- Order results for readability
    """
    
    try:
        # Execute the SQL query to retrieve menu items and ingredients
        print("Executing query to fetch menu items and their ingredients...")
        cursor.execute(query)
        
        print("Query executed successfully. Fetching results...")
        menu_ingredients = cursor.fetchall()  # Get all results as a list of dictionaries
        
        # Output column names for debugging and verification
        if menu_ingredients:
            print(f"Column names in result: {list(menu_ingredients[0].keys())}")
        
        print(f"✅ Successfully retrieved {len(menu_ingredients)} menu item-ingredient relationships")
        
        # Convert the flat query results into a nested dictionary structure
        # This makes it easier to work with the data in the application
        menu_items = {}
        for row in menu_ingredients:
            # If this is the first ingredient for this menu item, create a new inner dictionary
            if row['menuitemname'] not in menu_items:
                menu_items[row['menuitemname']] = {}
            
            # Add this ingredient and its quantity to the menu item's ingredients
            menu_items[row['menuitemname']][row['ingredientname']] = row['quantity']
        
        # Show statistics if we have data - this helps verify the results
        # and provides useful information about the data retrieved in case we need to debug
        if menu_items:
            # Calculate some basic statistics about the retrieved data
            unique_menu_items = len(menu_items)  # Number of different menu items
            unique_ingredients = set()  # Set of unique ingredients used across all menu items
            for ingredients in menu_items.values():
                unique_ingredients.update(ingredients.keys())
            
            # Display statistics about the retrieved data
            print(f"\n Statistics:")
            print(f"  - Unique menu items: {unique_menu_items}")
            print(f"  - Unique ingredients: {len(unique_ingredients)}")
            print(f"  - Average ingredients per menu item: {len(menu_ingredients) / unique_menu_items:.1f}")
            
            # Show a sample of the retrieved data to verify it looks correct
            print("\n Sample of retrieved menu items:")
            for i, (menu_item, ingredients) in enumerate(list(menu_items.items())[:5]):
                print(f"  {i+1}. {menu_item}:")
                for ingredient, quantity in ingredients.items():
                    print(f"     - {ingredient}: {quantity} units")
                
            # If there are more menu items than the sample, indicate how many more
            if len(menu_items) > 5:
                print(f"  ... and {len(menu_items) - 5} more menu items")
        
        # Return the structured dictionary of menu items and their ingredients
        return menu_items
    except Exception as e:
        # Handle any errors that occur during query execution
        print(f"❌ Error fetching menu items and ingredients: {e}")
        return {}  # Return empty dictionary on error
    finally:
        # Always close the cursor and connection to release database resources
        # This executes whether the query succeeds or fails
        cursor.close()
        conn.close()
        print("Database connection closed.")


if __name__ == "__main__":
    # This section only runs when the script is executed directly (not imported)
    # It provides a simple way to test the function independently
    
    # Print a header for the terminal output
    print("=" * 60)
    print("  SMART KITCHEN - MENU ITEM INGREDIENTS RETRIEVAL")
    print("=" * 60)
    
    # Call the function to fetch menu items and ingredients
    menu_items = fetch_menu_items_ingredients()
    
    # Display a final summary of the operation
    print("\n" + "=" * 60)
    if menu_items:
        print(f"✅ Operation complete. Retrieved ingredients for {len(menu_items)} menu items.")
        
        # Print the menu items as a formatted JSON object
        print("\n Menu Items as JSON:")
        print("-" * 60)
        # Use json.dumps with indentation and sorting to make it more readable
        formatted_json = json.dumps(menu_items, indent=2, sort_keys=True)
        print(formatted_json)
    else:
        print("⚠️ No menu items found in the database")
    print("=" * 60)