import React from "react";
import "./Header.css";
import Avatar from "@mui/material/Avatar"
const Header = () => {
  return (
    <>
      <header>
        <nav>
          <h1>My Project</h1>
          <div className="avtar">
          <Avatar style={{background:"blue"}}>R</Avatar>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
