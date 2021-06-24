import React from "react";
import { Link, NavLink } from "react-router-dom";

import Button from "../Button/Button";
import styles from "./Jumbotron.module.css";
// import  from "../../assets/pic1.jpg";

interface Props {
  // head: String;
  // overview: String;
  // btnText: String;
  // link: String;
}

const Jumbotron: React.FC<Props> = () => {
  return (
    <div className={styles.componentMargin}>
      <div className={styles.paddingBox}>
        <div className={styles.centerBox}>
          <img className={styles.img} src="/img/pro.jpg" alt="Hello" />
          <div className={styles.textBox}>
            <h2>Become an consultant</h2>
            <p>
              Top consultants around the world , consult on CE. We provide the
              right tools and skills to share your knowledge
            </p>
            <div style={{ marginTop: "5px" }}>
              <Link to="/auth">
                <Button>Start today</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
