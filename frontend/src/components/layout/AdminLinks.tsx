import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../app";

interface Props {}

const AdminLink: React.FC<Props> = () => {
  const { user } = useSelector((state: RootState) => state.user);
  return user?.role === "admin" ? (
    <>
      <li>
        <NavLink activeClassName="active-link" to="/admin">
          Admin
        </NavLink>
      </li>
    </>
  ) : null;
};

export default AdminLink;
