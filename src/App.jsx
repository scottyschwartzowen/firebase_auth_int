import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignInForm from "./pages/SignInForm.jsx";
import Navbar from "./pages/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Footer from "./pages/Footer.jsx";
import About from "./pages/About.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import { AuthContextProvider } from "./components/context/AuthContext.jsx";
import ProtectedRoute from "./routes/ProtectedRoutes.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path='/' element={<SignInForm />} />
            <Route path='/signin' element={<SignInForm />} />
            <Route
              path='/home'
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path='/about'
              element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile'
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;