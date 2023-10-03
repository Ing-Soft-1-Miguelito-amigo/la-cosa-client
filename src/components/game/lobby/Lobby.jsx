import FunctionButton from "../../FunctionButton/FunctionButton";



const Lobby = ({ 
    apiData
 }) => {
    
    const hostName = apiData.players.filter((player) => player.table_position === 1)[0].name;


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
        console.log("Iniciando partida");
        return response;
    } catch (error) {
        console.log("Iniciando partida");
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