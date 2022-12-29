import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../customhook/useAuthStatus";

export default function PrivateRoute() {
  const { loggedIn, loading } = useAuthStatus();
  if (loading) {
    return <h2> Loading...</h2>;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}
