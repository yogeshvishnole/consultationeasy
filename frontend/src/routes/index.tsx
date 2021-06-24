import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { RootState } from "../app";
import BecomeConsultant from "../pages/BecomeConsultant";
import BookingChat from "../pages/BookingChat";
import BookingPage from "../pages/BookingPage";
import ChooseCommunicationType from "../pages/ChooseCommunicationType";
import ConsultantPage from "../pages/ConsultantPage";
import ConsultantsByCategory from "../pages/ConsultantsByCategory";

import LandingPage from "../pages/LandingPage";
import PageNotFound from "../pages/PageNotFound";
import StripeCallback from "../pages/StripeCallback";
import StripeCancel from "../pages/StripeCancel";
import StripeSuccess from "../pages/StripeSuccess";
import Consultant from "../pages/user/Consultant";
import UserHome from "../pages/user/UserHome";
import AdminRoutes from "./AdminRoutes";
import AuthRoutes from "./AuthRoutes";
import PrivateRoutes from "./PrivateRoutes";
import BookingVoice from "../components/voice";

interface Props {}

const Routes: React.FC<Props> = () => {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <Switch>
      <Route path="/auth">
        <AuthRoutes />
      </Route>

      <Route path="/bookings">
        <PrivateRoutes>
          <Route
            path="/bookings/chooseCommunicationType/:id"
            component={ChooseCommunicationType}
          ></Route>

          <Route path="/bookings/:id" exact component={BookingPage}></Route>
          <Route
            path="/bookings/:id/video"
            exact
            component={BookingVoice}
          ></Route>
          <Route
            path="/bookings/:id/chat"
            exact
            component={BookingChat}
          ></Route>
        </PrivateRoutes>
      </Route>

      <Route path="/stripe">
        <PrivateRoutes>
          <Route path="/stripe/callback" component={StripeCallback}></Route>
          <Route path="/stripe/cancel" component={StripeCancel}></Route>
          <Route path="/stripe/success/:id" component={StripeSuccess}></Route>
        </PrivateRoutes>
      </Route>

      <Route path="/user">
        <PrivateRoutes>
          <Route
            path="/user/become-a-consultant"
            component={BecomeConsultant}
          />
          <Route path="/user/consultant" component={Consultant} />
        </PrivateRoutes>
      </Route>
      <Route path="/admin">
        <PrivateRoutes>
          <AdminRoutes />
        </PrivateRoutes>
      </Route>
      <Route
        path="/consultant-by-category/:category"
        component={ConsultantsByCategory}
      />
      <Route path="/consultants/:id" component={ConsultantPage} />
      {user && <Route path="/" exact component={UserHome} />}
      <Route path="/" exact component={LandingPage} />
      <Route path="*">
        <PageNotFound />
      </Route>
    </Switch>
  );
};

export default Routes;
