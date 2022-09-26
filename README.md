# **COURSE INFORMATION SEARCH PROGRAM**

### **DESCRIPTION**
A program that allows the user to search for a particular course in the University of Guelph's Fall 2022 course catalog,
and obtain a variety of related information, such as the following: status, section name and title, location, meeting 
information, faculty, available spots, capacity, credits, and academic level. Through the use of a CLI tool,
the user is able to search for their desired course information, which is stored in a local csv file that is generated by 
the initial parsing script. For more guidance on the usage of the program, please see the *USAGE INSTRUCTIONS* section below.

### **AUTHORS**
* *Bhavsar, Megh*
* *Chen, Zhelong*
* *D'Mello, Dean*
* *Forrest, Devin*
* *Goodman, Dylan*
* *Pearson, David*
* *Van Braeckel, Austin*

<br>
<hr>

## **USAGE INSTRUCTIONS**

### **Preliminary Steps**
1. **Run parse.py to create data file (csv)**
```bash
python3 Src/parse.py
```

### **CLI Tool**
1. **Run search.py to initiate CLI**
```bash
python3 Src/search.py
```
2. **Within the *search* CLI tool, enter the course code *(Eg. 'CIS\*3760')*, in order to obtain all of its stored information**
    * **Note:** The inputted characters will be searched against the beginning of the stored course codes, meaning that multiple courses' information can be obtained if desired 
        *(Eg. entering "CIS" will obtain all courses that begin with "CIS")
3. **Use command "e" to exit**

### **Interactive Excel Spreadsheet**
1. **Open the Excel (.xlsm) file**
2. **Add desired course codes to the specified area in the top right portion of the sheet**
3. **Click on the *"Generate"* button to add the courses to the schedule**
4. **View the courses at their specified days and times in the schedule on the left portion of the sheet**
5. **If at any time the course schedule needs to be cleared, click the *"Clear"* button to do so**
