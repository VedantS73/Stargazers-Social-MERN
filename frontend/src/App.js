import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResponsiveDrawer from './Components/DrawerLayout';
import LoadingScreen from './Components/anim/LoadingScreen';
import Explore from './Pages/Explore';
import Connect from './Pages/Connect';
import Events from './Pages/Events';
import Learn from './Pages/Learn';
import Sky from './Pages/Sky';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import About from './Pages/About';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false, // Initialize dataLoaded state
      animationCompleted: false, // Initialize animationCompleted state
    };
  }

  componentDidMount() {
    // Simulate data loading
    setTimeout(() => {
      // Set dataLoaded to true when data is loaded (you can replace this with your actual data loading logic)
      this.setState({ dataLoaded: true });
    }, 2000); // Adjust the timeout duration as needed

    // Listen for animation completion event
    setTimeout(() => {
      this.setState({ animationCompleted: true });
    }, 6000); // Adjust the timeout duration to match your animation duration
  }

  render() {
    const { dataLoaded, animationCompleted } = this.state;

    return (
      <Router>
        <div className="App">
          {/* Conditionally render the loading screen or the main content */}
          {dataLoaded && animationCompleted ? (
            <Routes>
              <Route exact path="/" element={<ResponsiveDrawer maincontent={<Explore />} />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/explore" element={<ResponsiveDrawer maincontent={<Explore />} />} />
              <Route exact path="/connect" element={<ResponsiveDrawer maincontent={<Connect />} />} />
              <Route exact path="/events" element={<ResponsiveDrawer maincontent={<Events />} />} />
              <Route exact path="/learn" element={<ResponsiveDrawer maincontent={<Learn />} />} />
              <Route exact path="/sky" element={<ResponsiveDrawer maincontent={<Sky />} />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
            </Routes>
          ) : (
            // Render the loading screen component while data is loading
            <LoadingScreen />
          )}
        </div>
      </Router>
    );
  }
}

export default App;


// import React, { useState, useEffect, Component } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import ResponsiveDrawer from "./Components/DrawerLayout";
// import LoadingScreen from './Components/anim/LoadingScreen';

// import Explore from "./Pages/Explore";
// import Connect from "./Pages/Connect";
// import Events from "./Pages/Events";
// import Learn from "./Pages/Learn";
// import Sky from "./Pages/Sky";
// import Login from "./Pages/Login";
// import Register from "./Pages/Register";
// import Profile from "./Pages/Profile";
// import About from "./Pages/About";
// import "./App.css";

// class App extends Component {
//   render() {
//     return (
//         <Router>
//           <div className="App">
//             {/* <ResponsiveDrawer /> */}
//             <Routes>
//               <Route exact path="/" element={<ResponsiveDrawer maincontent={<Explore />} />}></Route>
//               <Route exact path="/profile" element={<Profile />}></Route>
//               <Route exact path="/about" element={<About />}></Route>
//               <Route exact path="/explore" element={<ResponsiveDrawer maincontent={<Explore />} />}></Route>
//               <Route exact path="/connect" element={<ResponsiveDrawer maincontent={<Connect />} />}></Route>
//               <Route exact path="/events" element={<ResponsiveDrawer maincontent={<Events />} />}></Route>
//               <Route exact path="/learn" element={<ResponsiveDrawer maincontent={<Learn />} />}></Route>
//               <Route exact path="/sky" element={<ResponsiveDrawer maincontent={<Sky />} />}></Route>
//               <Route exact path="/login" element={<Login />}></Route>
//               <Route exact path="/register" element={<Register />}></Route>
//             </Routes>
//           </div>
//         </Router>
//     );
//   }
// }

// export default App;
