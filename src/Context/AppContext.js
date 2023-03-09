import axios from "axios";
import { BASE_URL } from "../utils/BASE_URL";
import { createContext, useEffect, useState } from "react";

export const Context = createContext();

const AppContext = ({ children }) => {
  const [authors, setAuthors] = useState([]);
  const [authorValues, setAuthorValues] = useState({
    name: "",
    lastName: "",
    alive: "",
  });

  const getAuthors = async () => {
    try {
      const request = await axios.get(`${BASE_URL}/authors`);
      const data = request.data;
      console.log(data);
      setAuthors(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAuthors();
  }, []);

  return (
    <Context.Provider
      value={{ authors, setAuthors, authorValues, setAuthorValues }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContext;
