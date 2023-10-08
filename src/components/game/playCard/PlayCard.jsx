 //inicio de jugar carta (implementacion)

const [cardSelected, setCardSelected] = useState({});
const [playerSelected, setPlayerSelected] = useState({});
const [canPlayCard, setCanPlayCard] = useState(false);
const [card, setCard] = useState(false);
const [player, setPlayer] = useState(false);

const selectCard = (card_id) => {
   if (card_id !== cardSelected.card_id) {
     setCardSelected({ card_id });
     setCard(cardSelected !== undefined)
   }
   else {
     return 0;
   }
   return 1;
 };

const selectPlayer = (playerId) => {
   // recorro el areglo de jugadores verificando a quienes puedo jugarle una carta (izq y der vivos)
   if (cardSelected.card_id !== undefined) {
     setPlayerSelected({ id: playerId });
     setPlayer(playerSelected !== undefined)
   }
   else {
     return 0;
   }
   return 1;
 };

 useEffect(() => {
   setCanPlayCard(playerSelected.id !== undefined && cardSelected.card_id !== undefined)
 }, [playerSelected]);

const playCard = () => {
   // fetchPlayCard(game_id, player_id, cardSelected.card_id, playerSelected.id);
   console.log("Jugando carta");
};