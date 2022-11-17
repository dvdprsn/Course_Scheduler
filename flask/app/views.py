from app import app, parse
'''Flask Application'''
from flask import request
import json
# import parse

# Get all course data, create dictionary for easy retrieval based on course name
# pylint: disable=invalid-name
courses = parse.main()
coursesDict = {}
for c in courses:
    coursesDict[c.name[0:c.name.index(' ')]] = c

@app.route('/api/coursesList', methods=['GET'])
def get_coursesList():
    '''Retrieves list of all courses'''
    return json.dumps(list(coursesDict.keys())), 200

@app.route('/api/course', methods=['GET'])
def get_course():
    '''Gets request JSON body'''
    #request_data = request.get_json()

    # Gets request arguments from the route/path
    # (e.g. "/api/course?name=CIS*3760*0101")
    name = request.args.get('name')
    #name = 'ZOO*4300*0101'
    if name in coursesDict:
        return coursesDict[name].toJson(), 200
    return {'error': "Course not found with name '" + name + "'"}, 400
