from flask import Flask, render_template
from supabase import create_client, Client
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Corrected: Get the Supabase URL and API key from environment variables
SUPABASE_URL = "https://xsdcpsjkyoqlkchmjkse.supabase.co"  # URL is now a valid string literal
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzZGNwc2preW9xbGtjaG1qa3NlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5NTkxMDEsImV4cCI6MjA0NzUzNTEwMX0.6YemIMniQSkg_lvCneFhDinF4j6yt2u3mSP7Hh4f9_s"  # Key is now a valid string literal

# Initialize the Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

app = Flask(__name__)

# Example route for testing server-side storage
@app.route('/')
def index():
    try:
        # Check if counter exists in Supabase, otherwise initialize it
        response = supabase.table('counters').select('counter').eq('id', 1).execute()

        # Debugging: Check if the response is as expected
        print("Response Data:", response.data)

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
        print("Error:", str(e))  # This will print the error to your console for debugging
        return "An error occurred while processing your request.", 500
