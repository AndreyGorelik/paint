import ResetPassword from "../../components/auth/ResetPassword";
import { authConstans } from "../../constans/authConstans";
import { Link } from "react-router-dom";

const ResetPasswordPage = () => {
  return (
    <div className="center-wrapper">
      <div className="login-screen">
        <h1>{authConstans.passwordRecovery}</h1>
        <ResetPassword />
        <div className="login-screen__add">
        <Link to="/login">Back to login page</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
