import React from "react";
import Navbar from "./Navbar";

function LayoutWithNavbar({ children }) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
}

export default LayoutWithNavbar;
