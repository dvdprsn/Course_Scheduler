import csv
import sys




with open('courseData.csv', newline='') as csvfile:
	spamreader = csv.reader(csvfile)
	
	course = input("(e) to exit >")
	while(course is not 'e'):
		for row in spamreader:
			temp = ' '.join(row)
			if(course.upper() in temp):
				print(temp)
				print('\n')
		
		course = input(">")
