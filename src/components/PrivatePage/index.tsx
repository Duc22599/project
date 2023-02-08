import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const Private = ({ children }: any) => {
  const getTokenUser = useSelector(
    (state: any) => state.user.currentUser.token
  );

  return <>{getTokenUser ? children : <Navigate to="/login" replace />}</>;
};
