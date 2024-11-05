from flask import Flask, render_template

app = Flask(__name__, static_folder='api/static', template_folder='Number-Incrementator/templates')

@app.route('/')
def index():
    return render_template('index.html')
