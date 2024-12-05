
// // //if away from home page its logout else login 

import { Navigate, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import Home from "./Home";
import PageNotFound from "./pages/PageNotFound";
import ProtectedPage from "./pages/ProtectedPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("isAuthenticated") === "true"
  );

  const handleLogin = (status) => {
    setIsAuthenticated(status);
    localStorage.setItem("isAuthenticated", status);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("tokenExpiration");
    setIsAuthenticated(false);
  };

  const checkSessionExpiry = () => {
    const expirationTime = localStorage.getItem("tokenExpiration");
    const currentTime = new Date().getTime();

    if (expirationTime && currentTime > expirationTime) {
      handleLogout();
      window.location.href = "/login"; // Redirect to login
    }
  };

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");

    const interval = setInterval(checkSessionExpiry, 60 * 1000); // Check every minute
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route
        path="/Home/*"
        element={
          <ProtectedPage isAuthenticated={isAuthenticated}>
            <Home onLogout={handleLogout} />
          </ProtectedPage>
        }
      />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/Home" element={<Navigate to="/Home/searchuser" />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
