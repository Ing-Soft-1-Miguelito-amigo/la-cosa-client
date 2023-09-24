import { useNavigate } from "react-router-dom";

import Card from '../game/card/Card';
import lanzallamas from '/public/img/lanzallamas.jpg';
import './game.css'

const Game = () => {
    const navigate = useNavigate()
    const gotoEndOfGame = () => {
        navigate("/end-of-game")
    }

    return ( //Falta hacer un get de las cartas del jugador
        <>
        <div className="game">
            <h2>Esta es la partida</h2>
            <button onClick={ gotoEndOfGame }>Ir a pantalla de finalizcion de partida</button>
        </div> 
        <div className="card-container">
                <Card id="card1" img={lanzallamas}/> 
                <Card id="card2" img={lanzallamas}/>
                <Card id="card3" img={lanzallamas}/>
                <Card id="card4" img={lanzallamas}/>
            </div>
        </>
    )
}

export default Game;