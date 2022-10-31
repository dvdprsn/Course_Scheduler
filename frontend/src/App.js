import React, {useState, useEffect} from 'react';
import logo from './lantern.svg';
import './App.css';

function App() {

	const [course = "N/A", setCourseData] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

	const getCourseInfo = () => {
		console.log("reached");
		fetch('/api/course?name=' + document.getElementById('desiredCourse').value).then(res => res.json()).then(data => {
            document.getElementById('showCourse').removeAttribute('hidden');
			setCourseData(JSON.stringify(data, null, 2));
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
        <br></br>
        <p>
          Showing the integration with uwsgi serving Flask:
        </p>
        <p>
          The current time is {currentTime}.
        </p>
      </header>
      <div className="Course-getter">
        <div>
            <br></br>
            <label><b>Enter a course:</b>&nbsp;</label>
            <input id="desiredCourse"></input>
        </div>
        <br></br>
	    <button id="getCourse" onClick={getCourseInfo}>Click Here for course info</button>
        <hr></hr>
	    <div id="showCourse" hidden align='center'>
		  <label><b>Raw Course Data:</b><br></br></label>
          <div className="JSON-display" display='block' align='left'>
            <pre id='json'><p>{course}</p></pre>
          </div>
	    </div>
      </div>
      <br></br>
    </div>
  );
}

export default App;
