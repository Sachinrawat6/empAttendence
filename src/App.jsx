import React from 'react'
import Attendence from './components/Attendence'
import Reports from './components/Reports'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Attendence/>} />
      <Route path='/report' element={<Reports/>} />
    
    </Routes>
   
    </BrowserRouter>
  )
}

export default App