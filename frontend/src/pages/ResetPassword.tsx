import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Layout from "../components/layout/Layout";
import FormBox from "../components/ui/FormBox";
import axios from "axios";

interface Props {}

interface FormType {
  newPassword: string;
}

const schema = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, "Too short")
    .required("Password is required"),
});

const ResetPassword: React.FC<Props> = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormType>({
    resolver: yupResolver(schema),
  });
  const { addToast } = useToasts();
  const params = useParams<{ token: string }>();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetPasswordLink, setResetPasswordLink] = useState("");

  const handleReset = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const response = await axios.patch("/api/v1/auth/reset-password", {
        ...data,
        resetPasswordLink,
      });
      setSuccess(response.data.message);
      setLoading(false);
      reset();
    } catch (err) {
      setError(err.response.data.message);
      setLoading(false);
    }
  });

  useEffect(() => {
    if (params?.token) {
      const { token } = params;
      setResetPasswordLink(token);
    }
  }, [params]);

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
                <h3>Enter new password</h3>
              </div>
              <form>
                <input
                  type="password"
                  {...register("newPassword")}
                  placeholder="New password"
                />
                {errors.newPassword?.message && (
                  <p className="field--error">{errors.newPassword.message}</p>
                )}

                <button type="submit" className="btn" onClick={handleReset}>
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

export default ResetPassword;
