import './App.css';

import {useEffect, useState} from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom";

import LoginBox from './LoginBox';
import CreateAccount from './CreateAccount';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Link to="/Authorise/Login">Login</Link>}/>
        <Route path="/Authorise/" element={<div>
            <h1>Page Title Here...</h1>
            <Outlet/>
            <div>Page Footer Here</div>
          </div>}>
          <Route path="Login" element={<LoginBox/>}/>
          <Route path="CreateAccount" element={<CreateAccount/>}/>
        </Route>
        <Route path="/Home" element={<div>You are logged in</div>}/>
      </Routes>
    </Router>
  );
}