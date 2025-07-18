import { mockFights } from "./data/mockFight"
import { useNavigate } from "react-router"

function FightsList(){
    const navigate = useNavigate()
    return (
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
                            mockFights.map((fight, index) => (
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
    )
}
export default FightsList