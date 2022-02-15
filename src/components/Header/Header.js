import React from "react";
import "./Header.css";
// import { Link } from "react-router-dom";

const Header = () => {
  return (
    <span className="header" onClick={() => window.scroll(0, 0)}>
      Movies and TV Series
    </span>
  );
};

export default Header;
