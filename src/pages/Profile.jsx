import React, { useEffect, useState } from "react";
import { UserAuth } from "../components/context/AuthContext";
// cspell:ignore scotty
import scotty from "../images/scotty.png";

export default function Profile() {
  const { user, updateUser } = UserAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setName(user?.displayName ?? "");
    setEmail(user?.email ?? "");
  }, [user]);

  const validate = (fields) => {
    const newErrors = {};
    if (!fields.name.trim()) newErrors.name = "Name is required.";
    if (!fields.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      newErrors.email = "Please enter a valid email.";
    }
    return newErrors;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validate({ name, email });
    setErrors(newErrors);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate({ name, email });
    setErrors(newErrors);
    setTouched({ name: true, email: true });
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      await updateUser(name, email);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='authWrapper'>
      <div className='authCard'>
        <div className='authCard__header'>
          <h1 className='authCard__title'>Your Profile</h1>
          <p className='authCard__subtitle'>
            Update your name or email address below.
          </p>
        </div>

        <div className='imageContainer'>
          <img className='img' src='/scotty.png' alt='Profile avatar' />
        </div>

        {success && (
          <div className='successBanner'>Profile updated successfully!</div>
        )}

        <form className='authCard__body' onSubmit={onSubmit} noValidate>
          <div className='fieldGroup'>
            <label className='fieldLabel' htmlFor='name'>
              Name
            </label>
            <input
              className={`fieldInput${touched.name && errors.name ? " fieldInput--error" : ""}`}
              type='text'
              id='name'
              placeholder='Your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => handleBlur("name")}
            />
            {touched.name && errors.name && (
              <span className='fieldError'>{errors.name}</span>
            )}
          </div>

          <div className='fieldGroup'>
            <label className='fieldLabel' htmlFor='email'>
              Email
            </label>
            <input
              className={`fieldInput${touched.email && errors.email ? " fieldInput--error" : ""}`}
              type='email'
              id='email'
              placeholder='email@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur("email")}
            />
            {touched.email && errors.email && (
              <span className='fieldError'>{errors.email}</span>
            )}
          </div>

          <button className='authBtn' type='submit'>
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
