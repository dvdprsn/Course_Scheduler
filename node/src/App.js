import React, { useState } from "react";
import Interface from "./components/Interface/Interface";
import "./App.css";

/*Resources:
 *https://github.com/bradtraversy/react-crash-2021/tree/master/src
 *https://getbootstrap.com/docs/5.0/components/buttons/
 *https://www.youtube.com/watch?v=w7ejDZ8SWv8&ab_channel=TraversyMedia
 *https://ericgio.github.io/react-bootstrap-typeahead/
 */

function App() {
	const [isF22, setF22] = useState(true);
	const changeYear = (choice) => {
		setF22(choice);
	};

	return (
		//Useful https://getbootstrap.com/docs/4.0/components/
		<div className="App" data-testid="App">
			<h1 className="display-4">Course Scheduler</h1>
			<h1 className="text-muted">University of Guelph - Team 103</h1>
			<div className="year-toggle">
				<nav aria-label="...">
					<ul className="pagination pagination-lg">
						<li className="page-item"><button className={`page-link ${isF22 ? "selected" : "not-selected"}`} onClick={() => changeYear(true)}>Fall 2022</button></li>
						<li className="page-item"><button className={`page-link ${!isF22 ? "selected" : "not-selected"}`} onClick={() => changeYear(false)}>Winter 2023</button></li>
					</ul>
				</nav>
			</div>
			<Interface semType={"F22"} isFall={isF22}/>
			<Interface semType={"W23"} isFall={!isF22}/>
		</div>
	);
}

export default App;
