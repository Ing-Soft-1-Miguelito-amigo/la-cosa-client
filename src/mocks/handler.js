import { rest } from 'msw';

export const handlers = [
    rest.get('/game/:gameId/player/:playerId', (req, res, ctx) => {
        return res(
            ctx.json({
                my_cards: [
                    {
                        card_id: 1,
                    },
                    {
                        card_id: 2,
                    },
                    {
                        card_id: 3,
                    },
                    {
                        card_id: 4,
                    },
                ],
            })
        );
    }),
];