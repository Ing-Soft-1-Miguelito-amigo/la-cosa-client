import style from'../card/card.module.css'
import lanzallamas from '/public/img/lanzallamas.jpg';

const Card = ({
    card_id
}) => {
    
    return (
        <div>
            <img src={lanzallamas} alt='fueguito' className={style.card}/>
        </div>
    )}

 
export default Card;
