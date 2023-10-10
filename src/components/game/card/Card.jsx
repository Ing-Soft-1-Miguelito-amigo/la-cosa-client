import style from '../card/card.module.css'

const Card = ({
    card_id,
    code, 
    number_in_card
}) => {
    console.log(code,   number_in_card)
    return (
        <div>
            <img src={`../../src/img/${code}${number_in_card}.png`} alt='img' role='imgs' className={style.card}/>
        </div>
    )
}

export default Card;
