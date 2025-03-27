import argparse
import datetime
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from statsmodels.tsa.statespace.sarimax import SARIMAX
from sklearn.metrics import mean_squared_error
import warnings
import json
from db_utils import connect_to_db
from fetch_menu_ingredients import fetch_menu_items_ingredients
from fetch_orders import fetch_historical_orders

# Suppress warning messages for cleaner output
warnings.filterwarnings('ignore')


def calculate_ingredient_needs(start_date=None, end_date=None):
    """
    Convert order data into ingredient needs broken down by hour.
    
    This function:
    1. Fetches historical orders from the database
    2. Fetches menu items and their ingredient requirements
    3. Maps the order quantities to ingredient usage
    4. Creates a DataFrame indexed by hourly timestamps with ingredients as columns
    
    Parameters:
    -----------
    start_date : datetime.datetime, optional
        Start date for the query range. If None, defaults to 90 days ago.
    end_date : datetime.datetime, optional
        End date for the query range. If None, defaults to current time.
        
    Returns:
    --------
    pandas.DataFrame
        DataFrame indexed by hourly timestamps with ingredient columns,
        containing total required quantities per hour.
    """
    print("Retrieving order history...")
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
    
    # Get list of all unique ingredients
    all_ingredients = set()
    for ingredients in menu_items.values():
        all_ingredients.update(ingredients.keys())
    print(f"Identified {len(all_ingredients)} unique ingredients.")
    
    # Create timestamp range
    # Find min and max order timestamps
    if orders:
        start_time = min(order['ordertimestamp'] for order in orders).replace(minute=0, second=0, microsecond=0)
        end_time = max(order['ordertimestamp'] for order in orders).replace(minute=0, second=0, microsecond=0) + datetime.timedelta(hours=1)
    else:
        return pd.DataFrame()  # Return empty DataFrame if no orders
    
    # Create DataFrame with hourly timestamps
    print(f"Creating hourly ingredient needs from {start_time} to {end_time}...")
    date_range = pd.date_range(start=start_time, end=end_time, freq='H')
    ingredients_df = pd.DataFrame(index=date_range, columns=list(all_ingredients))
    ingredients_df = ingredients_df.fillna(0.0)  # Fill with float 0.0 instead of integer 0
    # Explicitly set data types to float to avoid type conversion warnings
    ingredients_df = ingredients_df.astype(float)
    
    # Process each order
    processed_orders = 0
    skipped_orders = 0
    
    for order in orders:
        # Get the hour timestamp (rounded down to the nearest hour)
        hour_timestamp = order['ordertimestamp'].replace(minute=0, second=0, microsecond=0)
        menu_item_name = order['menuitemname']
        
        # Skip if this menu item doesn't have ingredient data
        if menu_item_name not in menu_items:
            skipped_orders += 1
            continue
        
        processed_orders += 1
        
        # Process each ingredient for this menu item
        for ingredient, amount in menu_items[menu_item_name].items():
            # Accumulate the ingredient amount needed
            # Assume quantity is always 1 since we don't have that info in orderitems table
            ingredients_df.at[hour_timestamp, ingredient] += amount
    
    print(f"Processed {processed_orders} orders, skipped {skipped_orders} orders.")
    
    # Calculate some statistics for informational purposes
    total_ingredient_usage = ingredients_df.sum().sum()
    busiest_hour = ingredients_df.sum(axis=1).idxmax()
    busiest_hour_usage = ingredients_df.sum(axis=1).max()
    
    print(f"\n📊 Ingredient Usage Statistics:")
    print(f"  - Total ingredient usage: {total_ingredient_usage:.2f} units")
    print(f"  - Busiest hour: {busiest_hour} with {busiest_hour_usage:.2f} units")
    print(f"  - Average hourly usage: {total_ingredient_usage / len(date_range):.2f} units")
    
    # Get the top 5 ingredients by usage
    top_ingredients = ingredients_df.sum().sort_values(ascending=False).head(5)
    print(f"\nTop 5 ingredients by usage:")
    for ingredient, usage in top_ingredients.items():
        print(f"  - Ingredient {ingredient}: {usage:.2f} units")
    
    return ingredients_df


