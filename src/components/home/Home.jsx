import { useNavigate } from "react-router-dom"
import FunctionButton from "../FunctionButton/FunctionButton"
import style from "./Home.module.css"

const Home = () => {
    const navigate = useNavigate()
    const gotoCreateGame = () => {
        navigate("/game-creation-form")
    }

    const gotoJoinGame = () => {
        navigate("/game-join-form")
    }

    return (
        <div className={style.home}>
            <title>La Cosa</title>
            <h1>La Cosa</h1>
            <FunctionButton text={"Crear Partida"} onClick={gotoCreateGame}/>
            <FunctionButton text={"Unirse a Partida"} onClick={gotoJoinGame}/>
        </div>
    )
}

export default Home;