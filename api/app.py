from flask import Flask, render_template
from supabase import create_client, Client
import os

# Get the Supabase URL and API key from environment variables
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

print(SUPABASE_URL)
print(SUPABASE_KEY)

# Initialize the Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

app = Flask(__name__)

# Example route for testing server-side storage
@app.route('/')
def index():
    # Check if counter exists in Supabase, otherwise initialize it
    response = supabase.table('counters').select('counter').eq('id', 1).execute()
    
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
