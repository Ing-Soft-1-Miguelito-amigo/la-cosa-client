import { httpRequest } from "../services/HttpService";

const FetchCards = async ({ onSetHand, gameId, playerId }) => {
  try {
    const apiData = await httpRequest({
      method: "GET",
      service: "game/" + gameId + "/player/" + playerId,
    });
    onSetHand(apiData.json.hand);
  } catch (error) {
    console.log(error);
  }
};

export default FetchCards;
