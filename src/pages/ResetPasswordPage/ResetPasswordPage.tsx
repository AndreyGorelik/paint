import ResetPassword from "../../components/auth/ResetPassword"
import { authConstans } from '../../constans/authConstans'

const ResetPasswordPage = () => {
  return (
    <div className='login-screen'>
        <h1>{authConstans.passwordRecovery}</h1>
        <ResetPassword/>
    </div>
  )
}

export default ResetPasswordPage