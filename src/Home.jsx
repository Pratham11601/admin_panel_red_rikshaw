import { Route, Routes } from "react-router-dom";

import Sidebar from "./components/common/Sidebar";

import Dashboard from "./pages/Dashboard";
import Passengers from "./pages/Passengers";
import Drivers from "./pages/Drivers";
import Rides from "./pages/RidesPage";

import WithdrawHistory from "./pages/WithdrawHistory";
import SettingsPage from "./pages/SettingsPage";
import TermsPage from "./pages/Terms";
import PrivacyPage from "./pages/Privacy";
import DriverProfile from "./pages/DriverProfile";
import PassengerProfile from "./pages/PassengerProfile";
import WithdrawRequest from "./pages/WithdrawRequest";
import PassangerAd from "./pages/Advertisement/Passengers";
import DriverAd from "./pages/Advertisement/Driver";
import Charges from "./pages/charges";
import DriversProfile from "./components/Dashboard/DriversProfile";
import PassengersProfile from "./components/Dashboard/PassengersProfile";
import Transactions from "./pages/Transactions";

function Home() {
	return (
		<div className='flex h-screen bg-white text-gray-100 overflow-hidden'>
			{/* BG */}
			<div className='fixed inset-0 z-0'>
				<div className='absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-red-500 opacity-80' />
				<div className='absolute inset-0 backdrop-blur-sm' />
			</div>

			<Sidebar />
			<Routes>
				<Route path='dashboard' element={<Dashboard />} />
				<Route path='passengers' element={<Passengers />} />
				<Route path='drivers' element={<Drivers />} />
				<Route path='rides' element={<Rides />} />
				<Route path='transactions' element={<Transactions />} />
				<Route path='withdrawHistory' element={<WithdrawHistory />} />
				<Route path='withdrawrequest' element={<WithdrawRequest />} />
				<Route path='settings' element={<SettingsPage />} />
				<Route path='terms' element={<TermsPage />} />
				<Route path='privacy' element={<PrivacyPage />} />
				<Route path="driverProfile" element={<DriverProfile />} />
				<Route path="passengerProfile" element={<PassengerProfile />} />
				<Route path="passangerAd" element={<PassangerAd />} />
				<Route path="driverAd" element={< DriverAd />} />
				<Route path="charges" element={< Charges />} />

				<Route path="drivers-profile"  element={<DriversProfile/>}/>
				<Route path="passengers-profile"  element={<PassengersProfile/>}/>
				
				
				
			</Routes>

		</div>
	);
}

export default Home;
