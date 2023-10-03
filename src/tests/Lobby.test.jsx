import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test  } from "vitest";
import Lobby from "../components/game/lobby/Lobby";

describe("Lobby component", () => {
    test("should render the game start button", async () => {
        const apiData = { id: 1, turn_owner: 1, players: [{name: "el host", table_position: 1}] };
        await render(<Lobby apiData={ apiData }/>)
        expect(screen.findByText("Iniciar Partida")).toBeDefined()
    })
    
    test("should NOT render the game start button", async () => {
        const apiData = { id: 1, turn_owner: 1, players: [{name: "falso host", table_position: 2}] };
        await render(<Lobby apiData={ apiData }/>)
        expect(screen.findByText("Iniciar Partida")).toBeUndefined()
    })
})