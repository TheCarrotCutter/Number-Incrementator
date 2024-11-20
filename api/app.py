from flask import Flask, render_template
import os

app = Flask(__name__)

# Example route for testing server-side storage
@app.route('/')
def index():
    # Example of interacting with server-side storage (e.g., simple in-memory storage)
    # You can replace this with a database or file-based storage later

    # A simple "counter" stored in memory (this will reset on each app restart)
    if not hasattr(app, 'counter'):
        app.counter = 0  # Initialize counter
    app.counter += 1  # Increment counter with each visit

    return render_template('index.html', counter=app.counter)

if __name__ == "__main__":
    app.run(debug=True)
