import { NavLink, Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../components/context/AuthContext";

function Navbar() {
  const { logout, user } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className='header'>
      <div className='header-items'>
        <Link to='/home' className='header-left'>
          <img
            style={{ width: 180, height: 50 }}
            src='src/assets/logo-text.png'
          />
        </Link>
        <nav className='header-right'>
          <NavLink
            to='/home'
            end
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            Home
          </NavLink>
          <NavLink
            to='/about'
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            About
          </NavLink>
          <NavLink
            to='/profile'
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            Profile
          </NavLink>
          {!user ? (
            <NavLink
              to='/signin'
              className={({ isActive }) =>
                `nav-link${isActive ? " active" : ""}`
              }
            >
              Sign In
            </NavLink>
          ) : (
            <button
              type='button'
              className='nav-link nav-link-button'
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
