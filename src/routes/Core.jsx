import { useEffect, useRef, useState } from "react";

const Core = ({socket}) => {
    // gameState 0 -> lobby, 1 -> game, 2 -> end-of-game, 3 -> deadPlayer
    const [gameState, setGameState] = useState(-1);
    const [gameData, setGameData] = useState({});
    const [playerData, setPlayerData] = useState({});

    const handleGameStatusEvent = (data) => {
        setGameData(data);
        setGameState(data.state);
        console.log(`gameData: ${JSON.stringify(data)}`)
        console.log(`gameState: ${data.state}`)
    }

    const handlePlayerStatusEvent = (data) => {
        setPlayerData(data);
        console.log(`playerData: ${data}`)
    }

    socket.on("connect", () => console.log("websocket connected"));
    socket.on("disconnect", (reason) =>  console.log("socket se desconecto por", reason));
    socket.on("game_status", (data) => handleGameStatusEvent(data));
    socket.on("player_status", (data) => handlePlayerStatusEvent(data));

    /* 
    socket.on("discard", (data) => setWhisky(JSON.stringify(data)));
    socket.on("action", (data) => setWhisky(JSON.stringify(data)));
    socket.on("defense", (data) => setWhisky(JSON.stringify(data)));
    socket.on("analisis", (data) => setWhisky(JSON.stringify(data)));
    socket.on("sospecha", (data) => setWhisky(JSON.stringify(data)));
    socket.on("whisky", (data) => setWhisky(JSON.stringify(data)));
    */

    switch(gameState) {
        case 0:
            return (<div><h1>Case 0</h1></div>)
            
        case 2:
            return (<div><h1>Case 2</h1></div>)
        
        case 3:
            return (<div><h1>Case 3</h1></div>)

        default:
            return (<div><h1>Case default</h1></div>)
    
    }
}

export default Core;