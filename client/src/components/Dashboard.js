import React, { useContext, useEffect } from "react";
import userImg from "../assets/user.png";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";

const Dashboard = () => {
  const { LoginData, setLoginData } = useContext(LoginContext);

  console.log(LoginData);

  const history = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await res.json();
    console.log("res ->", data);
    if (data.status === 401 || !data) {
      history("*");
    } else {
      setLoginData(data);

      history("/dashboard");
    }
  };

  useEffect(() => {
    DashboardValid();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={userImg} alt="" style={{ width: "200px", marginTop: 20 }} />
        <h1>UserEmail:{"my mail"}</h1>
      </div>
    </>
  );
};

export default Dashboard;
