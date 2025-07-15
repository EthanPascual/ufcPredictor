import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router'
import './index.css'
import Home from './Home.jsx'
import FightsList from './FightsList.jsx'
import FightersList from './FightersList.jsx'
import Predict from './Predict.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Home/>} />
        <Route path = "/fights" element={<FightsList/>} />
        <Route path = "/fighters" element={<FightersList/>} />
        <Route path = "/predict" element={<Predict/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
