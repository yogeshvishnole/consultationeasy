import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../app";
import { getBooking } from "../app/bookingSlice";
import Layout from "../components/layout/Layout";

const BookingPage: React.FC = () => {
  const dispatch = useDispatch();
  const params = useParams<{ id: string }>();
  const { booking } = useSelector((state: RootState) => state.booking);
  const { token } = useSelector((state: RootState) => state.user);


  useEffect(() => {
    if (params) {
         dispatch(getBooking({ token: token as string, id:params?.id }));
    }
  }, [params,token]);



  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-2">
            <h4>{booking?.consultant?.user?.name}</h4>
            <img
              src={booking?.consultant?.consultantImage?.url}
              alt={booking?.consultant?.user?.name}
              width="100%"
              style={{ padding: "0" }}
            />
          </div>
          <div className="col-2">
            <p><b>Communication Type</b> --> {booking?.communicationType}</p>
            <Link to={`/bookings/${booking?._id}/chat`}><button className='btn' style={{marginRight:"3px"}}>Start Chat</button></Link>
            {(booking?.communicationType === 'video' || booking?.communicationType === 'voice') &&  <Link to={`/bookings/${booking?._id}/video`}><button className='btn' style={{marginRight:"3px"}}>Start Video call</button></Link> }
            {/* {booking?.communicationType === 'video' && <button className='btn'>Start Video call</button>} */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingPage;
