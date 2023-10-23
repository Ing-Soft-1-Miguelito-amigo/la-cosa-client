import {httpRequest} from "../services/HttpService";

const FetchPlayCard = async ({
    gameId,
    playerId,
    cardId,
    destinationName
}) => {
    const response = await httpRequest({
        method: "PUT",
        service: "game/play",
        payload: {
            game_id: gameId,
            player_id: playerId,
            card_id: cardId,
            destination_name: destinationName
        },
    });

    return response.status;
};

export default FetchPlayCard;