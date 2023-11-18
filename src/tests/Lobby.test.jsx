import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Lobby from "../components/game/lobby/Lobby";
import { BrowserRouter } from "react-router-dom";

const mockPlayerData = (
    name = "augusto",
    owner = false
) => ({
    "name": name,
    "owner": owner,
    "id": 2,
    "table_position": 2,
    "role": null,
    "alive": true,
    "quarantine": false,
    "hand": []
});

const mockSocket = {
    disconnect: vi.fn()
}

const gameData = () => ({
    "id": 1,
    "name": "game1",
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
        },
        {
            "name": "player2",
            "table_position": 1,
            "alive": true,
            "quarantine": false
        },
        {
            "name": "player3",
            "table_position": 1,
            "alive": true,
            "quarantine": false
        },
        {
            "name": "player4",
            "table_position": 1,
            "alive": true,
            "quarantine": false
        }
    ]
})



describe("Lobby component", () => {

    test("should render the waiting for host message", async () => {

        render(
            <BrowserRouter>
                <Lobby 
                    socket={mockSocket} 
                    player={mockPlayerData("ale",true)} 
                    gameData={gameData()} 
                />
            </BrowserRouter>
        );
        const text = screen.getByTestId("text");

        const button1 = screen.getByText('Abandonar Partida');
        const button2 = screen.queryByTestId('Iniciar Partida');

        expect(button1).toBeDefined();
        expect(button2).toBeDefined();
        expect(text).toBeDefined();
    })

    test("should render the waiting for players message", async () => {

        render(
            <BrowserRouter>
                <Lobby 
                    socket={mockSocket} 
                    player={mockPlayerData()} 
                    gameData={gameData()} 
                />
            </BrowserRouter>
        );

        const text = screen.getByTestId("text");

        const button1 = screen.getByText('Abandonar Partida');
        const button2 = screen.queryByText('Iniciar Partida');

        expect(button1).toBeDefined();
        expect(button2).toBeNull();
        expect(text).toBeDefined();
    })


    // test('should render a button when host is true', () => {
    //     const gameContextValue = {
    //         "id": 1,
    //         "name": "a",
    //         "min_players": 4,
    //         "max_players": 12,
    //         "state": 0,
    //         "play_direction": null,
    //         "turn_owner": null,
    //         "players": [
    //             {
    //             "name": "player1",
    //             "table_position": 1,
    //             "alive": true,
    //             "quarantine": false
    //             }
    //         ]  
    //     };

    //     const playerContextValue = {
    //         "name": "game1",
    //         "owner": true,
    //         "id": 2,
    //         "table_position": 2,
    //         "role": null,
    //         "alive": true,
    //         "quarantine": false,
    //         "hand": []
    //     };

    //     render(
    //         <Lobby player={playerContextValue} gameData={{ state: 0}}/>
    //     );

    //     const buttonElement = screen.queryByText('Iniciar Partida');
    //     expect(buttonElement).not.toBeNull();
    // });

    // test("should disconnect socket when clicking Abandonar Partida button", async() => {        
    //     render(
    //         <BrowserRouter>
    //             <Lobby 
    //                 socket={mockSocket} 
    //                 player={mockPlayerData()} 
    //                 gameData={gameData()} 
    //             />
    //         </BrowserRouter>
    //     );
        
    //     const button = screen.getByText('Abandonar Partida');
    //     // const button2 = screen.getByText('Volver al inicio');
    //     // fireEvent.click(button);
    //     // fireEvent.click(button2);
    //     expect(mockSocket.disconnect).toBeCalledTimes(0);
    //     // expect(mockSocket.disconnect).toBeCalledTimes(1);
    // });
});
