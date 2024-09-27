import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Home from "./Home";
import { useState } from "react";

// import Sidebar from "./components/common/Sidebar";

// import OverviewPage from "./pages/OverviewPage";
// import ProductsPage from "./pages/ProductsPage";
// import UsersPage from "./pages/UsersPage";
// import SalesPage from "./pages/SalesPage";
// import OrdersPage from "./pages/OrdersPage";
// import AnalyticsPage from "./pages/AnalyticsPage";
// import SettingsPage from "./pages/SettingsPage";
// import TermsPage from "./pages/Terms";
// import PrivacyPage from "./pages/Privacy";


function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	
	const handleLogin = (status) => {
	  setIsAuthenticated(status);
	};
	return (
		
		<Routes>
		  {/* Login Route */}
		  <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
  
		  {/* Protected Dashboard Route */}
		  <Route
			path="/Home/*"
			element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
		  />
  
		  {/* Default Route */}
		  <Route path="/" element={<Navigate to="/login" />} />
		  <Route path="/Home" element={<Navigate to="/Home/Dashboard" />} />
		  <Route path="/Home" element={<Navigate to="/Home/Passengers" />} />
		  <Route path="/Home" element={<Navigate to="/Home/Drivers" />} />
		  <Route path="/Home" element={<Navigate to="/Home/Rides" />} />
		</Routes>
	  
	);
}

export default App;
