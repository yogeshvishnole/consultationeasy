import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

interface Props {}

const AuthFormBox: React.FC<Props> = () => {
  const [reg, setReg] = useState(true);

  useEffect(() => {
    const LoginForm = document.getElementById("LoginForm");
    const RegForm = document.getElementById("RegForm");
    const Indicator = document.getElementById("Indicator");

    if (LoginForm && RegForm && Indicator) {
      if (reg) {
        RegForm.style.transform = "translateX(0px)";
        LoginForm.style.transform = "translateX(0px)";
        Indicator.style.transform = "translateX(100px)";
      } else {
        RegForm.style.transform = "translateX(300px)";
        LoginForm.style.transform = "translateX(300px)";
        Indicator.style.transform = "translateX(0px)";
      }
    }
  }, [reg]);

  return (
    <div className="form-container">
      <div className="form-btn">
        <span onClick={() => setReg(false)}>Login</span>
        <span onClick={() => setReg(true)}>Register</span>
        <hr id="Indicator" />
      </div>

      <LoginForm />
      <SignupForm />
    </div>
  );
};

export default AuthFormBox;
