import { useParams } from "react-router";

function Fight(){
    let params = useParams();

    return(
        <>
            <h1>{params.fightId}</h1>
        </>
    )
}
export default Fight