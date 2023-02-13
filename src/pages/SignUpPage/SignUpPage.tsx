import SignUp from "../../components/auth/SignUp"
import { authConstans } from '../../constans/authConstans'

const SignUpPage = () => {
  return (
    <div className='login-screen'>
        <h1>{authConstans.register}</h1>
        <SignUp/>
    </div>
  )
}

export default SignUpPage