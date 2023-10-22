import { useState, useEffect, createContext, useRef, useContext } from "react";
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
import FetchResponse from "../../containers/FetchResponse";
import FetchEndTurn from "../../containers/FetchEndTurn";

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
  const [canDefend, setCanDefend] = useState(false);

  let gameId = 0;
  let playerId = 0;
  if (!params.state) {
    gameId = 1;
    playerId = 1;
  } else {
    gameId = params.state.gameId;
    playerId = params.state.playerId;
  }
  
  //polling for gameData
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

  //polling for player
  useEffect(() => { 
    FetchPlayer({ setPlayer, gameId, playerId });
  },[gameData.turn])


  useEffect(() => {
    const action = discard ? 1 : 2;
    if (discard) {
      setActionText("Descartar carta");
    } else {
      setActionText("Jugar carta");
    }
    switch (cardSelected.code) {
      case "whk":
      case "vte":
        setCanPlayCard({
          canPlayCard: (playerSelected.name === undefined || discard) && cardSelected.cardId !== undefined,
          action: action
        });
        break;
      case "ndb":
        setCanDefend(gameData.turn.state === 2 && gameData.turn.destination_player === player.name && gameData.turn.played_card.code === "lla");
        break;
      default:
        setCanPlayCard({
          canPlayCard: (playerSelected.name !== undefined || discard) && cardSelected.cardId !== undefined,
          action: action
        });
        break;
    }

  }, [playerSelected, discard, gameData.turn]);

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

 const defendCard = () => {
    FetchResponse({
      "game_id": gameId,
      "player_id": playerId,
      "response_card_id": cardSelected.cardId
    });

    setPlayerSelected({});
    setCardSelected({});
    setCanPlayCard({});
    setDiscard(false);
  }
  

  const notDefendCard = () => {
    FetchResponse({
      "game_id": gameId,
      "player_id": playerId,
      "response_card_id": null,
    });

    setPlayerSelected({});
    setCardSelected({});
    setCanPlayCard({});
    setDiscard(false);
  }
  
  useEffect(() => {
    if (gameData.state === 1){
      if (gameData.turn.state === 5) {
        FetchEndTurn({
          gameId,
        })
      };
    }
  }, [gameData.turn]); 


  const gameStyle = `
    ${gameData.state === 0 ? "lobby" : "game"}
  `;

  useEffect(() => {
    if (gameData.state === 2) {
      navigate("/end-of-game", { state: { gameId, players } });
    }
  }, [gameData]);

  let renderer;
  switch (gameState) {
    // lobby
    case 0:
      renderer = (
        <PlayerContext.Provider value={player}>
          <GameContext.Provider value={gameData}>
            <Lobby players={players}></Lobby>
          </GameContext.Provider>
        </PlayerContext.Provider>
          )      
      break;
    // deadPlayer
    case 3:
      renderer = (
        <DeadPlayer></DeadPlayer>
      )
      break;
    // game
    case 1:
      renderer = (
        <div className={"game"}>
          <span className={style.title} data-testid="La Cosa">La Cosa</span>
          <span className={style.span}>Jugando en {gameData.name}</span>
          <GameContext.Provider value={gameData}>
            <PlayerContext.Provider value={player}>
              <CardSelectedContext.Provider value={cardSelected}>
                  <SetPlayerSelectedContext.Provider value={setPlayerSelected}>
                    <SetDiscardContext.Provider value={{setDiscard: setDiscard, discard:discard}}>
                      <PlayersAliveContext.Provider value={players.filter(player => player.alive === true)}>
                        <PlayerSelectedContext.Provider value={playerSelected.name}>
                          <Table players={players} />
                        </PlayerSelectedContext.Provider>
                      </PlayersAliveContext.Provider>
                      {canPlayCard.canPlayCard && <FunctionButton text={actionText} onClick={playCard} />}
                      {canDefend && <FunctionButton text={"Defenderme"} onClick={defendCard}/>}
                      {canDefend && <FunctionButton text={"No defenderme"} onClick={notDefendCard} />}
                          <Deck />
                    </SetDiscardContext.Provider>
                  </SetPlayerSelectedContext.Provider>
                  
                  <div>
                    <SetCardSelectedContext.Provider value={setCardSelected}>
                      <Hand gameId={gameId} playerId={playerId} />
                    </SetCardSelectedContext.Provider>
                  </div>
              </CardSelectedContext.Provider>
            </PlayerContext.Provider>
          </GameContext.Provider>  
        </div>
      )
      break;
    
  }
  return (renderer);
};

export default Game;
