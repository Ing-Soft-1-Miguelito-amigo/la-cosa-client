import { gameSocket } from "./createSocket"
import { useState, useEffect } from "react"

const useSocket = () => {
    const [connected, setConnected] = useState(true);

    const handleConnChange = () => {
        setConnected(gameSocket.connected)
    }

    useEffect(() => {
        gameSocket.on("connect", handleConnChange);
        gameSocket.on("disconnect", handleConnChange);

        return () => {
            gameSocket.removeListener("connect", handleConnChange);
            gameSocket.removeListener("disconnect", handleConnChange);
        }
    })

    return {
        gameSocket: gameSocket,
        isConnected: connected
    }
}

export { useSocket };