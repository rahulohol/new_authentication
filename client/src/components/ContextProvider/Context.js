import React, { createContext, useState } from "react";

export const LoginContext = createContext("");

const Context = ({ Children }) => {
  const [LoginData, setLoginData] = useState("");

  return (
    <>
      <LoginContext.Provider value={{ LoginData, setLoginData }}>
        {Children}
      </LoginContext.Provider>
    </>
  );
};

export default Context;
