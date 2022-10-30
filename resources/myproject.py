import time
import parse
from flask import Flask, request
app = Flask(__name__)

# Get all course data, create dictionary for easy retrieval based on course name
courses = parse.main()
coursesDict = {}
for c in courses:
    coursesDict[c.name[0:c.name.index(' ')]] = c

@app.route('/api/time')
def get_current_time():
	return {'time': time.time()}

@app.route('/api/course', methods=['GET'])
def test():
    # Gets request JSON body
    #request_data = request.get_json()

    # Gets request arguments from the route/path
    # (e.g. "/api/course?name=CIS*3760*0101")
    name = request.args.get('name')
    if name in coursesDict:
        return coursesDict[name].toJson(), 200
    else:
        return { 'error': "Course not found with name '" + name + "'" }, 400

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
