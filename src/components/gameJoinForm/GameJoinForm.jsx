import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  valueHasQuotationMarks,
  JoinGame,
} from "../../containers/FormValidation.js";
import "./gameJoinForm.module.css";
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
      game_id: 1,
      player_name: "",
    },
  });

  const onSubmit = async (data) => {
    const response = await JoinGame(data);
    if (response.status === 200) {
      setErrorData(false);
      navigate("/game");
    } else if (response.status === 404) {
      setMessage("Partida no encontrada");
      setErrorData(true);
    } else if (response.status === 422) {
      setMessage("Nombre existente o Partida Completa");
      setErrorData(true);
    } else {
      setMessage("Error al unirse a la partida");
      setErrorData(true);
    }
  };

  return (
    <>
      <form className="creationForm" onSubmit={handleSubmit(onSubmit)}>
        {/*Player Name*/}
        <label id="labelJoin" htmlFor="playerName">
          Nombre Jugador
        </label>
        <input
          type="text"
          id="playerName"
          {...register("player_name", {
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
        {errors?.player_name && <span id="spanInput">{errors.player_name.message}</span>}
        {errorData && <span id="spanInput">{message}</span>}

        <button id="buttonJoin" type="submit">&nbsp;Unirse&nbsp;</button>
      </form>
    </>
  );
};

export default GameJoinForm;
