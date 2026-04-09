import { UserAuth } from "../components/context/AuthContext";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner.jsx";

export default function ProtectedRoute({ children }) {
  const { user, loading } = UserAuth();

  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to='/' />;
  return children;
}
