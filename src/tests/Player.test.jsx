import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test  } from "vitest";
import Player from "../components/game/player/Player";

describe("Player component", () => {
    test("should render the player", async () => {
        const name = "Miguelito mi amigo";
        const apiData = {
            players: [{name: name, alive: true}]
        };
        await render(<Player name={name} apiData={apiData}></Player>)
        const element = screen.getByText("Miguelito mi amigo") 
        expect(element.className).toBeDefined()
    })
})