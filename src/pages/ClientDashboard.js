import Navbar from "../components/Navbar";

export default function ClientDashboard({userInfo, setIsLoggedIn}) {
  return (
    <div>
        <Navbar setIsLoggedIn={setIsLoggedIn} />
    </div>
  )
}
