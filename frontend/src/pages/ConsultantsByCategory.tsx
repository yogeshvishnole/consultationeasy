import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ConsultantSection from "../components/consultants/ConsultantSection";
import Layout from "../components/layout/Layout";

interface Props {}

const ConsultantsByCategory: React.FC<Props> = () => {
  const params = useParams();
  const [category, setCategory] = useState("");
  useEffect(() => {
    if (params) {
      const { category } = params as { category: string };
      setCategory(category);
    }
  }, [params]);
  return (
    <Layout>
      <ConsultantSection listTitle={`Top ${category} Consultants `} />
    </Layout>
  );
};

export default ConsultantsByCategory;
