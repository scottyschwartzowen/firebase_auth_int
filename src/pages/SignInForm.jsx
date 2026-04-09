import { useState } from "react";
import { FaApple, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../components/context/AuthContext";

export default function SignInForm() {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();
  const [authError, setAuthError] = useState("");

  const { createUser, signIn } = UserAuth();

  const onFormSwitch = () => {
    setShowRegisterForm((prev) => !prev);
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setTouched({});
    setAuthError("");
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validate = () => {
    const errors = {};
    if (showRegisterForm && !name.trim()) {
      errors.name = "Name is required.";
    }
    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }
    if (showRegisterForm) {
      if (!confirmPassword) {
        errors.confirmPassword = "Please confirm your password.";
      } else if (confirmPassword !== password) {
        errors.confirmPassword = "Passwords do not match.";
      }
    }
    return errors;
  };

  const errors = validate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const allFields = showRegisterForm
      ? { name: true, email: true, password: true, confirmPassword: true }
      : { email: true, password: true };
    setTouched(allFields);
    if (Object.keys(errors).length > 0) return;

    if (showRegisterForm) {
      try {
        await createUser(name, email, password);
        navigate("/home", { state: { showWelcome: true } });
      } catch (err) {
        setAuthError(err.message);
      }
    } else {
      try {
        await signIn(email, password);
        navigate("/home", { state: { showWelcome: true } });
      } catch (err) {
        setAuthError(err.message);
      }
    }
  };

  const renderForm = () => {
    if (showRegisterForm) {
      return (
        <div className='authCard'>
          <div className='authCard__header'>
            <h1 className='authCard__title'>Sign Up</h1>
            <p className='authCard__subtitle'>
              Enter your information to create an account
            </p>
          </div>

          <form className='authCard__body' onSubmit={onSubmit} noValidate>
            <div className='fieldGroup'>
              <label className='fieldLabel' htmlFor='name'>
                Name
              </label>
              <input
                className={`fieldInput${touched.name && errors.name ? " fieldInput--error" : ""}`}
                type='text'
                id='name'
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => handleBlur("name")}
              />
              {touched.name && errors.name && (
                <span className='fieldError'>{errors.name}</span>
              )}
            </div>

            <div className='fieldGroup'>
              <label className='fieldLabel' htmlFor='reg-email'>
                Email
              </label>
              <input
                className={`fieldInput${touched.email && errors.email ? " fieldInput--error" : ""}`}
                type='email'
                id='reg-email'
                placeholder='m@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur("email")}
              />
              {touched.email && errors.email && (
                <span className='fieldError'>{errors.email}</span>
              )}
            </div>

            <div className='fieldGroup'>
              <label className='fieldLabel' htmlFor='reg-password'>
                Password
              </label>
              <input
                className={`fieldInput${touched.password && errors.password ? " fieldInput--error" : ""}`}
                type='password'
                id='reg-password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur("password")}
              />
              {touched.password && errors.password && (
                <span className='fieldError'>{errors.password}</span>
              )}
            </div>

            <div className='fieldGroup'>
              <label className='fieldLabel' htmlFor='confirm-password'>
                Confirm Password
              </label>
              <input
                className={`fieldInput${touched.confirmPassword && errors.confirmPassword ? " fieldInput--error" : ""}`}
                type='password'
                id='confirm-password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => handleBlur("confirmPassword")}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <span className='fieldError'>{errors.confirmPassword}</span>
              )}
            </div>

            {authError && <span className='fieldError'>{authError}</span>}

            <button className='authBtn' type='submit'>
              Create an account
            </button>

            <p className='authCard__switch'>
              Already have an account?{" "}
              <span className='authCard__switchLink' onClick={onFormSwitch}>
                Sign In
              </span>
            </p>
          </form>
        </div>
      );
    }

    return (
      <div className='authCard'>
        <div className='authCard__header'>
          <h1 className='authCard__title'>Sign In</h1>
          <p className='authCard__subtitle'>
            Enter your email below to login to your account
          </p>
        </div>

        <form className='authCard__body' onSubmit={onSubmit} noValidate>
          <div className='fieldGroup'>
            <label className='fieldLabel' htmlFor='email'>
              Email
            </label>
            <input
              className={`fieldInput${touched.email && errors.email ? " fieldInput--error" : ""}`}
              type='email'
              id='email'
              placeholder='m@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur("email")}
            />
            {touched.email && errors.email && (
              <span className='fieldError'>{errors.email}</span>
            )}
          </div>

          <div className='fieldGroup'>
            <div className='fieldLabel__row'>
              <label className='fieldLabel' htmlFor='password'>
                Password
              </label>
              <Link to='/forgot-password' className='forgotLink'>
                Forgot your password?
              </Link>
            </div>
            <input
              className={`fieldInput${touched.password && errors.password ? " fieldInput--error" : ""}`}
              type='password'
              id='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur("password")}
            />
            {touched.password && errors.password && (
              <span className='fieldError'>{errors.password}</span>
            )}
          </div>

          {authError && <span className='fieldError'>{authError}</span>}

          <button className='authBtn' type='submit'>
            Login
          </button>

          <div className='alternateLogin'>
            <div className='dividerRow'>
              <span className='dividerLine' />
              <span className='dividerText'>Or continue with</span>
              <span className='dividerLine' />
            </div>
            <div className='iconGroup'>
              <button
                type='button'
                className='iconBtn'
                aria-label='Sign in with Google'
              >
                <FaGoogle />
              </button>
              <button
                type='button'
                className='iconBtn'
                aria-label='Sign in with GitHub'
              >
                <FaGithub />
              </button>
              <button
                type='button'
                className='iconBtn'
                aria-label='Sign in with Apple'
              >
                <FaApple />
              </button>
            </div>
          </div>

          <p className='authCard__switch'>
            Don't have an account?{" "}
            <span className='authCard__switchLink' onClick={onFormSwitch}>
              Sign Up
            </span>
          </p>
        </form>
      </div>
    );
  };

  return <div className='authWrapper'>{renderForm()}</div>;
}
