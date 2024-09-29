import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import driverImage from '../../assets/driverimg.jpg';
import { BadgeCheck } from 'lucide-react';
const UserCard= ({ img,name, phoneNumber, vehicleNo,status,rating})=>{

  const navigate = useNavigate();
  const handleViewProfile = () => {
    navigate('/Home/driverProfile'); 
  };
    return(
        <div className="p-3 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
              <img src={img} alt="" className="w-16 h-16 rounded-full object-cover shadow-md"/>
       
            </div>
            <div className="mt-2 text-center text-yellow-500">
              {'★'.repeat(Math.floor(rating))}
            </div>
          </div>
          <div className="ml-4">
            <div className="flex items-center justify-between    max-w-sm">
              <h2 className="text-m font-bold text-gray-900 ">{name}</h2>
              
              <div
                  className={` ml-27 relative rounded-full ${
                    status ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  <BadgeCheck className="h-6 w-6 text-white" />
                </div>
              
            </div>
            <p className="text-sm text-gray-500">{phoneNumber}</p>
            <p className="text-sm text-gray-500"> {vehicleNo}</p>
            
            <p className=" pt-3 text-sm text-gray-500">
              
                  
                  <button 
                    onClick={handleViewProfile}
                    className="h-8 mt-2 bg-blue-500 text-white px-4  rounded-lg hover:bg-blue-600 transition-colors duration-300"
                  >
                    View Profile
              </button>
              
            </p>
          </div>
        </div>
        
      </div>


        
    )
}

export default UserCard;