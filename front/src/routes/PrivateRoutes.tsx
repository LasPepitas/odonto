import React, { Fragment } from "react";
import { useNavigate, Outlet } from "react-router-dom";
const PrivateRoutes = () => {
  const isAuthenticated = false; // Replace with actual authentication logic
  const isLoading = false; // Replace with actual loading state logic
  const navigate = useNavigate();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!isAuthenticated) {
    navigate("/login", { replace: true });
    return <div>Redirecting to login...</div>;
  }
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};

export default PrivateRoutes;
