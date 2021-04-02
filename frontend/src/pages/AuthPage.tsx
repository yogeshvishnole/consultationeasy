import React from "react";
import Footer from "../components/layout/Footer";
import HeroAuthSection from "../components/market-components/HeroAuthSection";

interface Props {}

const AuthPage: React.FC<Props> = () => {
  return (
    <>
      <HeroAuthSection />
      <Footer />
    </>
  );
};

export default AuthPage;
