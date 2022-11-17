# REACT APP

## Running Docker Locally

_Install Docker_
`cd into course-parser`

### `docker-compose up`

_should build and start docker container running on `localhost`_

### To Exit and delete the container (Recommended)

### `docker-compose down --rmi local`

_This removes bulky container images_

## Run Project for Dev locally

### Windows Powershell

_Running Flask_

1.  cd \venv\Scripts
2.  `.\activate`
3.  cd into flask dir
4.  `$env:FLASK_APP = "./app/views.py"` (First time only to update name)
5.  `flask run`

_Running Node_

1.  cd into node dir
2.  `npm install`
3.  `npm start`

## Run instructions (Do not use)

[Install node](https://nodejs.org/en/download/) and follow directions for your operating system.

**In the frontend folder install dependencies for our project:**

### `sudo apt update`

### `curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -`

### `sudo apt -y install nodejs`

### `sudo npm install`

**To run in development mode and make live changes, type:**

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

**For interactive testing:**

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

**To create a working build that can be copied to the server:**

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
