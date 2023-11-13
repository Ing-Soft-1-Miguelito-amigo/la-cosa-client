import { httpRequest } from "../services/HttpService";

const FetchEndTurn = async ({gameId, setInstructionReciever}) => {
  try {
    const response = await httpRequest({
      method: "PUT",
      service: "turn/finish",
      payload: {game_id: gameId}
    });
    setInstructionReciever(response.json.new_owner_name);
    return response; 
  } catch (error) {
    console.log(error);
    return;
  }
};

export default FetchEndTurn;
