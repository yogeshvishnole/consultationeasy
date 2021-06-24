import React, { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Layout from "../components/layout/Layout";
import FormBox from "../components/ui/FormBox";
import axios from "axios";

interface Props {}

interface FormType {
  email: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
});

const ForgotPassword: React.FC<Props> = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormType>({
    resolver: yupResolver(schema),
  });
  const { addToast } = useToasts();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgot = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const response = await axios.patch("/api/v1/auth/forgot-password", data);
      setSuccess(response.data.message);
      setLoading(false);
      reset();
    } catch (err) {
      setError(err.response.data.message);
      setLoading(false);
    }
  });

  useEffect(() => {
    if (error) {
      addToast(error, {
        appearance: "error",
        autoDismiss: true,
      });
    }
    if (success) {
      addToast(success, {
        appearance: "success",
        autoDismiss: true,
      });
    }
  }, [error, success]);

  return (
    <Layout>
      <div className="account-page">
        <div className="row">
          <div className="col">
            <FormBox>
              <div className="form-btn">
                <h3>Enter you email</h3>
              </div>
              <form>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Email"
                />
                {errors.email?.message && (
                  <p className="field--error">{errors.email.message}</p>
                )}

                <button type="submit" className="btn" onClick={handleForgot}>
                  {loading ? "Loading..." : "Submit"}
                </button>
              </form>
            </FormBox>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
