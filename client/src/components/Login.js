import React, { useState } from "react";
import "./Mix.css";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [passShow, setPassShow] = useState(false);

  const [inpVal, setInpVal] = useState({
    email: "",
    password: "",
  });

  // console.log(inpVal);
  const setVal = (e) => {
    const { name, value } = e.target;

    setInpVal(() => {
      return {
        ...inpVal,
        [name]: value,
      };
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    const { email, password } = inpVal;

    if (email === "") {
      alert("Please enter your email.");
    } else if (!email.includes("@")) {
      alert("Please enter a valid email address.");
    } else if (password === "") {
      alert("Please enter your password.");
    } else if (password.length < 6) {
      alert("Please enter at least 6 characters password.");
    } else {
      const data = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inpVal }),
      });
      const res = await data.json();
      // console.log("frontend -> ", response);
      // if (res.status === 201) {
      //   alert("User login successfully.");
      //   setInpVal({
      //     ...inpVal,
      //     email: "",
      //     password: "",
      //   });
      // }
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back, Log In</h1>
            <p>Hi, we are you glad you are back. Please login</p>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={setVal}
                value={inpVal.email}
                placeholder="Enter Your Email Address"
              />
            </div>
            <div className="form_input">
              <label htmlFor="Password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  name="password"
                  id="password"
                  onChange={setVal}
                  value={inpVal.password}
                  placeholder="Enter Your Password"
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn" onClick={loginUser}>
              Login
            </button>
            <p>
              Don't have an Account? <NavLink to="/register">Sign Up</NavLink>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;