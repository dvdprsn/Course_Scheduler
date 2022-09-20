from html.parser import HTMLParser
import csv
import os

# We need to skip all the garbage at top of file and this course ID gets skipped
array = ['1']


class Course:
    def __init__(self):
        self.id = 'NULL'
        self.sem = 'NULL'
        self.oc = 'NULL'
        self.name = 'NULL'
        self.campus = 'NULL'

        self.lecDays = 'NULL'
        self.lecTime = 'NULL'
        self.lecRoom = 'NULL'

        self.semDay = 'NULL'
        self.semTime = 'NULL'
        self.semRoom = 'NULL'

        self.examDay = 'NULL'
        self.examTime = 'NULL'
        self.examRoom = 'NULL'

        self.prof = 'NULL'

        self.cap = 'NULL'
        self.cred = 'NULL'
        self.level = 'NULL'

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

    def setCCL(self, cap, cred, level):
        self.cap = cap
        self.cred = cred
        self.level = level

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
    def addLec(self, cArray, startIdx, c):
        c.setLecDays(cArray[startIdx])
        c.setLecTime(cArray[startIdx+1])
        c.setLecRoom(cArray[startIdx+2] + cArray[startIdx+3].replace(',', ''))
        if ('LAB' not in cArray[startIdx+4] and 'LEC' not in cArray[startIdx+4] and 'EXAM' not in cArray[startIdx+4]):
            c.setProf(cArray[startIdx+4])

    def addSem(self, cArray, startIdx, c):
        c.setSemDays(cArray[startIdx])
        c.setSemTime(cArray[startIdx+1])
        c.setSemRoom(cArray[startIdx+2] + cArray[startIdx+3].replace(',', ''))
        if ('LAB' not in cArray[startIdx+4] and 'LEC' not in cArray[startIdx+4] and 'EXAM' not in cArray[startIdx+4]):
            c.setProf(cArray[startIdx+4])

    def addExam(self, cArray, startIdx, c):
        c.setExamDay(cArray[startIdx])
        c.setExamTime(cArray[startIdx+1])
        c.setExamRoom(cArray[startIdx+2])
        c.setProf(cArray[startIdx+3])

    def addCCL(self, cArray, startIdx, c):
        c.setCCL(cArray[startIdx], cArray[startIdx+1], cArray[startIdx+2])

    def loadCourse(self, cArray):
        c = Course()
        c.setId(cArray[0])  # Set ID
        c.setSem(cArray[1])  # Set Semester
        c.setOC(cArray[2])  # Set Open/Closed
        c.setName(cArray[3])  # Set Name
        c.setCampus(cArray[4])  # Set Campus


        # TODO: Lec (TBA), LAB(TBA)
        for index, elem in enumerate(cArray):  # Start=5 not working
            # print(elem)
            if ('LEC' in elem and 'TBA' not in elem):  # Has Lecture slot booked
                self.addLec(cArray, index, c)

            if ('LAB' in elem and 'TBA' not in elem):  # Has Sem slot booked
                self.addSem(cArray, index, c)

            if ('EXAM' in elem):
                self.addExam(cArray, index, c)

            # if ('TBA  TBA' in elem):  # No declared PROF
            #     c.setProf(elem)

            if ('/' in elem):  # set capacity, credit, level
                self.addCCL(cArray, index, c)

            else:
                pass

        return c

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
