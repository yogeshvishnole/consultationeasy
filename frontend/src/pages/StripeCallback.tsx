import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app";
import StripeService from "../services/stripe";

const StripeCallback: React.FC = ({ history }: any) => {
  const { token } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (token) accountStatus(token);
  }, [token]);

  const accountStatus = async (token: string) => {
    const res = await StripeService.getAccountStatus(token);
    history.push("/user/consultant");
  };

  return (
    <div className="container flex-center">
      <h4>Loading...</h4>
    </div>
  );
};

export default StripeCallback;
