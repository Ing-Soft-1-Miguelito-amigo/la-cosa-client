import {httpRequest} from "../services/HttpService";

const FetchPlayCard = async ({
    gameId,
    playerId,
    cardId,
    destination_name
}) => {
    const response = await httpRequest({
        method: "PUT",
        service: "game/play",
        payload: {
            game_id: gameId,
            player_id: playerId,
            card_id: cardId,
            destination_name: destination_name
        },
    });

    return response.status;
};

export default FetchPlayCard;