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
  {/* Routes مشتركة لأي حد */}

  <Route path="/Login" element={<Login />} />
  <Route path="/SignUp" element={<SignUp />} />

  {/* لو أدمن */}
  {user?.role === "admin" && (
    <Route path="/admin/*" element={<AdminRouteWrapper />} />
  )}

  {/* لو مستخدم عادي */}
  
  {user?.role !== "admin" && (
  <Route path="/*" element={<ClientRouteWrapper />} />
)}

  

  {/* Route fallback */}
</Routes>

  );
}

export default App;
