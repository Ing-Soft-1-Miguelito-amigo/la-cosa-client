import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./game.module.css";
import Lobby from "./lobby/Lobby";
import Hand from "./hand/Hand";
import Table from "./table/Table";
import FetchData from "../../containers/FetchGame";
import FunctionButton from "../functionButton/FunctionButton";
import FetchPlayCard from "../../containers/FetchPlayCard";

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

  const [apiData, setApiData] = useState({});
  const [players, setPlayers] = useState([]);

  //inicio de jugar carta (implementacion)

  const [cardSelected, setCardSelected] = useState({});
  const [playerSelected, setPlayerSelected] = useState({});
  const [canPlayCard, setCanPlayCard] = useState(false);
  const [playersToSelect, setPlayersToSelect] = useState([]);
  

  const selectCard = (cardId,tablePosition) => {
    if (cardId !== cardSelected.cardId && apiData.turn_owner === tablePosition) {
      setCardSelected({ cardId });
    }
    else {
      return 0;
    }
    return 1;
  };

  useEffect(() => {
    // obtain the player alives to the right and left of the turn owner
    const pTS = () => {
      let playersAlive = players.filter(player => player.alive === true);
      const turnOwnerIndex = playersAlive.findIndex(player => player.table_position === apiData.turn_owner);
      const player_on_right = playersAlive[(turnOwnerIndex + 1) % playersAlive.length];
      const player_on_left = playersAlive[(((turnOwnerIndex - 1) + playersAlive.length) % playersAlive.length)];
      return [player_on_left, player_on_right];
    };
    setPlayersToSelect(pTS());
  }, [apiData.turn_owner, cardSelected,playerSelected]);

  const selectPlayer = (playerName) => {

    // verify if the player selected is one of the players alives to the right and left of the turn owner
    // and if the player selected is not the player who is playing
    // and if the card was selected
    if (cardSelected.cardId !== undefined
      && playerName !== playerSelected.name
      && (playerName == playersToSelect[0].name
        || playerName == playersToSelect[1].name)) {
      setPlayerSelected({ name: playerName });
    }
    else {
      return 0;
    }
    return 1;
  };

  useEffect(() => {
    setCanPlayCard(playerSelected.name !== undefined && cardSelected.cardId !== undefined);
  }, [playerSelected]);

  const playCard = () => {
    FetchPlayCard({ game_id: gameId,
                    player_id: playerId, 
                    card_id: cardSelected.cardId, 
                    destination_name: playerSelected.name});
  };


  // finalizacion de jugar carta (implementacion)

  useEffect(() => {
    FetchData({
      onSetApiData: setApiData,
      onSetPlayers: setPlayers,
      gameId: gameId,
    });
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
            <Table players={players} apiData={apiData} selectPlayer={selectPlayer} namePlayerSelected={playerSelected.name}/>
            {canPlayCard && <FunctionButton text={"Jugar carta"} onClick={playCard} />}
            <div>
              <Hand gameId={gameId} playerId={playerId} selectCard={selectCard} cardSelected={cardSelected} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Game;
