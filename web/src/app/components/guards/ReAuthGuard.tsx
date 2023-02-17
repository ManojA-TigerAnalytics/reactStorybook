import React from "react";
import { useAppSelector } from "app/hooks/store-hooks";
import { Navigate, useLocation } from "react-router-dom";

function ReAuthGuard({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const {
    isAuthenticated,
    // user
  } = useAppSelector((state) => state.auth);
  const { pathname } = useLocation();

  const authenticated: boolean = isAuthenticated;

  return authenticated ? (
    <Navigate replace to="/dashboard" state={{ from: pathname }} />
  ) : (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{children}</>
  );
}

export default ReAuthGuard;
