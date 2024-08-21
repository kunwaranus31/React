import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './screens/Home'
import Createuser from './screens/Createuser'
import Edituser from './screens/Edituser'

const App = () => {
  return (
    <Routes>
      <Route index element={<Home/>} />
      <Route path='/createuser' element={<Createuser/>} />
      <Route path='/edituser/:id' element={<Edituser/>} />
    </Routes>
  )
}

export default App
