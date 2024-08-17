import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './screens/Home'
import Createuser from './screens/Createuser'

const App = () => {
  return (
    <Routes>
      <Route index element={<Home/>} />
      <Route path='/createuser' element={<Createuser/>} />
    </Routes>
  )
}

export default App
