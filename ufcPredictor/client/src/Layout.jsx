import NavBar from "./components/NavBar";
import { Outlet } from "react-router";
import './index.css'

function Layout(){
    return(
        <>
            <NavBar />
            <div className="main">
                <Outlet />
            </div>
            
        </>
    )
}
export default Layout