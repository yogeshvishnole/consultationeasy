import userEvent from "@testing-library/user-event";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConsultants, RootState } from "../../app";
import { getBookings } from "../../app/bookingSlice";
import ConsultantSection from "../../components/consultants/ConsultantSection";
import Layout from "../../components/layout/Layout";
import UserBookingsSlider from "../../components/user/UserBookingsSlider";

interface Props {}

const UserHome: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const { consultants } = useSelector((state: RootState) => state.consultant);
  const { bookings } = useSelector((state: RootState) => state.booking);
  const { user, token } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(getConsultants({}));
  }, []);

  useEffect(() => {
    dispatch(
      getBookings({
        token: token as string,
        data: { user: user?.id as string, fields: "-user" },
      })
    );
  }, [user, token]);

  return (
    <Layout>
      <div className="container user-welcome">
        <h3>Welcome {user.name}</h3>
      </div>

      <UserBookingsSlider bookings={bookings} />
      <ConsultantSection
        listTitle={"Recommended choices for you"}
        consultants={consultants}
      />
    </Layout>
  );
};

export default UserHome;
