import { render, screen, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import Player from "../components/game/player/Player";
import Game, { GameContext, CardSelectedContext, PlayerSelectedContext, SetPlayerSelectedContext, PlayersAliveContext, TurnOwnerContext, SetDiscardContext } from "../components/game/Game";

const props = {
    name: "a",
    playerData: {
       name: "a", 
       alive: true, 
       table_position: 1,
       owner: false,
       id: 2,
       table_position: 2,
       role: null,
       alive: true,
       quarantine: false,
       hand: []
    }, 
    player: {
        name: "a",
        owner: false,
        id: 2,
        table_position: 2,
        role: null,
        alive: true,
        quarantine: false,
        hand: []
    }
    };

const props2 = {
    name: "a2",
    playerData: {
        name: "a2", 
        alive: true, 
        table_position: 2,
        owner: false,
        id: 2,
        table_position: 2,
        role: null,
        alive: true,
        quarantine: false,
        hand: []
     },
     player: {
        name: "a",
        owner: false,
        id: 2,
        table_position: 2,
        role: null,
        alive: true,
        quarantine: false,
        hand: []
    }
     };

const props3 = {
    name: "a3",
    playerData: {
        name: "a3", 
        alive: true, 
        table_position: 3,
        owner: false,
        id: 2,
        table_position: 2,
        role: null,
        alive: true,
        quarantine: false,
        hand: []
     },
     player: {
        name: "a",
        owner: false,
        id: 2,
        table_position: 2,
        role: null,
        alive: true,
        quarantine: false,
        hand: []
    }
    };

const mockContext = {
    playerSelected: {
        name: "a"
    },
    setPlayerSelected: vi.fn(),
    cardSelected: {
        cardId: 1
    },
    playersAlive: [{name: "a", alive: true, table_position: 1},
                    {name: "a2", alive: true, table_position: 2},
                    {name: "a3", alive: true, table_position: 3}],
    turnOwner: 1
};


describe("Player component", () => {
    
    beforeEach(() => {
        
        
        const gameContextValue = {
            "id": 1,
            "name": "a",
            "min_players": 4,
            "max_players": 12,
            "state": 1,
            "play_direction": null,
            "turn_owner": 1,
            "players": [
                {
                "name": "player1",
                "table_position": 1,
                "alive": true,
                "quarantine": false
                }
            ], 
            "turn": {
                "state": 1,
                "action": 0,
                "player": 1,
                "card": null,
                "target": null, 
                "owner": 1
            },
        };
        
        render(
            <SetDiscardContext.Provider value={{setDiscard: vi.fn()}}>
                <PlayerSelectedContext.Provider value={mockContext.playerSelected.name}>
                    <SetPlayerSelectedContext.Provider value={mockContext.setPlayerSelected}>
                        <CardSelectedContext.Provider value={mockContext.cardSelected}>
                            <PlayersAliveContext.Provider value={mockContext.playersAlive}>
                                <TurnOwnerContext.Provider value={mockContext.turnOwner}>
                                    <GameContext.Provider value={gameContextValue}>
                                        <Player {...props} />
                                        <Player {...props2} />
                                        <Player {...props3} />
                                    </GameContext.Provider>
                                </TurnOwnerContext.Provider>
                            </PlayersAliveContext.Provider>
                        </CardSelectedContext.Provider>
                    </SetPlayerSelectedContext.Provider>
                </PlayerSelectedContext.Provider>
            </SetDiscardContext.Provider>
        );
    });
    
    test("should render the player", async () => {
        const player = screen.getByTestId("player-a");
        expect(player).toBeDefined();
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

    test("should player selected have diferent style properties than not seleted", async () => {
        const player1 = screen.getByTestId("player-a");        
        const player2 = screen.getByTestId("player-a2");        
        const player3 = screen.getByTestId("player-a3");      

        expect(window.getComputedStyle(player1)._values["background-color"]).not.toEqual(window.getComputedStyle(player2)._values["background-color"]);
        expect(window.getComputedStyle(player3)._values["background-color"]).toEqual(window.getComputedStyle(player2)._values["background-color"]);
    });

})
