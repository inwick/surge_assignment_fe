import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/common/navbar.component"
import Login from './components/common/login.component';
import HomePage from './components/common/home-page.component';

import CreateUser from "./components/admin-components/create-user.component";
import AdminHome from './components/admin-components/admin-home.component';

import AddNote from './components/student-component/add-note.component';
import StudentHome from './components/student-component/student-home.component';
import UpdateNotes from './components/student-component/update-note.component';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student-home" element={<StudentHome />} />
          <Route path="/student-add-note" element={<AddNote />} />
          <Route path="/student-update-note/:id" element={<UpdateNotes />} />
          <Route path="/admin-home" element={<AdminHome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
