import { useNavigate } from "react-router-dom"

const Home = () => {
    const navigate = useNavigate()
    const gotoCreateGame = () => {
        navigate("/game-creation-form")
    }

    const gotoJoinGame = () => {
        navigate("/game-join-form")
    }

    return (
        <div className="home">
            <h2>Esto es el home</h2>
            <button onClick={gotoCreateGame}>Crear partida</button>
            <button onClick={gotoJoinGame}>Unirse a partida</button>
        </div>
    )
}

export default Home;