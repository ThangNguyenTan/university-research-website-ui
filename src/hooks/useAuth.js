import { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthProvider';

const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const authed = localStorage.getItem('x-auth-token');

  useEffect(() => {
    if (authed) {
      setAuth(authed);
    } else {
      setAuth(false);
    }
  }, [authed, auth]);

  return { auth, setAuth };
};

export default useAuth;
