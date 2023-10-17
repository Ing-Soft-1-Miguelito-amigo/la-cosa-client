import { fireEvent, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { expect, test } from "vitest";
import GameCreationForm from "../components/gameCreationForm/GameCreationForm";
import { BrowserRouter } from "react-router-dom";

describe("GameCreationForm", () => {
  test("should render", async () => {
    render(<BrowserRouter><GameCreationForm /></BrowserRouter>);
    expect(screen.getByText("Nombre Partida")).toBeDefined();
    expect(screen.getByText("Nombre Host")).toBeDefined();
    expect(screen.getByRole("button", { name: "Crear Partida" })).toBeDefined();
  });

  test("should get the data", async () => {
    const utils = render(<BrowserRouter><GameCreationForm /></BrowserRouter>);
    const gameName = screen.getByLabelText("Nombre Partida");
    const hostName = screen.getByLabelText("Nombre Host");

    fireEvent.change(gameName, { target: { value: "LaCosa" } });
    fireEvent.change(hostName, { target: { value: "Player1" } });

    expect(gameName.value).toBe("LaCosa");
    expect(hostName.value).toBe("Player1");
  });

  test("should display required error when value is invalid", async () => {
    const utils = render(<BrowserRouter><GameCreationForm /></BrowserRouter>);
    const gameName = screen.getByLabelText("Nombre Partida");
    const hostName = screen.getByLabelText("Nombre Host");
    const button = screen.getByRole("button", { name: "Crear Partida" });

    fireEvent.change(gameName, { target: { value: "" } });
    fireEvent.change(hostName, { target: { value: "" } });

    await userEvent.click(button);

    expect(screen.getByText("Nombre requerido")).toBeDefined();
    expect(screen.getByText("Campo requerido")).toBeDefined();
  });

  test("should display error when value has quotation marks", async () => {
    const utils = render(<BrowserRouter><GameCreationForm /></BrowserRouter>);
    const gameName = screen.getByLabelText("Nombre Partida");
    const hostName = screen.getByLabelText("Nombre Host");
    const button = screen.getByRole("button", { name: "Crear Partida" });

    fireEvent.change(gameName, { target: { value: '"LaCosa"' } });
    fireEvent.change(hostName, { target: { value: '"Player1"' } });

    await userEvent.click(button);

    expect(
      screen.getByText("No puede contener comillas")
    ).toBeDefined();
    expect(
      screen.getByText("Partida no puede contener comillas")
    ).toBeDefined();
  });

  test("should not display error when value is valid", async () => {
    const utils = render(<BrowserRouter><GameCreationForm /></BrowserRouter>);
    const gameName = screen.getByLabelText("Nombre Partida");
    const hostName = screen.getByLabelText("Nombre Host");
    const button = screen.getByRole("button", { name: "Crear Partida" });

    fireEvent.change(gameName, { target: { value: "LaCosa" } });
    fireEvent.change(hostName, { target: { value: "Player1" } });

    await userEvent.click(button);

    expect(screen.queryByText("Nombre requerido")).toBeNull();
    expect(screen.queryByText("Campo requerido")).toBeNull();
  });
});
