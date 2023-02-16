import "react-toastify/dist/ReactToastify.css";
import "./auth.css";
import React from "react";
import { ReactComponent as Spinner } from "../../assets/images/spinner.svg";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { authConstans } from "../../constans/authConstans";
import { restorePassword, setError } from "./authSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import useNotify from "../../hooks/notify.hook";
import useAuth from "../../hooks/auth.hook";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const { notifyError, notifySuccess } = useNotify();
  const { error, loadingStatus } = useAppSelector((state) => state.authSlice);

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (error !== null) {
      notifyError(authConstans[error]);
    }
  }, [error]);

  const authRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(restorePassword(email))
      .unwrap()
      .then(() => {
        notifySuccess(authConstans.recoveryPassword);
      })
      .catch(() => dispatch(setError()));
  };

  return (
    <>
      <form className="sign-form" onSubmit={authRecovery}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          required
        />
        {loadingStatus === true ? (
          <Spinner />
        ) : (
          <button className="btn-stand">{authConstans.reset}</button>
        )}
      </form>
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default ResetPassword;
