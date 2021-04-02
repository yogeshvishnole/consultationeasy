import React from "react";

interface Props {}

const SignupForm: React.FC<Props> = () => {
  return (
    <form id="RegForm">
      <input type="text" placeholder="Username" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button type="submit" className="btn">
        Login
      </button>
    </form>
  );
};

export default SignupForm;
