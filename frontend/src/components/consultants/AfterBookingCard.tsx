import React from "react";

interface Props {
  name: string;
  nicheArea: string;
}

const AfterBookingCard: React.FC<Props> = ({ name, nicheArea }) => {
  return (
    <div className="flex-center booked-card">
      <p>{name}</p>
      <p>{nicheArea}</p>
    </div>
  );
};

export default AfterBookingCard;