def forecast_future_needs(ingredients_df, future_hours=24*7):  # Default to 1 week forecast
    """
    Generate ingredient forecast for future hours based on historical patterns.
    Uses simple daily and hourly averages instead of complex SARIMA models.
    
    Parameters:
    -----------
    ingredients_df : pandas.DataFrame
        DataFrame with historical ingredient usage data
    future_hours : int, optional
        Number of hours to forecast (default: 1 week)
        
    Returns:
    --------
    pandas.DataFrame
        DataFrame with hourly forecasts for each ingredient
    """
    if ingredients_df.empty:
        print("❌ No historical data available for forecasting.")
        return pd.DataFrame()
    
    # Create date range for future hours
    current_time = datetime.datetime.now().replace(minute=0, second=0, microsecond=0)
    future_dates = pd.date_range(start=current_time, periods=future_hours, freq='H')
    
    # Initialize forecast DataFrame
    forecasts = pd.DataFrame(index=future_dates, columns=ingredients_df.columns)
    forecasts = forecasts.fillna(0.0)
    
    print(f"\n🔮 Forecasting ingredient needs for the next {future_hours} hours...")
    
    # Use simple averages instead of SARIMA models
    for ingredient in ingredients_df.columns:
        # Skip ingredients with no usage
        if ingredients_df[ingredient].sum() == 0:
            print(f"  ⚠️ No historical usage for {ingredient}, skipping forecast")
            continue
            
        # Calculate average by hour of day and day of week
        ingredient_series = ingredients_df[ingredient]
        hour_of_day_avg = ingredient_series.groupby(ingredient_series.index.hour).mean()
        day_of_week_avg = ingredient_series.groupby(ingredient_series.index.dayofweek).mean()
        
        # Make sure we have values for all hours and days
        for hour in range(24):
            if hour not in hour_of_day_avg.index:
                hour_of_day_avg[hour] = 0.0
                
        for day in range(7):
            if day not in day_of_week_avg.index:
                day_of_week_avg[day] = 0.0
        
        # Normalize by overall mean to avoid double-counting the effects
        overall_mean = ingredient_series.mean() if ingredient_series.mean() > 0 else 1.0
        
        # Use these to make predictions
        for future_time in future_dates:
            hour_factor = hour_of_day_avg[future_time.hour] / overall_mean if overall_mean > 0 else 0
            day_factor = day_of_week_avg[future_time.dayofweek] / overall_mean if overall_mean > 0 else 0
            
            # Take average of factors to avoid extremes
            combined_factor = (hour_factor + day_factor) / 2 if (hour_factor + day_factor) > 0 else 0
            
            # Apply the factor to the average
            forecasts.at[future_time, ingredient] = combined_factor * overall_mean
        
        # Force negative values to zero (can't have negative ingredient usage)
        forecasts[ingredient] = forecasts[ingredient].clip(lower=0)
        
        print(f"  ✅ Generated forecast for {ingredient} using historical patterns")
    
    return forecasts
    def analyze_forecast(forecasts):
    """
    Analyze the forecasted ingredient needs to provide useful insights.
    
    Parameters:
    -----------
    forecasts : pandas.DataFrame
        DataFrame with hourly forecasts for each ingredient
    """
    if forecasts.empty:
        print("❌ No forecast data to analyze.")
        return {}
    
    print("\n📊 Forecast Analysis:")
    
    # Total forecasted amounts
    total_by_ingredient = forecasts.sum()
    print("\nTotal forecasted amounts:")
    for ingredient, total in total_by_ingredient.nlargest(10).items():
        print(f"  - {ingredient}: {total:.2f} units")
    
    # Identify peak hours
    hourly_totals = forecasts.sum(axis=1)
    peak_hour = hourly_totals.idxmax()
    peak_usage = hourly_totals.max()
    
    print(f"\nBusiest hour: {peak_hour.strftime('%Y-%m-%d %H:%M')} with {peak_usage:.2f} total units")
    
    # Create a copy of forecasts for analysis
    forecasts_copy = forecasts.copy()
    
    # Analyze by day of week
    forecasts_copy['day_of_week'] = forecasts_copy.index.day_name()
    day_of_week_totals = forecasts_copy.groupby('day_of_week').sum()
    
    # Remove the day_of_week column from the groupby result if it exists
    if 'day_of_week' in day_of_week_totals.columns:
        day_of_week_totals = day_of_week_totals.drop(columns=['day_of_week'])
    
    # Reorder days
    days_order = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    # Only reorder if all days are present
    if all(day in day_of_week_totals.index for day in days_order):
        day_of_week_totals = day_of_week_totals.reindex(days_order)
    
    print("\nIngredient needs by day of week:")
    for day, row in day_of_week_totals.iterrows():
        print(f"  - {day}: {row.sum():.2f} total units")
    
    # Analyze by hour of day
    forecasts_copy['hour'] = forecasts_copy.index.hour
    hour_of_day_totals = forecasts_copy.groupby('hour').sum()
    
    # Remove the non-ingredient columns from the groupby result if they exist
    non_ingredient_cols = ['day_of_week', 'hour']
    cols_to_drop = [col for col in non_ingredient_cols if col in hour_of_day_totals.columns]
    if cols_to_drop:
        hour_of_day_totals = hour_of_day_totals.drop(columns=cols_to_drop)
    
    print("\nBusiest hours of the day:")
    for hour, total in hour_of_day_totals.sum(axis=1).nlargest(5).items():
        print(f"  - {hour:02d}:00: {total:.2f} total units")
    
    return {
        'total_by_ingredient': total_by_ingredient,
        'hourly_totals': hourly_totals,
        'day_of_week_totals': day_of_week_totals,
        'hour_of_day_totals': hour_of_day_totals
    }


