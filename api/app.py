from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_folder='static', template_folder='templates')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///instance/game_data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    number = db.Column(db.Integer, default=0)
    total = db.Column(db.Float, default=0.0)
    increment_amount = db.Column(db.Integer, default=1)  # Default increment amount (e.g., 1)

    def __repr__(self):
        return f'<Player {self.username}>'

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/save_progress', methods=['POST'])
def save_progress():
    player_data = request.json
    username = player_data.get('username')
    number = player_data.get('number')
    total = player_data.get('total')
    increment_amount = player_data.get('increment_ammount')

    player = Player.query.filter_by(username=username).first()
    if player:
        player.number = number
        player.total = total
        player.increment_ammount = increment_amount
    else:
        player = Player(username=username, number=number, total=total, increment_amount=increment_amount)
        db.session.add(player)
    
    db.session.commit()
    return jsonify({"status": "success", "message": "Progress saved"}), 200

@app.route('/load_progress/<username>', methods=['GET'])
def load_progress(username):
    player = Player.query.filter_by(username=username).first()
    if player:
        return jsonify({
            'username': player.username,
            'number': player.number,
            'total': player.total,
            'increment_ammount': player.increment_ammount,
        })
    return jsonify({"status": "error", "message": "Player not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
