const FetchData = async ( onSetApiData, onSetPlayers, gameId) => {
    try {
        const apiData = await httpRequest({ method: 'GET', service: 'game/' + gameId });
        onSetApiData(apiData.json);
        onSetPlayers(apiData.json.players);
    } catch (error) {
        console.log(error);
    }
}

export default FetchData;