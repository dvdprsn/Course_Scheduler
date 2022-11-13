'''Python Course Data Parser'''
from html.parser import HTMLParser
import csv
import os
import json

# pylint: disable=line-too-long
# pylint: disable=invalid-name
# pylint: disable=abstract-method
# pylint: disable=redefined-builtin
# We need to skip all the garbage at top of file and this course ID gets skipped
array = ['1']

class Course:
    '''This class stores all information that a course can possibly contain'''
    # pylint: disable=too-many-instance-attributes
    def __init__(self):  # init instance variables
        # All start as NULL so we can parse easier later
        # init basic info
        self.id = 'NULL'
        self.sem = 'NULL'
        self.oc = 'NULL'
        self.name = 'NULL'
        self.campus = 'NULL'
        # init lecture info
        self.lecDays = 'NULL'
        self.lecTime = 'NULL'
        self.lecRoom = 'NULL'
        # init sem/lab info
        self.semDay = 'NULL'
        self.semTime = 'NULL'
        self.semRoom = 'NULL'
        # init exam info
        self.examDay = 'NULL'
        self.examTime = 'NULL'
        self.examRoom = 'NULL'
        # Init final basic info
        self.prof = 'NULL'
        self.cap = 'NULL'
        self.cred = 'NULL'
        self.level = 'NULL'
    # Simple setters for each attribute

    def setId(self, id):
        '''id setter'''
        self.id = id

    def setSem(self, sem):
        '''self setter'''
        self.sem = sem

    def setOC(self, oc):
        '''oc setter'''
        self.oc = oc

    def setName(self, name):
        '''name setter'''
        self.name = name

    def setCampus(self, campus):
        '''campus setter'''
        self.campus = campus

    def setLecDays(self, days):
        '''lecture days setter'''
        self.lecDays = days

    def setLecTime(self, time):
        '''lecture time setter'''
        self.lecTime = time

    def setLecRoom(self, room):
        '''lceture room setter'''
        self.lecRoom = room

    def setSemDays(self, day):
        '''lecture day setter'''
        self.semDay = day

    def setSemTime(self, time):
        '''seminar time setter'''
        self.semTime = time

    def setSemRoom(self, room):
        '''seminar room setter'''
        self.semRoom = room

    def setExamDay(self, day):
        '''exam day setter'''
        self.examDay = day

    def setExamTime(self, time):
        '''exam time setter'''
        self.examTime = time

    def setExamRoom(self, room):
        '''exam room setter'''
        self.examRoom = room

    def setProf(self, prof):
        '''prof setter'''
        self.prof = prof

    def setCCL(self, cap, cred, level):
        '''ccl setter, easier to set as group'''
        self.cap = cap
        self.cred = cred
        self.level = level

    def printCourse(self):
        '''Print statement for testing'''
        print(self.id + " " + self.sem + " " + self.oc +
              " " + self.name + " " + self.campus)
        print(self.lecDays + " " + self.lecTime + " " + self.lecRoom)
        print(self.semDay + " " + self.semTime + " " + self.semRoom)
        print(self.examDay + " " + self.examTime + " " + self.examRoom)

        print(self.prof)
        print(self.cap + " " + self.cred + " " + self.level)

        print("")
    def toJson(self):
        '''JSON Data'''
        return json.dumps(self, default=lambda o: o.__dict__)
    def generateList(self):
        '''Generate Data List'''
        return [
                    "" + self.id,
                    "" + self.sem,
                    "" + self.oc,
                    "" + self.name,
                    "" + self.campus,
                    "" + self.lecDays,
                    "" + self.lecTime,
                    "" + self.lecRoom,
                    "" + self.semDay,
                    "" + self.semTime,
                    "" + self.semRoom,
                    "" + self.examDay,
                    "" + self.examTime,
                    "" + self.examRoom,
                    "" + self.prof,
                    " " + self.cap, # Add space so that excel doesn't recognize this string as a calendar date
                    "" + self.cred,
                    "" + self.level
                ]

class MyHTMLParser(HTMLParser):
    '''HTML Parser Class'''
    found = False  # We use this to find where in the HTML the relevant data actually starts
    numCourses = 0  # Testing value
    # Used to indicate whether the current data is part of the meeting time information
    isMeetingTime = False
    meetingTimes = []  # Stores the strings related to meeting times

    def handle_data(self, data):
        '''When data is found in the HTML'''
        # once we find 'Fall 2022' once we can begin scanning courses
        if 'fall' in data.lower() and not self.found:
            self.found = True
        if not data.isspace() and bool(self.found):
            if 'Fall 2022' in data:  # Just for testing to verify num courses == expected
                self.numCourses += 1
            # Adds the raw data to the array to be parsed later
            array.append(data)


