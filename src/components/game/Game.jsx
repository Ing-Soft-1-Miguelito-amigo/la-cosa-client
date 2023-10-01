import { useNavigate } from "react-router-dom";
import Hand from './hand/hand';
import { gameId, playerId } from '../../mocks/gameData'

const Game = () => {
    const navigate = useNavigate()
    const gotoEndOfGame = () => {
        navigate("/end-of-game")
    }

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
