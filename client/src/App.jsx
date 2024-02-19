import { useState } from 'react'
// import {} from 'rea'
import './App.css'
import { Route, BrowserRouter as Router, Routes, useRoutes} from "react-router-dom"
import { Authentication } from './pages/Authentication'
import { ProfilePage } from './pages/ProfilePage'

function App() {

  return (
    <div className='canvas'>
      <Router>
        
    <Routes>
      <Route path="/" element={ <Authentication/>} />
      <Route path="/profile" element={ <ProfilePage/>} />
    </Routes>
      </Router>

    </div>
  )
}

export default App
