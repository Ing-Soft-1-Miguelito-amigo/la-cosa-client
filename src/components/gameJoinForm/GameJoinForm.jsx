import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  valueHasQuotationMarks,
  JoinGame,
} from "../../containers/FormValidation.js";
import styles from "./gameJoinForm.module.css";
import FunctionButton from "../FunctionButton/FunctionButton";
import { useNavigate } from "react-router-dom";

const GameJoinForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [errorData, setErrorData] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      gameId: 1,      // tmp
      playerName: "",
    },
  });

  const onSubmit = async (data) => {
    const response = await JoinGame(data);
    const responseData = {
      playerId: response.json.player_id,
      gameId: response.json.game_id,      
    }
    if (response.status === 200) {
      setErrorData(false);
      navigate(`/game/${gameId}`, { state: responseData });
    } else if (response.status === 404) {
      setMessage("Partida no encontrada");
      setErrorData(true);
    } else if (response.status === 422) {
      setMessage('Nombre existente/Partida Completa');
      setErrorData(true);
    } else {
      setMessage("Error al unirse a la partida");
      setErrorData(true);
    }
  };

  return (
    <div className={styles.body}>
      <form>
        {/*Player Name*/}
        <label className={styles.labelJoin} htmlFor="playerName">
          Nombre Jugador
        </label>
        <input
          type="text"
          id="playerName"
          className={styles.inputJoin}
          {...register("playerName", {
            required: {
              value: true,
              message: "Nombre requerido",
            },
            validate: (value) => {
              if (valueHasQuotationMarks(value))
                return "Nombre del jugador no puede contener comillas";
              else return true;
            },
          })}
        />
        {errors?.playerName && <span className={styles.spanJoin}>{errors.playerName.message}</span>}
        {errorData && <span className={styles.spanJoin}>{message}</span>}

         <div className={styles.buttonJoin}>
            <FunctionButton text={"Unirse"} onClick={handleSubmit(onSubmit)} />
         </div> 
      </form>
    </div>
  );
};

export default GameJoinForm;
