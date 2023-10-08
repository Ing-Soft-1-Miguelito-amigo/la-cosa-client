import {httpRequest} from "../services/HttpService";
const FetchPlayCard = async ({game_id,player_id,card_id,destination_name}) => {

    const data={
        game_id:game_id,
        player_id:player_id,
        card_id:card_id,
        destination_name:destination_name
    }

    const response = await httpRequest({
        method: "PUT",
        service: "/game/play",
        payload: data,
    });

    return response.status;
};

export default FetchPlayCard;