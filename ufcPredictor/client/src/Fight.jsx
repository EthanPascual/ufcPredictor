import { useParams } from "react-router";
import {mockFights} from "./data/mockFight"

function Fight(){
    let params = useParams();
    console.log(mockFights)

    return(
        <>
            <h1>{params.fightId}</h1>
            
        </>
    )
}
export default Fight