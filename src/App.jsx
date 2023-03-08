import { useContext } from "react";
import "./App.css";
import { Context } from "./Context/AppContext";

function App() {
  const { authors } = useContext(Context);

  return (
    <div>
      <h1>Listado de autores</h1>
      {authors &&
        authors.map((author) => (
          <div key={author.id}>
            <p key={author.id}>
              {author.name} {author.lastName}
            </p>
            <p>Vivo: {author.alive.data === 1 ? "Si" : "No"}</p>
          </div>
        ))}
    </div>
  );
}

export default App;
