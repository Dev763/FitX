import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/home'
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className='bg-white text-black'>        
     <Routes>
     <Route path="/" element={<Home />} />      {/* Home page */}
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
  
     </Routes>
    </div>
  )
}

export default App
