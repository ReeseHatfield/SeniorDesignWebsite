import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Login/Login';
import Weaknesses from './pages/Weaknesses/Weaknesses';

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path='/login' element={<Login />}> </Route>
        <Route path='/weaknesses' element={<Weaknesses/>}></Route>
        <Route path='/' element={<Login />}></Route>
      </Routes>
    </HashRouter>
  )

}

export default App
