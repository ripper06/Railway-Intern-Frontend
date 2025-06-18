import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload(); // reload page to update UI
  };

  return (
    <nav>
      <h3>EAST COAST RAILWAY</h3>
      <div>
        <button onClick={() => navigate("/appointments")}>Appointments</button>
        <button onClick={() => navigate("/tours")}>Tours</button>
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={() => navigate("/login")}>Login</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
