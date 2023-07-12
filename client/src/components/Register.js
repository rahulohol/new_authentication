import React, { useState } from "react";
import "./Mix.css";
import { NavLink } from "react-router-dom";

const Register = () => {
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCpassShow] = useState(false);

  const [inpVal, setInpVal] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
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

  const addUserData = async (e) => {
    e.preventDefault();

    const { name, email, password, cpassword } = inpVal;

    if (name === "") {
      alert("Please enter your name.");
    } else if (email === "") {
      alert("Please enter your email.");
    } else if (!email.includes("@")) {
      alert("Please enter a valid email address.");
    } else if (password === "") {
      alert("Please enter your password.");
    } else if (password.length < 6) {
      alert("Please enter at least 6 characters password.");
    } else if (cpassword === "") {
      alert("Please enter your confirm password.");
    } else if (cpassword.length < 6) {
      alert("Please enter at least 6 characters confirm password.");
    } else if (password !== cpassword) {
      alert("password does not match with confirm password.");
    } else {
      const data = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inpVal }),
      });
      const res = await data.json();
      // console.log("frontend -> ", response);
      if (res.status === 201) {
        alert("User registered successfully.");
        setInpVal({
          ...inpVal,
          name: "",
          email: "",
          password: "",
          cpassword: "",
        });
      }
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign Up</h1>
            <p style={{ textAlign: "center" }}>
              Hi, we are glad that have you here.
            </p>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={setVal}
                value={inpVal.name}
                placeholder="Enter Your Name"
              />
            </div>
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
            <div className="form_input">
              <label htmlFor="Password">Confirm Password</label>
              <div className="two">
                <input
                  type={!cpassShow ? "password" : "text"}
                  name="cpassword"
                  id="cpassword"
                  onChange={setVal}
                  value={inpVal.cpassword}
                  placeholder="Confirm Password"
                />
                <div
                  className="showpass"
                  onClick={() => setCpassShow(!cpassShow)}
                >
                  {!cpassShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn" onClick={addUserData}>
              Sign Up
            </button>
            <p>
              Already have an Account? <NavLink to="/">Login</NavLink>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
