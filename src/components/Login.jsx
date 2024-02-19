import { useState } from 'react';
import userLogin from '../auth/userLogin';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const { error, login } = userLogin();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/countries';

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
    if (!error) {
      console.log('Logged in successfully');
      navigate(from, { replace: true });
      setEmail('');
      setPassword('');
      return;
    } else {
      setErrorMessage(error);
      console.log('Error:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder='Email'
          type='email'
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder='Password'
          type='password'
        />
        {errorMessage && <p>{errorMessage}</p>}
        <button className='loginbtn' type='submit'>
          Login
        </button>
        <p>No account?</p>
        <button onClick={props.toggleForm} className='loginbtn'>
          Sign Up
        </button>
      </form>
    </>
  );
};

export default Login;
