import { httpRequest } from "../services/HttpService";

const FetchEndTurn = async ({gameId}) => {
  try {
    const response = await httpRequest({
      method: "PUT",
      service: "turn/finish",
      payload: {game_id: gameId}
    });
    return response; 
  } catch (error) {
    console.log(error);
  }
};

export default FetchEndTurn;


//para whisky y ups ==> null const data = {game_id:int, player_id:int, response_card_id: int} 