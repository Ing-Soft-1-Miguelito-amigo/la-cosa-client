import Player from "../player/Player";
import styles from "./table.module.css";

const Table = ({
    players, 
    apiData,
    selectPlayer
    }) => {

    // sorts players array by table_position in increasing order
    players.sort((a, b) => a.table_position - b.table_position);        
    return (
        <div className={styles.container}>
            {players.map((player, index) => {
                return (
                        <Player
                            key={index} 
                            name={player.name}
                            apiData={apiData}
                            selectPlayer={selectPlayer}
                        />
                )
            })}
        </div>
    );
};


export default Table;