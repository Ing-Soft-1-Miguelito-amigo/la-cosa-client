import { describe, expect, test, vi } from "vitest";
import { render, screen, waitFor } from '@testing-library/react';
import Hand from "../components/game/hand/Hand";

describe('PlayerHand', () => {

    test('should display players hand', async () => {
        render(<Hand playerId={1} gameId={1}/>);
        const cardsDiv = screen.getAllByTestId("cards", { hidden: true })
        console.log(cardsDiv)
        expect(cardsDiv).toBeDefined()
    })

});