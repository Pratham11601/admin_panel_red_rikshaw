import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import driverImage from '../../assets/driverimg.jpg';
import rikshawicon from '../../assets/rickshaw.png';
import { BadgeCheck,PhoneCall ,ArrowRightToLine} from 'lucide-react';
import  defaultUser from "../../assets/default_user.png"
import  blockedUser from "../../assets/blocked_user.png"
const UserCard= ({driver})=>{
  console.log(driver)
  const navigate = useNavigate();
  const handleViewProfile = () => {

    navigate(`/Home/driverProfile`, { state: { driver: driver } });

  };
    return(
        <div className="p-3 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
          <div className="relative bg-white  rounded-lg ">
      {/* Status at top-right corner */}
          <div className={`absolute top-2 right-2 text-sm text-white  rounded-full ${ driver.activeStatus ? 'bg-green-600' : 'bg-red-600'}`}>
              <BadgeCheck className="h-6 w-6 text-white outline-none" />
          </div>

      {/* Driver image and ratings */}
          <div className="flex text-black items-center mb-4">
          <img src={ driver.blockStatus ? blockedUser : (driver.profile_image || defaultUser)}  alt="" className="w-16 h-16 rounded-full object-cover shadow-md"/>
            <div className="flex flex-col ">
              <h2 className="text-m font-bold text-gray-900 pl-4 my-2">{driver.name}</h2>
              <p className="text-sm flex font-medium text-gray-600 mt-2 ml-3">
                <img src={rikshawicon} alt="" className="w-6 h-6 mr-2"/>
                {driver.vehicle_number}
              </p>
              <p className="text-sm  flex font-medium text-gray-600 ml-3">
                <PhoneCall className="h-4 w-4 mr-4 color-black-900"/>
                {driver.phone}
              </p>
              {/* Add star icons or other rating visuals here if needed */}
            </div>
          </div>

      {/* Vehicle number and phone number */}
          <div className="mb-4">
          <span className=" text-yellow-500 ">{'★'.repeat(Math.floor(driver.rating))}</span>
            
          </div>

      {/* View Profile button at bottom-right corner */}
          <div className=" absolute top-12  right-2">
          
          <button 
                onClick={() => handleViewProfile(driver._id)} 
                className="flex items-center text-center text-blue-500 text-sm py-10 font-semibold rounded-lg"
              >
                View Profile
                <ArrowRightToLine className="h-4 w-4 ml-2" />
          </button>
          </div>
          </div>
      </div>
        
     


        
    )
}

export default UserCard;