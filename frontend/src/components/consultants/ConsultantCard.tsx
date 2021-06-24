import React from "react";
import { Link } from "react-router-dom";
import { ConsultantType } from "../../types";

interface Props {
  consultant: ConsultantType;
}

const ConsultantCard: React.FC<Props> = ({ consultant }) => {
  return (
    <Link to={`/consultants/${consultant._id}`}>
      <div className="consultant-card">
        <div>
          <img src={consultant.promoImage.url} alt="Hello" />
        </div>
        <p className="card-desc">{consultant.promoDescription}</p>
        <p>
          <span className="grey-text">{consultant.nicheArea}</span>
        </p>
        <p>
          <span className="checked">{consultant.avgRating} </span>
          <span className="fa fa-star def-color checked"></span>
          <span className="fa fa-star def-color checked"></span>
          <span className="fa fa-star def-color checked"></span>
          <span className="fa fa-star def-color"></span>
          <span className="fa fa-star def-color"></span>
          <span className="grey-text">(35177)</span>
        </p>
      </div>
    </Link>
  );
};

export default ConsultantCard;
