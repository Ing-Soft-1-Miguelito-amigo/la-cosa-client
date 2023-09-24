import { useNavigate } from "react-router-dom";

const GameCreationForm = () => {
    const navigate = useNavigate()
    const gotoGame = () => {
        navigate("/game")
    }

    return (
        <div className="gameCreationForm">
            <h2>Esto es el form de creacion de partida</h2>
            <button onClick={ gotoGame }>Pasar a partida</button>
        </div>
    )
}

export default GameCreationForm;