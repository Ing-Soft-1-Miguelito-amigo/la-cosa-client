import { useState } from "react";
import { set, useForm } from "react-hook-form";
import {
  valueHasQuotationMarks,
  createGame,
} from "../../containers/FormValidation.js";
import styles from "./gameCreationForm.module.css";
import FunctionButton from "../FunctionButton/FunctionButton";
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
    if (response.status === 201) {
      setErrorData(false);
      navigate("/game");
    } else if (response.status === 422) {
      setMessage("Nombre existente");
      setErrorData(true);
    } else {
      setMessage("Error al crear la partida");
      setErrorData(true);
    }
  };

  return (
    <div className={styles.body}>
      <form className={styles.creationForm}>
        {/*Host Name*/}
        <label className={styles.labelCreation} htmlFor="hostName">
          {" "}
          &nbsp;&nbsp;Nombre Host
        </label>
        <input
          type="text"
          id="hostName"
          className={styles.inputCreation}
          {...register("host.name", {
            required: {
              value: true,
              message: "Nombre requerido",
            },
            validate: (value) => {
              if (valueHasQuotationMarks(value))
                return "No puede contener comillas";
              else return true;
            },
          })}
        />
        {errors?.host?.name && (
          <span className={styles.spanCreation}>
            {errors.host.name.message}
          </span>
        )}

        {/*Game Name*/}
        <label className={styles.labelCreation} htmlFor="gameName">
          Nombre Partida
        </label>
        <input
          type="text"
          id="gameName"
          className={styles.inputCreation}
          {...register("game.name", {
            required: {
              value: true,
              message: "Campo requerido",
            },
            validate: (value) => {
              if (valueHasQuotationMarks(value))
                return "Partida no puede contener comillas";
              else return true;
            },
          })}
        />
        {errors?.game?.name && (
          <span className={styles.spanCreation}>
            {errors.game.name.message}
          </span>
        )}

        {errorData && (
          <span className={styles.spanCreation} role="alert">
            {message}
          </span>
        )}

        <div className={styles.button}>
          <FunctionButton
            text={"Crear Partida"}
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </form>
    </div>
  );
};

export default GameCreationForm;
