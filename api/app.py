from flask import Flask, render_template
from supabase import create_client, Client
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Corrected: Get the Supabase URL and API key from environment variables
SUPABASE_URL = os.getenv("SUPABASE_URL")  # Now fetching from environment variable
SUPABASE_KEY = os.getenv("SUPABASE_KEY")  # Now fetching from environment variable

# Debugging: log the environment variables to confirm they're loaded
print("SUPABASE_URL:", SUPABASE_URL)
print("SUPABASE_KEY:", SUPABASE_KEY)

# Initialize the Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

app = Flask(__name__)

# Example route for testing server-side storage
@app.route('/')
def index():
    try:
        # Debugging: Log the query being executed
        print(f"Executing query: SELECT counter FROM counters WHERE id = 1")

        # Check if counter exists in Supabase, otherwise initialize it
        response = supabase.table('counters').select('counter').filter('id', 'eq', 1).execute()

        if response.error:
            print(f"Error from Supabase: {response.error}")  # Log Supabase error
            raise Exception("Failed to query Supabase")

        if response.data:
            # Get the existing counter value
            counter = response.data[0]['counter']
            counter += 1  # Increment counter
            # Update the counter value in Supabase
            supabase.table('counters').update({'counter': counter}).eq('id', 1).execute()
        else:
            # If no counter exists, create one
            counter = 1
            supabase.table('counters').insert({'id': 1, 'counter': counter}).execute()

        return render_template('index.html', counter=counter)

    except Exception as e:
        print(f"Error during processing: {e}")
        return "An error occurred, please check the server logs.", 500
