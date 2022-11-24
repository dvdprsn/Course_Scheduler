# CIS*3760 G103 Course Scheduler Sprint-9

[**Presentation Slides UPDATE**]()

[**Website**](https://34.130.11.106/)

## Running Docker Locally

**Prereq: Install Docker**

### `cd into course-parser`

### `docker-compose up`

**This will build and start docker container running on `localhost`**

### To Exit and delete the container after use (Recommended)

### `docker-compose down --rmi local`

**This removes bulky container images and the container**

## Run Project for Dev locally

### Windows Powershell

_Running Flask_

1.  cd \venv\Scripts
2.  `.\activate`
3.  cd into flask directory in course-parser
4.  `$env:FLASK_APP = "run.py"` (First time only to update name)
5.  `flask run`

_Running Node_

1.  cd into node dir
2.  `npm install`
3.  `npm start`

### UNIX

_Running Flask_

1.  source ./venv/bin/activate
2.  cd to flask directory
3.  `python run.py`

_Running Node_

1.  cd into node directory
2.  `npm install`
3.  `npm start`
