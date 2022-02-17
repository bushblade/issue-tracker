import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authLogout, reset } from '../features/auth/authSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((stt) => stt.authenticate);

  const handleLogout = () => {
    dispatch(authLogout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">TickTrack</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
