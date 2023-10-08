import useWebSocket from "react-use-websocket";
import Game from "../components/game/Game"

import { useState, useEffect, useContext } from "react";

const GameRouter = () => {
    const gameId = 1;
    const { lastJsonMessage: apiData, readyState} = useWebSocket(`ws://localhost:8000/game/${gameId}`);
    
    useEffect(() => {
        // 0: connecting, 1: open, 2: closing, 3: closed  
        if (readyState === 1) {
            setApiData(apiData.data);
        };
      }, [apiData]);

    console.log(`apiData: ${apiData}`);

    return (
        <div>
            <p>LOS WEB SOCKETS ESTAN TRATANDO DE ANDAR {JSON.stringify(apiData)}</p>
        </div>
    );
};

export default GameRouter;
