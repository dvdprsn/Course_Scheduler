# **Description:**

A Web Application for course scheduling based on the University of Guelph course catalogue, set-up using NGINX, serving a React frontend and Flask backend. We set-up a custom Linux VM using Google's Compute Engine so that the application can be accessed from the URL at the bottom of this document.

## **Run these commands to operate our server:** 
*after downloading the git repository contents of sprint-6 (removes the need of installing git on your machine)*
<br>

`tar -xf course-parser-sprint-6.tar`
<br>
`cd course-parser-sprint-6`
<br>
`sudo chmod +x install.sh`
<br>
`sudo ./install.sh`

## **Commands to start and stop the server:**

`sudo systemctl start nginx`
<br>
`sudo systemctl stop nginx`
<br>
`sudo systemctl restart nginx`

## **Web Application URL:**
https://34.130.28.136

### **Usage Guide:**
1. Search for a course by typing in the course code (eg. "CIS\*3760\*0101")
    - As the course code is typed, the rest of the code will be autocompleted, with options presented after a minimum of 3 letters are entered (eg. "CIS")
    - Once the **"ENTER"** key is pressed with the full course code in the input field, or one of the suggestions is selected from the dropdown list, the course code will be selected
        - It is shown in blue container with an **"x"** icon on the right, which can be clicked to remove it
    - After a course is selected, additional courses can be selected in the same input field alongside it
2. When desired courses are selected, the **"Load Courses"** button can be clicked to load the courses into the schedule below
3. The user can view the loaded courses' lectures and labs (if applicable) in the schedule, with unique colours for each
    - Additional information for each meeting in the schedule can be seen by hovering over them with the mouse cursor
4. More courses can be added in the same way as ***Step 1*** - there are no course selection restrictions implemented at this time
5. The user can clear the schedule of all loaded courses by clicking the red **"Clear Calendar"** button 
<br>
<br>
<hr>

### **Authors:**

* Bhavsar, Megh
* Chen, Zhelong
* D'Mello, Dean
* Forrest, Devin
* Goodman, Dylan
* Pearson, David
* Van Braeckel, Austin
