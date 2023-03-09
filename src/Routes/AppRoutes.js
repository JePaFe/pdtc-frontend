import { Route, Routes } from "react-router-dom";
import CreateAuthorForm from "../Components/Forms/CreateAuthorForm";
import UpdateAuthorForm from "../Components/Forms/UpdateAuthorForm";
import Home from "../Components/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/form">
        <Route path="create" element={<CreateAuthorForm />} />
        <Route path="update/:id" element={<UpdateAuthorForm />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
