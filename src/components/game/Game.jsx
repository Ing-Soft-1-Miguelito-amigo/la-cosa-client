import { useNavigate } from "react-router-dom";

const Game = () => {
    const navigate = useNavigate()
    const gotoEndOfGame = () => {
        navigate("/end-of-game")
    }

    return (
        <div className="game">
            <h2>Esta es la partida</h2>
            <button onClick={ gotoEndOfGame }>Ir a pantalla de finalizcion de partida</button>
        </div>
    )
}

export default Game;