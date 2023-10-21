import { io } from "socket.io-client";
import { getPlayerId, getGameId } from "./selectors";
import { store } from "../redux/store";

const createSocket = (uri) => {
    const socketConfig = {
        transports: ["websocket"],
        autoConnect: false,
    };

    let playerId = null;
    let gameId = null;
    
    const updateSocketQuery = () => {
        const state = store.getState();
        playerId = getPlayerId(state);
        gameId = getGameId(state);

        console.log(`createSocket recibió gameId: ${gameId} y playerId: ${playerId}`);
        
        if (playerId && gameId) {
            socketConfig.query = {
                "Game-Id": gameId,
                "Player-Id": playerId
            };
        }
    };

    updateSocketQuery();
    
    if(playerId === 0 && gameId === 0) {
        
    }
    console.log("socketcreating")
    const socket = io(uri, socketConfig);
    socket.connect();
    
    // Listen for events
    socket.on("connect", () => console.log("websocket connected"));
    socket.on("disconnect", (reason) =>  console.log(reason));
    socket.on("game_status", () => console.log("llega gameData"));

    store.subscribe(updateSocketQuery);

    return socket;
}

const gameSocket = createSocket("http://localhost:8000/socket.io")

export { gameSocket };