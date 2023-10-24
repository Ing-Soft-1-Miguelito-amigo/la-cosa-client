import React , {useState }from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./endOfGame.module.css";
import FunctionButton from "../functionButton/FunctionButton";
import { getResults } from "../../containers/EndOfGameResults";

const EndOfGame = ({socket}) => {
  const navigate = useNavigate();
  const params = useLocation();
  const [winners, setWinners] = useState("");

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
    socket.disconnect()
    navigate("/");
  };

  const Response = async (gameId)=> {
    const response = await getResults(gameId);
    return response;
  } 

  Response(gameId).then((response) => { setWinners(response.json.winners)});
  
  return (
    <>
      <div className={styles.endOfGame} data-testid ="text" >
        <p className={styles.text}>¡Partida finalizada!<br />{winners}</p> 
      </div>
      <div className={styles.button}>
        <FunctionButton text={"Abandonar Partida"} onClick={goToHome} />
      </div>
    </>
  );
};

export default EndOfGame;
