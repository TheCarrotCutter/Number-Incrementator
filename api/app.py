import os
import logging
from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy

# Initialize Flask app
app = Flask(__name__)

# Configure PostgreSQL URI, pulling DATABASE_URL from environment variable
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///game_data.db')  # Use SQLite locally
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Define Player model
class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    number = db.Column(db.Integer, default=0)
    total = db.Column(db.Float, default=0.0)
    increment_amount = db.Column(db.Integer, default=1)  # Default increment amount

    def __repr__(self):
        return f'<Player {self.username}>'

# Create tables if they don't exist (for development only, not recommended for production)
with app.app_context():
    try:
        db.create_all()  # This ensures tables are created for new apps
    except Exception as e:
        app.logger.error(f"Error creating tables: {e}")
        raise e

# Route to serve the game page
@app.route('/')
def index():
    return render_template('index.html')

# Route to save player progress
@app.route('/save_progress', methods=['POST'])
def save_progress():
    try:
        player_data = request.json
        username = player_data.get('username')
        number = player_data.get('number')
        total = player_data.get('total')
        increment_amount = player_data.get('increment_amount')

        player = Player.query.filter_by(username=username).first()
        if player:
            # Update existing player data
            player.number = number
            player.total = total
            player.increment_amount = increment_amount
        else:
            # Create a new player if not found
            player = Player(username=username, number=number, total=total, increment_amount=increment_amount)
            db.session.add(player)

        db.session.commit()
        return jsonify({"status": "success", "message": "Progress saved"}), 200
    except Exception as e:
        app.logger.error(f"Error saving player progress: {e}")
        return jsonify({"status": "error", "message": f"Error saving progress: {e}"}), 500

# Route to load player progress
@app.route('/load_progress/<username>', methods=['GET'])
def load_progress(username):
    try:
        player = Player.query.filter_by(username=username).first()
        if player:
            return jsonify({
                'username': player.username,
                'number': player.number,
                'total': player.total,
                'increment_amount': player.increment_amount,
            })
        return jsonify({"status": "error", "message": "Player not found"}), 404
    except Exception as e:
        app.logger.error(f"Error loading player progress: {e}")
        return jsonify({"status": "error", "message": f"Error loading progress: {e}"}), 500

if __name__ == '__main__':
    app.run(debug=True)  # For local development (remove `debug=True` in production)
