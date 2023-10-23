import { useState, useEffect } from "react";
import React from "react";
import styles from "./cardWhisky.module.css";

const player = "Player Name ";

const mock = {
  message: player + "jugo whisky y estas son sus cartas!",
  cards: [
    {id: 4, code: "aeb", name: "str", kind: 1, description: "str", number_in_card: 4, state: "str", playable: true },
    {id: 4, code: "aeb", name: "str", kind: 1, description: "str", number_in_card: 4, state: "str", playable: true },
    {id: 4, code: "aeb", name: "str", kind: 1, description: "str", number_in_card: 4, state: "str", playable: true },
    {id: 1, code: "aeb", name: "str", kind: 1, description: "str", number_in_card: 4, state: "str", playable: true }
  ]
};

const CardWhisky = () => {
  const [showComponent, setShowComponent] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowComponent(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  
  const hand = mock.cards; 

  return (
    <>
      {showComponent && (
        <div className={styles.container}>
          <div className={styles.textAndCardsContainer}>
            <div>
              <p className={styles.text}> {mock.message} </p>
            </div>
            <div className={styles.cardcontainer}>
              {mock.cards.map((card, i) => (
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