class Parse:
    '''Helpers'''
    def writeToCsv(self, dirPath, allCourses):
        '''CSV Write'''
        writePath = os.path.join(dirPath, 'backend/resources/Data', 'courseData.csv')
        with open(writePath, 'w', encoding='utf-8', newline='') as data:  # Write to CSV
            write = csv.writer(data)
            # Write out each element of all courses
            for course in allCourses:
                write.writerow(Course.generateList(course))

    def addLec(self, cArray, startIdx, c):
        '''Add Lectures'''
        c.setLecDays(cArray[startIdx])
        c.setLecTime(cArray[startIdx+1])
        c.setLecRoom(cArray[startIdx+2] + cArray[startIdx+3].replace(',', ''))
        # Next line: if there is not a lab, lecture, or exam listed after we know for a fact the next index is the prof
        if (('LAB' not in cArray[startIdx+4] or 'SEM' not in cArray[startIdx+4]) and 'LEC' not in cArray[startIdx+4] and 'EXAM' not in cArray[startIdx+4]):
            c.setProf(cArray[startIdx+4])

    def addSem(self, cArray, startIdx, c):
        '''Add Semester'''
        c.setSemDays(cArray[startIdx])
        c.setSemTime(cArray[startIdx+1])
        c.setSemRoom(cArray[startIdx+2] + cArray[startIdx+3].replace(',', ''))
        # Next line: if there is not a lab, lecture, or exam listed after we know for a fact the next index is the prof
        if (('LAB' not in cArray[startIdx+4] or 'SEM' not in cArray[startIdx+4]) and 'LEC' not in cArray[startIdx+4] and 'EXAM' not in cArray[startIdx+4]):
            c.setProf(cArray[startIdx+4])

    def addExam(self, cArray, startIdx, c):
        '''Add Exam'''
        c.setExamDay(cArray[startIdx])
        c.setExamTime(cArray[startIdx+1])
        c.setExamRoom(cArray[startIdx+2])
        # Prof is always listed after the exam
        c.setProf(cArray[startIdx+3])

    def addCCL(self, cArray, startIdx, c):
        '''Set Credits, Capacity, Level'''
        c.setCCL(cArray[startIdx], cArray[startIdx+1], cArray[startIdx+2])

    def loadCourse(self, cArray):
        '''Main Logic for creating the Course Object!!!'''
        c = Course()  # Empty object
        c.setId(cArray[0])  # Set ID
        c.setSem(cArray[1])  # Set Semester
        c.setOC(cArray[2])  # Set Open/Closed
        c.setName(cArray[3])  # Set Name
        c.setCampus(cArray[4])  # Set Campus

        for index, elem in enumerate(cArray):  # ENUM gives an index as well

            if ('LEC' in elem and 'TBA' not in elem):  # Has Lecture slot booked
                self.addLec(cArray, index, c)

            if ('LEC' in elem and 'TBA' in elem):  # Lec booked but TBA
                c.setLecDays(cArray[index])
                c.setLecTime(cArray[index+1])
                c.setLecRoom(cArray[index+2])
                # Next line: if there is not a lab, lecture, or exam listed after we know for a fact the next index is the prof
                if (('LAB' not in cArray[index+3] or 'SEM' not in cArray[index+3]) and 'LEC' not in cArray[index+3] and 'EXAM' not in cArray[index+3]):
                    c.setProf(cArray[index+3])

            if (('LAB' in elem or 'SEM' in elem) and 'TBA' not in elem):  # Has Sem slot booked
                self.addSem(cArray, index, c)

            if (('LAB' in elem or 'SEM' in elem) and 'TBA' in elem):  # Sem/Lab booked but TBA
                c.setSemDays(cArray[index])
                c.setSemTime(cArray[index+1])
                c.setSemRoom(cArray[index+2])
                # Next line: if there is not a lab, lecture, or exam listed after we know for a fact the next index is the prof
                if (('LAB' not in cArray[index+3] or 'SEM' not in cArray[index+3]) and 'LEC' not in cArray[index+3] and 'EXAM' not in cArray[index+3]):
                    c.setProf(cArray[index+3])

            if 'EXAM' in elem:
                self.addExam(cArray, index, c)

            if '/' in elem:  # set capacity, credit, level
                self.addCCL(cArray, index, c)

            else:
                pass

        return c  # Return populated OBJ

    def parser(self):
        '''Entire Process'''
        # Gets the path of the current file
        #dirPath = os.path.dirname(os.path.abspath("parse.py"))
        #dataPath = os.path.join(dirPath, 'backend/resources/Data', 'guelph.html')

        # Open html file for reading course data
        with open('guelph.html', "r", encoding='utf-8') as f:
            parser = MyHTMLParser()
            parser.feed(f.read())  # Feed in HTML

        course = []  # Array for a single course
        allCourses = []  # Array of all courses

        for x in array:  # For each element of the unparsed array

            course.append(x)

            # Since one of these strings is the final element of a given course we block off here
            if ('graduate' == x.lower() or 'diploma' == x.lower() or 'undergraduate' == x.lower()):
                c = self.loadCourse(course)

                # Append course to the course array
                allCourses.append(c)
                course = []  # Reset course array

        return allCourses

def main():
    '''Main'''
    p = Parse()
    return p.parser()
