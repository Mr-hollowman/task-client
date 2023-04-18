import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect, useState } from "react";
import ClientDashboard from "./pages/ClientDashboard";
import UserDashboard from "./pages/UserDashboard";

function App() {
  const [userInfo, setUserInfo] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    setUserInfo(user)
  },[isLoggedIn])
  return (
    <Routes>
      <Route path="login" element={<Login setUserInfo={setUserInfo} />} />
    <Route path="/dashboard" element={<ProtectedRoute isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>{userInfo && userInfo?.type === "client" ? <ClientDashboard userInfo={userInfo} setIsLoggedIn={setIsLoggedIn} /> : userInfo?.type === 'user' && <UserDashboard userInfo={userInfo} /> }</ProtectedRoute>} />
    </Routes>
  );
}

export default App;
