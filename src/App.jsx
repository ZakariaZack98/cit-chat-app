import React from 'react'
import SignUp from './Pages/SignUp/Index'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './Pages/SignIn/SignIn'
import Home from './Pages/Home/Index'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

