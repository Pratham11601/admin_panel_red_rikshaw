import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfilePopup from "./ProfilePopup";


const PassengerCard= ({ name, phoneNumber, vehicleNo, status })=>{
  const navigate = useNavigate();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const handleViewProfile = () => {
    navigate('/Home/passengerProfile'); 
  };
  
    return(
        <div className="p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
              {/* Placeholder for image */}
              <span className="text-xl font-bold text-white">{name[0]}</span>
            </div>
            <div className="mt-2 text-center text-yellow-500">
          {/* Rating stars */}
          {'★'.repeat(Math.floor(4))}{'☆'.repeat(5 - Math.floor(4))}
        </div>
          </div>
          <div className="ml-4">
            <div className="flex items-center justify-between    max-w-sm">
              <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
              <p className={`text-sm rounded-lg pl-2 ${status === 'Active' ? 'text-green-900' : 'text-red-900'}` }>{status}</p>
            </div>
            <p className="text-sm text-gray-500">{phoneNumber}</p>
            <p className="text-sm text-gray-500">Vehicle No: {vehicleNo}</p>
            
            <p className="pt-3 text-sm text-gray-500">
              {/* <Link to="/Home/passengerProfile"> */}
                  
                  <button 
                    onClick={handleViewProfile}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                  >
                    View Profile
              </button>
              {/* </Link>  */}
            </p>
          </div>
        </div>
        {/* <ProfilePopup
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
                          
        /> */}
      </div>


        
    )
}

export default PassengerCard;