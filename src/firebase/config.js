import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDw-foScJMcbua3GdhZutlNIa9I1ZSdxm0',
  authDomain: 'countriesauth.firebaseapp.com',
  projectId: 'countriesauth',
  storageBucket: 'countriesauth.appspot.com',
  messagingSenderId: '240076758059',
  appId: '1:240076758059:web:5a4ec0389c67724417de6e',
};

const app = initializeApp(firebaseConfig);
export const firebaseauth = getAuth(app);
export const db = getFirestore(app);
