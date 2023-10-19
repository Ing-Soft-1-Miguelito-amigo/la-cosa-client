import { useState, useEffect, createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./game.module.css";
import Lobby from "./lobby/Lobby";
import Hand from "./hand/Hand";
import Player from "./player/Player";
import Table from "./table/Table";
import FetchData from "../../containers/FetchGame";
import FetchPlayer from "../../containers/FetchPlayer";
import Deck from './deck/Deck';
import FunctionButton from "../functionButton/FunctionButton";
import FetchPlayCard from "../../containers/FetchPlayCard";
import DeadPlayer from "./deadPlayer/DeadPlayer";
import FetchDiscard from '../../containers/FetchDiscard';


export const GameContext = createContext({})
export const PlayerContext = createContext({})
export const CardSelectedContext = createContext();
export const PlayerSelectedContext = createContext();
export const PlayersContext = createContext();
export const SetPlayerSelectedContext = createContext();
export const SetCardSelectedContext = createContext();
export const TurnOwnerContext = createContext();
export const PlayersAliveContext = createContext([]);
export const SetDiscardContext = createContext();


const Game = () => {
  const params = useLocation();
  const navigate = useNavigate();
  const [player, setPlayer] = useState([]);
  const [gameData, setGameData] = useState({});
  const [players, setPlayers] = useState([]);
  const [cardSelected, setCardSelected] = useState({});
  const [playerSelected, setPlayerSelected] = useState({});
  const [canPlayCard, setCanPlayCard] = useState(false);
  const [discard, setDiscard] = useState(false);
  const [actionText, setActionText] = useState("");
  // gameState 0 -> lobby, 1 -> game, 2 -> end-of-game, 3 -> deadPlayer
  const [gameState, setGameState] = useState();

  let gameId = 0;
  let playerId = 0;
  if (!params.state) {
    gameId = 1;
    playerId = 1;
  } else {
    gameId = params.state.gameId;
    playerId = params.state.playerId;
  }


  useEffect(() => {
    const action = discard ? 1 : 2;
    if (discard) {
      setActionText("Descartar carta");
    } else {
      setActionText("Jugar carta");
    }
    setCanPlayCard({
      canPlayCard: (playerSelected.name !== undefined || discard) && cardSelected.cardId !== undefined,
      action: action
    });
  }, [playerSelected, discard]);

  const playCard = () => {
    if (canPlayCard.action === 1) {
      FetchDiscard({
        gameId: gameId,
        playerId: playerId,
        cardId: cardSelected.cardId
      });
    } else if (canPlayCard.action === 2) {
      FetchPlayCard({
        gameId: gameId,
        playerId: playerId,
        cardId: cardSelected.cardId,
        destination_name: playerSelected.name
      });
    }
    setPlayerSelected({});
    setCardSelected({});
    setCanPlayCard({});
    setDiscard(false);
  };

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  //Polling for game state and players list.
  useEffect(() => {
    FetchData({
      onSetGameData: setGameData,
      onSetPlayers: setPlayers,
      gameId: gameId,
    });

    // gameState 0 -> lobby, 1 -> game, 2 -> end-of-game, 3 -> deadPlayer
    setGameState(gameData.state);
    if (players[playerId - 1] && !players[playerId - 1].alive) {
      setGameState(3);
    }
  });

  //This function should be changed for sprint 2. Is not doing polling. 
  useEffect(() => {
    FetchPlayer({ setPlayer, gameId, playerId });
  }, [gameData.turn_owner]);



  //This function should be changed for sprint 2. Is not doing polling. 
  // useEffect(() => {
  //     FetchPlayer({setPlayer, gameId, playerId});
  // },[gameData.state]);

  const gameStyle = `
    ${gameData.state === 0 ? "lobby" : "game"}
  `;

  useEffect(() => {
    if (gameData.state === 2) {
      navigate("/end-of-game", { state: { gameId, players } });
    }
  }, [gameData]);

  switch (gameState) {
    // lobby
    case 0:
      return (
        <PlayerContext.Provider value={player}>
          <GameContext.Provider value={gameData}>
            <Lobby players={players}></Lobby>
          </GameContext.Provider>
        </PlayerContext.Provider>
      )

    // deadPlayer
    case 3:
      return (
        <DeadPlayer></DeadPlayer>
      )

    // game
    default:
      return (
        <div className={"game"}>
          <span className={style.title} data-testid="La Cosa">La Cosa</span>
          <span className={style.span}>Jugando en {gameData.name}</span>
          <CardSelectedContext.Provider value={cardSelected}>
            <TurnOwnerContext.Provider value={gameData.turn_owner}>
              <SetPlayerSelectedContext.Provider value={setPlayerSelected}>
                <SetDiscardContext.Provider value={{setDiscard: setDiscard, discard:discard}}>
                  <PlayersAliveContext.Provider value={players.filter(player => player.alive === true)}>
                    <PlayerSelectedContext.Provider value={playerSelected.name}>
                      <Table players={players} />
                    </PlayerSelectedContext.Provider>
                  </PlayersAliveContext.Provider>

                  {canPlayCard.canPlayCard && <FunctionButton text={actionText} onClick={playCard} />}

                  <GameContext.Provider value={gameData}>
                    <PlayerContext.Provider value={player}>
                      <Deck />
                    </PlayerContext.Provider>
                  </GameContext.Provider>
                </SetDiscardContext.Provider>
              </SetPlayerSelectedContext.Provider>
              <div>
                <SetCardSelectedContext.Provider value={setCardSelected}>
                  <Hand gameId={gameId} playerId={playerId} />
                </SetCardSelectedContext.Provider>
              </div>
            </TurnOwnerContext.Provider>
          </CardSelectedContext.Provider>
        </div>
      )
  }

};

export default Game;
