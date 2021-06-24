import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Layout from "../../components/layout/Layout";
import { getConsultant } from "../../app/consultantSlice";
import { RootState } from "../../app";
import stripeService from "../../services/stripe";
import { useToasts } from "react-toast-notifications";
import { getBookings } from "../../app/bookingSlice";
import ConsultantBookingCard from "../../components/consultants/ConsultantBookingCard";

interface Props {}

const Consultant: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const { user, token } = useSelector((state: RootState) => state.user);
  const { consultant } = useSelector((state: RootState) => state.consultant);
  const { bookings } = useSelector((state: RootState) => state.booking);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(getConsultant({ userId: user.id }));
    }
  }, [user]);

  useEffect(() => {
    if (consultant?.stripe_seller?.charges_enabled) {
      dispatch(
        getBookings({
          token: token as string,
          data: { consultant: consultant._id },
        })
      );
    }
  }, [consultant]);

  const SetUpPayout = () => (
    <div className="payout-section">
      <FontAwesomeIcon
        icon={["fas", "money-check-alt"]}
        className="payout-section__icon"
      />

      <h3>Set up payouts to get booked by users</h3>
      <button className="btn" onClick={handleClick}>
        {loading ? "Processing" : "Setup Payout"}
      </button>
    </div>
  );

  const handleClick = async () => {
    setLoading(true);
    try {
      let res = await stripeService.createConnectAccount(token);
      window.location.href = res.data;
    } catch (err) {
      console.log(err);
      addToast("Stripe connect failed, Try again.", {
        appearance: "error",
        autoDismiss: true,
      });
      setLoading(false);
    }
  };

  const showBookings = () => (
    <div className="container">
      <div className="consultant-bookings mt-1">
        <h3>My Bookings</h3>
        <div className="consultant-bookings__list mt-1">
          {bookings.map((b, i) => (
            <ConsultantBookingCard key={i} booking={b} />
          ))}
        </div>
      </div>
    </div>
  );
  console.log("JHBv", consultant);

  return (
    <Layout>
      <div className="container">
        {consultant?.stripe_seller?.charges_enabled
          ? showBookings()
          : SetUpPayout()}
      </div>
    </Layout>
  );
};

export default Consultant;
