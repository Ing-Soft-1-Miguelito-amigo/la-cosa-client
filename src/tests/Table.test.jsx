import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Table from "../components/game/table/Table";
import { BrowserRouter } from "react-router-dom";
import { GameContext, CardSelectedContext } from "../components/game/Game";


describe('Table', () => {
    it('should render the players correctly', () => {

        const playerContextValue = [
        {
            "name": "player1",
            "owner": true,
            "id": 2,
            "table_position": 1,
            "role": null,
            "alive": true,
            "quarantine": false,
            "hand": []
        },
        {
            "name": "player2",
            "owner": false,
            "id": 5,
            "table_position": 2,
            "role": null,
            "alive": true,
            "quarantine": false,
            "hand": []
        },        
        {
            "name": "player3",
            "owner": false,
            "id": 7,
            "table_position": 3,
            "role": null,
            "alive": true,
            "quarantine": false,
            "hand": []
        },
      ];

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
  
      const { getByText } = render(<BrowserRouter>
                                     <CardSelectedContext.Provider value={{cardId: 1}}>
                                        <GameContext.Provider value={gameContextValue}>
                                            <Table players={playerContextValue} player={"player1"} />
                                        </GameContext.Provider>
                                     </CardSelectedContext.Provider>
                                    </BrowserRouter>
      );
  
      playerContextValue.forEach((player) => {
        const playerName = getByText(player.name);
        expect(playerName).toBeDefined();
      });
    });
  });