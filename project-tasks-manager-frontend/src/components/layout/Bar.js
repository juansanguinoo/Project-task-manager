import React, { useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/AuthContext';

const Bar = () => {
  const authContext = useContext(AuthContext);
  const { user, authenticatedUser, logout } = authContext;

  useEffect(() => {
    authenticatedUser();
    // eslint-disable-next-line
  }, []);

  return (
    <header className="app-header">
      {user ? (
        <p className="user-name">
          Hello <span>{user.name}</span>
        </p>
      ) : null}

      <nav className="principal-nav">
        <button className="btn btn-blank logout" onClick={() => logout()}>
          Log out
        </button>
      </nav>
    </header>
  );
};

export default Bar;
