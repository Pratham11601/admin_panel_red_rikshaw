import React, { useState } from 'react';
import Header from "../components/common/Header";
import { ChevronLeft, Car } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import driverImage from '../assets/driverimg.jpg';
import DocumentPopup from '../components/Drivers/DocumentPopup';
import TransactionTable from '../components/WithdrawHistory/TransactionTable';
import PassengerRides from '../components/Passengers/PassengerRides';
import defaultUser from "../assets/default_user.png"
import blockedUser from "../assets/blocked_user.png"

const PassengerProfile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { passenger } = location.state;
    const [activeTab, setActiveTab] = useState('profileSummary');
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [status, setStatus] = useState('Block');
    const [walletBalance, setWalletBalance] = useState(0);
    const [lockBalance, setLockBalance] = useState(0);
    const [showAddMoneyPopup, setShowAddMoneyPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [password, setPassword] = useState('');
    console.log("this is passenger")
    console.log(passenger);

    const togglePopup = () => {
        console.log('button clicked');

        setShowAddMoneyPopup(!showAddMoneyPopup);
    };

    const toggleStatus = () => {
        const newStatus = status === 'Block' ? 'Unblock' : 'Block';
        setStatus(newStatus);
    }
    const handleViewDocument = () => {
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
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
    const handleBackClick = () => {
        navigate('/Home/passengers');
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
            <Header title='Passenger Profile' />
            <button
                onClick={handleBackClick}
                className="flex items-center bg-white text-black pl-8 pt-3 whitespace-nowrap"
            >
                <ChevronLeft size={30} style={{ color: "black", minWidth: "20px" }} />
                <h2 className="pl-2 font-bold text-m ">Back</h2>
            </button>
            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8 bg-white'>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white shadow-lg rounded-lg p-6 text-black"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/*  Profile Image */}
                    <motion.div
                        className="flex justify-center md:justify-start"

                    >
                        <img
                            src={passenger.blockStatus ? blockedUser : (passenger.profile_img || defaultUser)}
                            alt=""
                            className="w-50 h-50 md:w-40 md:h-40 rounded-full object-cover shadow-md"
                        />
                    </motion.div>

                    {/* 2nd Div: Name, Phone, Email, Address */}
                    <motion.div className="text-center md:text-left space-y-2">
                        <h1 className="text-2xl font-semibold text-gray-800">{passenger.name}</h1>
                        <p className="text-gray-600">📞   {passenger.phone}</p>
                        
                        <p className="text-gray-600">✉️ {passenger.email}</p>
                        
                        
                        <p className="text-gray-600">⭐ {passenger.rating} Reviews</p>
                        <p className="flex  text-gray-600  "><Car style={{ color: 'black', marginRight: '10px' }} /> {passenger.total_rides} Total Rides</p>
                    </motion.div>

                    <motion.div className="space-y-3">

                        <div className="flex flex-wrap items-center my-2 justify-center ">

                            <span
                                className={` flex-wrap px-5 py-1 my-2 rounded-full text-white text-center cursor-pointer ${passenger.blockStatus ? 'bg-green-600' : 'bg-red-600'}`}

                            >
                                {passenger.blockStatus ? 'Unblock' : 'Block'}
                            </span>
                            <button
                                onClick={handleDeleteClick}
                                className="ml-4 px-3 py-1 my-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700"
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
                            <div className="flex w-full flex-col justify-center gap-3 items-start">
                                <div className="bg-white flex w-full flex-wrap flex-row justify-around ">
                                    <h1 className="text-xl font-semibold">Wallet Balance</h1>
                                    <p className="text-xl ">₹{passenger.bankDetails ? (passenger.bankDetails.balance ? passenger.bankDetails.balance : walletBalance) : walletBalance}</p>
                                </div>
                                {/* Conditionally Render "Add Money" Button */}
                                <div className="bg-white flex w-full flex-wrap flex-row justify-around ">
                                    <h1 className="text-xl font-semibold">Lock Balance</h1>
                                    <p className="text-xl ">₹{passenger.bankDetails ? (passenger.bankDetails.lock_amount ? passenger.bankDetails.lock_amount : lockBalance) : lockBalance}</p>
                                </div>

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

                {/* Navbar Section */}
                <div className="border-b border-gray-300 mb-6">
                    <ul className="flex justify-around">
                        <li
                            className={`cursor-pointer py-2 ${activeTab === 'profileSummary' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600'}`}
                            onClick={() => setActiveTab('profileSummary')}
                        >
                            Profile Summary
                        </li>

                        <li
                            className={`cursor-pointer py-2 ${activeTab === 'Rides' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600'}`}
                            onClick={() => setActiveTab('Rides')}
                        >
                            Rides
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
                        {/* Summary */}
                        <div className="p-4 bg-white shadow-lg rounded-lg">
                            <h3 className="text-xl font-bold mb-3">Summary</h3>
                            <div className="space-y-6 gap-4">
                                <div>
                                    <h4 className="font-semibold text-gray-800">About </h4>
                                    <p className="text-gray-600">Lorem ipsum dolor sit amet...</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Languages Spoken</h4>
                                    <p className="text-gray-600">English, Spanish</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Verifications</h4>
                                    <p className="text-gray-600">Email Verified, Phone Verified</p>
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



                {/* TransactionHistory Section */}
                {activeTab === 'Rides' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <PassengerRides passengerId={passenger._id} />
                    </motion.div>
                )}
            </main>

        </div>
    )
}

export default PassengerProfile;