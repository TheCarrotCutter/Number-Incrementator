from flask import Flask, render_template
from supabase import create_client, Client
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get the Supabase URL and API key from environment variables
SUPABASE_URL = https://xsdcpsjkyoqlkchmjkse.supabase.co
SUPABASE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzZGNwc2preW9xbGtjaG1qa3NlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5NTkxMDEsImV4cCI6MjA0NzUzNTEwMX0.6YemIMniQSkg_lvCneFhDinF4j6yt2u3mSP7Hh4f9_s

# Debugging: log the environment variables to confirm they're loaded

print("All Environment Variables:", os.environ)  # Print all env variables to check

print("SUPABASE_URL:", SUPABASE_URL)
print("SUPABASE_KEY:", SUPABASE_KEY)

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
