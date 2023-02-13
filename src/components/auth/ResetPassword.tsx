import React from "react";

import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { authConstans } from "../../constans/authConstans";
import { restorePassword } from "./authSlice";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import useNotify from "../../hooks/notify.hook";
import "./auth.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();
  const { notifyError, notifySuccess } = useNotify();
  const { error } = useAppSelector((state) => state.authSlice);

  useEffect(() => {
    notifyError(authConstans[error]);
  }, [error]);

  const authRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(restorePassword(email))
      .unwrap()
      .then(() => {
        notifySuccess(authConstans.recoveryPassword);
      });
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
        <button className="btn-stand">{authConstans.reset}</button>
      </form>
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default ResetPassword;
