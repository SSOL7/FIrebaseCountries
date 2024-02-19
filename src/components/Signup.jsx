import { useState } from 'react';
import userSignUp from '../auth/userSignUp';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const Signup = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const { error, signUp } = userSignUp();

  const from = location.state?.from?.pathname || '/countries';

  const handleSignUp = async (e) => {
    e.preventDefault();
    await signUp(email, password);
    if (!error) {
      navigate(from, { replace: true });
      console.log('Signed up successfully');
      setEmail('');
      setPassword('');
      return;
    } else {
      setErrorMessage(error);
      console.log('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignUp}>
        <h1>Create account</h1>
        <input
          placeholder='Email'
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          placeholder='Password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {errorMessage && <p>{errorMessage}</p>}
        <button className='loginbtn' type='submit'>
          Signup
        </button>
        <p>Already have an account?</p>
        <button onClick={props.toggleForm} className='loginbtn'>
          Login
        </button>
      </form>
    </div>
  );
};

export default Signup;
