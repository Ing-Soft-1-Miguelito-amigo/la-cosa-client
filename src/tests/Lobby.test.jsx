import { render, screen } from "@testing-library/react";
import { describe, expect, test  } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Lobby from "../components/game/lobby/Lobby";
import { GameContext, PlayerContext } from "../components/game/Game";

describe("Lobby component", () => {
    
    //Test for sprint 2
    // test("should render the go out game button", async () => {
        //     render(<BrowserRouter><Lobby /></BrowserRouter>);
        //     expect(screen.getByRole("button", { name: "Abandonar Partida" })).toBeDefined();
        // })
        
    //test for players 
    test("should render the waiting for host message", async () => {
        const gameContextValue = {
        "id": 1,
        "name": "a",
        "min_players": 4,
        "max_players": 12,
        "state": 0,
        "play_direction": null,
        "turn_owner": null,
        "players": [
            {
            "name": "player1",
            "table_position": 1,
            "alive": true,
            "quarantine": false
            }
        ]  
        };

        const playerContextValue = {
            "name": "game1",
            "owner": false,
            "id": 2,
            "table_position": 2,
            "role": null,
            "alive": true,
            "quarantine": false,
            "hand": []
        };

        render(<BrowserRouter>
                <GameContext.Provider value={gameContextValue}>
                    <PlayerContext.Provider value={playerContextValue}>
                        <Lobby />
                    </PlayerContext.Provider>
                </GameContext.Provider>
            </BrowserRouter>
        );

        expect(screen.getByText("Esperando al host...")).toBeDefined();
    })

    //test for host
    test("should render the waiting for players message", async () => {
        const gameContextValue = {
        "id": 1,
        "name": "a",
        "min_players": 4,
        "max_players": 12,
        "state": 0,
        "play_direction": null,
        "turn_owner": null,
        "players": [
            {
            "name": "player1",
            "table_position": 1,
            "alive": true,
            "quarantine": false
            }
        ]  
        };

        const playerContextValue = {
            "name": "game1",
            "owner": true,
            "id": 2,
            "table_position": 2,
            "role": null,
            "alive": true,
            "quarantine": false,
            "hand": []
        };

        render(<BrowserRouter>
                <GameContext.Provider value={gameContextValue}>
                    <PlayerContext.Provider value={playerContextValue}>
                        <Lobby />
                    </PlayerContext.Provider>
                </GameContext.Provider>
            </BrowserRouter>
        );


        expect(screen.getByText("Esperando a los jugadores...")).toBeDefined();
    })


    test('should render a button when host is true', () => {
        const gameContextValue = {
            "id": 1,
            "name": "a",
            "min_players": 4,
            "max_players": 12,
            "state": 0,
            "play_direction": null,
            "turn_owner": null,
            "players": [
                {
                "name": "player1",
                "table_position": 1,
                "alive": true,
                "quarantine": false
                }
            ]  
        };

        const playerContextValue = {
            "name": "game1",
            "owner": true,
            "id": 2,
            "table_position": 2,
            "role": null,
            "alive": true,
            "quarantine": false,
            "hand": []
        };

        render(<BrowserRouter>
                <GameContext.Provider value={gameContextValue}>
                    <PlayerContext.Provider value={playerContextValue}>
                        <Lobby />
                    </PlayerContext.Provider>
                </GameContext.Provider>
            </BrowserRouter>
        );

        const buttonElement = screen.queryByText('Iniciar Partida');
        expect(buttonElement).not.toBeNull();
    });
    
})