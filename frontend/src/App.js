import './styles/App.css';
import React from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import Login from './pages/login'
import SignUp from './pages/signup'
import Dashboard from './pages/dashboard'
import NotFound from './pages/notfound'
import Calender from './pages/calender';
import Tasks from './pages/tasks';
import Notes from './pages/notes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard"/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/calender" element={<Calender/>}/>
          <Route path="/tasks" element={<Tasks/>}/>
          <Route path="/notes" element={<Notes/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
