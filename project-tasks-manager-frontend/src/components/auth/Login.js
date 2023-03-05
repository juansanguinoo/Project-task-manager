import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AlertContext from '../../context/alerts/AlertContext';
import AuthContext from '../../context/auth/AuthContext';

const Login = () => {
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { message, authenticated, loginUser } = authContext;

  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      navigate('/projects');
    }

    if (message) {
      showAlert(message.msg, message.category);
    }
    // eslint-disable-next-line
  }, [message, authenticated, navigate]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { email, password } = user;

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === '' || password.trim() === '') {
      showAlert('All fields are required', 'alert-error');
      return;
    }
    loginUser({ email, password });
  };

  return (
    <div className="form-user">
      {alert ? (
        <div className={`alert ${alert.category}`}>{alert.msg}</div>
      ) : null}
      <div className="container-form shade-dark">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <div className="field-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="field-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Your Password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className="field-form">
            <input
              type="submit"
              className="btn btn-primary btn-block"
              value="Log In"
            />
          </div>
        </form>

        <Link to="/new-account" className="account-link">
          Get Account
        </Link>
      </div>
    </div>
  );
};

export default Login;
