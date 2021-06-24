import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { RootState } from "../app";

interface Props {}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const location = useLocation();

  if (!user) {
    return (
      <Redirect
        to={{
          pathname: "/",
          state: {
            from: location.pathname,
          },
        }}
      />
    );
  }
  return (
    <>
      {React.Children.map(children as ReactElement, (child) =>
        React.cloneElement(child, { userRole: user?.role })
      )}
    </>
  );
};

export default PrivateRoute;
