import style from '../card/card.module.css'

const Card = ({
    card_id,
    code
}) => {
    return (
        <div>
            <img src={`../../src/img/${code}.jpg`} alt='img' role='imgs' className={style.card}/>
        </div>
    )
}

export default Card;

