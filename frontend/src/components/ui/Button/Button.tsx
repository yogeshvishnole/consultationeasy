import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Button.module.css";

const Button: React.FC<any> = ({ children, ...props }) => {
  return (
    <NavLink to="/auth" className={styles.btn} {...props}>
      {children}
    </NavLink>
  );
};

export default Button;
