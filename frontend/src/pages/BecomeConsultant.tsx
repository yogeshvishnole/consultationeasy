import React from "react";
import Layout from "../components/layout/Layout";
import ConsultantForm from "./user/ConsultantForm";

interface Props {}

const BecomeConsultant: React.FC<Props> = () => {
  return (
    <Layout>
      <ConsultantForm />
    </Layout>
  );
};

export default BecomeConsultant;
