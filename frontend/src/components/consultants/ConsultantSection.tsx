import React from "react";

import ConsultantCard from "./ConsultantCard";
import { ConsultantType } from "../../types";

interface Props {
  listTitle: string;
  consultants: ConsultantType[];
}

const ConsultantSection: React.FC<Props> = ({ listTitle, consultants }) => {
  return (
    <div className="categories">
      <h2>{listTitle}</h2>
      <div className="container">
        <div className="img-grid">
          {consultants &&
            consultants.map((consultant) => (
              <ConsultantCard consultant={consultant} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ConsultantSection;
