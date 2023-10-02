import style from'../card/card.module.css'
import lanzallamas from '../../../mocks/imgImports';

const Card = ({
    card_id
}) => {
    
    return (
        <div>
            <img src={lanzallamas} alt='lanzallamasImg' className={style.card}/>
        </div>
    )}

 
export default Card;
