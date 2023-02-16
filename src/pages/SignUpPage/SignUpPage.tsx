import SignUp from "../../components/auth/SignUp";
import { authConstans } from "../../constans/authConstans";
import { Link } from "react-router-dom";
const SignUpPage = () => {
  return (
    <div className="center-wrapper">
      <div className="login-screen">
        <h1>{authConstans.register}</h1>
        <SignUp />
        <div className="login-screen__add">
          <Link to="/login">Back to login page</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
