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


const Game = ({socket, player, gameData, gameId, playerId}) => {
  const [cardSelected, setCardSelected] = useState({});//{cardId, code, kind}
  const [playerSelected, setPlayerSelected] = useState({});//{name}
  const [canPlayCard, setCanPlayCard] = useState(false);
  const [discard, setDiscard] = useState(false);
  const [actionText, setActionText] = useState("");
  const [hasCardToDefend, setHasCardToDefend] = useState();

  socket.on("discard",  (data) => console.log(JSON.stringify(data)));
  socket.on("action",   (data) => console.log(JSON.stringify(data)));
  socket.on("defense",  (data) => console.log(JSON.stringify(data)));
  socket.on("analisis", (data) => console.log(JSON.stringify(data)));
  socket.on("whisky",   (data) => console.log(JSON.stringify(data)));
  socket.on("sospecha", (data) => console.log(JSON.stringify(data)));


  const players = gameData.players;
  useEffect(() => {
      if ((gameData.turn.state === 5 && canPlayCard.action === 2) || canPlayCard.action === 1) {
        FetchEndTurn({
          gameId,
        })
      };
  },[gameData.turn])

  useEffect(() => {
    const action = discard ? 1 : 2;
    if (discard && cardSelected !== undefined) {
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
      default:
        setCanPlayCard({
          canPlayCard: (playerSelected.name !== undefined || discard) && cardSelected.cardId !== undefined,
          action: action
        });
        break;
    }
  }, [playerSelected, discard, cardSelected, gameData.turn]);

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
        destinationName: playerSelected.name === undefined ? player.name : playerSelected.name
      });
    }
    setPlayerSelected({});
    setCardSelected({});
    setDiscard(false);
  };
  
  const defendCard = (
    cardToDefend
    ) => {
      FetchResponse({
        gameId: gameId,
        playerId: playerId,
        responseCardId: cardToDefend
      });
    }

  // useEffect(()=>{
  //   if (cardSelected.cardId === undefined && !hasCardToDefend){
  //     defendCard(false);   
  //   }
  // },[hasCardToDefend]);


  return (
        <div className={"game"}>
          <span className={style.title} data-testid="La Cosa">La Cosa</span>
          <span className={style.span}>Jugando en {gameData.name}</span>
          <GameContext.Provider value={gameData}>
              <CardSelectedContext.Provider value={cardSelected}>
                  <SetPlayerSelectedContext.Provider value={setPlayerSelected}>
                    <SetDiscardContext.Provider value={{setDiscard: setDiscard, discard:discard}}>
                      <PlayersAliveContext.Provider value={players.filter(player => player.alive === true)}>
                        <PlayerSelectedContext.Provider value={playerSelected.name}>
                          <Table players={players} player={player}/>
                        </PlayerSelectedContext.Provider>
                      </PlayersAliveContext.Provider>
                      {canPlayCard.canPlayCard && <FunctionButton text={actionText} onClick={playCard} />}
                      {hasCardToDefend && <FunctionButton text={"Defenderme"} onClick={() => defendCard(true)}/>}
                      {hasCardToDefend && <FunctionButton text={"No defenderme"} onClick={() => defendCard(false)} />}
                          <Deck player={player}/>
                    </SetDiscardContext.Provider>
                  </SetPlayerSelectedContext.Provider>
                  
                  <div>
                    <SetCardSelectedContext.Provider value={setCardSelected}>
                      {player.alive ? <Hand gameId={gameId} playerId={playerId} onSetHasCardToDefend={setHasCardToDefend}
                       player={player} gameData={gameData} setCardSelected={setCardSelected} defendCard={defendCard}/>: <DeadPlayer/>}
                    </SetCardSelectedContext.Provider>
                  </div>
              </CardSelectedContext.Provider>
          </GameContext.Provider>  
        </div>) 
};

export default Game;
