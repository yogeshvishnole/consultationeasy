import React from "react";

interface Props {}

const ConsultantHero: React.FC<Props> = () => {
  return (
    <div
      className="consultant-hero"
      style={{ backgroundColor: "lightblue", justifyContent: "center" }}
    >
      <div className="container">
        <div className="row" style={{ justifyContent: "center" }}>
          <div className="col-2" style={{ flexBasis: "45%" }}>
            <h1>What I can do for you PLease contact me?</h1>
            <p>How this I can do for you My story</p>
            <button className="btn">Book me now</button>
          </div>
          <div className="col-2" style={{ flexBasis: "30%" }}>
            <img
              src="https://images.unsplash.com/photo-1617173793304-aab2dff0190d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"
              alt="Hello"
              width="100%"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultantHero;
