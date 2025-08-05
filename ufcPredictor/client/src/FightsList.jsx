import { mockFights } from "./data/mockFight"
import { useNavigate } from "react-router"
import axios from 'axios'
import { useEffect, useState, useContext } from "react"
import { FightContext } from "./DataContext"


function FightsList(){
    const fightData = useContext(FightContext)

    const [fights, setFights] = useState([])

    const navigate = useNavigate()
    useEffect(() => {
        setFights(fightData)
    }, [fightData])

    return (
        <>
        {fights ? (
            <>
                <h1>Fights:</h1>
            <div className="tableContainer">
                <table>
                    <thead>
                        <tr>
                        <th>Fighter 1</th>
                        <th>Fighhter 2</th>
                        <th>Method</th>
                        <th>Round</th>
                        <th>Time</th>
                        <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            fights.map((fight, index) => (
                                <tr key={fight._id} onClick={() => navigate('/fight/' + fight._id)}>
                                    <td>{fight.winner && fight.winner.name === fight.fighter1.name ? <b>{fight.fighter1.name}</b> : fight.fighter1.name}</td>
                                    <td>{fight.winner && fight.winner.name === fight.fighter2.name ? <b>{fight.fighter2.name}</b> : fight.fighter2.name}</td>
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
        ):(
            <p>Loading Fights....</p>
        )}
            
        </>
    )
}
export default FightsList