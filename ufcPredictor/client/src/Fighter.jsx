import { useParams } from "react-router"

function Fighter(){
    let params = useParams();

    return (
        <>
            <h1>{params.name}</h1>
        </>
    )
}
export default Fighter