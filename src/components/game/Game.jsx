import { useNavigate } from "react-router-dom";
import Hand from './hand/hand';

const Game = () => {
    const navigate = useNavigate()
    const gotoEndOfGame = () => {
        navigate("/end-of-game")
    }

    const gameId = 1; 
    const playerId = 1;

    return (
        <>
        <div>
            <h2>Esta es la partida</h2>
            <button onClick={ gotoEndOfGame }>Ir a pantalla de finalizcion de partida</button>
        </div> 
        <div>
            <Hand
            gameId={gameId}
            playerId={playerId}
            />
        </div>
        </>
    )
}

export default Game;
