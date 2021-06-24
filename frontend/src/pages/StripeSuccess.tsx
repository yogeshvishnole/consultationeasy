import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useQuery } from "../hooks/useQuery";
import { RootState } from "../app";
import Layout from "../components/layout/Layout";
import stripeService from "../services/stripe";
import { ICommunicationType } from "../types";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

interface Props {}

const StripeSuccess: React.FC<Props> = () => {
  const query = useQuery();
  const history = useHistory();
  const params = useParams<{ id: string }>();
  const { token } = useSelector((state: RootState) => state.user);

  const [id, setId] = useState("");
  const [communicationType, setCommunicationType] = useState<
    ICommunicationType | undefined
  >("chat");
  const [numOfDays, setNumOfDays] = useState<number | undefined>(undefined);

  useEffect(() => {
    console.log(query);
    if (query) {
      setCommunicationType(query.get("communicationType"));
      setNumOfDays(query.get("numOfDays"));
    }
  }, [query]);

  useEffect(() => {
    if (params) {
      setId(params.id);
    }
  }, [params]);

  useEffect(() => {
    if (id && communicationType && numOfDays) {
      createBooking();
    }
  }, [id, communicationType, numOfDays]);

  const createBooking = async () => {
    const data = {
      communicationType,
      numOfDays,
      id,
    };

    const res = await stripeService.createBookingOnStripeSuccess(token, data);
    if (res) {
      history.push("/");
    } else {
      history.push("/stripe/cancel");
    }
  };

  return (
    <div className="container flex-center">
      <h4>Loading...</h4>
    </div>
  );
};

export default StripeSuccess;
