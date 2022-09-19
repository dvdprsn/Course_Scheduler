from html.parser import HTMLParser
import csv
import os

array = ['1'] # We need to skip all the garbage at top of file and this course ID gets skipped

class MyHTMLParser(HTMLParser):
    found = False # We use this to find where in the HTML the relevant data actually starts
    numCourses = 0 # Testing value
    isMeetingTime = False # Used to indicate whether the current data is part of the meeting time information
    meetingTimes = [] # Stores the strings related to meeting times

    def handle_data(self, data): # When data is found in the HTML
        if 'fall' in data.lower() and self.found == False: # once we find 'Fall 2022' once we can begin scanning courses
            self.found = True
        if not data.isspace() and self.found == True:
            if 'Fall 2022' in data: # Just for testing to verify num courses == expected
                self.numCourses += 1

            # TODO: Change to regex to be more precise with different data input?
            array.append(data) # Adds the raw data to the array to be parsed later

dirPath = os.path.dirname(os.path.abspath("parse.py")) #Gets the path of the current file
dataPath = os.path.join(dirPath, 'Data', 'guelph.html')
f = open(dataPath, "r")

parser = MyHTMLParser()
parser.feed(f.read()) # Feed in HTML

course = [] # Array for a single course
allCourses = [] # Array of all courses

for x in array: # For each element of the unparsed array

    course.append(x)

    # Since one of these strings is the final element of a given course we block off here
    if('graduate' == x.lower() or 'diploma' == x.lower() or 'undergraduate' == x.lower()):
        allCourses.append(course) #Append singular course array to all 
        course = [] # Reset course array

writePath = os.path.join(dirPath, 'Data', 'courseData.csv')
with open(writePath, 'w', newline='') as data: #Write to CSV
    write = csv.writer(data) 
    write.writerows(allCourses) #Write out each element of all courses
# Clean up
data.close()
f.close()
