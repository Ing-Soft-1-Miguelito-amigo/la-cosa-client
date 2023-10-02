import { useState } from "react";
import { set, useForm } from "react-hook-form";
import {
  valueHasQuotationMarks,
  createGame,
} from "../../containers/FormValidation.js";
import "./gameCreationForm.module.css";
import { useNavigate } from "react-router-dom";

const GameCreationForm = () => {
  const navigate = useNavigate();
  const [errorData, setErrorData] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      game: { name: "", min_players: 4, max_players: 12 },
      host: { name: "" },
    },
  });

  const onSubmit = async (data) => {
    const response = await createGame(data);
    if (response.status === 201){
      setErrorData(false);
      navigate("/game");
    }
    else if (response.status === 422) {
      console.log("responsess",response);
      setMessage(response.json.detail);
      setErrorData(true);
    } else {
      setMessage("Error al crear la partida");
      setErrorData(true);
    }
  };

  return (
    <>
      <form className="creationForm" onSubmit={handleSubmit(onSubmit)}>
        {/*Host Name*/}
        <label  htmlFor="hostName">
          {" "}
          &nbsp;&nbsp;Nombre Host
        </label>
        <input
          type="text"
          id="hostName"
          {...register("host.name", {
            required: {
              value: true,
              message: "Nombre requerido",
            },
            validate: (value) => {
              if (valueHasQuotationMarks(value))
                return "Nombre de host no puede contener comillas";
              else return true;
            },
          })}
        />
        {errors?.host?.name && <span>{errors.host.name.message}</span>}

        {/*Game Name*/}
        <label  htmlFor="gameName">
          Nombre Partida
        </label>
        <input
          type="text"
          id="gameName"
          {...register("game.name", {
            required: {
              value: true,
              message: "Campo requerido",
            },
            validate: (value) => {
              if (valueHasQuotationMarks(value))
                return "Nombre de la partida no puede contener comillas";
              else return true;
            },
          })}
        />
        {errors?.game?.name && <span>{errors.game.name.message}</span>}

        {errorData && <span role="alert">{message}</span>}

        <button type="submit">&nbsp;Crear Partida&nbsp;</button>
      </form>
    </>
  );
};

export default GameCreationForm;
