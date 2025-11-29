import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ClientRouteWrapper from "./Client/Component/ClientRouteWrapper";
import AdminRouteWrapper from "./Admin/Components/AdminRouteWrapper";
import Login from "./Client/Pages/Register/Sign_In";
import SignUp from "./Client/Pages/Register/Sign_UP";
function App() {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return null;

  return (
   <Routes>
 

  <Route path="/Login" element={<Login />} />
  <Route path="/SignUp" element={<SignUp />} />

  {user?.role === "admin" && (
    <Route path="/admin/*" element={<AdminRouteWrapper />} />
  )}


  
  {user?.role !== "admin" && (
  <Route path="/*" element={<ClientRouteWrapper />} />
)}

  


</Routes>

  );
}

export default App;
