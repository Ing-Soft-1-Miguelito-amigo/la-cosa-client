import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent} from "@testing-library/react";
import Deck from '../components/game/deck/Deck';
import { GameContext, PlayerContext } from '../components/game/Game';

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
});
