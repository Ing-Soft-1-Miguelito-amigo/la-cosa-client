//create component for dead player
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./deadPlayer.module.css";
import FunctionButton from "../../FunctionButton/FunctionButton";

const DeadPlayer = () => {
    const navigate = useNavigate();
    const goToHome = () => {
        navigate("/home");
    };

  return (
    <div className={styles.body}>
      <div className={styles.fade}>
          <p className={styles.text}>¡Has sido incinerado!</p>
          <p className={styles.text}>&#128293;</p>
      </div>
      <div className={styles.button}>
        <FunctionButton text={"Salir de la Partida"} onClick={goToHome}/>
      </div>
    </div>
  );
};

export default DeadPlayer;