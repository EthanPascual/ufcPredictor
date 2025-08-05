import { useParams } from "react-router";
import FighterCard from "./components/FighterCard"
import {useState, useEffect} from "react";
import axios from 'axios';

function Fight(){
    let params = useParams();
    const [currFight, setCurrFight] = useState();
    
    useEffect(() => {
        async function fetchData(){
            await axios.get(`http://localhost:3000/fights/${params.fightId}`).then(res => setCurrFight(res.data))
        }
        fetchData();
    });

    return(
        <>
        {currFight ? (
            <>
                <h2>{currFight.fighter1.name} vs. {currFight.fighter2.name}</h2>
            <p>{currFight.date}</p>
            <div className="cardContainer">
                <FighterCard fighter={currFight.fighter1}/> <FighterCard fighter={currFight.fighter2} />
            </div>
            <h3>Winner: {currFight.winner && currFight.winner.name}</h3>
            {!currFight.winner && <h3>Draw</h3>}
            <p>Method: {currFight.method}<br/>Round: {currFight.round} <br/> Time: {currFight.time}</p>
            </>
        ) : (
            <p>Loading Fight....</p>
        )}
            
        </>
    )
}
export default Fight