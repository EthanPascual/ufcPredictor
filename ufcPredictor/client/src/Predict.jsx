import { useState, useEffect } from "react"
import { currentFighters } from "./data/tempFighter"
import axios from 'axios'
import Select from 'react-select'

function Predict(){
    const [fighters, setFighters] = useState()
    const [fighter1, setFighter1] = useState('')
    const [fighter2, setFighter2] = useState('')
    const [result, setResult] = useState('')

    useEffect(() => {
        async function fetchData(){
            await axios.get('http://localhost:3000/fighters').then(res => setFighters(res.data))
        }
        fetchData()
    }, [])

    const handleClick = () => {
        if(fighter1 && fighter2){
            setResult(fighter1 + " will win by TKO in Round 3")
        } else {
            setResult("You need to select two fighters")
        }
        
    }

    return (
        <>
        {fighters ? (
            <>
                <h1>Predict a Fight</h1>
            <p>Select 2 Fighters:</p>
            <Select 
                options={fighters.map(f => ({value: f.name, label: f.name}))}
                onChange={selected => setFighter1(selected.value)}
                />
            <Select 
                options={fighters.map(f => ({value: f.name, label: f.name}))}
                onChange={selected => setFighter2(selected.value)}
                />
            <button onClick={handleClick}>Predict</button>
            {result && <p>{result}</p>}
            </>
        ) : (
            <p>Loading....</p>
        )}
            
        </>
    )
}
export default Predict