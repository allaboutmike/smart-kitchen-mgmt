import datetime
import pandas as pd
from fetch_orders import fetch_historical_orders
from fetch_menu_ingredients import fetch_menu_items_ingredients


def calculate_ingredient_needs(start_date=None, end_date=None):
    """
    Convert order data into ingredient needs broken down by hour.
    Returns:
    --------
    pandas.DataFrame
        DataFrame indexed by hourly timestamps with ingredient columns,
        containing total required quantities per hour.
    """
    print("Retrieving order history...")
    # date needs to be in the following format: YYYY-MM-DD
    orders = fetch_historical_orders(start_date, end_date)
    
    if not orders:
        print("❌ No orders found. Cannot calculate ingredient needs.")
        return pd.DataFrame()
    
    print(f"Retrieved {len(orders)} order items.")
    
    print("Retrieving menu item ingredients...")
    menu_items = fetch_menu_items_ingredients()
    
    if not menu_items:
        print("❌ No menu item ingredients found. Cannot calculate ingredient needs.")
        return pd.DataFrame()
    
    print(f"Retrieved ingredients for {len(menu_items)} menu items.")
    
    all_ingredients = set()
    for ingredients in menu_items.values():
        all_ingredients.update(ingredients.keys())
    print(f"Identified {len(all_ingredients)} unique ingredients.")
    
    if orders:
        start_time = min(order['ordertimestamp'] for order in orders).replace(minute=0, second=0, microsecond=0)
        end_time = max(order['ordertimestamp'] for order in orders).replace(minute=0, second=0, microsecond=0) + datetime.timedelta(hours=1)
    else:
        return pd.DataFrame() 
    
    # Create DataFrame with hourly timestamps
    print(f"Creating hourly ingredient needs from {start_time} to {end_time}...")
    date_range = pd.date_range(start=start_time, end=end_time, freq='h')
    ingredients_df = pd.DataFrame(index=date_range, columns=list(all_ingredients))
    ingredients_df = ingredients_df.astype(float).fillna(0.0) 
    
    # Process each order
    processed_orders = 0
    skipped_orders = 0
    
    for order in orders:
        hour_timestamp = order['ordertimestamp'].replace(minute=0, second=0, microsecond=0)
        menu_item_name = order['menuitemname']
        
        if menu_item_name not in menu_items:
            skipped_orders += 1
            continue
        
        processed_orders += 1
        
        # Process each ingredient for this menu item
        for ingredient, amount in menu_items[menu_item_name].items():
            ingredients_df.at[hour_timestamp, ingredient] += amount
    # for informational purposes
    print(f"Processed {processed_orders} orders, skipped {skipped_orders} orders.")
    
    total_ingredient_usage = ingredients_df.sum().sum()
    busiest_hour = ingredients_df.sum(axis=1).idxmax()
    busiest_hour_usage = ingredients_df.sum(axis=1).max()
    
    print(f"\n Ingredient Usage Statistics:")
    print(f"  - Total ingredient usage: {total_ingredient_usage:.2f} units")
    print(f"  - Busiest hour: {busiest_hour} with {busiest_hour_usage:.2f} units")
    print(f"  - Average hourly usage: {total_ingredient_usage / len(date_range):.2f} units")
    
    # Get the top 5 ingredients by usage
    top_ingredients = ingredients_df.sum().sort_values(ascending=False).head(5)
    print(f"\nTop 5 ingredients by usage:")
    for ingredient, usage in top_ingredients.items():
        print(f"  - Ingredient {ingredient}: {usage:.2f} units")
    
    return ingredients_df


if __name__ == "__main__":
    # Header
    print("=" * 60)
    print("SMART KITCHEN - HOURLY INGREDIENT NEEDS CALCULATION")
    print("=" * 60)
    
    import sys
    import argparse
    
    parser = argparse.ArgumentParser(description='Calculate hourly ingredient needs from order history')
    parser.add_argument('--days', type=int, default=30, help='Number of days to look back (default: 30)')
    parser.add_argument('--start', type=str, help='Start date in YYYY-MM-DD format')
    parser.add_argument('--end', type=str, help='End date in YYYY-MM-DD format')
    parser.add_argument('--save', action='store_true', help='Save results to CSV file')
    
    args = parser.parse_args()
    
    # Set up date range based on arguments
    if args.start and args.end:
        try:
            start_date = datetime.datetime.strptime(args.start, '%Y-%m-%d')
            end_date = datetime.datetime.strptime(args.end, '%Y-%m-%d') + datetime.timedelta(days=1)  # Include the end date
            print(f" Using custom date range: {args.start} to {args.end}")
        except ValueError:
            print("❌ Invalid date format! Please use YYYY-MM-DD")
            sys.exit(1)
    else:
        end_date = datetime.datetime.now()
        start_date = end_date - datetime.timedelta(days=args.days)
        print(f" Looking back {args.days} days from today")
    
    print("\n" + "-" * 60)
    print(f"Calculating hourly ingredient needs from {start_date.strftime('%Y-%m-%d')} to {end_date.strftime('%Y-%m-%d')}")
    print("-" * 60 + "\n")
    
    # Calculate the hourly ingredient needs
    ingredients_df = calculate_ingredient_needs(start_date, end_date)
    
    if not ingredients_df.empty:
        # Print the first few rows
        print("\n Sample of hourly ingredient needs:")
        print(ingredients_df.head(5))
        
        # Save to CSV if requested
        if args.save:
            filename = f"ingredient_needs_{start_date.strftime('%Y%m%d')}_to_{end_date.strftime('%Y%m%d')}.csv"
            ingredients_df.to_csv(filename)
            print(f"\n✅ Saved hourly ingredient needs to {filename}")
    
    # Final summary
    print("\n" + "=" * 60)
    if not ingredients_df.empty:
        print(f"✅ Operation complete. Calculated ingredient needs for {len(ingredients_df)} hours.")
    else:
        print("⚠️ No ingredient needs could be calculated")
    print("=" * 60)