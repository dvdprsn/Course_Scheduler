import React from "react"

let zcourse = {
    title: "CIS*3760*0101 Lec",
    startTime: "09:00", // 24hrs
    endTime: "10:20", // 24hrs 
    daysOfWeek: [1, 3, 5], // mon = 1, wed = 3, fri = 5
    color: " #85929e", // Add bg color
    description: "Example <br> Course", // MUST HAVE A DESC CANNOT BE EMPTY
};


export default function Search( {addCourse} ) {
    
    // const getCourseInfo = () => {
    //     fetch(
    //         "/api/course?name=" + document.getElementById("desiredCourse").value
    //         )
    //         .then((res) => res.json())
    //         .then((data) => {
    //             document.getElementById("showCourse").removeAttribute("hidden");
    //             setCourse(JSON.stringify(data, null, 2));
    //         });
    // };

    const getCourseInfo = () => {
        fetch("/api/course?name=CIS*3760*0101").then((res) => res.json()).then((data) => {
            console.log(data);
        });
    };

    return (
        <div className="search-container">
        <button onClick={() => addCourse(zcourse)}>
            click ?
        </button>
            <div className="App">
                    <div id="calendar"></div>
                    <div className="Course-getter">
                        <div>
                            <br></br>
                            <label>
                                <b>Enter a course:</b>&nbsp;
                            </label>
                            <input id="desiredCourse"></input>
                        </div>
                        <br></br>
                        <button id="getCourse" onClick={getCourseInfo}>
                            Click Here for course info
                        </button>
                        <hr></hr>
                        <div id="showCourse" hidden align="center">
                            <label>
                                <b>Raw Course Data:</b>
                                <br></br>
                            </label>
                            <div className="JSON-display" display="block" align="left">
                                <pre id="json">
                                    <p>blank</p>
                                </pre>
                            </div>
                        </div>
                    </div>
                    <br></br>
            </div>
        </div>
    )
};