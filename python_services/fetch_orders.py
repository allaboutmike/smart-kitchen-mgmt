import datetime
import psycopg2
from psycopg2.extras import RealDictCursor
from db_utils import connect_to_db


def fetch_historical_orders(start_date=None, end_date=None):
    """
    Fetch historical orders from the database within a specific time range.
    
    Parameters:
    -----------
    start_date : datetime.datetime, optional
        Start date for the query range. If None, defaults to 90 days ago.
    end_date : datetime.datetime, optional
        End date for the query range. If None, defaults to current time.
        
    Returns:
    --------
    list
        List of order dictionaries containing orderID, orderTimestamp, menuItemID, 
        quantity, and menuItemName, ordered chronologically by orderTimestamp.
    """
    # Connect to the database
    print("Connecting to the database...")
    conn = connect_to_db()
    if conn is None:
        print("Failed to connect to the database.")
        return []
    print("Database connection established")
        
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    # Calculate the date range if not provided
    if end_date is None:
        end_date = datetime.datetime.now()
    if start_date is None:
        start_date = end_date - datetime.timedelta(days=90)
    
    # SQL query to get order data with menu items
    query = """
    SELECT 
        o.orderid, 
        o.ordertimestamp, 
        oi.orderitemid,
        oi.menuitemid, 
        oi.served,
        oi.servedtimestamp,
        oi.customizationdetail,
        oi.returned,
        mi.name as menuitemname,
        mi.price as menuitemprice
    FROM 
        orders o
    JOIN 
        orderitems oi ON o.orderid = oi.orderid
    JOIN 
        menuitems mi ON oi.menuitemid = mi.menuitemid
    WHERE 
        o.ordertimestamp >= %s AND o.ordertimestamp <= %s
    ORDER BY 
        o.ordertimestamp ASC
    """
    
    try:
        print(f"Executing query for orders between {start_date.strftime('%Y-%m-%d %H:%M:%S')} and {end_date.strftime('%Y-%m-%d %H:%M:%S')}...")
        cursor.execute(query, (start_date, end_date))
        
        print("Query executed successfully. Fetching results...")
        orders = cursor.fetchall()
        
        # Add debug statement to print column names
        if orders:
            print(f"Column names in result: {list(orders[0].keys())}")
        
        print(f"✅ Successfully retrieved {len(orders)} order items")
        
        # Show order statistics if we have orders
        if orders:
            # Get some statistics
            # Count unique orders
            unique_order_ids = set(order['orderid'] for order in orders)
            # Count unique menu items
            unique_menu_items = set(order['menuitemname'] for order in orders)
            
            print(f" Statistics:")
            print(f"  - Unique orders: {len(unique_order_ids)}")
            print(f"  - Unique menu items: {len(unique_menu_items)}")
            print(f"  - Served items: {sum(1 for order in orders if order['served'])}")
            print(f"  - Returned items: {sum(1 for order in orders if order['returned'])}")
            print(f"  - Items with customizations: {sum(1 for order in orders if order['customizationdetail'])}")
            print(f"  - Date range: {start_date.strftime('%Y-%m-%d')} to {end_date.strftime('%Y-%m-%d')}")
            
            # Show sample of first few orders
            print("\n📋 Sample of retrieved orders:")
            for i, order in enumerate(orders[:5]):  # Show first 5 orders
                order_time = order['ordertimestamp'].strftime('%Y-%m-%d %H:%M:%S')
                customization = order['customizationdetail'] if order['customizationdetail'] else "No customization"
                served_status = "✓ Served" if order['served'] else "✗ Not served"
                returned_status = "⚠️ Returned" if order['returned'] else ""
                
                print(f"  {i+1}. Order #{order['orderid']} at {order_time}: " 
                      f"Item: {order['menuitemname']} (ID: {order['orderitemid']}) - "
                      f"{served_status} {returned_status}")
                print(f"     Customization: {customization}")
                
            if len(orders) > 5:
                print(f"  ... and {len(orders) - 5} more items")
        
        return orders
    except Exception as e:
        print(f" Error fetching historical orders: {e}")
        return []
    finally:
        cursor.close()
        conn.close()
        print("Database connection closed.")


if __name__ == "__main__":
    # Example usage
    print("=" * 60)
    print("  SMART KITCHEN - ORDER HISTORY RETRIEVAL")
    print("=" * 60)
    
    # Parse command-line arguments if provided
    import sys
    import argparse
    
    parser = argparse.ArgumentParser(description='Fetch order history from the database')
    parser.add_argument('--days', type=int, default=90, help='Number of days to look back (default: 90)')
    parser.add_argument('--start', type=str, help='Start date in YYYY-MM-DD format')
    parser.add_argument('--end', type=str, help='End date in YYYY-MM-DD format')
    
    args = parser.parse_args()
    
    # Set up date range based on arguments
    if args.start and args.end:
        try:
            start_date = datetime.datetime.strptime(args.start, '%Y-%m-%d')
            end_date = datetime.datetime.strptime(args.end, '%Y-%m-%d') + datetime.timedelta(days=1)  # Include the end date
            print(f" Using custom date range: {args.start} to {args.end}")
        except ValueError:
            print(" Invalid date format! Please use YYYY-MM-DD")
            sys.exit(1)
    else:
        end_date = datetime.datetime.now()
        start_date = end_date - datetime.timedelta(days=args.days)
        print(f" Looking back {args.days} days from today")
    
    print("\n" + "-" * 60)
    print(f"Fetching orders from {start_date.strftime('%Y-%m-%d')} to {end_date.strftime('%Y-%m-%d')}")
    print("-" * 60 + "\n")
    
    # Fetch the orders
    orders = fetch_historical_orders(start_date, end_date)
    
    # Final summary
    print("\n" + "=" * 60)
    if orders:
        print(f"✅ Operation complete. Retrieved {len(orders)} order items.")
    else:
        print("⚠️ No orders found in the specified date range")
    print("=" * 60)