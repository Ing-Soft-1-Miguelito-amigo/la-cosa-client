import { useNavigate } from "react-router-dom";

const GameJoinForm = () => {
    const navigate = useNavigate()
    const gotoGame = () => {
        navigate("/game")
    }

    return (
        <div className="gameJoinForm">
            <h2>Formulario para entrar a una partida</h2>
            <button onClick={gotoGame}>Entrar a la partida</button>
        </div>
    )
}

export default GameJoinForm;