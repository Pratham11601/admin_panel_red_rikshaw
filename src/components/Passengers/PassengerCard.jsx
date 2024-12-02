import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfilePopup from "./ProfilePopup";
import { IndianRupee ,PhoneCall,BadgeCheck,ArrowRightToLine} from 'lucide-react';
import driverImage from '../../assets/driverimg.jpg';
import  defaultUser from "../../assets/default_user.png"
import  blockedUser from "../../assets/blocked_user.png"
const PassengerCard= ({passenger })=>{
  
  
  const navigate = useNavigate();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(500);


  const handleViewProfile = () => {
    navigate(`/Home/passengerProfile`, { state: { passenger: passenger } }); 
  };
  
    return(
      <div className="p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 h-40">
      <div className="relative bg-white rounded-lg h-full">
        {/* Status at top-right corner */}
        <div
          className={`absolute top-2 right-2 text-sm text-white rounded-full ${
            passenger.is_active ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          <BadgeCheck className="h-6 w-6 text-white outline-none" />
        </div>

        {/* Passenger image and details */}
        <div className="flex items-center mb-4">
          <img
            src={passenger.blockStatus ? blockedUser : passenger.profile_img || defaultUser}
            alt={`Profile picture of ${passenger.name}`}
            className="w-16 h-16 rounded-full object-cover shadow-md"
          />

          <div className="flex flex-col text-black ml-4">
            <h1 className="text-m font-bold text-gray-900 mb-2">{passenger.name}</h1>
            <p className="text-sm flex font-medium text-gray-700">
              <PhoneCall className="h-4 w-4 mr-2" />
              {passenger.phone}
            </p>
          </div>
        </div>

        {/* Rides and View Profile */}
        <div className="absolute bottom-4 right-4 flex items-center justify-between w-full px-4">
          <span className="text-yellow-500">{passenger.total_rides} rides</span>
          <button
            onClick={handleViewProfile}
            className="flex items-center text-blue-500 text-sm font-semibold rounded-lg"
          >
            View Profile
            <ArrowRightToLine className="h-4 w-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PassengerCard;