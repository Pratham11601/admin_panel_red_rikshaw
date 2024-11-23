import Header from "../components/common/Header";
import React, { useState } from 'react';
import axios from 'axios';
import UserProfile from "../components/SearchUser/UserProfile";
import usernotfound from '../assets/usernotfound2.jpg';
import searchuser from '../assets/searchuser.jpg';

const SearchUser = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true); // Start loading
    setError(''); // Clear previous error
    try {
      // Make API call to fetch user by phone number
      const response = await axios.get(
        `http://ec2-3-110-123-252.ap-south-1.compute.amazonaws.com/api/adminpanel/search/${phoneNumber}`
      );
      
      const data = response.data;
      
      if (response.status === 200 && data.status === 1) {
        setUserData(data.data); // Store user data (data.data contains the user's details)
        setError(''); // Clear any previous error messages
      } else {
        throw new Error(data.message || 'User not found');
      }
    } catch (err) {
      setError('User not found or an error occurred.');
      setUserData(null); // Clear user data on error
      console.error(err);
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
    if (userData ) {
      return  <UserProfile user={userData} />;
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
            onKeyDown={handleKeyDown}  // Add the keydown handler
            className="border shadow-md px-10 py-2 rounded w-full max-w-lg"
          />
          <button onClick={handleSearch} className="bg-blue-500 text-white py-2 px-8 rounded ml-2 shadow-md">
            Search
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
            <h1 className="text-lg font-semibold text-gray-600">User Not Found...</h1>
          </div>
        )}

        {!loading && userData && renderUserProfile()}

      </main>
    </div>
  );
};

export default SearchUser;
