import { Route, Routes, json } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect, useState } from "react";
import ClientDashboard from "./pages/ClientDashboard";
import UserDashboard from "./pages/UserDashboard";
import CreateProject from "./pages/CreateProject";
import Navbar from "./components/Navbar";
import Modal from "./components/common/Model";

function App() {
  const [userInfo, setUserInfo] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModel, setShowModel] = useState(false);

  const toggleShow = ()=>{
    setShowModel(!showModel)
  }
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    localStorage.setItem("email",JSON.stringify(user?.email))
    setUserInfo(user)
  },[isLoggedIn])
  return (
    <div>
      {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} setShowModel={setShowModel}/>}
      {isLoggedIn && <Modal setIsLoggedIn={setIsLoggedIn} toggleShow={toggleShow} showModel={showModel}  setShowModel={setShowModel} />}
    <Routes>
      <Route path="login" element={<Login setUserInfo={setUserInfo} />} />
      <Route path="/dashboard" element={<ProtectedRoute isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>{userInfo && userInfo?.type === "client" ? <ClientDashboard userInfo={userInfo} setIsLoggedIn={setIsLoggedIn} /> : userInfo?.type === 'user' && <UserDashboard userInfo={userInfo} /> }</ProtectedRoute>} />
      <Route path="/dashboard:id" element={<ProtectedRoute isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>{userInfo && userInfo?.type === "client" ? <ProjectDetails userInfo={userInfo} setIsLoggedIn={setIsLoggedIn} /> : null }</ProtectedRoute>} />
      <Route path="/createProject" element={<ProtectedRoute isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}><CreateProject userInfo={userInfo} /></ProtectedRoute>} />
    </Routes>
    </div>
  );
}

export default App;
