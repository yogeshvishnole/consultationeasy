import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { AuthData } from "../../types";
import { registerUser, RootState } from "../../app";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface Props {}

const schema = yup.object().shape({
  name: yup.string().min(4, "Too short").required("Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(8, "Too short").required("Password is required"),
});

const SignupForm: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const { error, loading, success } = useSelector(
    (state: RootState) => state.register
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<AuthData>({ resolver: yupResolver(schema) });

  const handleSignup = handleSubmit((data) => {
    dispatch(registerUser(data));
  });

  useEffect(() => {
    if (success) {
      addToast(success, {
        appearance: "success",
        autoDismiss: true,
      });
      reset();
    }
    if (error) {
      addToast(error, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  }, [error, success]);
  return (
    <form id="RegForm" onSubmit={handleSignup} noValidate>
      <input type="text" placeholder="Fullname" {...register("name")} />
      {errors?.name?.message && (
        <p className="field--error">{errors.name.message}</p>
      )}
      <input type="email" placeholder="Email" {...register("email")} />
      {errors?.email?.message && (
        <p className="field--error">{errors.email.message}</p>
      )}
      <input type="password" placeholder="Password" {...register("password")} />
      {errors?.password?.message && (
        <p className="field--error">{errors.password.message}</p>
      )}
      <button type="submit" className="btn">
        {loading ? "Loading..." : "Register"}
      </button>
    </form>
  );
};

export default SignupForm;
