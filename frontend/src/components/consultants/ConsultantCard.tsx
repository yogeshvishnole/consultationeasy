import React from "react";

interface Props {}

const ConsultantCard: React.FC<Props> = () => {
  return (
    <div className="consultant-card">
      <div>
        <img
          src="https://images.unsplash.com/photo-1617173793304-aab2dff0190d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"
          alt="Hello"
        />
      </div>
      <p className="card-desc">Lorem ipsum dolor sit amet</p>
      <p>
        <span className="grey-text">Web developmet</span>
      </p>
      <p>
        <span className="checked">4.7 </span>
        <span className="fa fa-star def-color checked"></span>
        <span className="fa fa-star def-color checked"></span>
        <span className="fa fa-star def-color checked"></span>
        <span className="fa fa-star def-color"></span>
        <span className="fa fa-star def-color"></span>
        <span className="grey-text">(35177)</span>
      </p>
    </div>
  );
};

export default ConsultantCard;
