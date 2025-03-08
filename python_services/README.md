# Python Services 
## Setup

### Prerequisites

- Python 3.8 or higher
- PostgreSQL database (connected via Railway)
- A `.env` file with database credentials

### Environment Setup

1. Create a virtual environment:
   python -m venv venv
2. Activate the virtual environment:
   3. On Windows (Powershell):  .\venv\Scripts\Activate.ps1
   4. On Mac/Linux: source venv/bin/activate
5. Install dependencies
   6. pip install -r requirements.txt
7. Create .env file in the root of this directory and use the database string 
   8. DATABASE_URL='string'
9. db_utils.py provides a utility function to connect to the Postgres database
   10. to test the connection: python db_utils.py
       11. output should look like the Postgres version and that the connection was established and closed properly
12. If adding dependencies, update the requirements.txt file 
