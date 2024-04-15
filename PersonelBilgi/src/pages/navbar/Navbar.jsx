// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { getTeamnameByUsername } from "../../api/Personel";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

function Navbar() {
  const [teamname, setTeamname] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const token = Cookies.get("user_token");
    const decodedToken = jwtDecode(token);

    const fetchData = async () => {
      try {
        const response = await getTeamnameByUsername(decodedToken.sub);

        console.log("response", response.data);
        if (response.status === 200) {
          setTeamname(response.data);
        } else {
          setError("Failed to load teamname from server");
        }
      } catch (error) {
        setError("An error occurred while fetching team personels");
        console.error("Error fetching team personels", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="http://localhost:5173/">
            <img
              className="navbar-logo"
              src="\src\assets\img\logo.png"
              width="112"
              height="28"
            />
          </a>

          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item">Genel</a>
            <Link to="/contact" className="navbar-item">
              Rehber
            </Link>
            <Link to="/addperson" className="navbar-item">
              Personel Ekle
            </Link>
            <Link to={`/teamname/${teamname}`} className="navbar-item">
              Ekibim
            </Link>
            <div className="navbar-item">
              Days Worked: {}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
