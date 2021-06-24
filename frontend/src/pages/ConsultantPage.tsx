import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import parse from "html-react-parser";

import { getConsultantById } from "../app/consultantSlice";
import { RootState } from "../app";

interface Props {}

const ConsultantPage: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.user);
  const params = useParams<{ id: string }>();
  const history = useHistory();
  const { consultant } = useSelector((state: RootState) => state.consultant);

  useEffect(() => {
    if (params) {
      let consultantId = params.id;
      dispatch(getConsultantById({ consultantId }));
    }
  }, [params]);

  const handleBooking = () => {
    if (!token) {
      history.push("/auth");
    } else {
      history.push(`/bookings/chooseCommunicationType/${consultant?._id}`);
    }
  };

  return (
    <Layout>
      {consultant ? (
        <>
          <div
            className="consultant-hero"
            style={{ backgroundColor: "lightblue", justifyContent: "center" }}
          >
            <div className="container">
              {/* Hero part */}

              <div className="row" style={{ justifyContent: "center" }}>
                <div className="col-2" style={{ flexBasis: "45%" }}>
                  <h1>{consultant.mainMarketingHead}</h1>
                  <p>{consultant.elaboration}</p>
                  <button className="btn" onClick={handleBooking}>
                    Book me now
                  </button>
                </div>
                <div className="col-2" style={{ flexBasis: "30%" }}>
                  <img
                    src={consultant.consultantImage.url}
                    alt="Hello"
                    width="100%"
                  />
                </div>
              </div>

              {/*  */}

              <div className="row" style={{ paddingBottom: "2rem" }}>
                <p>
                  Specialization : <span>{consultant.nicheArea}</span>
                </p>
                <p>
                  Rating :{" "}
                  <span className="checked">{consultant.avgRating} </span>
                  <span className="fa fa-star def-color checked"></span>
                  <span className="fa fa-star def-color checked"></span>
                  <span className="fa fa-star def-color checked"></span>
                  <span className="fa fa-star def-color"></span>
                  <span className="fa fa-star def-color"></span>
                  <span className="grey-text">(35177)</span>
                </p>
                <p>Experience : {consultant.experience}+ years</p>
              </div>
            </div>
          </div>
          <div
            className="consultant-hero consultant-hero--secondary"
            style={{ backgroundColor: "lightpink", padding: "3rem" }}
          >
            <div className="container">
              <div
                className="row"
                style={{ justifyContent: "center", flexDirection: "column" }}
              >
                <h2
                  className="consultant-card__head"
                  style={{ color: "#1a1915", fontSize: "2rem" }}
                >
                  Hello
                </h2>
                {parse(consultant.description)}
              </div>
            </div>
          </div>
          <div
            className="consultat-hero"
            style={{ backgroundColor: "lightblue" }}
          >
            <div
              className="row"
              style={{
                justifyContent: "center",
                flexDirection: "column",
                padding: "2rem 0rem",
              }}
            >
              <h2>Contact</h2>
            </div>
            <div className="row" style={{ paddingBottom: "2rem" }}>
              <p>Email : {consultant.user.email}</p>
              <p>Phone : {consultant.phone}</p>
              <p>
                website :<a href="#">{consultant.website}</a>
              </p>
            </div>
            <div
              className="row"
              style={{
                justifyContent: "center",
                padding: "2rem 0rem",
              }}
            >
              <p style={{ marginRight: "2rem" }}>Connect on social media </p>
              <a
                href={consultant.facebook}
                target="_blank"
                className="consultant-page__icon"
              >
                <FontAwesomeIcon icon={["fab", "facebook-f"]} />
              </a>
              <a
                href={consultant.linked}
                target="_blank"
                className="consultant-page__icon"
              >
                <FontAwesomeIcon icon={["fab", "google"]} />
              </a>
            </div>
          </div>
        </>
      ) : (
        <div className="container flex-center">
          <h4>Loading...</h4>
        </div>
      )}
    </Layout>
  );
};

export default ConsultantPage;
