import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

	const [courseN, setCourseName] = useState(0);
        const [currentTime, setCurrentTime] = useState(0);

	const getCourseInfo = () => {
		console.log("reached");
		fetch('/api/course?name=ZOO*4300*0101').then(res => res.json()).then(data => {
			setCourseName(data.name);
		});
	}

        useEffect(() => {
                fetch('/api/time').then(res => res.json()).then(data => {
                        setCurrentTime(data.time);
                });
        }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Showing the integration with uwsgi serving Flask
        </p>
        <p>
          The current time is {currentTime}.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
	<p>
		<button id="getCourse" onClick={getCourseInfo}>Click Here for course info</button>
	</p>
	<p>
		Course: {courseN}
	</p>
    </div>
  );
}

export default App;
