// eslint-disable-next-line no-unused-vars
import React from "react";
import {Link} from "react-router-dom";

function Navbar() {
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
            <Link to='/contact' className='navbar-item'>Rehber</Link>
            <Link to='/addperson' className='navbar-item'>Add Person</Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
