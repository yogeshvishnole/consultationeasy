import React from "react";

interface Props {
  auth: boolean;
  pink?: boolean;
}

const Layout: React.FC<Props> = ({ children, auth, pink }) => {
  return <>{children}</>;
};

export default Layout;
