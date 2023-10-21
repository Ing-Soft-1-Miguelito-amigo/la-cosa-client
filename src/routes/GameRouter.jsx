import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { useSocket } from "./useSocket";

const GameRouter = () => {
    const params = useLocation();
    const { gameId, playerId } = params.state;

    // gameState 0 -> lobby, 1 -> game, 2 -> end-of-game, 3 -> deadPlayer
    const [gameState, setGameState] = useState(-1);
    const [gameData, setGameData] = useState({});
    const [playerData, setPlayerData] = useState({});
    const { gameSocket } = useSocket();
    
    console.log(gameSocket)

    useEffect(() => {
        gameSocket.on("game_status", (data) => {
            console.log("milagro")
            setGameData(data);
            setGameState(data.state)
        })
    }, [gameData])

    switch(gameState) {
        case 0:
            return ( <div><h1>Case 0</h1></div> )
            
        case 2:
            return (<div><h1>Case 2</h1></div>)
        
        case 3:
            return (<div><h1>Case 3</h1></div>)

        default:
            return (<div><h1>Case default</h1></div>)
    }
    
}

export default GameRouter;