import { useParams } from "react-router"
import { currentFighters } from "./data/tempFighter"
import { mockFights } from "./data/mockFight"
import "./index.css"
import { useNavigate } from "react-router"
import axios from 'axios'
import { useEffect, useState } from "react"

function Fighter(){
    let params = useParams();
    let navigate = useNavigate()
    const [currFighter, setFighter] = useState();
    useEffect(() => {
        async function fetchData(){
            console.log(params.name)
            await axios.get(`http://localhost:3000/fighters/${params.name}`).then(res => {
                setFighter(res.data);
                console.log("Teseting");
            });
        }
        fetchData();
    }, [params.name])
    let fights = mockFights.filter(fight => fight.fighter1 == params.name || fight.fighter2 == params.name)
    return (
        <>
            {currFighter ? (
                <>
                <div className="">
            <h1>{currFighter.name}</h1>
            <h2>"{currFighter.nickname}"</h2>
            <img src={`/${currFighter.image}`} />
            <p>Record: {currFighter.wins}/{currFighter.losses}/{currFighter.draw}</p>
        </div>
        <h1>Fights:</h1>
        <div className="tableContainer">
            <table>
                <thead>
                    <tr>
                    <th>Fighter 1</th>
                    <th>Fighter 2</th>
                    <th>Method</th>
                    <th>Round</th>
                    <th>Time</th>
                    <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        fights.map((fight, index) => (
                            <tr key={fight.fightId} onClick={() => navigate('/fight/' + fight.fightId)}>
                                <td>{fight.winner === fight.fighter1 ? <b>{fight.fighter1}</b> : fight.fighter1}</td>
                                <td>{fight.winner === fight.fighter2 ? <b>{fight.fighter2}</b> : fight.fighter2}</td>
                                <td>{fight.method}</td>
                                <td>{fight.round}</td>
                                <td>{fight.time}</td>
                                <td>{fight.date}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
            </>
            ) : (
                <p>Loading Fighter...</p>
            )
                
            
            }
            
            
        </>
    )
}
export default Fighter