import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Game from "../components/game/Game";

describe("Game component", () => {
    test("should render Game component when game state is equal to 1", async () => {
        const gameId = 1;
        await render(<Game gameId={gameId} apiData={{ state: 1}}></Game>)
        expect(screen.getByText("La Cosa")).toBeDefined();
    })
})