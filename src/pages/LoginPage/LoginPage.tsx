import Login from '../../components/auth/Login'
import { Link } from 'react-router-dom'
import { authConstans } from '../../constans/authConstans'

const LoginPage = () => {
  return (
    <div className='login-screen'>
      <h1>{authConstans.signIn}</h1>
      <Login />
      <div className="login-screen__options">
        <Link to="/signup">{authConstans.register}</Link>
        <Link to="/reset">{authConstans.forgotPassword}</Link>
      </div>
    </div>
  )
}

export default LoginPage