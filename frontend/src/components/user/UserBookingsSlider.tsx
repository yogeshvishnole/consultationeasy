import React from "react";
import Slider from "react-slick";
import AfterBookingCard from "../consultants/AfterBookingCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BookingType } from "../../types";
import { Link } from "react-router-dom";

interface Props {
  bookings: BookingType[];
}

const UserBookingsSlider: React.FC<Props> = ({ bookings }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: bookings.length < 3 ? 1 : 3,
    slidesToScroll: bookings.length < 3 ? 1 : 3,
  };
  return (
    <div className="booked-user-window curpointer ">
      <h2>Your booked consultants</h2>
      <div className="container ">
        <Slider {...settings}>
          {bookings.map((b, i) => (
            <Link key={i} to={`/bookings/${b._id}`}>
              <AfterBookingCard
                name={b.consultant.user.name}
                nicheArea={b.consultant.nicheArea}
              />
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default UserBookingsSlider;
