import { firebaseauth } from '../firebase/config';
import { signOut, onAuthStateChanged } from 'firebase/auth';

let error = null;

const logOut = async () => {
  error = null;

  try {
    await signOut(firebaseauth);
    console.log('Logged out successfully');
  } catch (error) {
    console.log(error.message);
  }
};

const userLogOut = () => {
  return { error, logOut };
};

export default userLogOut;
