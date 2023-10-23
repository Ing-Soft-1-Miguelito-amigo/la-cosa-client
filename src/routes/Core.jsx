import { useEffect, useRef, useState } from "react";
import Game from "../components/game/Game";
import Lobby from "../components/game/lobby/Lobby";
import EndOfGame from "../components/endOfGame/EndOfGame";
import DeadPlayer from "../components/game/deadPlayer/DeadPlayer";
import { Navigate, useNavigate } from "react-router-dom";
import GameAborted from "../components/game/lobby/gameAborted/GameAborted";

const Core = ({socket, gameId, playerId}) => {
    const navigate = useNavigate();

    // gameState 0 -> lobby, 1 -> game, 2 -> end-of-game, 3 -> aborted
    const [gameState, setGameState] = useState(-1);
    const [gameData, setGameData] = useState({});
    const [playerData, setPlayerData] = useState({});

    const handleGameStatusEvent = (data) => {
        setGameData(data);
        setGameState(data.state);
    }

    const handlePlayerStatusEvent = (data) => {
        setPlayerData(data);
    }

    socket.on("connect", () => console.log("websocket connected"));
    socket.on("disconnect", (reason) =>  console.log("socket se desconecto por", reason));
    socket.on("game_status", (data) => handleGameStatusEvent(data));
    socket.on("player_status", (data) => handlePlayerStatusEvent(data));

    switch(gameState) {
        case 0:
            return (<Lobby socket={socket} player={playerData} gameData={gameData} gameId={gameId} playerId={playerId}/>)
        case 1:
            return (<Game socket={socket} player={playerData} gameData={gameData} gameId={gameId} playerId={playerId}/>);

        case 2:
            console.log("endOfGame")
            return (<EndOfGame socket={socket}/>)
        
        case 3:
            return (<GameAborted socket={socket}/>)
            
        default:
            return (<div><h1>Waiting...</h1></div>)
    
    }
}

export default Core;