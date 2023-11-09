import { describe, expect, test, vi } from "vitest";
import { render, screen} from '@testing-library/react';
import Hand from "../components/game/hand/Hand";
import { CardSelectedContext, GameContext } from "../components/game/Game";

const mockPlayerData = (
    name = "augusto"
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
        "code": "lla",
        "number_in_card": 1,
        "kind":1
    },{
        "id": 2,
        "code": "lla",
        "number_in_card": 4,
        "kind":1
    },{
        "id": 3,
        "code": "lla",
        "number_in_card": 6,
        "kind":1
    },{
        "id": 4,
        "code": "wsk",
        "number_in_card": 8,
        "kind":1
    }]
});

const turn = (state, cardCode,destinationPlayer) => ({
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

const mockGameData = (turn) => ({
    "id": 1,
    "name": "a",
    "min_players": 4,
    "max_players": 12,
    "state": 1,
    "play_direction": null,
    "turn_owner": 1,
    "players": [
        {
            "name": "ale",
            "table_position": 1,
            "alive": true,
            "quarantine": false
        },{
            "name": "augusto",
            "table_position": 3,
            "alive": true,
            "quarantine": false
        }
    ], 
    "turn": turn
});

describe('PlayerHand', () => {

    test('should render players hand', async () => {
        const mockDefend = vi.fn();
const mockSetCardSelected = vi.fn();

const cardSelected = {}
        render(      
            <GameContext.Provider value={mockGameData(turn(1, "lla", null))}>
            <CardSelectedContext.Provider value={cardSelected}>
                <Hand 
                    player={mockPlayerData()} 
                    gameData={mockGameData(turn(1,null))}
                    setCardSelected={vi.fn()}
                    defendCard={vi.fn()}/>
            </CardSelectedContext.Provider>    
            </GameContext.Provider>  
        );

        const hand = screen.getByTestId("hand");
        expect(hand).toBeDefined()
    });
    
    test('should render the cards in the hand', async () => {
        const mockDefend = vi.fn();
const mockSetCardSelected = vi.fn();

const cardSelected = {}
        render(      
            <GameContext.Provider value={mockGameData(turn(1, "lla", null))}>
            <CardSelectedContext.Provider value={cardSelected}>
                <Hand 
                    player={mockPlayerData()} 
                    gameData={mockGameData(turn(1,null))}
                    setCardSelected={vi.fn()}
                    defendCard={vi.fn()}/>
            </CardSelectedContext.Provider>    
            </GameContext.Provider>  
        );
            
        const hand = screen.getByTestId("hand");
        const cards = screen.getAllByTestId(/card-/);
        expect(cards).toHaveLength(4);  
    });

    test('should verify if the player can not defend the lla card', async () => {
        const mockDefend = vi.fn();
        const mockSetCardSelected = vi.fn();
        
        const cardSelected = {}
        const gameData = mockGameData(turn(2, "lla", "ale"));
        const playerData = mockPlayerData("ale");
        render(      
            <GameContext.Provider value={gameData}>
            <CardSelectedContext.Provider value={cardSelected}>
                <Hand 
                    player={playerData} 
                    gameData={gameData}
                    setCardSelected={mockSetCardSelected}
                    defendCard={mockDefend}/>
            </CardSelectedContext.Provider>    
            </GameContext.Provider>  
        );
        expect(mockDefend).toHaveBeenCalledTimes(1);
        expect(mockSetCardSelected).toHaveBeenCalledTimes(0);
        expect(mockDefend).toHaveBeenCalledWith(null);
    });

    test('should verify if the player can not defend the cdl card', async () => {
        const mockDefend = vi.fn();
        const mockSetCardSelected = vi.fn();
        
        const cardSelected = {}
        const gameData = mockGameData(turn(2, "cdl", "ale"));
        const playerData = mockPlayerData("ale");
        render(      
            <GameContext.Provider value={gameData}>
            <CardSelectedContext.Provider value={cardSelected}>
                <Hand 
                    player={playerData} 
                    gameData={gameData}
                    setCardSelected={mockSetCardSelected}
                    defendCard={mockDefend}/>
            </CardSelectedContext.Provider>    
            </GameContext.Provider>  
        );

        expect(mockDefend).toHaveBeenCalledTimes(1);
        expect(mockSetCardSelected).toHaveBeenCalledTimes(0);
    });

    test('should verify if the player can not defend the wsk card', async () => {
        const mockDefend = vi.fn();
        const mockSetCardSelected = vi.fn();
        
        const cardSelected = {}
        const gameData = mockGameData(turn(2, "wsk", "ale"));
        const playerData = mockPlayerData("ale");
        render(      
            <GameContext.Provider value={gameData}>
            <CardSelectedContext.Provider value={cardSelected}>
                <Hand 
                    player={playerData} 
                    gameData={gameData}
                    setCardSelected={mockSetCardSelected}
                    defendCard={mockDefend}/>
            </CardSelectedContext.Provider>    
            </GameContext.Provider>  
        );

        expect(mockDefend).toHaveBeenCalledTimes(1);
        expect(mockSetCardSelected).toHaveBeenCalledTimes(0);
    });
});