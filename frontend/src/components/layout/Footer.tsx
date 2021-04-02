import React from "react";

import A from "../../assets/a.jpg";

interface Props {}

const Footer: React.FC<Props> = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col-1">
            <h3>Downlode Our App</h3>
            <p>Downlode App for Android and ios mobile phone.</p>
          </div>
          <div className="footer-col-2">
            <img src={A} width="10%" height="10%" alt="Hand shake" />
            <p>
              Our Purposre is to Sustainably Make the pleasure and Benefits of
              sports Accessible to the Many
            </p>
          </div>
          <div className="footer-col-3">
            <h3>Useful Links</h3>
            <ul>
              <li>Coupons</li>
              <li>Blog Post</li>
              <li>Return Policy</li>
              <li>Join Affiliate</li>
            </ul>
          </div>
          <div className="footer-col-4">
            <h3>Follow us</h3>
            <ul>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Twitter</li>
              <li>YouTube</li>
            </ul>
          </div>
        </div>
        <hr />
        <p className="copyright">copyright 2020 - Consultation Easy</p>
      </div>
    </div>
  );
};

export default Footer;
