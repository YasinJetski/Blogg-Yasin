import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { FaRegPlusSquare } from "react-icons/fa";
import { auth } from "../firebase";

const Navbar = () => {
  const { user, userName } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <ul className="navbar">
      {user && (
        <>
          <li><button onClick={handleLogout} className="navClick">Logout</button></li>
          <li><Link className="navClick makeBloggIcon" to="/MakeBlogg"><FaRegPlusSquare /></Link></li>
          <li><Link className="navClick" to="/Explore">Explore</Link></li>
        </>
      )}
      <li><Link className="navClick" to="/">Home</Link></li>
    </ul>  
  )
}

export default Navbar;
