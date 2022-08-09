import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar.component"
import CreateUser from "./components/admin-components/create-user.component";
// import ExercisesList from "./components/exercises-list.component";
// import EditExercise from "./components/edit-exercise.component";
// import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Routes>
          {/* <Route path="/" exact /> */}
          <Route path="/create-user" component={CreateUser} />
          {/* <Route path="/edit/:id" component={EditExercise} /> */}
          {/* <Route path="/user" component={CreateUser} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
