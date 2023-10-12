import React , {useState }from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./endOfGame.module.css";
import FunctionButton from "../functionButton/FunctionButton";
import { getResults } from "../../containers/EndOfGameResults";

const EndOfGame = () => {
  const navigate = useNavigate();
  const params = useLocation();
  const [message, setMessage] = useState("");

  let gameId = 1; 
  let players = [];
  if (!params.state) {
    gameId = 1;
    players = [];
  } else {
    gameId = params.state.gameId;
    players = params.state.players;
  }

  const goToHome = () => {
    navigate("/");
  };

  const Response = async (gameId)=> {
    const response = await getResults(gameId);
    return response;
  } 
  
  const winner = players.filter((player) => player.alive === true);
  console.log(winner);

  Response(gameId).then((response) => { setMessage(`Terminó el juego. El ganador es ${winner[0].name}`)});
  

  return (
    <>
      <div className={styles.endOfGame} data-testid ="text" >
        <p className={styles.text}>{message}</p> 
      </div>
      <div className={styles.button}>
        <FunctionButton text={"Abandonar Partida"} onClick={goToHome} />
      </div>
    </>
  );
};

export default EndOfGame;
