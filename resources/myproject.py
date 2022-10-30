import time
from flask import Flask
app = Flask(__name__)

@app.route('/api/time')
def get_current_time():
	return {'time': time.time()}

@app.route("/")
def hello():
    return "<h1 style='color:blue'>Hello There!</h1>"

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')