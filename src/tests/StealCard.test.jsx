import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent} from "@testing-library/react";
import Deck from '../components/game/deck/Deck';
import { GameContext, PlayerContext, CardSelectedContext, SetDiscardContext, SetPlayerSelectedContext } from '../components/game/Game';
import { set } from 'react-hook-form';

describe('Deck component', () => {
    test('should display appropriate message when lifting a card', async () => {
        const gameContextValue = {
            id: 1,
            turn_owner: 2,
        };

        const playerContextValue = {
            table_position: 2,
            id: 3,
            hand: ['card1', 'card2', 'card3', 'card4', 'card5'],
        };

        render(
            <GameContext.Provider value={gameContextValue}>
                <PlayerContext.Provider value={playerContextValue}>
                    <Deck />
                </PlayerContext.Provider>
            </GameContext.Provider>
        );

        const cardDeck = screen.getByTestId("card-deck");
        fireEvent.click(cardDeck);
        const message = await screen.findByTestId("message");
        expect(message.textContent).toBe('Tienes el maximo de cartas ya!');
    });

    test('should display "No es tu turno" message when it is not the players turn', async () => {
        const gameContextValue = {
            id: 1,
            turn_owner: 2, // Not the player's turn (playerContextValue's table_position is 2)
        };

        const playerContextValue = {
            table_position: 1, // Player's table_position is different from turn_owner
            id: 3,
            hand: ['card1', 'card2', 'card3', 'card4'],
        };

        render(
            <GameContext.Provider value={gameContextValue}>
                <PlayerContext.Provider value={playerContextValue}>
                    <Deck />
                </PlayerContext.Provider>
            </GameContext.Provider>
        );

        const cardDeck = screen.getByTestId("card-deck");
        fireEvent.click(cardDeck);
        const message = await screen.findByTestId("message");
        expect(message.textContent).toBe('No es tu turno');
    });
 
    test("should call a function when clicking on the discard icon", () => {

        const MockSetDiscard = vi.fn();
        const MockSetPlayerSelected = vi.fn();

        const gameContextValue = {
            id: 1,
            turn_owner: 1, // Not the player's turn (playerContextValue's table_position is 2)
        };

        const playerContextValue = {
            table_position: 1, // Player's table_position is different from turn_owner
            id: 3,
            hand: ['card1', 'card2', 'card3', 'card4'],
        };

        render(            
            <SetDiscardContext.Provider value={{setDiscard:MockSetDiscard}}>
                <SetPlayerSelectedContext.Provider value={{setPlayerSelected:MockSetPlayerSelected}}>
                    <CardSelectedContext.Provider value={{cardId: 1}}>
                        <GameContext.Provider value={gameContextValue}>
                            <PlayerContext.Provider value={playerContextValue}>
                                <Deck />
                            </PlayerContext.Provider>
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
