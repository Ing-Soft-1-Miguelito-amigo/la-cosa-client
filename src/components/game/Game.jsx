import { useState, useEffect, createContext, useRef, useContext } from "react";
import style from "./game.module.css";
import Hand from "./hand/Hand";
import Table from "./table/Table";
import Deck from "./deck/Deck";
import FunctionButton from "../functionButton/FunctionButton";
import FetchPlayCard from "../../containers/FetchPlayCard";
import DeadPlayer from "./deadPlayer/DeadPlayer";
import FetchDiscard from "../../containers/FetchDiscard";
import FetchResponse from "../../containers/FetchResponse";
import FetchEndTurn from "../../containers/FetchEndTurn";
import CardWhisky from "../game/cardEffects/cardWhisky";
import CardAnalysis from "../game/cardEffects/cardAnalysis";
import CardSuspicion from "../game/cardEffects/cardSuspicion";
import DeclareVictory from "../../containers/DeclareVictory";
import ExchangeCard from "../../containers/ExchangeCard";
import ResponseExchange from "../../containers/ResponseExchange";
import Chat from "./chat/Chat";
import Logs from "./logs/Logs";

export const GameContext = createContext({});
export const PlayerContext = createContext({});
export const CardSelectedContext = createContext();
export const PlayerSelectedContext = createContext();
export const PlayersContext = createContext();
export const SetPlayerSelectedContext = createContext();
export const SetCardSelectedContext = createContext();
export const TurnOwnerContext = createContext();
export const PlayersAliveContext = createContext([]);
export const SetDiscardContext = createContext();

