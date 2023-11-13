import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent} from "@testing-library/react";
import Deck from '../components/game/deck/Deck';

const mockPlayerData = (
    name = "augusto",
    table_position = 1,
) => ({
    "name": name,
    "owner": false,
    "id": 2,
    "table_position": table_position,
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



// test('should display appropriate message when lifting a card', async () => {
    //     const gameContextValue = {
    //         "id": 1,
    //         "name": "a",
    //         "min_players": 4,
    //         "max_players": 12,
    //         "state": 1,
    //         "play_direction": null,
    //         "turn_owner": null,
    //         "players": [
    //             {
    //             "name": "player1",
    //             "table_position": 1,
    //             "alive": true,
    //             "quarantine": false
    //             }
    //         ], 
    //         "turn": {
    //             "state": 1,
    //             "action": 0,
    //             "player": 1,
    //             "card": null,
    //             "target": null
    //         },
    //     };

    //     const playerContextValue = {
    //         "name": "game1",
    //         "owner": false,
    //         "id": 2,
    //         "table_position": 2,
    //         "role": null,
    //         "alive": true,
    //         "quarantine": false,
    //         "hand": []
    //     }    

    //     render(
    //         <GameContext.Provider value={gameContextValue}>
    //             <Deck player={playerContextValue} />
    //         </GameContext.Provider>
    //     );

    //     const cardDeck = screen.getByTestId("card-deck");
    //     fireEvent.click(cardDeck);
    //     const message = await screen.findByTestId("message");
    //     expect(message.textContent).toBe('No puedes robar cartas ahora');
    // });

    // test('should display "No puedes robar cartas ahora" message when it is not the players turn', async () => {
    //     const gameContextValue = {
    //         "id": 1,
    //         "name": "a",
    //         "min_players": 4,
    //         "max_players": 12,
    //         "state": 1,
    //         "play_direction": null,
    //         "turn_owner": 2,
    //         "players": [
    //             {
    //             "name": "player1",
    //             "table_position": 1,
    //             "alive": true,
    //             "quarantine": false
    //             }
    //         ], 
    //         "turn": {
    //             "state": 1,
    //             "action": 0,
    //             "player": 1,
    //             "card": null,
    //             "target": null
    //         },
    //     };

    //     const playerContextValue = {
    //         "name": "game1",
    //         "owner": false,
    //         "id": 3,
    //         "table_position": 1,
    //         "role": null,
    //         "alive": true,
    //         "quarantine": false,
    //         "hand": ['card1', 'card2', 'card3', 'card4']
    //     }    

    //     render(
    //         <GameContext.Provider value={gameContextValue}>
    //             <Deck player={playerContextValue} />
    //         </GameContext.Provider>
    //     );

    //     const cardDeck = screen.getByTestId("card-deck");
    //     fireEvent.click(cardDeck);
    //     const message = await screen.findByTestId("message");
    //     expect(message.textContent).toBe('No puedes robar cartas ahora');
    // });
describe('Trash Icon', () => {
 
    test("should call a function when clicking on the trash icon when is turn owner", () => {
        
        const discard = false;
        const setDiscard = vi.fn();
        const setPlayerSelected = vi.fn();

        render(            
            <Deck player={mockPlayerData()} 
                playDirection={1} 
                gameId={1}
                turnOwner={1}
                turnState={1}
                cardSelected={{cardId: 1}}
                discardState={{discard, setDiscard}}
                setPlayerSelected={setPlayerSelected}/>
        )

        const trashIcon = screen.getByTestId("discard");
        fireEvent.click(trashIcon);      
        expect(discard).toBeDefined;
        expect(setDiscard).toHaveBeenCalledTimes(1);
        expect(setPlayerSelected).toHaveBeenCalledTimes(1);
    });

    test("should not call a function when clicking on the trash icon when is not turn owner", () => {
        const discard = false;
        const setDiscard = vi.fn();
        const setPlayerSelected = vi.fn();

        render(            
            <Deck player={mockPlayerData()} 
                playDirection={1} 
                gameId={1}
                turnOwner={1}
                turnState={1}
                cardSelected={{cardId: 1}}
                discardState={{discard, setDiscard}}
                setPlayerSelected={setPlayerSelected}/>
        )

        const trashIcon = screen.getByTestId("discard");
        expect(trashIcon).toBeDefined;

        fireEvent.click(trashIcon);      
        expect(setDiscard).toBeCalledTimes(1);
        expect(setDiscard).toBeCalledWith(true);
        expect(setPlayerSelected).toHaveBeenCalledTimes(1);
        
        fireEvent.click(trashIcon);      
        expect(setDiscard).toBeCalledTimes(2);
        expect(setPlayerSelected).toHaveBeenCalledTimes(2);
    });
    
    test("should not call a function when clicking on the trash icon when is not turn owner", () => {
        const discard = false;
        const setDiscard = vi.fn();
        const setPlayerSelected = vi.fn();

        render(            
            <Deck player={mockPlayerData()} 
                playDirection={1} 
                gameId={1}
                turnOwner={2}
                turnState={1}
                cardSelected={{cardId: 1}}
                discardState={{discard, setDiscard}}
                setPlayerSelected={setPlayerSelected}/>
        )

        const trashIcon = screen.getByTestId("discard");
        expect(trashIcon).toBeDefined;

        fireEvent.click(trashIcon);      
        expect(setDiscard).toBeCalledTimes(0);
        expect(setPlayerSelected).toHaveBeenCalledTimes(0);
        
    });
});
