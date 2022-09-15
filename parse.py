from html.parser import HTMLParser
import csv

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
            if '. ' in data: # Indicates the end of the meeting time info before this Faculty name column
                self.isMeetingTime = False
                array.append(' '.join(self.meetingTimes)) # add all meeting time info for the course as one entry to the array
                self.meetingTimes = [] # Reset the list

            if self.isMeetingTime: # Adds the meeting time info to a separate array, which will be appended to the main array when completed
                self.meetingTimes.append(data)
            else:
                array.append(data) # Adds the raw data to the array to be parsed later
                
            if 'Guelph' in data: # Indicates the beginning of the meeting time info after this location column
                self.isMeetingTime = True


f = open("guelph.html", "r")

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

with open('courseData.csv', 'w', newline='') as data: #Write to CSV
    write = csv.writer(data) 
    write.writerows(allCourses) #Write out each element of all courses
# Clean up
data.close()
f.close()
