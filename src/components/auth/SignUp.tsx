import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signUp } from "./authSlice";
import { useEffect } from "react";
import useNotify from "../../hooks/notify.hook";
import { authConstans } from "../../constans/authConstans";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { notifyError } = useNotify();
  const { error } = useAppSelector((state) => state.authSlice);

  useEffect(() => {
    notifyError(authConstans[error]);
  }, [error]);

  const handleRegister = (email: string, password: string) => {
    dispatch(signUp({ email, password }));
  };

  return (
    <>
      <Form title="Register" handleClick={handleRegister} />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default SignUp;
