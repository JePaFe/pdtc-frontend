/* eslint-disable eqeqeq */
import axios from "axios";
import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../Context/AppContext";
import { BASE_URL } from "../../utils/BASE_URL";

const UpdateAuthorForm = () => {
  //traemos lo que necesitamos del context
  const { setAuthors, authorValues, setAuthorValues } = useContext(Context);
  //utilizamos el params para obtener el id que viene desde cards
  const { id } = useParams();
  let navigate = useNavigate();

  const onCancelar = () => {
    setAuthorValues({
      name: "",
      lastName: "",
      alive: "",
    });
    navigate(-1);
  };

  //creamos la funcion que va a activar la conexión con axios y actualizar el autor
  const onHandlerSubmit = (e) => {
    e.preventDefault();
    updateAuthor();
  };

  //creamos la función que permite detectar y actualizar los valores de los inputs
  const onHandlerChange = (e) => {
    const { name, value } = e.target;
    setAuthorValues({
      ...authorValues,
      [name]: value,
    });
  };

  //creamos la función para actualizar el autor
  const updateAuthor = async () => {
    try {
      //Volvemos a utilizar el id desde params para hacer la petición put
      const response = await axios.put(
        `${BASE_URL}/authors/update/${id}`,
        authorValues
      );
      const data = response.data;
      //importante hacer console.log de lo que nos trae la response.data y asi poder manejarnos
      console.log(data);
      //creamos un condicional, si created viene true enviamos el mensaje y seteamos a nuestro array de autores
      // el nuevo array actualizado de lo contrario enviamos un mensaje que no se pudo crear.
      if (data.updated) {
        alert(data.message);
        setAuthors(data.newData);
        navigate(-1);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={onHandlerSubmit}
      className="d-flex flex-column justify-content-center align-items-center m-5"
    >
      <div className="d-flex flex-column align-items-between mt-3">
        <label htmlFor="name">Nombre: </label>
        <input
          type="text"
          name="name"
          id="name"
          value={authorValues.name}
          onChange={onHandlerChange}
        />
      </div>
      <div className="d-flex flex-column align-items-between mt-3">
        <label htmlFor="lastName">Apellido: </label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={authorValues.lastName}
          onChange={onHandlerChange}
        />
      </div>
      <div className="d-flex flex-column align-items-between mt-3">
        <label htmlFor="alive">Vivo: </label>
        <div>
          <label>No</label>
          <input
            className="me-2"
            type="radio"
            name="alive"
            value="0"
            onChange={onHandlerChange}
          />
          <label>Si</label>
          <input
            className="me-2"
            type="radio"
            name="alive"
            value="1"
            onChange={onHandlerChange}
          />
        </div>
      </div>
      <div>
        <button type="submit" className="btn btn-success m-5">
          Actualizar
        </button>
        <button
          type="button"
          className="btn btn-danger m-5"
          onClick={onCancelar}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default UpdateAuthorForm;
