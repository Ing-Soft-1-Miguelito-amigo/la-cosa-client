import { useEffect, useRef, useState } from "react";
import Game from "../components/game/Game";
import Lobby from "../components/game/lobby/Lobby";
import EndOfGame from "../components/endOfGame/EndOfGame";
import DeadPlayer from "../components/game/deadPlayer/DeadPlayer";

const Core = ({socket, gameId, playerId}) => {
    // gameState 0 -> lobby, 1 -> game, 2 -> end-of-game, 3 -> aborted
    const [gameState, setGameState] = useState(-1);
    const [gameData, setGameData] = useState({});
    const [playerData, setPlayerData] = useState({});

    const handleGameStatusEvent = (data) => {
        setGameData(data);
        setGameState(data.state);
    }

    const handlePlayerStatusEvent = (data) => {
        console.log("llega data de player_status")
        console.log(data)
        setPlayerData(data);
    }

    socket.on("connect", () => console.log("websocket connected"));
    socket.on("disconnect", (reason) =>  console.log("socket se desconecto por", reason));
    socket.on("game_status", (data) => handleGameStatusEvent(data));
    socket.on("player_status", (data) => handlePlayerStatusEvent(data));

    switch(gameState) {
        case 0:
        case 3:
            return (<Lobby socket={socket} player={playerData} gameData={gameData} gameId={gameId} playerId={playerId}/>)
         
        case 1:
            //if (playerData.alive) {
                return (<Game socket={socket} player={playerData} gameData={gameData} gameId={gameId} playerId={playerId}/>);
            //} else {
             //   return (<DeadPlayer socket={socket}/>)
            //}

        case 2:
            return (<EndOfGame socket={socket}/>)

        default:
            return (<div><h1>Error</h1></div>)
    
    }
}

export default Core;