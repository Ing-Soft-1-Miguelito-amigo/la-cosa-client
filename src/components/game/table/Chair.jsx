import style from "./chair.module.css"

const Chair = ({ state, order, angle }) => {
    const radius = 160;
    const cosang = Math.cos(angle * (order - 1));
    const senang = Math.sin(angle * (order - 1));
  
    const positionStyle = {
      position: "relative",
      top: `${senang * radius}px`,
      left: `${cosang * radius}px`,
    };

    console.log(`order: ${order} left: ${positionStyle.left} top: ${positionStyle.top} cosang: ${cosang}, senang: ${senang}`)
    
    return (
      <div className={`${style.chairStyle} ${style[state]}`} style={positionStyle}>
        {order}
      </div>
    );
  };
  
export default Chair;
  