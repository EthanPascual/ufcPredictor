import { currentFighters } from "./data/tempFighter"
import FighterCard from "./components/FighterCard"
import './index.css'
function FightersList(){
    return (
        <>
            <h1>Fighters</h1>
            <div className="fighterGrid">
                {currentFighters.map((currFighter, index) => (
                    <FighterCard fighter={currFighter} />
                ))}
            </div>
            
        </>
    )
}
export default FightersList
