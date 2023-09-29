import { describe, beforeEach, expect, test, vi } from "vitest";
import {fireEvent, render, screen} from '@testing-library/react';
import Hand from "../components/game/hand/hand";

describe('PlayerHand', () => {

    test('should display players hand', async () => {

        render(<Hand />);

        const imgs = await screen.findAllByRole('img');
        expect(imgs).toHaveLength(4);
    })

});