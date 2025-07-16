import '../styles/card.css'
import { Link } from 'react-router'

function FighterCard({fighter}){
    let link = "/fighter/" + fighter.name;
    return(
        <>
        
        <div className="card">
        <Link to={link}>
            <img src={fighter.image} />
            <h2>{fighter.name}</h2>
            <p>{fighter.wins}/{fighter.losses}/{fighter.draw}</p>
        </Link>
        </div>
        
        </>
    )
}
export default FighterCard