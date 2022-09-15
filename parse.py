from html.parser import HTMLParser
import csv

array = ['1']

class MyHTMLParser(HTMLParser):
	found = 0
	numCourses = 0
	def handle_data(self, data):	
		if 'fall' in data.lower() and self.found == 0:
			self.found = 1
		if not data.isspace() and self.found == 1:
			if 'Fall 2022' in data:
				self.numCourses += 1

			array.append(data)


f = open("guelph.html", "r")

parser = MyHTMLParser()
parser.feed(f.read())

course = []
allCourses = []

for x in array:

	course.append(x)

	if('graduate' == x.lower() or 'diploma' == x.lower() or 'undergraduate' == x.lower()):
		allCourses.append(course)
		course = []

with open('courseData.csv', 'w', newline='') as data:
	write = csv.writer(data)
	write.writerows(allCourses)

data.close()
f.close()