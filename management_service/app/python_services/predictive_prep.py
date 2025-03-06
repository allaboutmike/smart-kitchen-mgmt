import psycopg2
import os

def connect_to_db():
    """Connect to the postgres database"""
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