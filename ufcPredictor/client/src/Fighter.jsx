import { useParams } from "react-router"
import { currentFighters } from "./data/tempFighter"
import "./index.css"

function Fighter(){
    let params = useParams();
    let currFighter = currentFighters.find(fighter => fighter.name == params.name)

    return (
        <>
            <div className="infoContainer">
                <h1>{currFighter.name}</h1>
                <h2>"{currFighter.nickname}"</h2>
                <img src={currFighter.image} />
                <p>Record: {currFighter.wins}/{currFighter.losses}/{currFighter.draw}</p>
            </div>
            
        </>
    )
}
export default Fighter