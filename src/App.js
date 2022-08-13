import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/common/navbar.component"
import Login from './components/common/login.component';
import UpdateUsers from './components/common/update-user.component';

import CreateUser from "./components/admin-components/create-user.component";
import AdminHome from './components/admin-components/admin-home.component';
import ViewUser from './components/admin-components/view-user.component';

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
          <Route path="/" exact element={<Login />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/login" exact element={<Login />} />

          <Route path="/student-home" element={<StudentHome />} />
          <Route path="/student-add-note" element={<AddNote />} />
          <Route path="/student-update-note/:id" element={<UpdateNotes />} />

          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/update-user" element={<UpdateUsers />} />
          <Route path="/student-view-user/:id" element={<ViewUser />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