def prepare_recommendations(forecasts):
    """
    Generate practical recommendations based on the forecast.
    
    Parameters:
    -----------
    forecasts : pandas.DataFrame
        DataFrame with hourly forecasts for each ingredient
        
    Returns:
    --------
    dict
        Dictionary with various recommendation types
    """
    if forecasts.empty:
        print("❌ No forecast data for recommendations.")
        return {}
    
    recommendations = {}
    
    # Create a copy of forecasts for processing
    forecasts_copy = forecasts.copy()
    
    # Get only the ingredient columns - exclude any analysis columns that might have been added
    ingredient_cols = [col for col in forecasts_copy.columns 
                       if col not in ['day_of_week', 'hour', 'date']]
    
    # Calculate daily needs
    forecasts_copy['date'] = forecasts_copy.index.date
    daily_forecast = forecasts_copy.groupby('date')[ingredient_cols].sum()
    
    # Add 15% safety margin
    daily_with_margin = daily_forecast.copy()
    for col in daily_with_margin.columns:
        daily_with_margin[col] = daily_with_margin[col] * 1.15
    
    recommendations['daily_needs'] = daily_with_margin
    
    # Get tomorrow's needs
    tomorrow = datetime.date.today() + datetime.timedelta(days=1)
    if tomorrow in daily_with_margin.index:
        recommendations['tomorrow_needs'] = daily_with_margin.loc[tomorrow]
    
    # Calculate top ingredients by day
    top_daily_ingredients = {}
    for date, row in daily_forecast.iterrows():
        if not row.empty:
            top_ingredients = row.nlargest(min(5, len(row)))
            top_daily_ingredients[date.strftime('%Y-%m-%d')] = {
                ingredient: round(amount, 2) for ingredient, amount in top_ingredients.items()
            }
    
    recommendations['top_ingredients_by_day'] = top_daily_ingredients
    
    print("\n📋 Preparation Recommendations:")
    
    # Print recommendations for tomorrow
    if 'tomorrow_needs' in recommendations:
        tomorrow_str = tomorrow.strftime('%Y-%m-%d')
        print(f"\nRecommended prep quantities for tomorrow ({tomorrow_str}):")
        for ingredient, amount in recommendations['tomorrow_needs'].nlargest(10).items():
            print(f"  - {ingredient}: {amount:.2f} units (includes 15% safety margin)")
    
    return recommendations


