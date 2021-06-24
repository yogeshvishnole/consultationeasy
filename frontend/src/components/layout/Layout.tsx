import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface Props {}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
