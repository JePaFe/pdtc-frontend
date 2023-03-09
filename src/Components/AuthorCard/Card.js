/* eslint-disable eqeqeq */
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context/AppContext";
import { BASE_URL } from "../../utils/BASE_URL";

const Card = ({ props }) => {
  const { setAuthors, setAuthorValues } = useContext(Context);
  let navigate = useNavigate();
  /*En el componente card 
    creamos una pequeña funcion para setear los valores del objeto que queremos actualizar y
    luego navegamos al formulario correspondiente */

  const onUpdateClik = () => {
    setAuthorValues({
      name: props.name,
      lastName: props.lastName,
      alive: props.alive,
    });
    navigate(`/form/update/${props.id}`);
  };

  const deleteAuthor = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/authors/delete/${id}`);
      const data = response.data;
      console.log(data);
      if (data.deleted) {
        alert(data.message);
        setAuthors(data.newData);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      key={props.id}
      className="card m-3 d-flex justify-content-center align-items-center"
      style={{ width: "15rem" }}
    >
      <p key={props.id}>
        {props.name} {props.lastName}{" "}
      </p>
      <p>Vivo: {props.alive.data == "1" ? "Si" : "No"} </p>
      <div>
        <button
          type="submit"
          className="btn btn-outline-warning m-2"
          onClick={onUpdateClik}
        >
          Editar
        </button>
        <button
          className="btn btn-outline-danger m-2"
          onClick={() => deleteAuthor(props.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};
export default Card;