def generate_traffic_recommendations(ingredients_df, forecasts):
    """
    Generate textual recommendations about anticipated restaurant traffic
    based on historical data and forecasts.
    
    Parameters:
    -----------
    ingredients_df : pandas.DataFrame
        DataFrame with historical ingredient usage data
    forecasts : pandas.DataFrame
        DataFrame with forecasted ingredient usage
        
    Returns:
    --------
    dict
        Dictionary of dates with text recommendations for each day
    """
    from datetime import datetime, timedelta, date
    import pandas as pd
    import numpy as np
    
    # Initialize recommendations dictionary
    traffic_recommendations = {}
    
    # Create aggregated historical data by day of week and hour
    historical_hourly = ingredients_df.sum(axis=1)  # Sum across all ingredients
    historical_hourly.index = pd.DatetimeIndex(historical_hourly.index)
    
    # Calculate day of week patterns
    day_of_week_pattern = historical_hourly.groupby(historical_hourly.index.dayofweek).mean()
    day_names = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    day_of_week_pattern.index = day_names
    
    # Calculate hourly patterns
    hour_pattern = historical_hourly.groupby(historical_hourly.index.hour).mean()
    
    # Identify busy days (>20% above average)
    avg_daily = day_of_week_pattern.mean()
    busy_days = [day for day, value in day_of_week_pattern.items() if value > avg_daily * 1.2]
    slow_days = [day for day, value in day_of_week_pattern.items() if value < avg_daily * 0.8]
    
    # Identify busy hours (>30% above average)
    avg_hourly = hour_pattern.mean()
    busy_hours = [hour for hour, value in hour_pattern.items() if value > avg_hourly * 1.3]
    peak_hour = hour_pattern.idxmax()
    
    # Process forecast data by day
    forecasts_copy = forecasts.copy()
    # First create a new column with the date
    forecasts_copy['date'] = forecasts_copy.index.date
    
    # Get only the ingredient columns - exclude any analysis columns
    ingredient_cols = [col for col in forecasts_copy.columns 
                      if col not in ['date', 'day_of_week', 'hour']]
    
    # Calculate total ingredient usage per day (sum only numeric ingredient columns)
    daily_total = forecasts_copy.groupby('date')[ingredient_cols].sum().sum(axis=1)
    
    # Identify unusually busy forecast days (>25% above average of forecasted days)
    avg_forecast = daily_total.mean()
    busy_forecast_days = {}
    
    for date_val, value in daily_total.items():
        # Use the date object to get day of week name
        # Fixed: using the date's weekday method directly
        weekday_num = date_val.weekday()
        day_name = day_names[weekday_num]  # Use our day_names list
        
        expected_value = day_of_week_pattern.get(day_name, avg_daily)
        
        # Check if this day is much busier than typical for this day of week
        if value > expected_value * 1.25:
            busy_forecast_days[date_val] = {
                'traffic_level': 'High',
                'percent_above_normal': f"{((value / expected_value) - 1) * 100:.1f}%",
                'day_of_week': day_name
            }
        elif value < expected_value * 0.75:
            busy_forecast_days[date_val] = {
                'traffic_level': 'Low',
                'percent_below_normal': f"{(1 - (value / expected_value)) * 100:.1f}%",
                'day_of_week': day_name
            }
        else:
            busy_forecast_days[date_val] = {
                'traffic_level': 'Normal',
                'day_of_week': day_name
            }
    
    # Generate text recommendations for each forecast day
    for date_val, info in busy_forecast_days.items():
        day_str = date_val.strftime('%Y-%m-%d')
        day_name = info['day_of_week']
        
        if info['traffic_level'] == 'High':
            recommendation = f"Expect HEAVY traffic on {day_name}, {day_str}. " + \
                            f"Forecasting {info['percent_above_normal']} above normal levels for a {day_name}. " + \
                            "Consider additional staffing and ingredient preparation."
                            
            if day_name in busy_days:
                recommendation += f" Note that {day_name}s are typically busy days already."
                
        elif info['traffic_level'] == 'Low':
            recommendation = f"Expect LIGHT traffic on {day_name}, {day_str}. " + \
                            f"Forecasting {info['percent_below_normal']} below normal levels for a {day_name}. " + \
                            "Consider reducing staffing and ingredient preparation."
                            
            if day_name in slow_days:
                recommendation += f" Note that {day_name}s are typically slower days already."
                
        else:
            recommendation = f"Expect NORMAL traffic on {day_name}, {day_str}. " + \
                            "Typical staffing and ingredient preparation should be sufficient."
        
        # Add hourly guidance - be careful with date filtering and summing
        # Get hourly data for this date
        day_data = forecasts_copy[forecasts_copy['date'] == date_val]
        
        if not day_data.empty:
            # Sum only ingredient columns for each hour
            hourly_sums = day_data[ingredient_cols].sum(axis=1)
            
            if not hourly_sums.empty:
                try:
                    peak_forecast_hour = hourly_sums.idxmax().hour
                    recommendation += f" Peak hours expected around {peak_forecast_hour:02d}:00."
                    
                    # Check if there are multiple busy periods
                    hourly_threshold = hourly_sums.mean() * 1.3
                    busy_periods = []
                    current_period = []
                    
                    # Convert to list of (hour, value) pairs for analysis
                    hourly_list = [(idx.hour, val) for idx, val in hourly_sums.items()]
                    hourly_list.sort()  # Sort by hour
                    
                    for hour, value in hourly_list:
                        if value > hourly_threshold:
                            current_period.append(hour)
                        elif current_period:
                            busy_periods.append(current_period)
                            current_period = []
                    
                    if current_period:
                        busy_periods.append(current_period)
                        
                    if len(busy_periods) > 1:
                        period_texts = []
                        for period in busy_periods:
                            if len(period) > 1:
                                period_texts.append(f"{period[0]:02d}:00-{period[-1]+1:02d}:00")
                            else:
                                period_texts.append(f"{period[0]:02d}:00")
                                
                        recommendation += f" Multiple busy periods expected: {', '.join(period_texts)}."
                except Exception as e:
                    # If anything goes wrong with the hourly analysis, just skip this part
                    print(f"Warning: Could not analyze hourly patterns for {day_str}: {e}")
        
        traffic_recommendations[date_val] = recommendation
        
    return traffic_recommendations
    def store_predictions_in_db(conn, forecasts, recommendations):
    """
    Store only the prep recommendations in the database forecasts table,
    with each recommendation properly mapped to its target future date.
    
    Parameters:
    -----------
    conn : psycopg2.extensions.connection
        Database connection object
    forecasts : pandas.DataFrame
        DataFrame with hourly forecasts for each ingredient
    recommendations : dict
        Dictionary with various recommendation types including daily needs
        
    Returns:
    --------
    list
        List of forecast IDs that were created
    """
    import json
    import psycopg2
    from datetime import datetime, timedelta
    
    if forecasts.empty:
        print("❌ No forecast data to store in database.")
        return []
        
    cursor = conn.cursor()
    forecast_ids = []
    current_time = datetime.now()
    current_date = current_time.date()
    
    try:
        # Only store recommendations for future dates
        if 'daily_needs' in recommendations and not recommendations['daily_needs'].empty:
            daily_df = recommendations['daily_needs']
            
            # Process each forecasted day separately, but only future dates
            for date_idx in daily_df.index:
                # Skip past dates
                if date_idx <= current_date:
                    continue
                    
                # Create a dict of ingredient quantities for this day
                daily_prep = {}
                for col in daily_df.columns:
                    if not pd.isna(daily_df.loc[date_idx, col]) and daily_df.loc[date_idx, col] > 0:
                        daily_prep[str(col)] = float(daily_df.loc[date_idx, col])
                
                # Skip if there are no significant quantities
                if not daily_prep:
                    continue
                
                # Use the date as the recommendationfor field
                target_date = date_idx
                
                # Store in database - just the ingredient quantities for clarity
                query = """
                INSERT INTO forecasts (recommendation, recommendationfor, createdat) 
                VALUES (%s, %s, %s)
                RETURNING forecastid
                """
                
                cursor.execute(query, (json.dumps(daily_prep), target_date, current_time))
                forecast_id = cursor.fetchone()[0]
                forecast_ids.append(forecast_id)
                print(f"✅ Stored prep recommendation for {target_date.strftime('%Y-%m-%d')} with ID: {forecast_id}")
        
        # Commit the transaction
        conn.commit()
        print(f"✅ Successfully stored recommendations for future dates in database")
        return forecast_ids
        
    except Exception as e:
        conn.rollback()
        print(f"❌ Error storing forecast in database: {e}")
        return []
        
    finally:
        cursor.close()


