import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConsultants, RootState } from "../app";
import CategoryGrid from "../components/category/CategoryGrid";
import ConsultantSection from "../components/consultants/ConsultantSection";
import Footer from "../components/layout/Footer";

import HeroLandSection from "../components/market-components/HeroLandSection";
import Jumbotron from "../components/ui/Jumbotron/Jumbotron";

const LandingPage = () => {
  const dispatch = useDispatch();
  const { consultants } = useSelector((state: RootState) => state.consultant);

  useEffect(() => {
    dispatch(getConsultants({}));
  }, []);

  return (
    <>
      <HeroLandSection />
      <ConsultantSection
        listTitle={"Top Consultants"}
        consultants={consultants}
      />
      <Jumbotron />
      <CategoryGrid />
      <Footer />
    </>
  );
};

export default LandingPage;
