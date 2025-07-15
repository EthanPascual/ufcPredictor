import NavBar from "./components/NavBar";
import { Outlet } from "react-router";

function Layout(){
    return(
        <>
            <NavBar />
            <Outlet />
        </>
    )
}
export default Layout