def store_traffic_recommendations(conn, traffic_recommendations):
    """
    Store traffic recommendations in the database.
    
    Parameters:
    -----------
    conn : psycopg2.extensions.connection
        Database connection object
    traffic_recommendations : dict
        Dictionary of dates with text recommendations
        
    Returns:
    --------
    list
        List of forecast IDs that were created
    """
    import json
    from datetime import datetime
    
    if not traffic_recommendations:
        print("❌ No traffic recommendations to store.")
        return []
        
    cursor = conn.cursor()
    forecast_ids = []
    current_time = datetime.now()
    
    try:
        for date, recommendation in traffic_recommendations.items():
            query = """
            INSERT INTO forecasts (recommendation, recommendationfor, createdat) 
            VALUES (%s, %s, %s)
            RETURNING forecastid
            """
            
            # Package the recommendation in a JSON object for clarity
            recommendation_data = json.dumps({
                "type": "traffic_forecast",
                "text_recommendation": recommendation
            })
            
            cursor.execute(query, (recommendation_data, date, current_time))
            forecast_id = cursor.fetchone()[0]
            forecast_ids.append(forecast_id)
            print(f"✅ Stored traffic recommendation for {date.strftime('%Y-%m-%d')} with ID: {forecast_id}")
        
        conn.commit()
        return forecast_ids
        
    except Exception as e:
        conn.rollback()
        print(f"❌ Error storing traffic recommendations: {e}")
        return []
        
    finally:
        cursor.close()


