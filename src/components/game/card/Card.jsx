const Card = ( {id, img} ) => {

  const cardStyle = {
    width: '100%',
    height: 'auto',
  };

  return (
    <div className="card" id={id}>
       <img src={img} alt={`Card ${id}`} style={cardStyle}/>
    </div>
  );
};

export default Card;
