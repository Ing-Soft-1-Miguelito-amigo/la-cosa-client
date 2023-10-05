import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./game.module.css";
import Lobby from "./lobby/Lobby";
import Hand from './hand/Hand';
import Table from "./table/Table";
import FetchData from "../../containers/FetchGame";


const Game = () => {
    const params = useLocation();
    
    // for tests porpuses; it does not affect normal flow of the component
    let gameId = 0
    let playerId = 0
    if (!params.state) {
        gameId = 1
        playerId = 1
    } else {
        gameId = params.state.gameId
        playerId = params.state.playerId
    }
    
    const [apiData, setApiData] = useState({});
    const [players, setPlayers] = useState([]);
    
    useEffect(() => {
        FetchData(
            onSetApiData = setApiData,
            onSetPlayers = setPlayers,
        );
    }, []);

    const gameStyle = `
        ${apiData.state === 0 ? "lobby" : "game"}
    `;
    
    useEffect(() => {
        if (apiData.state === 2) {
            const navigate = useNavigate();
            navigate("/end-of-game");
        }
    }, [apiData]);


    return (
        <div className={gameStyle}>
            <div>
                {apiData.state === 0 ? (
                    <Lobby players={players}></Lobby>
                ) : (
                    <>  
                       <div>
                            <span>La Cosa</span>
                        </div>
                        <div>
                            <span>Jugando en {apiData.name}</span>
                        </div>
                            <Table 
                                players = {players} 
                                apiData={apiData}
                            />
                        <div>
                            <Hand
                                gameId={gameId}
                                playerId={playerId}
                            />
                      </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Game;
