//Make the request to the server
const FetchStartGame = async (data) => {
    try {
    const response = await httpRequest({
        method: "POST",
        service: "game/start",
        payload: data,
    });
    if (response.status === 200) {
        window.location.reload();}
} catch (error) {
    return error; 
    }
};

export default FetchStartGame;