import { currentFighters } from "./data/tempFighter"
import FighterCard from "./components/FighterCard"
import './index.css'
import { useState, useEffect } from "react"
import axios from 'axios'
function FightersList(){
    const [displayFighters, setFighters] = useState([])

    useEffect(() => {
        async function fetchData(){
            await axios.get('http://localhost:3000/fighters').then((res) => setFighters(res.data));
        }
        fetchData();
    }, [])

    const [input, setInput] = useState('')
    const handleSearch = (text) => {
        setInput(text)
        text = text.toLowerCase()
        setFighters(currentFighters.filter(fighter => {
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
                {displayFighters.map((currFighter, index) => (
                    <FighterCard key={index} fighter={currFighter} />
                ))}
            </div>
            
        </>
    )
}
export default FightersList
