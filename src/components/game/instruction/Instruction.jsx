
const Instruction = ({ state, cardLifted, cardSelected }) => {
    switch(state) {
        case 1:
            if (!cardLifted) {
                return(<span>Levanta una carta</span>)
            } else {
                if (!cardSelected.code) {
                    return(<span>Elige una carta para jugar o descartar</span>)
                } else {
                    return(<span>Juega o descarta la carta</span>)
                }
            }

        case 2:
            return(<span>Elige una carta para defenderte</span>)
        case 3:
            return(<span>Elige una carta para intercambiar</span>)
        
        case 4:
            return (<span>Elige una carta para intercambiar (o si puedes y quieres para defenderte del intercambio)</span>)

        case 6:
            return (<span>Se levantó una carta de pánico!</span>)
        
        default:
            return (<></>)
    }
}

export default Instruction;