import {
  createUserWithEmailAndPassword,
  updateEmail,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../firebase";

const UserContext = createContext();
const DEFAULT_PROFILE_PHOTO = "/scotty.png";

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = async (name, email, password) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    await updateProfile(userCredential.user, {
      displayName: name,
      photoURL: DEFAULT_PROFILE_PHOTO,
    });
    await auth.currentUser?.reload();
    setUser(auth.currentUser);
    return userCredential;
  };

  const updateUser = (name, email) => {
    return Promise.all([
      updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: DEFAULT_PROFILE_PHOTO,
      }),
      updateEmail(auth.currentUser, email),
    ]).then(() => {
      auth.currentUser?.reload();
      setUser(auth.currentUser);
      console.log(auth.currentUser.displayName, auth.currentUser.email);
      alert("Your Profile is updated");
    });
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider
      value={{ createUser, updateUser, signIn, logout, user, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
