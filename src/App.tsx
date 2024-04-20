import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Login';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}> </Route>
        <Route path='/' element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  )


  // return (
  //   <>
  //     <h1>2024 Senior Design Website</h1>
  //     <span> Images/username/password/video stuff will go here</span>
  //   </>
  // )
}

export default App
