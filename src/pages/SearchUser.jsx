import Header from "../components/common/Header";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PassengersProfile from '../components/SearchUser/PassengersProfile';
import DriversProfile from '../components/SearchUser/DriversProfile';

const SearchUser = () => {
	const [phoneNumber, setPhoneNumber] = useState('');
	// const [userData, setUserData] = useState(null);
	const [error, setError] = useState('');
	const navigate = useNavigate(); // For programmatic navigation

	const handleSearch = async () => {
		try {
		  // Make API call to fetch user by phone number
		  const response = await axios.get(
			`http://ec2-3-110-123-252.ap-south-1.compute.amazonaws.com/api/adminpanel/search/${phoneNumber}`
		  );
		  
		  // The data from the API is in response.data, no need to use .json()
		  // const result = response.data;
	
		  // if (response.status === 200) {
		  //   setUserData(result.data); // Store user data (result.data contains the user's details)
		  //   setError(''); // Clear any previous error messages
		  // } else {
		  //   throw new Error(result.message || 'Error fetching user data');
		  // }
	
		  const userData = response.data;
		  if (response.status === 200 && userData.status === 1) {
			// Navigate to the respective profile page based on user role
			if (userData.role === 'driver') {
			  navigate(`/Home/drivers-profile`, { state: { user: userData.data } });
			} else if (userData.role === 'passenger') {
			  navigate(`/Home/passengers-profile`, { state: { user: userData.data } });
			} else {
			  throw new Error('Unknown user role');
			}
		  } else {
			throw new Error(userData.message || 'Error fetching user data');
		  }
		} catch (err) {
		  setError('User not found or an error occurred.');
		  setUserData(null); // Clear user data on error
		  console.error(err);
		}
	  };
	
	return (
		<div className='flex-1 overflow-auto relative z-10 bg-white'>
			<Header title={"Search User"} />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
			  <div className="search-user text-black my-10 mx-5">
				<h2>Search User by Phone Number</h2>
				<input
					type="text"
					placeholder="Enter phone number"
					value={phoneNumber}
					onChange={(e) => setPhoneNumber(e.target.value)}
					className="border px-10 py-2 rounded"
				/>
				<button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded ml-2">
					Search
				</button>

				{error && <p className="text-red-500">{error}</p>}


			  </div>
			</main>
		</div>
	);
};
export default SearchUser;


