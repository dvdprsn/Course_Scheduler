import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
        const [currentTime, setCurrentTime] = useState(0);

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
    </div>
  );
}

// $("#getCourse").click(function() {
//   let courseName
//   useEffect(() => {
//     fetch('/api/course??name=CIS*3760*0101"').then(data => courseName)
//     });
//     return(<div>
//       <p>Here is a course: {courseName}</p>
//     </div>);
// })

export default App;
