import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import UserSignup from './pages/userSignup'
import UserLogin from './pages/userLogin'
import CaptainSignup from './pages/captainSignup'
import CaptainLogin from './pages/captainLogin'


const App = () => {
  return (
    <div >
      <Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/userSignup' element={<UserSignup/>}/>
  <Route path='/userLogin' element={<UserLogin/>}/>
  <Route path='/captainSignup' element={<CaptainSignup/>}/>
  <Route path='/captainLogin' element={<CaptainLogin/>}/>
      </Routes>
    </div>
  )
}

export default App