import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent} from "@testing-library/react";
import Deck from '../components/game/deck/Deck';
import { GameContext, CardSelectedContext, SetDiscardContext, SetPlayerSelectedContext } from '../components/game/Game';

describe('Deck component', () => {
    test('should display appropriate message when lifting a card', async () => {
        const gameContextValue = {
            "id": 1,
            "name": "a",
            "min_players": 4,
            "max_players": 12,
            "state": 1,
            "play_direction": null,
            "turn_owner": null,
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
                "target": null
            },
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
        }    

        render(
            <GameContext.Provider value={gameContextValue}>
                <Deck player={playerContextValue} />
            </GameContext.Provider>
        );

        const cardDeck = screen.getByTestId("card-deck");
        fireEvent.click(cardDeck);
        const message = await screen.findByTestId("message");
        expect(message.textContent).toBe('No puedes robar cartas ahora');
    });

    test('should display "No puedes robar cartas ahora" message when it is not the players turn', async () => {
        const gameContextValue = {
            "id": 1,
            "name": "a",
            "min_players": 4,
            "max_players": 12,
            "state": 1,
            "play_direction": null,
            "turn_owner": 2,
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
                "target": null
            },
        };

        const playerContextValue = {
            "name": "game1",
            "owner": false,
            "id": 3,
            "table_position": 1,
            "role": null,
            "alive": true,
            "quarantine": false,
            "hand": ['card1', 'card2', 'card3', 'card4']
        }    

        render(
            <GameContext.Provider value={gameContextValue}>
                <Deck player={playerContextValue} />
            </GameContext.Provider>
        );

        const cardDeck = screen.getByTestId("card-deck");
        fireEvent.click(cardDeck);
        const message = await screen.findByTestId("message");
        expect(message.textContent).toBe('No puedes robar cartas ahora');
    });
 
    test("should call a function when clicking on the discard icon", () => {

        const MockSetDiscard = vi.fn();
        const MockSetPlayerSelected = vi.fn();

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

        const playerContextValue = {
            "name": "game1",
            "owner": false,
            "id": 3,
            "table_position": 1,
            "role": null,
            "alive": true,
            "quarantine": false,
            "hand": ['card1', 'card2', 'card3', 'card4']
        }    

        render(            
            <SetDiscardContext.Provider value={{setDiscard:MockSetDiscard}}>
                <SetPlayerSelectedContext.Provider value={{setPlayerSelected:MockSetPlayerSelected}}>
                    <CardSelectedContext.Provider value={{cardId: 1}}>
                        <GameContext.Provider value={gameContextValue}>
                            <Deck player={playerContextValue} />
                        </GameContext.Provider>
                    </CardSelectedContext.Provider>
                </SetPlayerSelectedContext.Provider>
            </SetDiscardContext.Provider>
        )

        const discard = screen.getByTestId("discard");
        fireEvent.click(discard);      
        expect(discard).toBeDefined;
        expect(MockSetDiscard).toHaveBeenCalledTimes(1);
        expect(MockSetPlayerSelected).toHaveBeenCalledTimes(0);
    });
});
