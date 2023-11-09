import { useState, useEffect } from "react";
import React from "react";
import styles from "./cardWhisky.module.css";

const CardWhisky = ({ data , setCardWhisky }) => {
  const [showComponent, setShowComponent] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowComponent(false)
      setCardWhisky(false);
    }, 8000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  
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
                <div className={styles.card} key={i}>
                  <img
                    src={`../../src/img/${card.code}${card.number_in_card}.png`}
                    alt="img"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardWhisky;
