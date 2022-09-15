import csv
import sys

with open('courseData.csv', newline='') as csvfile:
	spamreader = csv.reader(csvfile, delimiter=' ')
	course = input(">")
	print(course)
	for row in spamreader:
		temp = ' '.join(row)
		if(course.upper() in temp):
			print(temp)
			print('\n')
