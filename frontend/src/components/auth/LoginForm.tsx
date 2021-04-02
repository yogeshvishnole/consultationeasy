import React from "react";
import { Link } from "react-router-dom";

interface Props {}

const LoginForm: React.FC<Props> = () => {
  return (
    <form id="LoginForm">
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button type="submit" className="btn">
        Login
      </button>
      <Link to="#">Forgot password</Link>
    </form>
  );
};

export default LoginForm;
