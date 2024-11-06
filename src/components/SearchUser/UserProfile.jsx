import React, { useState } from 'react';
import Header from "../common/Header";
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion'; 
import { useLocation,useNavigate } from 'react-router-dom';
import driverImage from '../../assets/driverimg.jpg';
import DocumentPopup from '../Drivers/DocumentPopup';
import RidesTable from '../Rides/RideTable';
import TransactionTable from '../WithdrawHistory/TransactionTable';

const UserProfile = ({user}) => {
 // Get user data passed from SearchUser component
  const [activeTab, setActiveTab] = useState('profileSummary');
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [status, setStatus] = useState('Block');
  const [walletBalance, setWalletBalance] = useState(500); // Initial wallet balance
  const [showAddMoneyPopup, setShowAddMoneyPopup] = useState(false);       // State to control popup visibility
  const [addAmount, setAddAmount] = useState(''); 
  const navigate = useNavigate();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [password, setPassword] = useState('');   

  const toggleStatus = () => {
    const newStatus = status === 'Block' ? 'Unblock' : 'Block';
    setStatus(newStatus);

    // Here, you can add an API call to update the status in your database
    // Example:
    // fetch(`/api/drivers/update-status`, {
    //     method: 'POST',
    //     body: JSON.stringify({ status: newStatus }),
    //     headers: { 'Content-Type': 'application/json' }
    // });
};
  const togglePopup = () => {
    setShowAddMoneyPopup(!showAddMoneyPopup);
  };

const handleAddMoney = () => {
    const newAmount = parseFloat(addAmount);
    if (isNaN(newAmount) || newAmount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }
    setWalletBalance(walletBalance + newAmount);
    setAddAmount('');
    togglePopup();
  };
const handleViewDocument = () => {
  setPopupOpen(true);
};

const handleClosePopup = () => {
  setPopupOpen(false);
};


const handleBackClick = () => {
    navigate('/Home/searchuser'); 
  };
  const handleDeleteClick = () => {
    setShowDeletePopup(true); // Open delete confirmation popup
};
const handleDeleteConfirm = () => {
    // Implement password confirmation logic here, e.g., validate the password
    if (password === 'correct_password') { // Replace with actual password check logic
      // Perform delete operation, e.g., calling the API
      alert("User has been deleted");
      setShowDeletePopup(false);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  const handleCloseDeletePopup = () => {
    setShowDeletePopup(false);
    setPassword('');
  };
  return (
    <div className="flex-1 overflow-auto relative z-10">
            <button 
                onClick={handleBackClick}
                className="flex items-center bg-white text-black pl-8 pt-3 whitespace-nowrap"
            >
                <ChevronLeft  size={30} style={{ color: "black", minWidth: "20px" }} />
                 <h2 className="pl-2 font-bold text-m ">Back</h2>
            </button>
            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8 bg-white'>
                <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white shadow-lg rounded-lg p-6 text-black"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                >
                {/*  Profile Image */}
                <motion.div
                className="flex justify-center md:justify-start"
            
                >
                <img
                    src={user.profile_img}
                    alt=""
                    className="w-40 h-45 md:w-40 md:h-40 rounded-full object-cover shadow-md"
                />
                </motion.div>

                {/*  Name, Phone, Email, Address */}
                <motion.div className="text-center md:text-left space-y-2">

                <h1 className="text-2xl font-semibold text-gray-800">{user.name}</h1>
                
                <p className="text-gray-600">📞 {user.phone}</p>
                <p className="text-gray-600">✉️ {user.email}</p>
                <p className="text-center md:text-left">
                    🚗 <span className="font-semibold">227</span> Total Trips
                </p>
                <p className="text-center md:text-left">
                    ⭐ <span className="font-semibold">4.5</span> Reviews
                </p>
                
                </motion.div>

                {/*  Status, Total Trips, Reviews */}
                <motion.div className="space-y-2">
                <div className="flex items-center justify-center md:justify-start">
                <span
                        className={`px-4 py-1 rounded-full text-white cursor-pointer ${user.activeStatus ? 'bg-red-600' : 'bg-green-600'} text-white`}
                       // Add click handler to toggle status
                    >
                      {user.activeStatus ? 'Block' : 'unblock'}
                    </span>
                    <button
                            onClick={toggleStatus}
                            className="ml-4 px-3 py-1 bg-red-400 text-white font-sb rounded "
                    >
                            Change Status
                    </button>
                </div>


                {user.role === 'passenger' ? (
                  <button
                    onClick={togglePopup}
                    className="ml-4 px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Add Money
                  </button>
                ) : (
                  user.blockStatus ? (
                    <p className="ml-4 text-red-600 font-semibold">
                      Money can't be added, user is blocked
                    </p>
                  ) : (
                    <button
                      onClick={togglePopup}
                      className="ml-4 px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Add Money
                    </button>
                  )
                )}
                <button
                    onClick={handleDeleteClick}
                    className="ml-4 px-3 py-1 bg-red-600 text-white font-semibold rounded hover:bg-red-700"
                >
                    Delete User
                </button>
                {/* Delete Confirmation Popup */}
                {showDeletePopup && (
                    <div className="fixed inset-0 flex items-center justify-center text-black bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-md w-80">
                        <h2 className="text-xl font-semibold mb-4">Please enter your password to confirm:</h2>
                        <p className="mb-2"></p>
                        <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                        placeholder="Enter password"
                        />
                        <button
                        onClick={handleDeleteConfirm}
                        className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                        Confirm Delete
                        </button>
                        <button
                        onClick={handleCloseDeletePopup}
                        className="mt-2 w-full px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                        >
                        Cancel
                        </button>
                    </div>
                    </div>
                )}
                </motion.div>
                </motion.div>

      {/* Popup for adding money */}
      {showAddMoneyPopup && (
        <div className="fixed text-black inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <h2 className="text-xl font-semibold">Add Money to Wallet</h2>

            

            <img src={user.qr_code} alt=""  className='p-10'/>

            {/* Add Money Button */}
            <button
              onClick={handleAddMoney}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 w-full"
            >
              Add
            </button>

            {/* Cancel Button */}
            <button
              onClick={togglePopup}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

            {/* Navbar Section */}
                <div className="border-b border-gray-300 mb-6 mt-6">
                    <ul className="flex justify-around">
                    <li 
                        className={`cursor-pointer py-2 ${activeTab === 'profileSummary' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-700'}`}
                        onClick={() => setActiveTab('profileSummary')}
                    >
                        Profile Summary
                    </li>
                    <li 
                        className={`cursor-pointer py-2 ${activeTab === 'tripSummary' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-700'}`}
                        onClick={() => setActiveTab('tripSummary')}
                    >
                        Trip Summary
                    </li>
                    <li 
                        className={`cursor-pointer py-2 ${activeTab === 'transactionHistory' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-700'}`}
                        onClick={() => setActiveTab('transactionHistory')}
                    >
                        Transaction History
                    </li>
                    </ul>
                </div>

                {/* Profile Summary Section */}
                    {activeTab === 'profileSummary' && (
                        <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white shadow-lg rounded-lg p-6 text-black"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        >


                        {/* Auto Details */}
                        <div className="p-4 bg-white shadow-lg rounded-lg">
                            <h3 className="text-xl font-bold mb-3">Auto Details</h3>
                            <div className="">
                            <img 
                                src="https://via.placeholder.com/100" 
                                alt="Auto Image" 
                                className="w-200 h-200 object-cover rounded-lg" 
                            />
                            <div>
                                <p className="text-gray-600">Vehicle Number: ABC-1234</p>
                            </div>
                            </div>
                        </div>

                        {/* Documents */}
                        <div className="p-4 bg-white shadow-lg rounded-lg">
                            <h3 className="text-xl font-bold mb-3">Documents</h3>
                            <div className='flex space-x-10'>
                                <p className="text-gray-600">Driver's License: Document1.pdf</p>
                                <button onClick={handleViewDocument} className="text-blue-500 hover:underline">
                                    View
                                </button>
                            </div>
                        </div>

                        </motion.div>
                    )}
                {/* Document Popup */}
                        <DocumentPopup
                            isOpen={isPopupOpen}
                            onClose={handleClosePopup}
                            documentUrl="https://example.com/document.pdf" // Replace with actual document URL
                         />

                {/* Trip Summary Section */}
                    {activeTab === 'tripSummary' && (
                        <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        >
                        <RidesTable/>
                        
                        </motion.div>
                )}

                {activeTab === 'transactionHistory' && (
                        <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        >
                        
                        <TransactionTable/>
                        </motion.div>
                )}
            </main>
            
        </div>
  );
};

export default UserProfile;
