from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/process_data', methods=['POST'])
def process_data():
    data = request.get_json()
    name = data.get('name')
    message = f"Welcome, {name}!"  # Customize your message
    return jsonify({'message': message})

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)API
