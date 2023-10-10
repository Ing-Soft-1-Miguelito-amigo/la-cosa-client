import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { GameContext, PlayerContext } from "../components/game/Game";
import Deck from "../components/game/deck/deck";

describe('Deck', () => {
    /*test('should display message when clicking the card deck', async () => {
        const gameCtxValue = { id: 'gameId', turn_owner: 'playerId' };
        const playerValue = { table_position: 'playerId', id: 'playerId' };
        
        render(
            <GameContext.Provider value={gameCtxValue}>
                <PlayerContext.Provider value={playerValue}>
                    <Deck />
                </PlayerContext.Provider>
            </GameContext.Provider>
        );
    
        const cardDeck = screen.getByTestId('card-deck');
        fireEvent.click(cardDeck);
        await screen.findByText('Robaste una carta');
        expect(screen.getByText('Robaste una carta')).toBeDefined();
    });
    */

    test('should display "No es tu turno" when player clicks when it is not their turn', async () => {
        const gameCtxValue = { id: 'gameId', turn_owner: 'otherPlayerId' };
        const playerValue = { table_position: 'playerId', id: 'playerId' };

        render(
            <GameContext.Provider value={gameCtxValue}>
                <PlayerContext.Provider value={playerValue}>
                    <Deck />
                </PlayerContext.Provider>
            </GameContext.Provider>
        );

        const cardDeck = screen.getByTestId('card-deck');
        expect(screen.queryByText('No es tu turno')).toBeNull();
        fireEvent.click(cardDeck);
        await screen.findByText('No es tu turno');
        expect(screen.getByText('No es tu turno')).toBeDefined();
    });
});