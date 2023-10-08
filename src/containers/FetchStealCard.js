import { httpRequest } from '../services/HttpService'
    
const FetchStealCard = async ( { gameId, playerId, clicked}) => {
    
    const data = {game_id : gameId, player_id : playerId}
    if(!clicked){
        try {
            const response = await httpRequest({ method: 'PUT', service: 'game/steal', payload: data});
            return response;
        } catch (error) {
            console.log(error);
        }
    }
};

export default FetchStealCard;