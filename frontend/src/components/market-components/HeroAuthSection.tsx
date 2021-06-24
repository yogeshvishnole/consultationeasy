import React from "react";

import AuthFormBox from "../auth/AuthFormBox";
import Navbar from "../layout/Navbar";

interface Props {}

const HeroSection: React.FC<Props> = () => {
  return (
    <>
      <Navbar />
      <div className="account-page">
        <div className="row">
          {/* <div className="col-2">
            <img src={Pic1} alt="Hello" />
          </div> */}
          <div className="col-2">
            <AuthFormBox />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
