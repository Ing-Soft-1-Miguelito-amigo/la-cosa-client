import { useNavigate } from "react-router-dom";

const EndOfGame = () => {
    const navigate = useNavigate()
    const gotoHome = () => {
        navigate("/home")
    }

    return (
        <div className="endOfGame">
            <h2>Partida finalizada</h2>
            <button onClick={ gotoHome }>Volver al menu principal</button>
        </div>
    )
}

export default EndOfGame;