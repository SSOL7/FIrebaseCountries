import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { firebaseauth } from '../firebase/config';

const PrivateRoutesLayout = () => {
  const location = useLocation();
  return firebaseauth.currentUser ? (
    <Outlet />
  ) : (
    <Navigate to='/' state={{ from: location }} replace />
  );
};

export default PrivateRoutesLayout;
