import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app";
import AuthPage from "../pages/AuthPage";
import ForgotPassword from "../pages/ForgotPassword";
import PageNotFound from "../pages/PageNotFound";
import ResetPassword from "../pages/ResetPassword";
import AccountActivation from "../pages/AccountActivation";

interface Props {}

const AuthRoutes: React.FC<Props> = (props) => {
  const { user } = useSelector((state: RootState) => state.user);
  if (user) return <Redirect to="/" />;
  return (
    <Switch>
      <Route path="/auth/forgot-password" component={ForgotPassword} />
      <Route path="/auth/reset-password/:token" component={ResetPassword} />
      <Route path="/auth/activate/:token" component={AccountActivation} />
      <Route path="/auth" exact component={AuthPage} />
      <Route path="*">
        <PageNotFound />
      </Route>
    </Switch>
  );
};

export default AuthRoutes;
