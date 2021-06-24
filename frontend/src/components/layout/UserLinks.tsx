import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../app";

interface Props {}

const UserLinks: React.FC<Props> = () => {
  const { user } = useSelector((state: RootState) => state.user);
  return user?.role === "subscriber" ? (
    <>
      {user.isConsultant ? (
        <li>
          <NavLink activeClassName="active-link" to="/user/consultant">
            Consultant
          </NavLink>
        </li>
      ) : (
        <li>
          <NavLink activeClassName="active-link" to="/user/become-a-consultant">
            Become a consultant
          </NavLink>
        </li>
      )}
    </>
  ) : null;
};

export default UserLinks;
