// import Header from "../components/common/Header";
// import React, { useState } from 'react';
// import axios from 'axios';
// import UserProfile from "../components/SearchUser/UserProfile";
// import ApiConfig from '../Consants/ApiConfig';
// import usernotfound from '../assets/usernotfound2.jpg';
// import searchuser from '../assets/searchuser.jpg';

// const SearchUser = () => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [userData, setUserData] = useState(null);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSearch = async () => {
//     setLoading(true); // Start loading
//     setError(''); // Clear previous error

//     try {
//       // Construct API endpoint using ApiConfig
//       const endpoint = ApiConfig.getSearchUserEndpoint(phoneNumber);

//       // Make API call to fetch user by phone number
//       const response = await axios.get(endpoint);

//       const data = response.data;

//       if (response.status === 200 && data.status === 1) {
//         setUserData(data.data); // Store user data (data.data contains the user's details)
//         setError(''); // Clear any previous error messages
//       } else {
//         throw new Error(data.message || 'User not found');
//       }
//     } catch (err) {
//       setError('User not found or an error occurred.');
//       setUserData(null); // Clear user data on error
//       console.error(err);
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch(); // Trigger the search when Enter key is pressed
//     }
//   };

//   const renderUserProfile = () => {
//     if (userData) {
//       return <UserProfile user={userData} />;
//     }
//   };

//   const clearUserData = () => {
//     setUserData(null);
//     setError('');
//     setPhoneNumber('');
//   };

//   return (
//     <div className='flex-1 overflow-auto relative z-10 bg-white'>
//       <Header title={"Search User"} />

//       <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
//         <div className="search-user flex justify-center align-center text-black my-10 mx-5">
//           <input
//             type="text"
//             placeholder="Search User by Phone Number..."
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//             onKeyDown={handleKeyDown} // Add the keydown handler
//             className="border shadow-md px-10 py-2 rounded w-full max-w-lg"
//           />
//           <button onClick={handleSearch} className="bg-blue-500 text-white py-2 px-8 rounded ml-2 shadow-md">
//             Search
//           </button>
//         </div>

//         {/* Render search message or user profile */}
//         {loading && (
//           <div className="text-black flex justify-center items-center">
//             <p>Loading...</p>
//           </div>
//         )}

//         {!loading && userData === null && !error && (
//           <div className="text-black flex flex-col justify-center items-center">
//             <img src={searchuser} alt="Search user" className="w-50 h-50" />
//             <h1 className="text-lg font-semibold text-gray-600">Search user here...</h1>
//           </div>
//         )}

//         {!loading && error && (
//           <div className="text-black flex flex-col justify-center items-center ">
//             <img src={usernotfound} alt="User not found" className="w-80 h-80" />
//             <h1 className="text-lg font-semibold text-gray-600">User Not Found...</h1>
//           </div>
//         )}

//         {!loading && userData && renderUserProfile()}
//       </main>
//     </div>
//   );
// };

// export default SearchUser;

import Header from "../components/common/Header";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserProfile from "../components/SearchUser/UserProfile";
import ApiConfig from '../Consants/ApiConfig';
import usernotfound from '../assets/usernotfound2.jpg';
import searchuser from '../assets/searchuser.jpg';
import { useNavigate } from "react-router-dom";
const SearchUser = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [role,setRole] = useState()
  const navigate = useNavigate()

  // Trigger search whenever the phone number changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (phoneNumber.length > 0) {
        handleSearch(); // Trigger the search if there's any input
      } else {
        setUserData(null); // Reset user data if input is cleared
      }
    }, 500); // Delay of 500ms to avoid making a request for each key press

    return () => clearTimeout(delayDebounceFn); // Cleanup on unmount or input change
  }, [phoneNumber]); // Trigger effect when phoneNumber changes

  const handleSearch = async () => {
    if (!phoneNumber) {
      setError("Please enter a phone number.");
      return;
    }

    setLoading(true); // Start loading
    setError(''); // Clear previous error

    const token = localStorage.getItem('token'); // Get token from localStorage

    // Ensure the token exists
    if (!token) {
      setError("No token found. Please log in.");
      setLoading(false);
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const endpoint = ApiConfig.getSearchUserEndpoint(phoneNumber);
      const response = await axios.get(endpoint, config);

      const data = response.data;
      if (response.status === 200 && data.status === 1) {
        setRole(data.role)
        setUserData(data.data); // Store user data (data.data contains the user's details)
        setError(''); // Clear any previous error messages
      } else {
        throw new Error(data.message || 'User not found');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'An error occurred while fetching the user.');
      setUserData(null); // Clear user data on error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); // Trigger the search when Enter key is pressed
    }
  };

  const renderUserProfile = () => {
    // if (userData) {
    //   return <UserProfile user={userData} />;
    // }

    if(userData){
      if(role === "passenger"){
    navigate(`/Home/passengerProfile`, { state: { passenger:userData, searchUser: true  } }); 
      }else if(role === 'driver'){
        navigate(`/Home/driverProfile`, { state: { driver:userData, searchUser: true } });
      }
    }
  };

  const clearUserData = () => {
    setUserData(null);
    setError('');
    setPhoneNumber('');
  };

  return (
    <div className='flex-1 overflow-auto relative z-10 bg-white'>
      <Header title={"Search User"} />

      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        <div className="search-user flex justify-center align-center text-black my-10 mx-5">
          <input
            type="text"
            placeholder="Search User by Phone Number..."
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            onKeyDown={handleKeyDown} // Add the keydown handler
            className="border shadow-md px-10 py-2 rounded w-full max-w-lg"
            aria-label="Phone number search"
          />
          <button 
            onClick={handleSearch} 
            className="bg-blue-500 text-white py-2 px-8 rounded ml-2 shadow-md"
            disabled={loading} // Disable while loading
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {/* Render search message or user profile */}
        {loading && (
          <div className="text-black flex justify-center items-center">
            <p>Loading...</p>
          </div>
        )}

        {!loading && userData === null && !error && (
          <div className="text-black flex flex-col justify-center items-center">
            <img src={searchuser} alt="Search user" className="w-50 h-50" />
            <h1 className="text-lg font-semibold text-gray-600">Search user here...</h1>
          </div>
        )}

        {!loading && error && (
          <div className="text-black flex flex-col justify-center items-center ">
            <img src={usernotfound} alt="User not found" className="w-80 h-80" />
            <h1 className="text-lg font-semibold text-gray-600">{error}</h1>
          </div>
        )}

        {!loading && userData && renderUserProfile()}
      </main>
    </div>
  );
};

export default SearchUser;
