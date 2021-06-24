import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";

interface Props {}

const AccountActivation: React.FC<Props> = () => {
  const params = useParams<{ token: string }>();
  const { addToast } = useToasts();

  const [token, setToken] = useState<string>("");
  const [name, setName] = useState("");
  const [btnText, setBtnText] = useState("Activate");

  const handleActivation = async () => {
    setBtnText("Activating...");
    try {
      const response = await axios.post("/api/v1/auth/register/activate", {
        token,
      });
      addToast(response.data.message, {
        appearance: "success",
        autoDismiss: true,
      });
      setBtnText("Activated");
    } catch (err) {
      addToast(err.response.data.message, {
        appearance: "error",
        autoDismiss: true,
      });
      setBtnText("Activate");
    }
  };

  useEffect(() => {
    if (params?.token) {
      const token = params?.token;
      const { name } = jwt.decode(token) as { name: string };
      setToken(token);
      setName(name);
    }
  }, [params]);

  return (
    <Layout>
      <div className="container">
        <div className="account-activation">
          <div className="account-activation__textBox">
            <h2 account-activation__head>
              Hey {name} , Ready to activate your account.
            </h2>
            <div className="account-activation__btn-box">
              <p className="btn" onClick={handleActivation}>
                {btnText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccountActivation;
