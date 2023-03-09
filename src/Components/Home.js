import { useContext } from "react";
import { Context } from "../Context/AppContext";
import CardsContainer from "./CardsContainer/CardsContainer";

const Home = () => {
  const { authors } = useContext(Context);
  return (
    <div>
      <h1 className="container">Listado de autores</h1>
      <div className="d-flex flex-wrap justify-content-around align-items-center m-2">
        <CardsContainer />
      </div>
    </div>
  );
};

export default Home;
