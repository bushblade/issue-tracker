import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { authLogin, reset } from '../features/authenticate/authSlice';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';

import { Popup } from 'reactjs-popup';
const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isSuccess, message, isError } = useSelector(
    (state) => state.authenticate
  );

  const { name, email, password, password2 } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Redirect when logged in
    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const formChangeHandler = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = { email, password };
    dispatch(authLogin(userData));
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      {' '}
      <section className="heading">
        <h1>
          <FaSignInAlt
            style={{ marginBottom: '-0.5rem', marginRight: '1rem' }}
          />
          Login
        </h1>
        Log in your account to see your tickets.
      </section>
      <section className="form">
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={formChangeHandler}
              placeholder="Email"
              autoComplete="on"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={formChangeHandler}
              placeholder="Password"
              autoComplete="off"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Create a new Account</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
