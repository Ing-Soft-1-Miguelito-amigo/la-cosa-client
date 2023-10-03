import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./game.module.css";
import Player from "./players/Player";
import { httpRequest } from "../../services/HttpService";
import Lobby from "./lobby/Lobby";
import Hand from './hand/hand';

const Game = () => {
    const params = useLocation();
    const gameId = params.state.gameId
    const playerId = params.state.playerId
    const [apiData, setApiData] = useState({});
    const [players, setPlayers] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
<<<<<<< HEAD
                const apiData = await httpRequest({ method: 'GET', service: 'game/' + game_id });
=======
                const apiData = await httpRequest({ method: 'GET', service: 'game/' + gameId });
>>>>>>> a50e5e4 (Agregar pasaje de variables globales entre componentes)
                setApiData(apiData.json);
                setPlayers(apiData.json.players);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
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

    // sorts players array by table_position in increasing order
    players.sort((a, b) => a.table_position - b.table_position);        

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
                        <div className={styles.playersContainer}>
                            {players.map((player, index) => {
                                return (
                                        <Player
                                            key={index} 
                                            name={player.name}
                                            apiData={apiData}
                                        />
                                )
                            })}
                        </div>
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
