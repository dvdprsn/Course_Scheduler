from Web import app, parse
# import parse
from flask import request
import json

'''Flask Application'''
# Get all course data, create dictionary for easy retrieval based on course name
# pylint: disable=invalid-name
coursesF22 = parse.getF22Courses()
coursesW23 = parse.getW23Courses()
coursesDictF22 = {}
coursesDictW23 = {}
for c in coursesF22:
    coursesDictF22[c.name[0:c.name.index(' ')]] = c
for c in coursesW23:
    coursesDictW23[c.name[0:c.name.index(' ')]] = c


@app.route('/api/coursesList', methods=['GET'])
def get_coursesList():
    '''Retrieves list of all courses'''
    # Gets request arguments from the route/path
    # (e.g. "/api/coursesList?semester=F22") - where "F" or "W" specifies Fall or Winter, respectively
    # and the 2-digit number that follows indicates the year (assuming the year can be represented by 20XX)
    semester = request.args.get('semester')
    if semester == 'F22':
        return json.dumps(list(coursesDictF22.keys())), 200
    elif semester == 'W23':
        return json.dumps(list(coursesDictW23.keys())), 200
    else:
        return {'error': "Requested semester '{semester}' is not currently available"}, 400


@app.route('/api/course', methods=['GET'])
def get_course():
    '''Retrieves JSON containing data for specified course'''
    #request_data = request.get_json()

    # Gets request arguments from the route/path
    # (e.g. "/api/course?name=CIS*3760*0101&semester=F22")
    name = request.args.get('name')
    semester = request.args.get('semester')

    # Check if it is in an available semester, and return it
    if semester == 'W23' and name in coursesDictW23:
        return coursesDictW23[name].toJson(), 200
    elif semester == 'F22' and name in coursesDictF22:
        return coursesDictF22[name].toJson(), 200
    else:
        return {'error': "Course not found with name '" + name + "'"}, 400
