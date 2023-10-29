import { useState, useEffect, createContext, useRef, useContext } from "react";
import style from "./game.module.css";
import Hand from "./hand/Hand";
import Table from "./table/Table";
import Deck from './deck/Deck';
import FunctionButton from "../functionButton/FunctionButton";
import FetchPlayCard from "../../containers/FetchPlayCard";
import DeadPlayer from "./deadPlayer/DeadPlayer";
import FetchDiscard from '../../containers/FetchDiscard';
import FetchResponse from "../../containers/FetchResponse";
import FetchEndTurn from "../../containers/FetchEndTurn";
import CardWhisky from '../game/cardEffects/cardWhisky';
import CardAnalysis from "../game/cardEffects/cardAnalysis";
import CardSuspicion from "../game/cardEffects/cardSuspicion";
import { set } from "react-hook-form";

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
  const [hasCardToDefend, setHasCardToDefend] = useState(false);
  const [cardAnalysis, setCardAnalysis] = useState(false);
  const [cardSuspicion, setCardSuspicion] = useState(false);
  const [cardWhisky, setCardWhisky] = useState(false);
  const [analysisData, setAnalysisData] = useState({});
  const [suspicionData, setSuspicionData] = useState({});
  const [whiskyData, setWhiskyData] = useState({});

  socket.on("discard",  (data) => console.log(JSON.stringify(data)));
  socket.on("action",   (data) => console.log(JSON.stringify(data)));
  socket.on("defense",  (data) => console.log(JSON.stringify(data)));
  socket.on("analisis", (data) => {setCardAnalysis(true); setAnalysisData(data)});
  socket.on("whisky",   (data) => {setCardWhisky(true); setWhiskyData(data)});
  socket.on("sospecha", (data) => {setCardSuspicion(true); setSuspicionData(data)});


  const players = gameData.players;
  useEffect(() => {
      if ((gameData.turn.state === 5 && canPlayCard.action === 2) || canPlayCard.action === 1) {
        FetchEndTurn({
          gameId,
        })
      };
  },[gameData.turn.state])

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
      if (cardToDefend !== null){
        console.log("SI puede defenderse")
        setHasCardToDefend(true);    
      }else{
        defend(false);
      }
    }

  const defend = (
    defend
  ) => {
    FetchResponse({
      gameId: gameId,
      playerId: playerId,
      responseCardId: (defend ? cardSelected.cardId : null)
    });
    setHasCardToDefend(false);
    setCardSelected({});
  }

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
                      {hasCardToDefend && <FunctionButton text={"Defenderme"} onClick={() => defend(true)}/>}
                      {hasCardToDefend && <FunctionButton text={"No defenderme"} onClick={() => defend(false)} />}
                      {cardAnalysis && <CardAnalysis data={analysisData} setCardAnalysis={setCardAnalysis}/>}
                      {cardSuspicion && <CardSuspicion data={suspicionData} setCardSuspicion={setCardSuspicion}/>}
                      {cardWhisky && <CardWhisky data={whiskyData} setCardWhisky={setCardWhisky}/>}
                      {!(cardAnalysis || cardSuspicion ||  cardWhisky) && <Deck player={player}/>}
                    </SetDiscardContext.Provider>
                  </SetPlayerSelectedContext.Provider>
                  
                  <div>
                      {player.alive ? <Hand player={player} 
                                            gameData={gameData} 
                                            setCardSelected={setCardSelected} 
                                            defendCard={defendCard}/>
                                    : <DeadPlayer socket={socket}/>}
                  </div>
              </CardSelectedContext.Provider>
          </GameContext.Provider>  
        </div>) 
};

export default Game;
