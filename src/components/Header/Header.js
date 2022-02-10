import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Link to="/">
      <span className="header">Entertainment Hub</span>
    </Link>
  );
};

export default Header;
