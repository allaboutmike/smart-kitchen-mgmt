# Cron Job Setup Instructions

These Python scripts will delete and re-seed the database tables with random order data and generate predictions.

## 1. Database Connection
The scripts connect to: 

## 2. Script Locations
- generate_and_populate_orders.py: /smart-kitchen-mgmt/python_services/generate_and_populate_orders.py
- generate_and_populate_orderItems.py: /smart-kitchen-mgmt/python_services/generate_and_populate_orderItems.py
- populate_waste.py: /smart-kitchen-mgmt/python_services/populate_waste.py
- prediction_create.py: /smart-kitchen-mgmt/python_services/prediction_create.py

## 3. Required Python Dependencies
- psycopg2-binary
- pandas
- numpy
- matplotlib
- statsmodels
- sklearn

## 4. Cron Schedule
- Data generation scripts: 0 18 * * * (runs at 6:00 PM daily)
- Prediction script: 0 23 * * * (runs at 11:00 PM daily)

## 5. Commands to Run

For generate_and_populate_orders.py:
```
python /smart-kitchen-mgmt/python_services/generate_and_populate_orders.py --auto-confirm --clear-data
```

For generate_and_populate_orderItems.py:
```
python /smart-kitchen-mgmt/python_services/generate_and_populate_orderItems.py --auto-confirm --clear-data
```

For generate_waste.py:
```
python /smart-kitchen-mgmt/python_services/populate_waste.py --auto-confirm --verbose
```

For prediction_create.py:
```
python /smart-kitchen-mgmt/python_services/prediction_create.py --auto-confirm --clear-db --days 90 --forecast 7
```

## 6. Logging
Consider redirecting output to log files:
```
python /smart-kitchen-mgmt/python_services/ --auto-confirm --clear-data >> /smart-kitchen-mgmt/python_services/ 2>&1
```

## 7. Complete Crontab Entries

```
# Run database population scripts at 6:00 PM daily
0 18 * * * cd python_services && python generate_and_populate_orders.py --auto-confirm --clear-data && python generate_and_populate_orderItems.py --auto-confirm --clear-data && python populate_waste.py --auto-confirm --verbose >> python_services 2>&1

# Run prediction script at 11:00 PM daily
0 23 * * * cd python_services && python prediction_create.pyy --auto-confirm --clear-db --days 90 --forecast 7 >> /python_services 2>&1
```

## 8. Installation

1. Edit the crontab file using:
   ```
   crontab -e
   ```

2. Copy and paste the crontab entries above, adjusting paths as needed

3. Save and exit the editor

## 9. Verification

To verify your crontab is set up correctly:
```
crontab -l
```

To check if the scripts are running as expected, inspect the log files after the scheduled times:
```
cat /python_services
```

## 10. Troubleshooting

If scripts are not running:
- Ensure all scripts have execute permissions: `chmod +x /path/to/scripts/*.py`
- Verify Python path: Use the full path to your Python interpreter if needed
- Check system logs: `grep CRON /var/log/syslog`

If scripts are running but failing:
- Check log files for error messages
- Run scripts manually to debug: `python python_services/script.py --auto-confirm`
- Verify database connection details are correct

## 11. Notes

- The data generation scripts will run sequentially, with each script only running if the previous one completes successfully.
- The first script will generate orders based on the last 90 days from the current date.
- The prediction script will analyze the last 90 days of data and generate forecasts for the next 7 days.
- All scripts will run in automated mode without requiring user input.