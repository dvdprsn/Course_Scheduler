import time
import parse
from flask import Flask, request
app = Flask(__name__)

# Get all course data, create dictionary for easy retrieval based on course name

courses = parse.main()
coursesDict = {}
courseCodes = [] # Array of just the course codes for the typeahead
for c in courses:
    coursesDict[c.name[0:c.name.index(' ')]] = c
    courseCodes.append(c.name.split(" ", 1)[0]) #Just the course code

#Endpoint that sends the array of coursecodes to JS
@app.route('/api/codes')
def get_current_time():
    return {'codes': courseCodes}


@app.route('/api/course', methods=['GET'])
def get_course():
    # Gets request JSON body
    #request_data = request.get_json()

    # Gets request arguments from the route/path
    # (e.g. "/api/course?name=CIS*3760*0101")
    name = request.args.get('name')
    #name = 'ZOO*4300*0101'
    if name in coursesDict:
        return coursesDict[name].toJson(), 200
    else:
        return {'error': "Course not found with name '" + name + "'"}, 400


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
