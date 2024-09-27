import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import driverImage from '../../assets/driverimg.jpg';

const UserCard= ({ name, phoneNumber, vehicleNo,status})=>{

  const navigate = useNavigate();
  const handleViewProfile = () => {
    navigate('/Home/driverProfile'); // Redirect to the profile page with the driver's ID
  };
    return(
        <div className="p-3 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
              <img src={driverImage} alt="" className="w-16 h-16 rounded-full object-cover shadow-md"/>
              {/* <span className="text-xl font-bold text-white">{name[0]}</span> */}
            </div>
            <div className="mt-2 text-center text-yellow-500">
          {/* Rating stars */}
          {'★'.repeat(Math.floor(4))}{'☆'.repeat(5 - Math.floor(4))}
        </div>
          </div>
          <div className="ml-4">
            <div className="flex items-center justify-between    max-w-sm">
              <h2 className="text-m font-bold text-gray-900 ">{name}</h2>
              <p className={`text-sm font-bold  rounded-lg pl-3 ${status === 'Active' ? 'text-green-900' : 'text-red-900'}` }></p>
            </div>
            <p className="text-sm text-gray-500">{phoneNumber}</p>
            <p className="text-sm text-gray-500">Vehicle No: {vehicleNo}</p>
            
            <p className=" pt-3 text-sm text-gray-500">
              {/* <Link to="/Home/driverProfile"> */}
                  
                  <button 
                    onClick={handleViewProfile}
                    className="h-8 mt-2 bg-blue-500 text-white px-4  rounded-lg hover:bg-blue-600 transition-colors duration-300"
                  >
                    View Profile
              </button>
              {/* </Link>  */}
            </p>
          </div>
        </div>
      </div>


        
    )
}

export default UserCard;