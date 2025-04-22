import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landingpage from './Landingpage';
import Signup from './Signuppage';
function App() {
  const [count, setCount] = useState(0)

  return (
  <Router>
    <>
    <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="*" element={"notfound"} /> {/* This handles 404 route */}
          </Routes>
    </>
    </Router>
  )
}

export default App
