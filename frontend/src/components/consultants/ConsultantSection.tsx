import React from "react";
import categories from "../../data/categoryData";
import ConsultantCard from "./ConsultantCard";

interface Props {}

const ConsultantSection: React.FC<Props> = () => {
  return (
    <div className="categories">
      <h2>Top Consultants</h2>
      <div className="container">
        <div className="img-grid">
          {categories && categories.map((doc) => <ConsultantCard />)}
        </div>
      </div>
    </div>
  );
};

export default ConsultantSection;
