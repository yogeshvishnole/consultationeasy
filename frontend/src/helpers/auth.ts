import cookie from "js-cookie";
import { LoginResponseType, UserType } from "../types";
import history from "./history";

export const setCookie = (key: string, value: string) => {
  cookie.set(key, value, {
    expires: 1,
  });
};

export const removeCookie = (key: string) => {
  cookie.remove(key, {
    expires: 1,
  });
};

export const getCookie = (key: string) => {
  return cookie.get(key);
};

export const setLocalStorage = (key: string, value: UserType) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const authenticate = (response: LoginResponseType, next: Function) => {
  const { data, token } = response;
  setCookie("token", token);
  setLocalStorage("user", data.user);
  next();
};

export const isAuth = (): UserType | false => {
  const cookieChecked = getCookie("token");
  if (cookieChecked) {
    return JSON.parse(localStorage.getItem("user") as string) as UserType;
  } else {
    return false;
  }
};

export const logout = () => {
  removeLocalStorage("user");
  removeCookie("token");
  history.push("/");
};

export const updateUserInLocalStorage = (user: UserType) => {
  const oldUser = localStorage.getItem("user");
  if (oldUser) localStorage.setItem("user", JSON.stringify(user));
};
