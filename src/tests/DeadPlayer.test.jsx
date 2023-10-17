import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import DeadPlayer from "../components/game/deadPlayer/DeadPlayer";
import { BrowserRouter } from "react-router-dom";

describe("GameCreationForm", () => {
    test("should render", async () => {
        render(<BrowserRouter><DeadPlayer /></BrowserRouter>);
        expect(screen.getByText("¡Has sido incinerado!")).toBeDefined();
        expect(screen.getByRole("button", { name: "Salir de la Partida" })).toBeDefined();
        
    });
});
