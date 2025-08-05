import { currentFighters } from "./data/tempFighter"
import FighterCard from "./components/FighterCard"
import './index.css'
import { useState, useEffect, useContext } from "react"
import axios from 'axios'
import { FighterContext } from "./DataContext"
function FightersList(){
    const fighterData = useContext(FighterContext)

    const [displayFighters, setFighters] = useState([])
    const [filterFighters, setFilterFighters] = useState([])

    useEffect(() => {
        setFighters(fighterData)
        setFilterFighters(fighterData)
    }, [fighterData])

    const [input, setInput] = useState('')
    const handleSearch = (text) => {
        setInput(text)
        text = text.toLowerCase()
        setFilterFighters(displayFighters.filter(fighter => {
            let lowerName = fighter.name.toLowerCase();
            return lowerName.includes(text);
        }));
    }

    return (
        <>
            <h1>Fighters</h1>
            <div className="input-wrapper">
                <input 
                    placeholder="Type to search..." 
                    value={input} 
                    onChange={e => handleSearch(e.target.value)}/>
            </div>
            <div className="fighterGrid">
                {filterFighters.map((currFighter, index) => (
                    <FighterCard key={index} fighter={currFighter} />
                ))}
            </div>
            
        </>
    )
}
export default FightersList
