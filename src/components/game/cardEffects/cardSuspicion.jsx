import { useState, useEffect } from "react";
import React from "react";
import styles from "./cardSuspicion.module.css";

const CardSuspicion = (data) => {
  const [showComponent, setShowComponent] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowComponent(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const card = data.card; 

  return (
    <>
      {showComponent && (
        <div className={styles.container}>
          <div className={styles.textAndCardsContainer}>
            <div>
              <p className={styles.text}> {mock.message} </p>
            </div>    
            <div className={styles.card}>
              <img src={`../../src/img/${card.code}${card.number_in_card}.png`} alt='img'/>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardSuspicion;
