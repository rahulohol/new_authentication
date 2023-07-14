import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./Header.css";
import { LoginContext } from "./ContextLogic/Context";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const history = useNavigate();

  const { logindata, setLoginData } = useContext(LoginContext);

  console.log(logindata);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const goDashboard = () => {
    history("/dashboard");
  };

  const goError = () => {
    history("*");
  };

  return (
    <>
      <header>
        <nav>
          <h1>My Project</h1>
          <div className="avtar">
            {logindata.finalValidUser ? (
              <Avatar
                style={{
                  background: "salmon",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
                onClick={handleClick}
              >
                {logindata.finalValidUser.name[0].toUpperCase()}
              </Avatar>
            ) : (
              <Avatar
                style={{
                  background: "blue",
                }}
                onClick={handleClick}
              />
            )}
          </div>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {logindata.finalValidUser ? (
              <>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    goDashboard();
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    goError();
                  }}
                >
                  Profile
                </MenuItem>
              </>
            )}
          </Menu>
        </nav>
      </header>
    </>
  );
};

export default Header;
