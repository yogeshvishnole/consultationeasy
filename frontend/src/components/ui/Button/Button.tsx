import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Button.module.css";

interface Props {}

const Button: React.FC<Props> = ({ children }) => {
  return (
    <NavLink to="/auth" className={styles.btn}>
      {children}
    </NavLink>
  );
};

export default Button;
