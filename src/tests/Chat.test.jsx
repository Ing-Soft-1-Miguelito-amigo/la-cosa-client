//testear que se renderice el boton. el input y el div de los mensajes
//probar que si el input esta vacio no se envie el mensaje
//probar que si el input tiene solo espacios no se envie el mensaje
//probar que si el input tiene comillas no se envie el mensaje
//probar que renderice el mensaje enviado



import { fireEvent, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { expect, test } from "vitest";
import Chat from "../components/game/chat/Chat";
describe("Chat", () => {
  test("should render", async () => {
    const utils = render(<Chat />);
    expect(screen.getByRole("button", { name: "Enviar" })).toBeDefined();
  });

//   test("should get the message", async () => {
//     const utils = render(<Chat />);
   
//    // ver 
//     const message = screen.getByLabelText("Nombre Partida");

//     fireEvent.change(message, { target: { value: "message to test" } });

//     expect(message.value).toBe("message to test" );
//   });

//   test("should display required error when value is invalid", async () => {
//     const utils = render(<Chat />);
//     // ver 
//     const message = screen.getByLabelText("Nombre Partida");
//     const button = screen.getByRole("button", { name: "Enviar" });

//     fireEvent.change(message, { target: { value: "" } });

//     await userEvent.click(button);

//     expect(screen.getByText("Mensaje requerido")).toBeDefined();
//   });

//   test("should display error when value has quotation marks", async () => {
//     const utils = render(<Chat />);
//     // ver 
//     const message = screen.getByLabelText("Nombre Partida");
//     const button = screen.getByRole("button", { name: "Enviar" });

//     fireEvent.change(message, { target: { value: '"LaCosa"' } });

//     await userEvent.click(button);

//     expect(
//       screen.getByText("No puede contener comillas")
//     ).toBeDefined();

//   });

//   test("should not display error when value is valid", async () => {
//     const utils = render(<Chat />);
//     // ver 
//     const message = screen.getByLabelText("Nombre Partida");
//     const button = screen.getByRole("button", { name: "Enviar" });

//     fireEvent.change(gameName, { target: { value: "LaCosa message" } });
//     fireEvent.change(hostName, { target: { value: "Player1 sent a message" } });

//     await userEvent.click(button);

//     expect(screen.queryByText("Nombre requerido")).toBeNull();
//   });




});
