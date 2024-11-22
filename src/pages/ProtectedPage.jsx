import { Navigate } from "react-router-dom";

const ProtectedPage = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedPage;



