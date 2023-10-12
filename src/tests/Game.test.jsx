import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Game from "../components/game/Game";
import { BrowserRouter } from "react-router-dom";

describe("Game component", () => {
    test("should render Game component when game state is equal to 1",  () => {
        render(
            <BrowserRouter>
                <Game gameId={1} gameData={{ state: 1}}></Game>
            </BrowserRouter>
        )
        expect(screen.getByText("La Cosa")).toBeDefined();
    })
})