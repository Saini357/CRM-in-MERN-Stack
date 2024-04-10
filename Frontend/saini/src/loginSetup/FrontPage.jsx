import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import "../CSS/FrontPage.css";

function FrontPage() {
  const navigate = useLocation();
  const cURL = navigate.pathname;
  const token = localStorage.getItem("token");
  return (
    <div>
      <div className="containerFront">
        {!token && cURL !== "/login" ? (
          <>
            <NavLink to="/login">
              <button className="btnLogin">Login</button>
            </NavLink>
          </>
        ) : (
          <>
            <Outlet />
          </>
        )}
      </div>
      <div className="FrontSecond"></div>
    </div>
  );
}

export default FrontPage;
