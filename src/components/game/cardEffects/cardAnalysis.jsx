import { useState, useEffect } from "react";
import React from "react";
import styles from "./cardAnalysis.module.css";

const attacked_player_name = "Player Name ";

const mock = {
  message: "Esta es una carta de " + attacked_player_name,
  cards: [
    {id: 4, code: "aeb", name: "str", kind: 1, description: "str", number_in_card: 4, state: "str", playable: true },
    {id: 4, code: "aeb", name: "str", kind: 1, description: "str", number_in_card: 4, state: "str", playable: true },
    {id: 4, code: "aeb", name: "str", kind: 1, description: "str", number_in_card: 4, state: "str", playable: true },
    {id: 1, code: "aeb", name: "str", kind: 1, description: "str", number_in_card: 4, state: "str", playable: true }
  ]
};

const CardAnalysis = () => {
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
              {hand.map((card, i) => (
                <div className={card}>
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
