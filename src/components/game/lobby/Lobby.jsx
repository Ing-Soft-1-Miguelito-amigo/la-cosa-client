import FunctionButton from "../../FunctionButton/FunctionButton";
import { httpRequest } from "../../../services/HttpService";


const Lobby = ({ 
    players
 }) => {
    
    const hostName = players.filter((player) => player.table_position === 1)[0].name;

    const data = {
        game_id: 1,
        player_name: hostName,
    }

    //Make the request to the server
    const startGame = async () => {
        try {
        const response = await httpRequest({
            method: "POST",
            service: "game/start",
            payload: data,
        });
        
        return response;
    } catch (error) {
        return error; 
        }
    };

    return (
        <div>
            <FunctionButton text={"Iniciar Partida" } onClick={startGame}/>
        </div>
    )
}

export default Lobby;