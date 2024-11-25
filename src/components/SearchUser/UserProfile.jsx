import React, { useState } from 'react';
import Header from "../common/Header";
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion'; 
import { useLocation,useNavigate } from 'react-router-dom';
import DocumentPopup from '../Drivers/DocumentPopup';
import DriverRides from '../Drivers/DriverRides';
import DriverTransactionTable from '../Drivers/DriverTransactionTable';
import PassengerRides from '../Passengers/PassengerRides';



const UserProfile = ({user}) => {
 // Get user data passed from SearchUser component
 console.log(user.role);
 
  const [activeTab, setActiveTab] = useState('profileSummary');
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [status, setStatus] = useState('Block');
  const [walletBalance, setWalletBalance] = useState(500); // Initial wallet balance
  const [showAddMoneyPopup, setShowAddMoneyPopup] = useState(false);       // State to control popup visibility
  const [addAmount, setAddAmount] = useState(''); 
  const navigate = useNavigate();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [documentUrls, setDocumentUrls] = useState({ front: '', back: '' }); 
  const [password, setPassword] = useState('');   

  console.log(user.role);
  
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
    setDocumentUrls({
        front: user.adhar_img_front,

        back: user.adhar_img_back
      });
  
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

  if (password === 'Steve@123') {
      alert("User deleted successfully");
      setShowDeletePopup(false);
      setPassword('');
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
                <motion.div className="space-y-3">
            
                <div className="flex items-center justify-center md:justify-start">
                    
                    <span
                        className={`w-30 px-5 py-1 rounded-full text-white cursor-pointer ${user.blockStatus ? 'bg-green-600' : 'bg-red-600'}`}
     
                    >
                        {user.blockStatus ? 'Unblock' : 'Block'}
                    </span>
                    <button
                    onClick={handleDeleteClick}
                    className="ml-4 px-3 py-1 bg-red-600 text-white font-semibold rounded hover:bg-red-700"
                >
                    Delete 
                </button>
                    {/* <button
                            onClick={toggleStatus}
                            className="ml-10 px-3 py-1 bg-red-400 text-white font-sb rounded "
                        >
                            Change Status
                    </button> */}
                </div>
                <div className="flex items-center justify-center md:justify-start pt-3">
                            <div className="flex items-center">
                                <div className="bg-white mt-2">
                                    <h1 className="text-xl font-semibold">Wallet Balance</h1>
                                    <p className="text-xl mt-2">₹{walletBalance.toFixed(2)}</p>
                                </div>
                                {/* Conditionally Render "Add Money" Button */}
                                {user.blockStatus ? (
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
                                )}
                            </div>
                        </div>

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
                    {user.role === 'Driver' && (
                        <li className={`cursor-pointer py-2 ${activeTab === 'profileSummary' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-700'}`}
                            onClick={() => setActiveTab('profileSummary')}
                        >
                            Profile Summary
                        </li>
                    )}
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
                    {activeTab === 'profileSummary' &&  user.role === 'Driver' && (
                       <motion.div
                       className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white shadow-lg rounded-lg p-6 text-black"
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ duration: 0.5 }}
                       >


                       {/* Auto Details */}
                       <div className="p-4 bg-white shadow-lg rounded-lg text-black">
                           <h3 className="text-xl font-bold mb-3">Auto Details</h3>
                           <p className="">Vehicle Number: {user.vehicleDetails ? user.vehicleDetails.Vehicle_number : "No Vehicle Number"}</p>
                           
                           <div className="flex flex-col ">
                               <img 
                               src={user.vehicleDetails ?user.vehicleDetails.vehicle_img_front :user.vehicle_img_front }
                               alt="Auto Image Front" 
                               className="w-50 max-w-xs "
                               />
                               <img 
                               src={user.vehicleDetails ?user.vehicleDetails.vehicle_img_back :user.vehicle_img_back }
                               alt="Auto Image Back" 
                               className="w-70 max-w-xs "
                               />
                           </div>
                       </div>


                       {/* Documents */}
                       <div className="p-4 bg-white shadow-lg rounded-lg">
                           <h3 className="text-xl font-bold mb-3">Documents</h3>
                           <div className='flex space-x-10'>
                               <p className="text-gray-600">Aadhar Card</p>
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
                            documentUrl={documentUrls} // Replace with actual document URL
                         />


                {/* Trip Summary Section */}
                    {activeTab === 'tripSummary' && (
                        <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        >
                            {
                                user.role==="Driver"?<DriverRides driverId={user._id} />: <PassengerRides passengerId={user._id} />
                            }
                        
                        
                        </motion.div>
                )}

                {activeTab === 'transactionHistory' && (
                        <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        >
                        
                        <DriverTransactionTable userId={user._id}/>
                        </motion.div>
                )}
            </main>
            
        </div>
  );
};

export default UserProfile;
