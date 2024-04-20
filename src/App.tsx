import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Login/Login';
import Weaknesses from './pages/Weaknesses/Weaknesses';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}> </Route>
        <Route path='/weaknesses' element={<Weaknesses/>}></Route>
        <Route path='/' element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  )

}

export default App
