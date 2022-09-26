import csv
import os

print("---------------------------------")
print("- F22 Course Information Search -")
print("---------------------------------\n")

dirPath = os.path.dirname(os.path.abspath("parse.py")) #Gets the path of the current file
writePath = os.path.join(dirPath, 'Data', 'courseData.csv')

with open(writePath, newline='') as csvfile: # Open CSV File
	spamreader = csv.reader(csvfile) # Iterator for the CSV File
	course = input("(e) to exit > ") # Get User input
	# TODO VALIDATE INPUTS? Not necessary I dont think 
	while(course != 'e'): # Exit condition, add additional exit condiditions if desired
		
		for row in spamreader: # For each row of the CSV
			temp = ' '.join(row) # Since the CSV is stored arrays, this joins the array into a single string separating elements with ' '
			if(course.upper() in temp): # If the uppercase of the input is found anywhere in the file
				print(temp) # Output the string found in CSV
				print('\n') 
				
		csvfile.seek(0) # Return file pointer to SOF
		
		course = input("(e) to exit > ")