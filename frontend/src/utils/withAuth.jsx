import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const isAuthenticated = () => {
      if (localStorage.getItem("token")) {
        return true;
      }

      return false;
    };

    const navigate = useNavigate();
    // Redirect to auth page if not authenticated
    useEffect(() => {
      if (!isAuthenticated()) {
        navigate("/auth");
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
