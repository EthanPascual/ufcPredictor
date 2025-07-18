import { useState } from "react"
import { currentFighters } from "./data/tempFighter"

function Predict(){
    const [fighter1, setFighter1] = useState('')
    const [fighter2, setFighter2] = useState('')
    const [result, setResult] = useState('')

    const handleClick = () => {
        if(fighter1 && fighter2){
            setResult(fighter1 + " will win by TKO in Round 3")
        } else {
            setResult("You need to select two fighters")
        }
        
    }

    return (
        <>
            <h1>Predict a Fight</h1>
            <p>Select 2 Fighters:</p>
            <select value={fighter1} onChange={e=>(setFighter1(e.target.value))}>
                <option value="" disabled>Fighter 1...</option>
                {currentFighters.map((fighter, index) => (
                    <option key={index} value={fighter.name}>{fighter.name}</option>
                ))}
            </select>
            <select value={fighter2} onChange={e=>(setFighter2(e.target.value))}>
                <option value="" disabled>Fighter 2...</option>
                {currentFighters.map((fighter, index) => (
                    <option key={index} value={fighter.name}>{fighter.name}</option>
                ))}
            </select>
            <button onClick={handleClick}>Predict</button>
            {result && <p>{result}</p>}
        </>
    )
}
export default Predict