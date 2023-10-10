import { useState, useEffect, createContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./game.module.css";
import Lobby from "./lobby/Lobby";
import Hand from "./hand/Hand";
import Table from "./table/Table";
import FetchData from "../../containers/FetchGame";
import FunctionButton from "../functionButton/FunctionButton";
import FetchPlayCard from "../../containers/FetchPlayCard";

export const CardSelectedContext = createContext();
export const PlayerSelectedContext = createContext();
export const PlayersContext = createContext();
export const SetPlayerSelectedContext = createContext();
export const SetCardSelectedContext = createContext();
export const TurnOwnerContext = createContext();
export const PlayersAliveContext = createContext([]);

const Game = () => {
  const params = useLocation();

  // for tests porpuses; it does not affect normal flow of the component
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
      game_id: gameId,
      player_id: playerId,
      card_id: cardSelected.cardId,
      destination_name: playerSelected.name
    });
  };

  useEffect(() => {
    FetchData({
      onSetGameData: setGameData,
      onSetPlayers: setPlayers,
      gameId: gameId,
    });
  }, []);

  const gameStyle = `
        ${gameData.state === 0 ? "lobby" : "game"}
    `;

  useEffect(() => {
    if (gameData.state === 2) {
      const navigate = useNavigate();
      navigate("/end-of-game");
    }
  }, [gameData]);

  return (
    <div className={gameStyle}>
      <div>
        {gameData.state === 0 ? (
          <Lobby players={players}></Lobby>
        ) : (
          <>
            <div>
              <span>La Cosa</span>
            </div>
            <div>
              <span>Jugando en {gameData.name}</span>
            </div>
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
    </div>
  );
};

export default Game;
