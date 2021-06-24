import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { AuthData } from "../../types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginUser } from "../../app/userSlice";
import { RootState } from "../../app";

interface Props {}

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});
const LoginForm: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state: RootState) => state.user);
  const { addToast } = useToasts();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Omit<AuthData, "name">>({
    resolver: yupResolver(schema),
  });

  const handleLogin = handleSubmit((data) => {
    dispatch(loginUser(data));
  });

  useEffect(() => {
    if (error) {
      addToast(error, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  }, [error]);

  return (
    <form id="LoginForm">
      <input type="email" {...register("email")} placeholder="Email" />
      {errors.email?.message && (
        <p className="field--error">{errors.email.message}</p>
      )}
      <input type="password" {...register("password")} placeholder="Password" />
      {errors.password?.message && (
        <p className="field--error">{errors.password.message}</p>
      )}
      <button type="submit" className="btn" onClick={handleLogin}>
        {loading ? "Loading..." : "Login"}
      </button>
      <Link to="/auth/forgot-password">Forgot password</Link>
    </form>
  );
};

export default LoginForm;
