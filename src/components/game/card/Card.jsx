import style from '../card/card.module.css'

const Card = ({
    cardId,
    code,
    selectCard,
    cardSelected,
    tablePosition
}) => {
    const cardStyle = cardSelected.cardId === cardId ? style.selected : style.card;

    return (
        <div onClick={() => { selectCard(cardId, tablePosition) }} className={cardStyle} data-testid={"card-" + cardId}>
            <img src={`../../src/img/${code}.jpg`} alt='img' role='imgs' />
        </div>
    )
}

export default Card;

