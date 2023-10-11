import { useState, useEffect, createContext } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import "./game.module.css";
import Lobby from "./lobby/Lobby";
import Hand from "./hand/Hand";
import Player from "./player/Player";
import Table from "./table/Table";
import FetchData from "../../containers/FetchGame";
import FetchPlayer from "../../containers/FetchPlayer";
import Deck from './deck/Deck';
import FunctionButton from "../functionButton/FunctionButton";
import FetchPlayCard from "../../containers/FetchPlayCard";

export const GameContext = createContext({})
export const PlayerContext = createContext({})
export const CardSelectedContext = createContext();
export const PlayerSelectedContext = createContext();
export const PlayersContext = createContext();
export const SetPlayerSelectedContext = createContext();
export const SetCardSelectedContext = createContext();
export const TurnOwnerContext = createContext();
export const PlayersAliveContext = createContext([]);

const Game = () => {
  const params = useLocation();
  const navigate = useNavigate();
  const [player, setPlayer] = useState([]);
 

  let gameId = 0;
  let playerId = 0;
  if (!params.state) {
    gameId = 1;
    playerId = 1;
  } else {
    gameId = params.state.gameId;
    playerId = params.state.playerId;
  }

  const [gameData, setGameData] = useState({});
  const [players, setPlayers] = useState([]);
  const [cardSelected, setCardSelected] = useState({});
  const [playerSelected, setPlayerSelected] = useState({});
  const [canPlayCard, setCanPlayCard] = useState(false);

  useEffect(() => {
    setCanPlayCard(playerSelected.name !== undefined && cardSelected.cardId !== undefined);
  }, [playerSelected]);

  const playCard = () => {
  FetchPlayCard({
    gameId: gameId,
    playerId: playerId,
    cardId: cardSelected.cardId,
    destination_name: playerSelected.name
    });
  setPlayerSelected({});
  setCardSelected({});
  setCanPlayCard({});
  };


  //Polling for game state and players list.
  useEffect(() => {
    FetchData({
      onSetGameData: setGameData,
      onSetPlayers: setPlayers,
      gameId: gameId,
    });
  });

  //This function should be changed for sprint 2. Is not doing polling. 
  useEffect(() => {
     FetchPlayer({setPlayer, gameId, playerId});
  },[gameData.turn_owner]);

  
  //This function should be changed for sprint 2. Is not doing polling. 
  // useEffect(() => {
  //     FetchPlayer({setPlayer, gameId, playerId});
  // },[gameData.state]);
 
  const gameStyle = `
    ${gameData.state === 0 ? "lobby" : "game"}
  `;
 
  useEffect(() => {
    if (gameData.state === 2) {
      navigate("/end-of-game");
     }
  }, [gameData]);
 
  return (

     <div className={gameStyle}>
       <div>
        {gameData.state === 0 ? (
            <PlayerContext.Provider value={player}>
              <GameContext.Provider value={gameData}>
                <Lobby players={players}></Lobby>
              </GameContext.Provider>
            </PlayerContext.Provider>
         ) : (
           <>
              <span>Jugando en {gameData.name}</span>
            <CardSelectedContext.Provider value={cardSelected}>
              <TurnOwnerContext.Provider value={gameData.turn_owner}>
                <PlayersAliveContext.Provider value={players.filter(player => player.alive === true)}>
                  <SetPlayerSelectedContext.Provider value={setPlayerSelected}>
                    <PlayerSelectedContext.Provider value={playerSelected.name}>
                      <Table players={players} />
                    </PlayerSelectedContext.Provider>
                  </SetPlayerSelectedContext.Provider>
                </PlayersAliveContext.Provider>

                {canPlayCard && <FunctionButton text={"Jugar carta"} onClick={playCard} />}
              <GameContext.Provider value={gameData}>
                <PlayerContext.Provider value={player}>
                  <Deck/>
                </PlayerContext.Provider>
              </GameContext.Provider>
                <div>
                  <SetCardSelectedContext.Provider value={setCardSelected}>
                    <Hand gameId={gameId} playerId={playerId} />
                  </SetCardSelectedContext.Provider>
                </div>
              </TurnOwnerContext.Provider>
            </CardSelectedContext.Provider>
           </>
         )}
       </div>
      </div>);

};

export default Game;
