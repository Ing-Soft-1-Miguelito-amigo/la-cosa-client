import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import Player from "../components/game/player/Player";

const mockPlayerData = (
    name = "augusto",
    codes = ["lla", "lla", "lla", "wsk"]
) => ({
    "name": name,
    "owner": false,
    "id": 2,
    "table_position": 2,
    "role": null,
    "alive": true,
    "quarantine": false,
    "hand": [
        {
        "id": 1,
        "cardId": 1,
        "code": codes[0],
        "number_in_card": 1,
        "kind":1
    },{
        "id": 2,
        "code": codes[1],
        "number_in_card": 4,
        "kind":2
    },{
        "id": 3,
        "code": codes[2],
        "number_in_card": 6,
        "kind":2
    },{
        "id": 4,
        "code": codes[3],
        "number_in_card": 8,
        "kind":1
    }]
});

const turn = (
    state, 
    cardCode,
    destinationPlayer
) => ({
    "owner": 3,
    "played_card": {
        "id": 4,
        "code": cardCode,
        "number_in_card": 8,
        "kind":1
    },
    "destination_player": destinationPlayer,
    "response_card": null,
    "state": state,
});

const players = [
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
];

describe("Player component", () => {
    
    test("should render the player", async () => {

        const player = mockPlayerData("player1");
        const playerSelectedState = {playerSelected: undefined, setPlayerSelected: vi.fn()};
        const cardSelected = {};

        const turn_1 = turn(1, "lla", 2);
        const obstacles = [1];
        const doorSelected = false;
        const setDoorSelected = vi.fn();
        render(<>
            <Player 
                name={"player1"}
                playerData={players.find((p1) => p1.name === "player1")}
                player={player}
                playerSelectedState={playerSelectedState}
                cardSelected={cardSelected}
                players={players}
                setDiscard={vi.fn()}
                turn={turn_1}
                obstacles={obstacles}
                setDoorSelected={setDoorSelected} 
            />
        </>);

        const player_ = screen.getByTestId("player-player1");
        expect(player_).toBeDefined();
    });

    /*test("should call setPlayerSelected when click on player", async () => {
        const player1 = screen.getByTestId("player-a");        
        const player2 = screen.getByTestId("player-a2");        
        const player3 = screen.getByTestId("player-a3");      
    
        fireEvent.click(player1);
        expect(mockContext.setPlayerSelected).toHaveBeenCalledTimes(1);
        fireEvent.click(player2);
        expect(mockContext.setPlayerSelected).toHaveBeenCalledTimes(2);
        fireEvent.click(player3);
        expect(mockContext.setPlayerSelected).toHaveBeenCalledTimes(3);
    });*/

    // test("should player selected have diferent style properties than not seleted", async () => {
    //     const player1 = screen.getByTestId("player-a");        
    //     const player2 = screen.getByTestId("player-a2");        
    //     const player3 = screen.getByTestId("player-a3");      

    //     expect(window.getComputedStyle(player1)._values["background-color"]).not.toEqual(window.getComputedStyle(player2)._values["background-color"]);
    //     expect(window.getComputedStyle(player3)._values["background-color"]).toEqual(window.getComputedStyle(player2)._values["background-color"]);
    // });

})
