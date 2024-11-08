import os
from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from flask_migrate import Migrate

# Load environment variables from the .env file in the root
load_dotenv()

# Initialize Flask app
app = Flask(__name__, static_folder='static', template_folder='templates')

# Get the database URL from the environment variable
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_PUBLIC_URL') + '?sslmode=require'
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
    increment_amount = db.Column(db.Integer, default=1)  # Default increment amount

    def __repr__(self):
        return f'<Player {self.username}>'

# Avoid auto-creating tables in production, only create when needed
# Uncomment this only for development; in production, handle migrations manually
# with app.app_context():
#     db.create_all()  # Creates tables based on the model if necessary

# Route to serve the game page
@app.route('/')
def index():
    return render_template('index.html')

# Route to save player progress
@app.route('/save_progress', methods=['POST'])
def save_progress():
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

# Route to load player progress
@app.route('/load_progress/<username>', methods=['GET'])
def load_progress(username):
    player = Player.query.filter_by(username=username).first()
    if player:
        return jsonify({
            'username': player.username,
            'number': player.number,
            'total': player.total,
            'increment_amount': player.increment_amount,
        })
    return jsonify({"status": "error", "message": "Player not found"}), 404

@app.before_first_request
def test_db_connection():
    try:
        # Test the database connection
        db.engine.connect()
        app.logger.info("Successfully connected to the database!")
    except Exception as e:
        app.logger.error(f"Database connection error: {e}")

if __name__ == "__main__":
    app.run(debug=True)
