import useAuth from "../../hooks/auth.hook";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PrivateRoute = ({ page }: {page: JSX.Element}): JSX.Element => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  return page;
};

export default PrivateRoute;
