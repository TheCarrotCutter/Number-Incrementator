from flask import Flask, render_template
from supabase import create_client, Client
import os

# Supabase URL and API Key (hardcoded for testing)
SUPABASE_URL = "https://xsdcpsjkyoqlkchmjkse.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzZGNwc2preW9xbGtjaG1qa3NlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5NTkxMDEsImV4cCI6MjA0NzUzNTEwMX0.6YemIMniQSkg_lvCneFhDinF4j6yt2u3mSP7Hh4f9_s"  # Replace this with your actual key

# Initialize the Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

INSERT INTO counters (id, counter) VALUES (1, 0);

# Route to handle the counter page
@app.route('/')
def index():
    # Check if the counter record exists in Supabase
    response = supabase.table('counters').select('counter').eq('id', 1).execute()

    if response.data:
        # Get the existing counter value
        counter = response.data[0]['counter']
        counter += 1  # Increment the counter by 1

        # Update the counter value in Supabase
        supabase.table('counters').update({'counter': counter}).eq('id', 1).execute()
    else:
        # If no counter record exists, initialize it
        counter = 1
        supabase.table('counters').insert({'id': 1, 'counter': counter}).execute()

    # Return the updated counter value in the response
    return f"Counter value: {counter}"
