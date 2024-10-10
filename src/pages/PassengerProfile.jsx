import React, { useState } from 'react';
import Header from "../components/common/Header";
import { ChevronLeft,Car } from 'lucide-react';
import { motion } from 'framer-motion'; 
import { useNavigate,useLocation } from 'react-router-dom';
import driverImage from '../assets/driverimg.jpg';
import DocumentPopup from '../components/Drivers/DocumentPopup';
import TransactionTable from '../components/WithdrawHistory/TransactionTable';


const PassengerProfile = ()=>{
    const navigate = useNavigate();
    const location = useLocation();
    const { passenger } = location.state; 
    const [activeTab, setActiveTab] = useState('profileSummary');
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [status, setStatus] = useState('Block');
    const [walletBalance, setWalletBalance] = useState(500);
    const [showAddMoneyPopup, setShowAddMoneyPopup] = useState(false);  

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
    return(
        <div className="flex-1 overflow-auto relative z-10">
            <Header title='Passenger Profile' />
            <button 
                onClick={handleBackClick}
                className="flex items-center bg-white text-black pl-8 pt-3 whitespace-nowrap"
            >
                <ChevronLeft  size={30} style={{ color: "black", minWidth: "20px" }} />
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
                    src={driverImage}
                    alt=""
                    className="w-50 h-50 md:w-40 md:h-40 rounded-full object-cover shadow-md"
                />
                </motion.div>

                {/* 2nd Div: Name, Phone, Email, Address */}
                <motion.div className="text-center md:text-left space-y-2">
                    <h1 className="text-2xl font-semibold text-gray-800">{passenger.name}</h1>
                    <p className="text-gray-600">📞   {passenger.mobile_number}</p>
                    <p className="flex  text-gray-600  "><Car style={{color:'black', marginRight:'10px'}}/> {passenger.total_rides} Total Rides</p>
                </motion.div>

                <motion.div className="space-y-2">
                    <div className="flex items-center justify-center md:justify-start">
                        <span
                            className={`px-4 py-1 rounded-full text-white cursor-pointer ${status === 'Block' ? 'bg-red-600' : 'bg-green-600'}`}
                        // Add click handler to toggle status
                        >
                            {status}
                        </span>
                        <button
                                onClick={toggleStatus}
                                className="ml-4 px-3 py-1 bg-red-400 text-white font-sb rounded "
                        >
                                Change Status
                        </button>
                    </div>

                    <div className="flex items-center justify-center md:justify-start pt-3 ">
                        <p className=" text-grey-600 mr-8">
                        <div className="flex items-center justify-center md:justify-start ">
                            <div className="bg-white mt-2">
                                <h1 className="text-xl font-semibold">Wallet Balance</h1>
                                <p className="text-xl mt-2">₹{walletBalance.toFixed(2)}</p>
                            </div>
                            {/* Add Money Button */}
                            <button
                                onClick={togglePopup}
                                className="ml-4 px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                Add Money
                            </button>
                        </div>
                            
                        </p>
                        
                    
                    </div>
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
                            <TransactionTable/>
                        </motion.div>
                    )}
            </main>
            
        </div>
    )
}

export default PassengerProfile;