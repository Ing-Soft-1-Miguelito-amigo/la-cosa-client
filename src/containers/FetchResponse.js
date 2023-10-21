import { httpRequest } from "../services/HttpService";

const FetchResponse = async (data) => {
  try {
    const response = await httpRequest({
      method: "PUT",
      service: "game/response",
      payload: data
    });
    return response; 
  } catch (error) {
    console.log(error);
  }
};

export default FetchResponse;


//para whisky ==> null const data = {game_id:int, player_id:int, response_card_id: int} 