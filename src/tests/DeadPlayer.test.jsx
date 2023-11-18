import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import DeadPlayer from "../components/game/deadPlayer/DeadPlayer";
import { BrowserRouter } from "react-router-dom";
import MockedSocket from 'socket.io-mock';


describe("GameCreationForm", () => {
    test("should render", async () => {
        const socketMock = new MockedSocket();
        render(<BrowserRouter>
            <DeadPlayer socket={socketMock}/>
        </BrowserRouter>);
        //expect(screen.getByText("¡Has sido incinerado!")).toBeDefined();
        expect(screen.getByRole("button", { name: "Salir de la Partida" })).toBeDefined();
    });
});
