from flask import Flask
from supabase import create_client, Client

app = Flask(__name__)

# Supabase URL and API Key
SUPABASE_URL = "https://xsdcpsjkyoqlkchmjkse.supabase.co"
SUPABASE_KEY = "your-api-key-here"

# Initialize the Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

@app.route('/')
def index():
    return "Hello, world!"
