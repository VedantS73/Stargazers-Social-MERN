import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ResponsiveDrawer from "./Components/ResponsiveDrawer";

import Explore from "./Pages/Explore";
import Connect from "./Pages/Connect";
import Events from "./Pages/Events";
import Learn from "./Pages/Learn";
import Sky from "./Pages/Sky";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <ResponsiveDrawer />
          <Routes>
            <Route exact path="/" element={<Explore />}></Route>
            <Route exact path="/explore" element={<Explore />}></Route>
            <Route exact path="/connect" element={<Connect />}></Route>
            <Route exact path="/events" element={<Events />}></Route>
            <Route exact path="/learn" element={<Learn />}></Route>
            <Route exact path="/sky" element={<Sky />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/register" element={<Register />}></Route>
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
