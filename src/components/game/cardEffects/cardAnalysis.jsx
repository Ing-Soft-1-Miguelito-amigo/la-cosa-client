import { useState, useEffect } from "react";
import React from "react";
import styles from "./cardAnalysis.module.css";

const CardAnalysis = ( { data , setCardAnalysis } ) => {
  const [showComponent, setShowComponent] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowComponent(false);
      setCardAnalysis(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  console.log(data)

  return (
    <>
      {showComponent && (
      <div className={styles.container}>
          <div className={styles.textAndCardsContainer}>
            <div>
              <p className={styles.text}> {data.log} </p>
            </div>    
            <div className={styles.cardcontainer}>
              {data.cards.map((card, i) => (
                <div className={styles.card}>
                  <img src={`../../src/img/${card.code}${card.number_in_card}.png`} alt='img'/>
                </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardAnalysis;
