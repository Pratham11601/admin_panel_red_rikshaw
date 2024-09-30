import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import driverImage from '../../assets/driverimg.jpg';
import rikshawicon from '../../assets/rickshaw.png';
import { BadgeCheck,PhoneCall ,ArrowRightToLine} from 'lucide-react';
const UserCard= ({ img,name, phoneNumber, vehicleNo,status,rating})=>{

  const navigate = useNavigate();
  const handleViewProfile = () => {
    navigate('/Home/driverProfile'); 
  };
    return(
        <div className="p-3 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative bg-white  rounded-lg ">
      {/* Status at top-right corner */}
      <div className={`absolute top-2 right-2 text-sm text-white px-1 py-1 rounded-full ${ status ? 'bg-green-500' : 'bg-red-500'}`}>
                  <BadgeCheck className="h-4 w-4 text-white" />
      </div>

      {/* Driver image and ratings */}
      <div className="flex items-center mb-4">
      <img src={driverImage} alt="" className="w-16 h-16 rounded-full object-cover shadow-md"/>
        <div className="flex flex-col ">
          <h2 className="text-m font-bold text-gray-900 pl-4 ">{name}</h2>
          <span className=" text-yellow-500 pl-4">{'★'.repeat(Math.floor(rating))}</span>
          {/* Add star icons or other rating visuals here if needed */}
        </div>
      </div>

      {/* Vehicle number and phone number */}
      <div className="mb-4">
      
        <p className="text-sm flex font-medium text-gray-600">
          <img src={rikshawicon} alt="" className="w-6 h-6 mr-2"/>
           {vehicleNo}
        </p>
        <p className="text-sm  flex font-medium text-gray-600">
          <PhoneCall className="h-4 w-4 mr-4 color-black-900"/>
          {phoneNumber}
        </p>
      </div>

      {/* View Profile button at bottom-right corner */}
      <div className="my-2 absolute top-20  right-2">
        <button onClick={handleViewProfile} className="flex items-center text-center text-blue-500 text-sm py-10 font-semibold  rounded-lg   ">
          View Profile
          <ArrowRightToLine className="h-4 w-4 ml-2" />
        </button>
      </div>
    </div>
        {/* <div className="flex items-center">

          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
              <img src={img} alt="" className="w-16 h-16 rounded-full object-cover shadow-md"/>
       
            </div>
            <div className="mt-2 text-center text-yellow-500">
              {'★'.repeat(Math.floor(rating))}
            </div>
          </div>

          <div className="">
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
          </div> */}
        </div>
        
     


        
    )
}

export default UserCard;