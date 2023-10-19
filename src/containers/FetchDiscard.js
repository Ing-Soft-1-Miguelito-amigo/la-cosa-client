import { httpRequest } from '../services/HttpService'
    
const FetchDiscard = async ( data ) => {
    try {
        const response = await httpRequest({
            method: 'PUT', 
            service: 'game/discard', 
            payload: data
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export default FetchDiscard;