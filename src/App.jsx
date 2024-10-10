import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Home from "./Home";
import { useState, useEffect } from "react";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("isAuthenticated") === "true"
  );

  const handleLogin = (status) => {
    setIsAuthenticated(status);
    localStorage.setItem("isAuthenticated", status);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />  
      <Route
        path="/Home/*"
        element={
          isAuthenticated ? (
            <Home onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/Home" element={<Navigate to="/Home/Dashboard" />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;


//if away from home page its logout else login 