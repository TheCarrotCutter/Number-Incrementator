from flask import Flask, render_template

app = Flask(__name__, static_folder='api/static', template_folder='api/templates')

@app.route('/')
def index():
    return render_template('index.html')

# No app.run() line needed here
