import React from "react";
import Chair from "./Chair";
import style from "./table.module.css";

const players = [
  { id: 1, name: "juan", state: "dead", order: 1 },
  { id: 2, name: "pedro", state: "alive", order: 3 },
  { id: 3, name: "pablo", state: "alive", order: 2 },
  { id: 4, name: "roman", state: "turn", order: 4 },
];

const angle = (2*Math.PI) / players.length
console.log(angle)
const Table = () => {
  return (
    <div className={`${style.tableStyle} ${style.tableContainer}`}>
      {players.map((player, index) => {
        return (
          <div key={player.id}>
            <Chair state={player.state} order={player.order} angle={angle}>
              {player.order}
            </Chair>
          </div>
        );
      })}
    </div>
  );
};


export default Table;
