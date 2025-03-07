import psycopg2
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


def connect_to_db():
    """Connect to the PostgreSQL database server"""
    conn = None
    try:
        # Get connection string from environment variable
        conn_string = os.getenv('DATABASE_URL')

        # Connect to the PostgreSQL server
        print('Connecting to the PostgreSQL database...')
        conn = psycopg2.connect(conn_string)
        return conn
    except (Exception, psycopg2.DatabaseError) as error:
        print(f"Error: {error}")
        if conn is not None:
            conn.close()
        return None

if __name__ == "__main__":
    # Test the connection
    conn = connect_to_db()
    if conn is not None:
        cursor = conn.cursor()
        cursor.execute('SELECT version();')
        db_version = cursor.fetchone()
        print(f"PostgreSQL database version: {db_version[0]}")
        cursor.close()
        conn.close()
        print("Database connection closed.")
    else:
        print("Failed to connect to the database.")