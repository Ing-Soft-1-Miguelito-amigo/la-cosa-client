import FetchStartGame from "../../../containers/FetchStartGame";
import FunctionButton from "../../functionButton/FunctionButton";

const Lobby = ({ 
    players
 }) => {
    
    const hostName = players.filter((player) => player.table_position === 1)[0].name;

    const data = {
        game_id: 1,
        player_name: hostName,
    }

    return (
        <div data-testid="boton">
            <FunctionButton text={"Iniciar Partida" } onClick={FetchStartGame}/>
        </div>
    )
}

export default Lobby;