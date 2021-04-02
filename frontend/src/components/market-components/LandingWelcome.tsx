import React from "react";
import { Link } from "react-router-dom";

interface Props {}

const LandingWelcome: React.FC<Props> = () => {
  return (
    <>
      <h1>Our Purpose</h1>
      <p>
        Through our site you can connect with people having real experience in
        thing you wanted to do.
      </p>
      <Link to="/auth" className="btn">
        Signup Now &#8594;
      </Link>
    </>
  );
};

export default LandingWelcome;
