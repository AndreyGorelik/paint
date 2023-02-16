import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { signUp, setError } from "./authSlice";
import { authConstans } from "../../constans/authConstans";
import useNotify from "../../hooks/notify.hook";
import useAuth from "../../hooks/auth.hook";
import Form from "./Form";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {isAuth} = useAuth()
  const { notifyError, notifySuccess } = useNotify();
  const { error } = useAppSelector((state) => state.authSlice);

  useEffect(() => {
    if (isAuth) {
      navigate('/')
    }
  }, []);

  useEffect(() => {
    if (error) {
      notifyError(authConstans[error]);
    }
  }, [error]);

  const handleRegister = (email: string, password: string) => {
    dispatch(signUp({ email, password }))
    .unwrap()
    .then(() => notifySuccess(authConstans.registerSuccess))
    .catch(()=> dispatch(setError()))
  };

  return (
    <>
      <Form title="Register" handleClick={handleRegister} />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default SignUp;
