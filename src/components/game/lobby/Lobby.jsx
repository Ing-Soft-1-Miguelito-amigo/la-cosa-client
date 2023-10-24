import FetchStartGame from "../../../containers/FetchStartGame";
import FetchEndGame from "../../../containers/FetchEndGame";
import FunctionButton from "../../functionButton/FunctionButton";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styles from "./lobby.module.css";

const Lobby = ({socket, player, gameData, gameId, playerId}) => {
    const navigate = useNavigate();   
    const [host, setHost] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);
    const [text, setText] = useState("");
    const [data , setData] = useState({}); 
    const [hostHasLeft, setHostHasLeft] = useState(false);
    
    if (gameData.state === 3) {
        setHostHasLeft(true);
    }

    useEffect(() => {
        const dt = {
            game_id: gameData.id,
            player_name: player.name,
        };
        setData(dt);

        if (player.owner) {
            setHost(true);
            setText("Esperando a los jugadores...");
        } else {
            setText("Esperando al host...");
        }
    }, [player.owner, gameData.id, player.name]);

    const startGame = async (data) => {
        const response = await FetchStartGame(data);
        if (response.status === 200) {
            setError(false);
        } else {
            setMessage(response.json.detail);
            setError(true);
        } 
    }

    const goOutGame = async () => {      
        const data = {
            game_id: gameData.id,
            player_id: player.id,
        }  
        const goOut = await FetchEndGame(data); 
        if(goOut.status === 200){
            setMessage(goOut.json.detail);
        }else{
            setMessage(goOut.json.detail);
            setError(true);
        }
        socket.disconnect(); 
        navigate("/");
    }

    const handleHostLeft = () => {
        socket.disconnect();
        navigate("/");
    }

    return (    
        <div className={styles.body}>
            <div className={styles.fade}>
                <p className={styles.text}>{text}</p>
            </div>
                {error && <p className={styles.error}>{message}</p>}
            <div className={styles.button}>
                {host && <FunctionButton text={"Iniciar Partida" } onClick={() => startGame(data)}/>}
               {!hostHasLeft && <FunctionButton text={"Abandonar Partida"} onClick={goOutGame}/>}
                {hostHasLeft && <FunctionButton text={"Volver a inicio"} onClick={handleHostLeft}/>} 
            </div>
        </div>   
    )
}

export default Lobby;