const Game = ({ socket, player, gameData, gameId, playerId }) => {
  const [cardSelected, setCardSelected] = useState({}); //{cardId, code, kind}
  const [playerSelected, setPlayerSelected] = useState({}); //{name}
  const [canPlayCard, setCanPlayCard] = useState(false);
  const [discard, setDiscard] = useState(false);
  const [hasCardToDefendExchange, setHasCardToDefendExchange] = useState(false);
  const [actionText, setActionText] = useState("");
  const [hasCardToDefend, setHasCardToDefend] = useState(false);
  const [cardAnalysis, setCardAnalysis] = useState(false);
  const [cardSuspicion, setCardSuspicion] = useState(false);
  const [cardWhisky, setCardWhisky] = useState(false);
  const [analysisData, setAnalysisData] = useState({});
  const [suspicionData, setSuspicionData] = useState({});
  const [whiskyData, setWhiskyData] = useState({});
  const [instruction, setInstruction] = useState("")

  socket.on("discard", (data) => console.log(JSON.stringify(data)));
  socket.on("action", (data) => console.log(JSON.stringify(data)));
  socket.on("defense", (data) => console.log(JSON.stringify(data)));
  socket.on("analisis", (data) => {
    setCardAnalysis(true);
    setAnalysisData(data);
  });
  socket.on("whisky", (data) => {
    setCardWhisky(true);
    setWhiskyData(data);
  });
  socket.on("sospecha", (data) => {
    setCardSuspicion(true);
    setSuspicionData(data);
  });
  socket.on("quarantine", (data) => {
    //Modificar una vez modularizado
    setCardSuspicion(true);
    setSuspicionData(data);
  });
  
  const players = gameData.players;
  const turnState = gameData.turn.state; 

  useEffect(() => {
    if (turnState === 5 && player.table_position === gameData.turn.owner)  {
      FetchEndTurn({
        gameId,
      });
    }
  }, [gameData.turn]);

  useEffect(() => {

    switch(turnState) {

      // making decision
      case 1:
        setInstruction("Elige una carta para jugar o descartar")
        const action = discard ? "discard" : "playCard";
        if (discard && cardSelected !== undefined) {
          setActionText("Descartar carta");
        } else {
          setActionText("Jugar carta");
        }
        switch (cardSelected.code) {
          case "whk":
            console.log("canPlayCard adentro de whisky", canPlayCard);
          case "vte":
          case "det":
            setCanPlayCard({
              canPlayCard: (playerSelected.name === undefined || discard) &&
                            cardSelected.cardId !== undefined,
              action: action,
            });
            break;
          default:
            setCanPlayCard({
              canPlayCard:
                (playerSelected.name !== undefined || discard) &&
                cardSelected.cardId !== undefined,
              action: action,
            });
            break;
        }
        break;
      
      // exchange beginning
      case 3:
        setInstruction("Elige una carta para intercambiar")
      case 4:
        setCanPlayCard({
          canExchangeCard: (cardSelected.cardId !== undefined)
        });

        setHasCardToDefendExchange(cardSelected.code === "fal" || 
                                   cardSelected.code === "ate" ||
                                   cardSelected.code === "ngs" );

        
        setActionText("Intercambiar carta");
        break;

      default: 
        break;
    }
  }, [playerSelected, discard, cardSelected, gameData.turn]);

  const playCard = () => {
    if (canPlayCard.action === "discard") { //check if the action is discard
      FetchDiscard({
        gameId: gameId,
        playerId: playerId,
        cardId: cardSelected.cardId,
      });
    } else if (canPlayCard.action === "playCard") {//check if the action is play card
      FetchPlayCard({
        gameId: gameId,
        playerId: playerId,
        cardId: cardSelected.cardId,
        destinationName:
          playerSelected.name === undefined ? player.name : playerSelected.name,
      });
    }
    setPlayerSelected({});
    setCardSelected({});
    setDiscard(false);
  };

  const defendCard = (cardToDefend) => {
    if (cardToDefend !== null) {
      setHasCardToDefend(true);
      setInstruction("Te han atacado de ... elige si quieres defenderte")
    } else {
      defend(false);
    }
  };

  const defend = (defend) => {
    FetchResponse({
      gameId: gameId,
      playerId: playerId,
      responseCardId: defend ? cardSelected.cardId : null,
    });
    setHasCardToDefend(false);
    setCardSelected({});
  };

  const exchangeCard = (
    defend
  ) => {
    if(turnState === 3){
      ExchangeCard({
        gameId: gameId,
        playerId: playerId,
        cardId: cardSelected.cardId
      })
    } else if (turnState === 4){
      ResponseExchange({
        gameId: gameId,
        playerId: playerId,
        cardId:        defend ? null : cardSelected.cardId,
        defenseCardId: defend ? cardSelected.cardId : null 
      })
    }
    setCardSelected({});
  }

  return (
    <div>
      <span className={style.title} data-testid="La Cosa">
        {instruction}
      </span>
      <span className={style.span}>Jugando en {gameData.name}</span>
      <GameContext.Provider value={gameData}>
        <CardSelectedContext.Provider value={cardSelected}>
          <SetPlayerSelectedContext.Provider value={setPlayerSelected}>
            <SetDiscardContext.Provider
              value={{ setDiscard: setDiscard, discard: discard }}
            >
              <PlayersAliveContext.Provider
                value={players.filter((player) => player.alive === true)}
              >
                <PlayerSelectedContext.Provider value={playerSelected.name}>
                  <Table players={players} player={player} />
                </PlayerSelectedContext.Provider>

                <div className={style.chat}>
                 <Chat socket={socket} gameId={gameId} playerName={player.name} />
                </div>
              
                <div className={style.logs}>
                  <Logs socket={socket} gameId={gameId} />
                </div>

              </PlayersAliveContext.Provider>
              {canPlayCard.canPlayCard && (
                <div className={style.button}>
                  <FunctionButton text={actionText} onClick={playCard} />
                </div>
              )}
              {hasCardToDefend && (
                <div className={style.button}>
                  <FunctionButton
                    text={"Defenderme"}
                    onClick={() => defend(true)}
                  />
                </div>
              )}
              {hasCardToDefend && (
                <div className={style.button}>
                  <FunctionButton
                    text={"No defenderme"}
                    onClick={() => defend(false)}
                  />
                </div>
              )}
              {cardAnalysis && (
                <CardAnalysis
                  data={analysisData}
                  setCardAnalysis={setCardAnalysis}
                />
              )}
              {cardSuspicion && (
                <CardSuspicion
                  data={suspicionData}
                  setCardSuspicion={setCardSuspicion}
                />
              )}
              {cardWhisky && (
                <CardWhisky data={whiskyData} setCardWhisky={setCardWhisky} />
              )}
              {!(cardAnalysis || cardSuspicion || cardWhisky) && (
                <Deck player={player} playDirection={gameData.play_direction} />
              )}

            </SetDiscardContext.Provider>
          </SetPlayerSelectedContext.Provider>
          
          <div className={style.button}>
          {player.role == 3 && (
            <FunctionButton text={"Declararme Ganador"} onClick={() => DeclareVictory({ gameId, playerId })}/>
            )}
          {hasCardToDefend && (<>
            <FunctionButton text={"Defenderme"} onClick={() => defend(true)}/>
            <FunctionButton text={"No defenderme"} onClick={() => defend(false)}/>
          </>)}
          {canPlayCard.canPlayCard && (
            <FunctionButton text={actionText} onClick={playCard} />
            )}
          {canPlayCard.canExchangeCard && (
            <FunctionButton text={actionText} onClick={() => exchangeCard(false)}/>
            )}
          {hasCardToDefendExchange && (
            <FunctionButton text={"Defenderme del intercambio"} onClick={() => exchangeCard(true)}/>
          )}
          </div>


          <div>
            {player.alive ? (
              <Hand
                player={player}
                gameData={gameData}
                setCardSelected={setCardSelected}
                defendCard={defendCard}
              />
            ) : (
              <DeadPlayer socket={socket} />
            )}
          </div>
        </CardSelectedContext.Provider>
      </GameContext.Provider>
    </div>
  );
};

export default Game;
