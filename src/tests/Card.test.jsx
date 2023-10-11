import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Card from "../components/game/card/Card";
import { CardSelectedContext, SetCardSelectedContext, TurnOwnerContext } from "../components/game/Game";

const props = {
    cardId: 1,
    code: "lla",
    tablePosition: 1
};
const props2 = {
    cardId: 2,
    code: "lla",
    tablePosition: 1
};
const props3 = {
    cardId: 3,
    code: "lla",
    tablePosition: 1
};


const mockContext = {
    cardSelected: {
        cardId: 1
    },
    setCardSelected: vi.fn(),
    turnOwner: 1
};

describe('Component Card', () => {
    
    test('should render a card', async () => {
        
        render(
        <CardSelectedContext.Provider value={mockContext}>
        <Card {...props} />
        </CardSelectedContext.Provider>    
        );
        const card = screen.getByTestId("card-1");
        expect(card).toBeDefined();    
    });

    test('should call setCardSelected when click on card', async () => {
        render(
            <TurnOwnerContext.Provider value={mockContext.turnOwner}>
                <SetCardSelectedContext.Provider value={mockContext.setCardSelected}>
                    <CardSelectedContext.Provider value={mockContext.cardSelected}>
                        <Card { ...props} />
                        <Card { ...props2} />
                        <Card { ...props3} />
                    </CardSelectedContext.Provider>    
                </SetCardSelectedContext.Provider>
            </TurnOwnerContext.Provider>
        );
        
        const card1 = screen.getByTestId("card-1");        
        const card2 = screen.getByTestId("card-2");        
        const card3 = screen.getByTestId("card-3");        
        fireEvent.click(card1);
        fireEvent.click(card1);
        expect(mockContext.setCardSelected).toHaveBeenCalledTimes(0);
        fireEvent.click(card2);
        expect(mockContext.setCardSelected).toHaveBeenCalledTimes(1);
        fireEvent.click(card3);
        expect(mockContext.setCardSelected).toHaveBeenCalledTimes(2);
    });

    test('should selected card have diferent style properties than not seleted', async () => {
        
        render(
        <TurnOwnerContext.Provider value={mockContext.turnOwner}>
            <SetCardSelectedContext.Provider value={mockContext.setCardSelected}>
                <CardSelectedContext.Provider value={mockContext.cardSelected}>
                    <Card { ...props} />
                    <Card { ...props2} />
                    <Card { ...props3} />
                </CardSelectedContext.Provider>    
            </SetCardSelectedContext.Provider>
        </TurnOwnerContext.Provider>
        );
        const card1 = screen.getByTestId("card-1");
        const card2 = screen.getByTestId("card-2");
        const card3 = screen.getByTestId("card-3");

        expect(window.getComputedStyle(card1)._values).not.toEqual(window.getComputedStyle(card2)._values);
        expect(window.getComputedStyle(card3)._values).not.toEqual(window.getComputedStyle(card2)._values);
    });
});
