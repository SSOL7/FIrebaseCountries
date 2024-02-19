import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseauth } from '../firebase/config';

let error = null;

const login = async (email, password) => {
  error = null;
  try {
    const res = await signInWithEmailAndPassword(firebaseauth, email, password);
    error = null;
    console.log(res.user);
    return res;
  } catch (err) {
    error = err.message;
    console.log(err.message);
  }
};

const userLogin = () => {
  return { login, error };
};

export default userLogin;
