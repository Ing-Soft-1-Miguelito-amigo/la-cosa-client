import { describe, expect, test, vi } from "vitest";
import { render, screen, waitFor } from '@testing-library/react';
import Hand from "../components/game/hand/Hand";

describe('PlayerHand', () => {

    test('should display players hand', async () => {
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

        render(<Hand playerId={1} gameId={1} player={playerContextValue} gameData={gameContextValue}/>);
        const cardsDiv = screen.getAllByTestId("cards", { hidden: true })
        console.log(cardsDiv)
        expect(cardsDiv).toBeDefined()
    })

});
