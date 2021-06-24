import React from "react";

import LandingWelcome from "./LandingWelcome";
import Pic1 from "../../assets/pic1.jpg";
import Navbar from "../layout/Navbar";

interface Props {}

const HeroLandSection: React.FC<Props> = () => {
  return (
    <header className="header">
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-2">
            <LandingWelcome />
          </div>
          <div className="col-2">
            <img src={Pic1} alt="Hello" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroLandSection;
