import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ToastContainer } from "react-toastify";
import { login } from "./authSlice";
import useAuth from "../../hooks/auth.hook";
import useNotify from "../../hooks/notify.hook";
import Form from "./Form";
import "react-toastify/dist/ReactToastify.css";
import { authConstans } from "../../constans/authConstans";
const Login = () => {
  const dispatch = useAppDispatch();
  const {error} = useAppSelector(state => state.authSlice)
  const {notifyError} = useNotify()
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isAuth) {
  //     // navigate('/')
  //   }
  // }, []);

  useEffect(() => {
   notifyError(authConstans[error])
  }, [error]);

  const handleLogin = (email: string, password: string) => {
    dispatch(login({email, password}))
      .unwrap()
      .then(() => navigate('/1'))
  };

  return (
    <div className="signin">
      {/* <Form title="Sign In" handleClick={handleLogin} /> */}
      <Form title="Sign In" handleClick={handleLogin} />
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default Login;
