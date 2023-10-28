import { httpRequest } from "../services/HttpService";

const FetchResponse = async ({
  gameId,
  playerId,
  responseCardId
}) => {
  try {
    const response = await httpRequest({
      method: "PUT",
      service: "game/response",
      payload: {
        game_id: gameId,
        player_id: playerId,
        response_card_id: responseCardId
      }
    });
    return response; 
  } catch (error) {
    console.log(error);
  }
};

export default FetchResponse;


//para whisky ==> null const data = {game_id:int, player_id:int, response_card_id: int} 