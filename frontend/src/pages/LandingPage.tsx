import React from "react";
import CategoryGrid from "../components/category/CategoryGrid";
import ConsultantSection from "../components/consultants/ConsultantSection";
import Footer from "../components/layout/Footer";

import HeroLandSection from "../components/market-components/HeroLandSection";
import Jumbotron from "../components/ui/Jumbotron/Jumbotron";

const LandingPage = () => {
  return (
    <>
      <HeroLandSection />
      <ConsultantSection />
      <Jumbotron />
      <CategoryGrid />
      <Footer />
    </>
  );
};

export default LandingPage;
