import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { isAdmin } from "../helpers";
import AdminHome from "../pages/admin/AdminHome";
import CreateCategory from "../pages/admin/CreateCategory";

interface Props {}

const AdminRoutes: React.FC<Props> = (props) => {
  const { userRole } = props as { userRole: string };
  if (!isAdmin(userRole)) return <Redirect to="/user" />;
  return (
    <Switch>
      <Route path="/admin/categories/create" component={CreateCategory} />
      <Route path="" component={AdminHome} />
    </Switch>
  );
};

export default AdminRoutes;
