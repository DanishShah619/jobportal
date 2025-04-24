import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Form } from 'react-router-dom';
import Landingpage from './Landingpage';
import Signup from './Signuppage';

import CareearAdvisor from "./Components/CareearAdvisor";

import ResumeAnalyzer from "./Components/ResumeAnalyzer";

import EmploymentForm from './Form';
import PsychometricForm from './Psychotest';



function App() {
  const [count, setCount] = useState(0)

  return (
  <Router>
    <>
    <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/signup" element={<Signup/>} />

          <Route path="/resume-analyzer" element={< ResumeAnalyzer/>} />
          <Route path="/career-advisor" element={<CareearAdvisor />} />
          <Route path="*" element={"notfound"} /> {/* This handles 404 route */}


          <Route path="/form" element={<EmploymentForm/>} /> 
          <Route path="/psychotest" element={<PsychometricForm/>} />

          </Routes>
    </>
    </Router>
  )
}

export default App
