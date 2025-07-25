import '../styles/card.css'
import { Link } from 'react-router'

function FighterCard({fighter}){
    let link = "/fighter/" + fighter.name;
    return(
        <>
        <div className='padded'>
        <Link to={link}>
        <div className="card">
            <img src={`/${fighter.image}`} />
            <h2>{fighter.name}</h2>
            <p>{fighter.wins}/{fighter.losses}/{fighter.draw}</p>
        </div>
        </Link>
        </div>
       
        
        </>
    )
}
export default FighterCard