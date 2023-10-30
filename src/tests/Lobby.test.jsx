import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test, beforeAll, afterAll, it } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Lobby from "../components/game/lobby/Lobby";
import MockedSocket from 'socket.io-mock';
import { userEvent } from "@testing-library/user-event";


describe("Lobby component", () => {

    test("should render the waiting for host message", async () => {
        const socket = {
            "state": 0,
        };
                
        const playermock = {
            "owner": false,
        };

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
                <Lobby socket={socket} player={playermock} gameData={{ state: 0}}></Lobby>
            </BrowserRouter>
        );

        expect(screen.getByText("Esperando al host...")).toBeDefined();
    })

    test("should render the waiting for players message", async () => {
        const socket = {
            "state": 0,
        };
        
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
                <Lobby socket={socket} player={playerContextValue} gameData={{ state: 0}}></Lobby>
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
                <Lobby player={playerContextValue} gameData={{ state: 0}}></Lobby>
            </BrowserRouter>
        );

        const buttonElement = screen.queryByText('Iniciar Partida');
        expect(buttonElement).not.toBeNull();
    });

    test("should disconnect socket when clicking Abandonar Partida button", async() => {        
        const socketMock = new MockedSocket();
        const utils = render(<BrowserRouter>
            <Lobby socket={socketMock} player={{ owner: false }} gameData={{ state: 0}}></Lobby>
        </BrowserRouter>);
        const button = screen.getByRole("button", { name: "Abandonar Partida"});
        await userEvent.click(button);
        });
});
