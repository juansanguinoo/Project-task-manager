import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AlertContext from '../../context/alerts/AlertContext';
import AuthContext from '../../context/auth/AuthContext';

const NewAccount = () => {
  const navigate = useNavigate();

  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { message, authenticated, registerUser } = authContext;

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
    name: '',
    email: '',
    password: '',
    confirm: '',
  });

  const { name, email, password, confirm } = user;

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      name.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      confirm.trim() === ''
    ) {
      showAlert('All fields are required', 'alert-error');
      return;
    }
    if (password.length < 6) {
      showAlert('Password must be at least 6 characters', 'alert-error');
      return;
    }
    if (password !== confirm) {
      showAlert('Passwords do not match', 'alert-error');
      return;
    }
    registerUser({
      name,
      email,
      password,
    });
  };

  return (
    <div className="form-user">
      {alert ? (
        <div className={`alert ${alert.category}`}>{alert.msg}</div>
      ) : null}
      <div className="container-form shade-dark">
        <h1>Get an Account</h1>

        <form onSubmit={handleSubmit}>
          <div className="field-form">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              value={name}
              onChange={handleChange}
            />
          </div>
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
            <label htmlFor="confirm">Confirm Password</label>
            <input
              type="password"
              id="confirm"
              name="confirm"
              placeholder="Repeat Your Password"
              value={confirm}
              onChange={handleChange}
            />
          </div>
          <div className="field-form">
            <input
              type="submit"
              className="btn btn-primary btn-block"
              value="Register"
            />
          </div>
        </form>

        <Link to="/" className="account-link">
          Log In
        </Link>
      </div>
    </div>
  );
};

export default NewAccount;
