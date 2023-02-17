import React from "react";
import { useAppSelector } from "app/hooks/store-hooks";
import { Navigate, useLocation } from "react-router-dom";

function AuthGuard({
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
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{children}</>
  ) : (
    <Navigate replace to="/login" state={{ from: pathname }} />
  );
}

export default AuthGuard;
