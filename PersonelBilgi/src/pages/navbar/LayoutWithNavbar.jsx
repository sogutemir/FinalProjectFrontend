// eslint-disable-next-line no-unused-vars
import React from "react";
import Navbar from "./Navbar";

// eslint-disable-next-line react/prop-types
function LayoutWithNavbar({ children }) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
}

export default LayoutWithNavbar;
