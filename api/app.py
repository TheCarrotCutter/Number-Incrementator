from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy

# Initialize Flask app and configure the database
app = Flask(__name__, static_folder='static', template_folder='templates')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///instance/game_data.db'  # SQLite database
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable unnecessary tracking of modifications
db = SQLAlchemy(app)

# Define the Player model with additional variables: number, total, price, increment_amount
class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    number = db.Column(db.Integer, default=0)  # Store the number
    total = db.Column(db.Float, default=0.0)   # Store the total (could be money, points, etc.)
    price = db.Column(db.Float, default=0.0)   # Store the price (could be item price, etc.)
    increment_amount = db.Column(db.Integer, default=1)  # Store the increment amount

    def __repr__(self):
        return f'<Player {self.username}>'

# Create the database tables (if not already created)
with app.app_context():
    db.create_all()

# Route to serve the index.html template
@app.route('/')
def index():
    return render_template('index.html')

# API endpoint to save player progress (including number, total, price, increment_amount)
@app.route('/save_progress', methods=['POST'])
def save_progress():
    player_data = request.json
    username = player_data.get('username')
    number = player_data.get('number')
    total = player_data.get('total')
    price = player_data.get('price')
    increment_amount = player_data.get('increment_amount')

    # Basic validation
    if not username or number is None or total is None or price is None or increment_amount is None:
        return jsonify({"status": "error", "message": "Missing required data"}), 400

    if number < 0 or total < 0 or price < 0 or increment_amount < 0:
        return jsonify({"status": "error", "message": "All values must be non-negative"}), 400

    # Check if the player already exists in the database
    player = Player.query.filter_by(username=username).first()
    if player:
        # Update existing player's data
        player.number = number
        player.total = total
        player.price = price
        player.increment_amount = increment_amount
    else:
        # Create a new player
        player = Player(username=username, number=number, total=total, price=price, increment_amount=increment_amount)
        db.session.add(player)

    db.session.commit()
    return jsonify({"status": "success", "message": "Progress saved"}), 200

# API endpoint to load player progress (including number, total, price, increment_amount)
@app.route('/load_progress/<username>', methods=['GET'])
def load_progress(username):
    player = Player.query.filter_by(username=username).first()
    if player:
        return jsonify({
            'username': player.username,
            'number': player.number,
            'total': player.total,
            'price': player.price,
            'increment_amount': player.increment_amount
        })
    return jsonify({"status": "error", "message": "Player not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
