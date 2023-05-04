import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import useAuth from '../../hooks/useAuth';

function Logout() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  useEffect(() => {
    setAuth(false);
    localStorage.removeItem('x-auth-token');
    navigate('/');
  }, []);

  return (
    <>
      <Helmet>
        <title>Logout - UniR&D - Harvard</title>
        <meta name="robots" content="noindex" />
      </Helmet>
    </>
  );
}

export default Logout;
