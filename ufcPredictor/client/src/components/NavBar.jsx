import { Link, NavLink } from "react-router"
import "../styles/nav.css"
function NavBar() {
    return(
        <>
            <nav className="nav">
                <Link to="/" className="title">FightIQ</Link>
                <ul>
                    <li><NavLink to="/fights" end>Fights</NavLink></li>
                    <li><NavLink to="/fighters" end>Fighters</NavLink></li>
                    <li><NavLink to="/predict" end>Predict</NavLink></li>
                </ul>
            </nav>
        </>
    )
}
export default NavBar