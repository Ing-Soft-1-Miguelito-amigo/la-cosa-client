import style from '../card/card.module.css'

const Card = ({
    cardId,
    code,
    selectCard,
    cardSelected
}) => {
    const cardStyle = cardSelected.cardId===cardId ? style.selected : style.card;

    return (
        <div>
            <div onClick={() => selectCard(cardId)} >
                <img src={`../../src/img/${code}.jpg`} alt='img' role='imgs' className={cardStyle}/>
           </div>
        </div>
    )
}

export default Card;

