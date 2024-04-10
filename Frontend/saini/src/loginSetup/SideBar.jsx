import React from "react";
import "../CSS/SideBar.css";
import { NavLink, useNavigate } from "react-router-dom";

function SideBar() {
  const auth = localStorage.getItem("token");
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="containerSidebarr">
      <div className="sidebarr">
        <ul>
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>

          <li>
            <NavLink to="/interchat">Interchat</NavLink>
          </li>

          <li>
            <NavLink to="/developer">Developer</NavLink>
          </li>

          <li>
            <NavLink to="/projects">Project</NavLink>
          </li>

          <li>
            <NavLink to="/hrdesk">HR Desk</NavLink>
          </li>
          {!auth ? <NavLink to="/login">Login</NavLink> : null}
        </ul>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default SideBar;
