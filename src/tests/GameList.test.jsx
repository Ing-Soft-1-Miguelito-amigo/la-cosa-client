import { describe} from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import GameList from "../components/game/GameList";
import { waitFor } from "@testing-library/dom";
import vi from "vitest";


describe("GameList component", () => {

    test("should render", () => {

        render (<BrowserRouter><GameList/></BrowserRouter>);
        
        const name = screen.getByText("Nombre");
        const min_players = screen.getByText("Mínimo Jugadores");
        const max_players = screen.getByText("Máximo Jugadores");
        const amount_of_players = screen.getByText("Jugadores Unidos");
        
        expect(name).toBeDefined();
        expect(min_players).toBeDefined();
        expect(max_players).toBeDefined();
        expect(amount_of_players).toBeDefined();
        
    });
});

