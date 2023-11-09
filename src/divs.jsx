import style from './divs.module.css';

const DIVS = () => {
    return (
        <>
        <div className={style.general}>
            <div className={style.topbox} >
                <div className={style.action}></div>        
                <div className={style.table}></div>        
            </div>
            <div className={style.bottombox} >
                <div className={style.container} >
                    <div className={style.buttons}></div>        
                    <div className={style.logs}></div>        
                </div>
                <div className={style.container2} >
                    <div className={style.deck}></div>        
                    <div className={style.hand}></div>        
                </div>
                <div className={style.chat}></div>
            </div>

        </div>        
        </>
    );
}

export default DIVS;