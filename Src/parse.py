from html.parser import HTMLParser
import csv
import os

# We need to skip all the garbage at top of file and this course ID gets skipped
array = ['1']

# TODO: Store object's as CSV instead of array

# This array stores all information that a course can possibly contain


class Course:
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
        self.id = id

    def setSem(self, sem):
        self.sem = sem

    def setOC(self, oc):
        self.oc = oc

    def setName(self, name):
        self.name = name

    def setCampus(self, campus):
        self.campus = campus

    def setLecDays(self, days):
        self.lecDays = days

    def setLecTime(self, time):
        self.lecTime = time

    def setLecRoom(self, room):
        self.lecRoom = room

    def setSemDays(self, day):
        self.semDay = day

    def setSemTime(self, time):
        self.semTime = time

    def setSemRoom(self, room):
        self.semRoom = room

    def setExamDay(self, day):
        self.examDay = day

    def setExamTime(self, time):
        self.examTime = time

    def setExamRoom(self, room):
        self.examRoom = room

    def setProf(self, prof):
        self.prof = prof
    # Easier to set this as a group

    def setCCL(self, cap, cred, level):
        self.cap = cap
        self.cred = cred
        self.level = level
    # Print statement for testing

    def printCourse(self):
        print(self.id + " " + self.sem + " " + self.oc +
              " " + self.name + " " + self.campus)
        print(self.lecDays + " " + self.lecTime + " " + self.lecRoom)
        print(self.semDay + " " + self.semTime + " " + self.semRoom)
        print(self.examDay + " " + self.examTime + " " + self.examRoom)

        print(self.prof)
        print(self.cap + " " + self.cred + " " + self.level)

        print("")


class MyHTMLParser(HTMLParser):
    found = False  # We use this to find where in the HTML the relevant data actually starts
    numCourses = 0  # Testing value
    # Used to indicate whether the current data is part of the meeting time information
    isMeetingTime = False
    meetingTimes = []  # Stores the strings related to meeting times

    def handle_data(self, data):  # When data is found in the HTML
        # once we find 'Fall 2022' once we can begin scanning courses
        if 'fall' in data.lower() and self.found == False:
            self.found = True
        if not data.isspace() and self.found == True:
            if 'Fall 2022' in data:  # Just for testing to verify num courses == expected
                self.numCourses += 1
            # Adds the raw data to the array to be parsed later
            array.append(data)


class Parse:
    # Helpers
    def addLec(self, cArray, startIdx, c):
        c.setLecDays(cArray[startIdx])
        c.setLecTime(cArray[startIdx+1])
        c.setLecRoom(cArray[startIdx+2] + cArray[startIdx+3].replace(',', ''))
        # Next line: if there is not a lab, lecture, or exam listed after we know for a fact the next index is the prof
        if (('LAB' not in cArray[startIdx+4] or 'SEM' not in cArray[startIdx+4]) and 'LEC' not in cArray[startIdx+4] and 'EXAM' not in cArray[startIdx+4]):
            c.setProf(cArray[startIdx+4])

    def addSem(self, cArray, startIdx, c):
        c.setSemDays(cArray[startIdx])
        c.setSemTime(cArray[startIdx+1])
        c.setSemRoom(cArray[startIdx+2] + cArray[startIdx+3].replace(',', ''))
        # Next line: if there is not a lab, lecture, or exam listed after we know for a fact the next index is the prof
        if (('LAB' not in cArray[startIdx+4] or 'SEM' not in cArray[startIdx+4]) and 'LEC' not in cArray[startIdx+4] and 'EXAM' not in cArray[startIdx+4]):
            c.setProf(cArray[startIdx+4])

    def addExam(self, cArray, startIdx, c):
        c.setExamDay(cArray[startIdx])
        c.setExamTime(cArray[startIdx+1])
        c.setExamRoom(cArray[startIdx+2])
        # Prof is always listed after the exam
        c.setProf(cArray[startIdx+3])
    # Set Credits, Capacity, Level

    def addCCL(self, cArray, startIdx, c):
        c.setCCL(cArray[startIdx], cArray[startIdx+1], cArray[startIdx+2])

    # Main Logic for creating the Course Object!!!
    def loadCourse(self, cArray):
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

            if ('EXAM' in elem):
                self.addExam(cArray, index, c)

            if ('/' in elem):  # set capacity, credit, level
                self.addCCL(cArray, index, c)

            else:
                pass

        return c  # Return populated OBJ

    def parser(self):
        # Gets the path of the current file
        dirPath = os.path.dirname(os.path.abspath("parse.py"))
        dataPath = os.path.join(dirPath, 'Data', 'guelph.html')
        f = open(dataPath, "r")

        parser = MyHTMLParser()
        parser.feed(f.read())  # Feed in HTML

        course = []  # Array for a single course
        allCourses = []  # Array of all courses

        for x in array:  # For each element of the unparsed array

            course.append(x)

            # Since one of these strings is the final element of a given course we block off here
            if ('graduate' == x.lower() or 'diploma' == x.lower() or 'undergraduate' == x.lower()):
                # TODO: New Course Object creation, add this to an array of objects
                c = self.loadCourse(course)
                c.printCourse()

                # Append singular course array to all
                allCourses.append(course)
                course = []  # Reset course array

        writePath = os.path.join(dirPath, 'Data', 'courseData.csv')
        with open(writePath, 'w', newline='') as data:  # Write to CSV
            write = csv.writer(data)
            # Write out each element of all courses
            write.writerows(allCourses)
        # Clean up

        data.close()
        f.close()


p = Parse()
p.parser()
