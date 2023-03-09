import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context/AppContext";
import { BASE_URL } from "../../utils/BASE_URL";

const CreateAuthorForm = () => {
  //traemos del context para setear en autores el nuevo array con los datos actualizados
  //En el context creamos los valores de los inputs ya que tambien los vamos a utilizar
  //en el formulario de actualización
  const { setAuthors, authorValues, setAuthorValues } = useContext(Context);
  let navigate = useNavigate();

  //creamos la funcion que va a activar la conexión con axios y crear el nuevo autor
  const onHandlerSubmit = (e) => {
    e.preventDefault();
    createAuthor();
  };

  //creamos la función que permite detectar y actualizar los valores de los inputs
  const onHandlerChange = (e) => {
    const { name, value } = e.target;
    setAuthorValues({
      ...authorValues,
      [name]: value,
    });
  };

  //creamos la función para crear el autor
  const createAuthor = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/authors/create`,
        authorValues
      );
      const data = response.data;
      //importante hacer console.log de lo que nos trae la response.data y asi poder manejarnos
      console.log(data);
      //creamos un condicional, si created viene true enviamos el mensaje y seteamos a nuestro array de autores
      // el nuevo array actualizado de lo contrario enviamos un mensaje que no se pudo crear.
      if (data.created) {
        alert(data.message);
        setAuthors(data.newData);
        setAuthorValues({
          name: "",
          lastName: "",
          alive: "",
        });
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
          Crear
        </button>
      </div>
    </form>
  );
};

export default CreateAuthorForm;
