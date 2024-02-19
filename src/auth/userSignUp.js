import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseauth } from '../firebase/config';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/config';

let error = null;

const signUp = async (email, password) => {
  error = null;
  try {
    const res = await createUserWithEmailAndPassword(
      firebaseauth,
      email,
      password
    );
    if (res) {
      const user = res.user;
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        authProvider: 'local',
        email,
      });
    }
    if (!res) {
      throw new Error('Could not complete the signup');
    }
  } catch (err) {
    error = err.message;
    console.log(error);
  }
};

const userSignUp = () => {
  return { error, signUp };
};

export default userSignUp;
