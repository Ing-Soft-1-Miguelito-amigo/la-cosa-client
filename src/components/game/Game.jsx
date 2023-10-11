import { useState, useEffect, createContext } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import { httpRequest } from "../../services/HttpService";
import styles from "./game.module.css";
import Lobby from "./lobby/Lobby";
import Hand from "./hand/Hand";
import Player from "./player/Player";
import Table from "./table/Table";
import FetchData from "../../containers/FetchGame";
import FetchPlayer from "../../containers/FetchPlayer";
import Deck from './deck/Deck';

export const GameContext = createContext({})
export const PlayerContext = createContext({})


const Game = () => {
  const params = useLocation();
  const navigate = useNavigate();
  const [apiData, setApiData] = useState({});
  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState([]);

  //For tests porpuses; it does not affect normal flow of the component
  let gameId = 0;
  let playerId = 0;
  if (!params.state) {
    gameId = 1;
    playerId = 1;
  } else {
    gameId = params.state.gameId;
    playerId = params.state.playerId;
  }

  //Polling for game state and players list.
  useEffect(() => {
    FetchData({
      onSetApiData: setApiData,
      onSetPlayers: setPlayers,
      gameId: gameId,
    });
  });

  //This function should be changed for sprint 2. Is not doing polling. 
  useEffect(() => {
     FetchPlayer({setPlayer, gameId, playerId});
  },[apiData.state]);

  const gameStyle = `
        ${apiData.state === 0 ? "lobby" : "game"}
    `;

  useEffect(() => {
    if (apiData.state === 2) {
      navigate("/end-of-game");
    }
  }, [apiData]);

  return (
    <div className={gameStyle}>
      <div>
        {apiData.state === 0 ? (
            <PlayerContext.Provider value={player}>
              <GameContext.Provider value={apiData}>
                <Lobby players={players}></Lobby>
              </GameContext.Provider>
            </PlayerContext.Provider>
        ) : (
          <>
            <div>
              <span className={styles.title}>La Cosa</span>
            </div>
            <div>
              <span className={styles.span}>Jugando en {apiData.name}</span>
            </div>
            <Table players={players} apiData={apiData} />
            <div>
              <Hand gameId={gameId} playerId={playerId} />
            </div>
            <div> 
              <GameContext.Provider value={apiData}>
                <PlayerContext.Provider value={player}>
                  <Deck/>
                </PlayerContext.Provider>
              </GameContext.Provider>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Game;
