import os
import logging
from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from flask_migrate import Migrate

# Explicitly load the .env file from the root directory
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

# Set up logging
logging.basicConfig(
    level=logging.DEBUG,  # Log level (DEBUG, INFO, WARNING, ERROR, CRITICAL)
    format='%(asctime)s - %(levelname)s - %(message)s',  # Log format
    handlers=[
        logging.StreamHandler(),  # This logs to the console
        logging.FileHandler('app.log', mode='a')  # This logs to a file
    ]
)

# Initialize Flask app
app = Flask(__name__, static_folder='static', template_folder='templates')

# Database URL (check if it’s loaded correctly)
db_url = os.getenv('DATABASE_PUBLIC_URL')
if db_url:
    app.logger.info(f"Database URL loaded successfully: {db_url}")
else:
    app.logger.error("DATABASE_PUBLIC_URL not found")

# Database setup
app.config['SQLALCHEMY_DATABASE_URI'] = db_url + '?sslmode=require' if db_url else None
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Initialize Flask-Migrate
migrate = Migrate(app, db)

# Define Player model
class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    number = db.Column(db.Integer, default=0)
    total = db.Column(db.Float, default=0.0)
    increment_amount = db.Column(db.Integer, default=1)

    def __repr__(self):
        return f'<Player {self.username}>'

# Route to serve the game page
@app.route('/')
def index():
    app.logger.debug("Serving the index page")
    return render_template('index.html')

# Route to save player progress
@app.route('/save_progress', methods=['POST'])
def save_progress():
    player_data = request.json
    username = player_data.get('username')
    number = player_data.get('number')
    total = player_data.get('total')
    increment_amount = player_data.get('increment_amount')

    try:
        player = Player.query.filter_by(username=username).first()
        if player:
            player.number = number
            player.total = total
            player.increment_amount = increment_amount
        else:
            player = Player(username=username, number=number, total=total, increment_amount=increment_amount)
            db.session.add(player)

        db.session.commit()
        app.logger.info(f"Progress saved for player {username}")
        return jsonify({"status": "success", "message": "Progress saved"}), 200
    except Exception as e:
        app.logger.error(f"Error saving progress: {str(e)}")
        return jsonify({"status": "error", "message": "Failed to save progress"}), 500

# Route to load player progress
@app.route('/load_progress/<username>', methods=['GET'])
def load_progress(username):
    try:
        player = Player.query.filter_by(username=username).first()
        if player:
            app.logger.info(f"Loaded progress for player {username}")
            return jsonify({
                'username': player.username,
                'number': player.number,
                'total': player.total,
                'increment_amount': player.increment_amount,
            })
        app.logger.warning(f"Player {username} not found")
        return jsonify({"status": "error", "message": "Player not found"}), 404
    except Exception as e:
        app.logger.error(f"Error loading progress: {str(e)}")
        return jsonify({"status": "error", "message": "Failed to load progress"}), 500

@app.before_first_request
def test_db_connection():
    try:
        db.engine.connect()
        app.logger.info("Successfully connected to the database!")
    except Exception as e:
        app.logger.error(f"Database connection error: {e}")
