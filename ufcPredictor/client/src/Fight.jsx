import { useParams } from "react-router";
import {mockFights} from "./data/mockFight"
import FighterCard from "./components/FighterCard"
import { currentFighters } from "./data/tempFighter"; 

function Fight(){
    let params = useParams();
    let currFight = mockFights.find(fight => fight.fightId == params.fightId)
    let fighter1 = currentFighters.find(fighter => currFight.fighter1 == fighter.name)
    let fighter2 = currentFighters.find(fighter => currFight.fighter2 == fighter.name)
    console.log(currFight)

    return(
        <>
            <h2>{currFight.fighter1} vs. {currFight.fighter2}</h2>
            <p>{currFight.date}</p>
            <div className="cardContainer">
                <FighterCard fighter={fighter1}/> <FighterCard fighter={fighter2} />
            </div>
            <h3>Winner: {currFight.winner}</h3>
            <p>Method: {currFight.method}<br/>Round: {currFight.round} <br/> Time: {currFight.time}</p>
        </>
    )
}
export default Fight