def clear_forecast_database(conn):
    """
    Clear all records from the forecasts table.
    
    Parameters:
    -----------
    conn : psycopg2.extensions.connection
        Database connection object
        
    Returns:
    --------
    bool
        True if operation was successful, False otherwise
    """
    cursor = conn.cursor()
    
    try:
        cursor.execute("DELETE FROM forecasts")
        deleted_count = cursor.rowcount
        conn.commit()
        print(f"✅ Successfully cleared {deleted_count} records from forecasts table")
        return True
    except Exception as e:
        conn.rollback()
        print(f"❌ Error clearing forecasts table: {e}")
        return False
    finally:
        cursor.close()


if __name__ == "__main__":
    # This section only runs when the script is executed directly
    
    # Print a header for the terminal output
    print("=" * 60)
    print("🍽️  SMART KITCHEN - INGREDIENT PREDICTION SYSTEM")
    print("=" * 60)
    
    # Parse command-line arguments
    import sys
    import argparse
    
    parser = argparse.ArgumentParser(description='Predict future ingredient needs using SARIMA models')
    parser.add_argument('--days', type=int, default=90, help='Number of historical days to analyze (default: 90)')
    parser.add_argument('--forecast', type=int, default=7, help='Number of days to forecast (default: 7)')
    parser.add_argument('--start', type=str, help='Start date in YYYY-MM-DD format')
    parser.add_argument('--end', type=str, help='End date in YYYY-MM-DD format')
    parser.add_argument('--save', action='store_true', help='Save forecasts to CSV file')
    parser.add_argument('--clear-db', action='store_true', help='Clear existing forecast records before adding new ones')
    parser.add_argument('--auto-confirm', action='store_true', help='Skip confirmation prompts')
    
    args = parser.parse_args()
    
    # Set up date range based on arguments
    if args.start and args.end:
        try:
            start_date = datetime.datetime.strptime(args.start, '%Y-%m-%d')
            end_date = datetime.datetime.strptime(args.end, '%Y-%m-%d') + datetime.timedelta(days=1)
            print(f"📅 Using custom date range: {args.start} to {args.end}")
        except ValueError:
            print("❌ Invalid date format! Please use YYYY-MM-DD")
            sys.exit(1)
    else:
        end_date = datetime.datetime.now()
        start_date = end_date - datetime.timedelta(days=args.days)
        print(f"📅 Analyzing {args.days} days of historical data")
    
    # Check database connection first
    print("Testing database connection...")
    conn = connect_to_db()
    if conn is None:
        print("❌ Could not connect to database. Please check your configuration in db_utils.py")
        sys.exit(1)
    print("✅ Database connection successful")
    
    # Prompt to clear database if not specified in arguments and not auto-confirmed
    if not args.clear_db and not args.auto_confirm:
        user_input = input("Would you like to clear existing forecast records? (y/n): ")
        if user_input.lower() in ['y', 'yes']:
            args.clear_db = True
    
    # Clear database if requested
    if args.clear_db:
        if not clear_forecast_database(conn):
            print("⚠️ Warning: Failed to clear forecast database. Continuing with execution...")
    
    # Step 1: Calculate historical ingredient needs
    print("\n" + "-" * 60)
    print("STEP 1: Calculating historical ingredient needs")
    print("-" * 60)
    ingredients_df = calculate_ingredient_needs(start_date, end_date)
    
    if ingredients_df.empty:
        print("❌ No historical ingredient data available. Exiting.")
        sys.exit(1)
    
    # Add diagnostic information
    print("\n🔍 Historical Data Diagnostics:")
    print(f"  - Non-zero values in historical data: {(ingredients_df > 0).sum().sum()}")
    print(f"  - Total ingredient usage sum: {ingredients_df.sum().sum():.2f}")
    print(f"  - Unique timestamps with data: {len(ingredients_df)}")
    print(f"  - Ingredients with non-zero usage: {(ingredients_df.sum() > 0).sum()}")
    
    # Step 2: Skip complex SARIMA models and use simpler averaging approach
    print("\n" + "-" * 60)
    print(f"STEP 2: Forecasting needs for the next {args.forecast} days")
    print("-" * 60)
    forecast_hours = args.forecast * 24  # Convert days to hours
    
    # Use simpler forecasting method
    forecasts = forecast_future_needs(ingredients_df, forecast_hours)
    
   if forecasts.empty:
        print("❌ Failed to generate forecasts. Exiting.")
        sys.exit(1)
    
    # Step 3: Analyze forecasts and generate recommendations
    print("\n" + "-" * 60)
    print("STEP 3: Analyzing forecasts and generating recommendations")
    print("-" * 60)
    analysis = analyze_forecast(forecasts)
    recommendations = prepare_recommendations(forecasts)
    
    # Step 4: Generate traffic recommendations
    print("\n" + "-" * 60)
    print("STEP 4: Generating traffic recommendations")
    print("-" * 60)
    traffic_recommendations = generate_traffic_recommendations(ingredients_df, forecasts)
    
    # Display sample of traffic recommendations
    if traffic_recommendations:
        print("\n📋 Sample of traffic recommendations:")
        for i, (date, recommendation) in enumerate(list(traffic_recommendations.items())[:3]):
            print(f"\n{date.strftime('%Y-%m-%d')} ({date.strftime('%A')}):")
            print(f"  {recommendation}")
        
        if len(traffic_recommendations) > 3:
            print(f"\n  ... and {len(traffic_recommendations) - 3} more days")
    
    # Step 5: Store recommendations in database
    print("\n" + "-" * 60)
    print("STEP 5: Storing recommendations in database")
    print("-" * 60)
    success_prep = store_predictions_in_db(conn, forecasts, recommendations)
    success_traffic = store_traffic_recommendations(conn, traffic_recommendations)
    
    # Close the database connection
    conn.close()
    
    # Save forecasts to CSV if requested
    if args.save:
        forecast_file = f"ingredient_forecast_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
        forecasts.to_csv(forecast_file)
        print(f"\n✅ Saved forecasts to {forecast_file}")
        
        # Also save the daily recommendations
        if 'daily_needs' in recommendations:
            daily_file = f"daily_ingredient_needs_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
            recommendations['daily_needs'].to_csv(daily_file)
            print(f"✅ Saved daily recommendations to {daily_file}")
            
        # Save traffic recommendations
        if traffic_recommendations:
            traffic_file = f"traffic_recommendations_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"
            with open(traffic_file, 'w') as f:
                for date, recommendation in traffic_recommendations.items():
                    f.write(f"{date.strftime('%Y-%m-%d')} ({date.strftime('%A')}):\n")
                    f.write(f"{recommendation}\n\n")
            print(f"✅ Saved traffic recommendations to {traffic_file}")
    
    # Final summary
    print("\n" + "=" * 60)
    print(f"✅ Prediction complete. Generated forecasts for {len(forecasts.columns)} ingredients.")
    print(f"🔮 Forecast period: {forecasts.index.min().strftime('%Y-%m-%d %H:%M')} to {forecasts.index.max().strftime('%Y-%m-%d %H:%M')}")
    if success_prep:
        print("✅ Future prep recommendations successfully stored in database.")
    if success_traffic:
        print("✅ Traffic recommendations successfully stored in database.")
    print("=" * 60)