import Player from "../player/Player";
import styles from "./table.module.css";

const Table = ({
    players,
    player,
    playerSelectedState,
    cardSelected,
    setDiscard,
    turn
}) => {
    // sorts players array by table_position in increasing order
    players.sort((a, b) => a.table_position - b.table_position);
    return (
        <div className={styles.container}>
            {players.map((p, index) => {
                return (
                    <Player
                        key={index}
                        name={p.name}
                        playerData={players.find((p1) => p1.name === p.name)}
                        player={player}
                        playerSelectedState={playerSelectedState}
                        cardSelected={cardSelected}
                        players={players}
                        setDiscard={setDiscard}
                        turn={turn}
                    />
                )
            })}
        </div>
    );
};


export default Table;