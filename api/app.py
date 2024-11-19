import os
import requests
from flask import Flask, render_template, jsonify, request

# Initialize Flask app
app = Flask(__name__, static_folder='api/static', template_folder='api/templates')

# Supabase Configuration (make sure to add your own Supabase URL and Key)
SUPABASE_URL = os.getenv("SUPABASE_URL", "https://your-supabase-url.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "your-anon-key")

# Supabase API endpoint for the game data table
GAME_DATA_TABLE = 'game_data'

# Headers for Supabase request
HEADERS = {
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json"
}

# Serve the main page
@app.route('/')
def index():
    return render_template('index.html')

# API to get game state
@app.route('/api/get_game_state', methods=['GET'])
def get_game_state():
    user_id = 'some_user_id'  # This should be dynamically determined (e.g., from session or authentication)
    
    # Build the request URL for the Supabase API
    url = f"{SUPABASE_URL}/rest/v1/{GAME_DATA_TABLE}?user_id=eq.{user_id}"
    
    # Make a GET request to Supabase
    response = requests.get(url, headers=HEADERS)
    
    if response.status_code == 200:
        game_state = response.json()
        if game_state:
            return jsonify({'success': True, 'gameState': game_state[0]})
        else:
            return jsonify({'success': False, 'message': 'No game state found for this user'})
    else:
        return jsonify({'success': False, 'message': 'Failed to fetch game state'})

# API to update game state
@app.route('/api/update_game_state', methods=['POST'])
def update_game_state():
    data = request.get_json()
    user_id = 'some_user_id'  # This should be dynamically determined (e.g., from session or authentication)

    # Prepare the data to update in Supabase
    game_state_data = {
        "user_id": user_id,
        "number": data["number"],
        "increment_amount": data["increment_ammount"],
        "total": data["total"],
        "price": data["price"]
    }

    # Build the request URL for the Supabase API
    url = f"{SUPABASE_URL}/rest/v1/{GAME_DATA_TABLE}"
    
    # Make a PATCH request to update the game state
    response = requests.patch(url, json=[game_state_data], headers=HEADERS)

    if response.status_code == 200:
        return jsonify({'success': True})
    else:
        return jsonify({'success': False, 'message': 'Failed to update game state'})
