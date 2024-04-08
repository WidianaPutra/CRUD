import Cookies from "js-cookie";
import nextCookies from "next-cookies";

export const setCookie = (key, value) => {
  Cookies.set(key, value, {
    expires: 2,
    path: "/",
  });
};

export const removeCookie = (key) => {
  Cookies.remove(key, {
    expires: 1,
  });
};

export const getCookie = (key, req) => {
  return process.browser ? Cookies.get(key) : nextCookies({ req })[key];
};
