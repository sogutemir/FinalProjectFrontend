import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";

const isLoggedIn = () => {
  return document.cookie
    .split(";")
    .some((item) => item.trim().startsWith("user_token="));
};

export function PrivateRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" />;
}

export function PublicRoute({ children, restricted }) {
  return isLoggedIn() && restricted ? <Navigate to="/" /> : children;
}
