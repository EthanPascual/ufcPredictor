
import {BrowserRouter, Routes, Route} from 'react-router'
import './index.css'
import Home from './Home.jsx'
import FightsList from './FightsList.jsx'
import FightersList from './FightersList.jsx'
import Predict from './Predict.jsx'
import Layout from './Layout.jsx'
import Fight from './Fight.jsx'
import Fighter from './Fighter.jsx'
import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { FighterContext, FightContext } from './DataContext.jsx'

function App(){
    const [fighters, setFighters] = useState([])
    const [fights, setFights] = useState([])


    useEffect(() => {
        async function fetchData(){
            await axios.get('http://localhost:3000/fighters').then(res => setFighters(res.data))
            await axios.get('http://localhost:3000/fights').then(res=> setFights(res.data))
        }
        fetchData()
        console.log(fights)
        console.log(fighters)
    }, [])


    return(
    <FightContext.Provider value={fights}>
        <FighterContext.Provider value={fighters}>
        <BrowserRouter>
        <Routes>
          <Route path = "/" element={<Layout/>}> 
            <Route index element={<Home />} />
            <Route path = "/fights" element={<FightsList/>} />
            <Route path = "/fighters" element={<FightersList/>} />
            <Route path = "/predict" element={<Predict/>} />
            <Route path = "/fight/:fightId" element={<Fight/>} />
            <Route path = "/fighter/:name" element={<Fighter/>} />
          </Route>
        </Routes>
      </BrowserRouter>
        </FighterContext.Provider>
      </FightContext.Provider>
    )
}
export default App