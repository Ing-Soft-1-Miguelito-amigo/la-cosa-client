
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, should, test  } from "vitest";
import Player from "../components/game/player/Player";
import { CardSelectedContext, PlayerSelectedContext, SetPlayerSelectedContext, PlayersAliveContext, TurnOwnerContext } from "../components/game/Game";
const props = {
    name: "a",
    playerData: {
       name: "a", 
       alive: true, 
       table_position: 1}
    };

const props2 = {
    name: "a2",
    playerData: {
        name: "a2", 
        alive: true, 
        table_position: 2}
    };

const props3 = {
    name: "a3",
    playerData: {
        name: "a3", 
        alive: true, 
        table_position: 3}
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
        render(
            <PlayerSelectedContext.Provider value={mockContext.playerSelected.name}>
                <SetPlayerSelectedContext.Provider value={mockContext.setPlayerSelected}>
                    <CardSelectedContext.Provider value={mockContext.cardSelected}>
                        <PlayersAliveContext.Provider value={mockContext.playersAlive}>
                            <TurnOwnerContext.Provider value={mockContext.turnOwner}>
                                <Player {...props} />
                                <Player {...props2} />
                                <Player {...props3} />
                            </TurnOwnerContext.Provider>
                        </PlayersAliveContext.Provider>
                    </CardSelectedContext.Provider>
                </SetPlayerSelectedContext.Provider>
            </PlayerSelectedContext.Provider>
        );
    });
    
    test("should render the player", async () => {
        const player = screen.getByTestId("player-a");
        expect(player).toBeDefined();
    });

    test("should call setPlayerSelected when click on player", async () => {
        const player1 = screen.getByTestId("player-a");        
        const player2 = screen.getByTestId("player-a2");        
        const player3 = screen.getByTestId("player-a3");      

        fireEvent.click(player1);
        fireEvent.click(player1);
        expect(mockContext.setPlayerSelected).toHaveBeenCalledTimes(0);
        fireEvent.click(player2);
        expect(mockContext.setPlayerSelected).toHaveBeenCalledTimes(1);
        fireEvent.click(player3);
        expect(mockContext.setPlayerSelected).toHaveBeenCalledTimes(2);
    });

    test("should player selected have diferent style properties than not seleted", async () => {
        const player1 = screen.getByTestId("player-a");        
        const player2 = screen.getByTestId("player-a2");        
        const player3 = screen.getByTestId("player-a3");      


        expect(window.getComputedStyle(player1)._values["background-color"]).not.toEqual(window.getComputedStyle(player2)._values["background-color"]);
        expect(window.getComputedStyle(player3)._values["background-color"]).toEqual(window.getComputedStyle(player2)._values["background-color"]);
    });

})