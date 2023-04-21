import { Route, Routes, json } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import CreateProject from "./pages/CreateProject";
import Navbar from "./components/Navbar";
import Modal from "./components/common/Model";
import ProjectDetails from "./pages/ProjectDetails";
import MyToast from "./components/common/MyToast";
import NotFound from "./pages/NotFound";

function App() {
  const [userInfo, setUserInfo] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastContent, setToastContent] = useState(null)
  const [toastHeading, setToastHeading] = useState(null)

  const toggleShow = () => {
    setShowModel(!showModel)
  }

  const toggleToast = () => {
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
    }, 5000);
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    localStorage.setItem("email", JSON.stringify(user?.email))
    setUserInfo(user)
  }, [isLoggedIn])
  return (
    <div>
      {isLoggedIn && <Navbar userType={userInfo?.type} setIsLoggedIn={setIsLoggedIn} setShowModel={setShowModel} />}
      {isLoggedIn && <Modal setIsLoggedIn={setIsLoggedIn} toggleShow={toggleShow} showModel={showModel} setShowModel={setShowModel} />}
      <MyToast showToast={showToast} setShowToast={setShowToast} toastContent={toastContent} toastHeading={toastHeading} />
      <Routes>
        <Route path="/login" element={<Login setUserInfo={setUserInfo} toggleToast={toggleToast} setToastHeading={setToastHeading} setToastContent={setToastContent} />} />
        <Route path="/dashboard" element={<ProtectedRoute isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}><Dashboard userInfo={userInfo} /></ProtectedRoute>} />
        <Route path="/dashboard/:id" element={<ProtectedRoute isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}><ProjectDetails /></ProtectedRoute>} />
        <Route path="/createProject" element={<ProtectedRoute isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}><CreateProject setToastContent={setToastContent} setToastHeading={setToastHeading} toggleToast={toggleToast} /></ProtectedRoute>} />
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
