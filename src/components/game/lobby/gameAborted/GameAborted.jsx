import React from "react";
import styles from "./gameAborted.module.css";

const GameAborted = ({socket}) => {
  return (
    <div className={styles.body}>
      <div className={styles.fade}>
          <p className={styles.text}>El host abandonó la partida.<br />Volviendo al menú principal.<br />&#128557;</p>
      </div>
    </div>
  );
};

export default GameAborted;