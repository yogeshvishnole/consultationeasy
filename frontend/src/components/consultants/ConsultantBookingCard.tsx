import React from "react";
import { Link } from "react-router-dom";
import { BookingType } from "../../types";

interface Props {
  booking: BookingType;
}

const ConsultantBookingCard: React.FC<Props> = ({ booking }) => {
  return (
    <div className="consultant-booking-card">
      <div className="row">
        <div className="col-1">{booking?.user?.name}</div>
        <div className="col-1">
             <p><b>Communication Type</b> --> {booking?.communicationType}</p>
            <Link to={`/bookings/${booking?._id}/chat`}><button className='btn' style={{marginRight:"3px"}}>Start Chat</button></Link>
            {(booking?.communicationType === 'video' || booking?.communicationType === 'voice') &&  <button className='btn' style={{marginRight:"3px"}}>Start Voice call</button> }
            {booking?.communicationType === 'video' && <button className='btn'>Start Video call</button>}
        </div>
      </div>
    </div>
  );
};

export default ConsultantBookingCard;
