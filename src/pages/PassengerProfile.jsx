import React, { useState } from 'react';
import Header from "../components/common/Header";
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion'; 
import { useNavigate } from 'react-router-dom';
import driverImage from '../assets/driverimg.jpg';
import DocumentPopup from '../components/Drivers/DocumentPopup';
import { useLocation } from 'react-router-dom';
import TransactionTable from '../components/Transaction/TransactionTable';


const PassengerProfile = ()=>{
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profileSummary');
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [status, setStatus] = useState('Active');

    const toggleStatus = () => {
        const newStatus = status === 'Active' ? 'Inactive' : 'Active';
        setStatus(newStatus);
    }
    const handleViewDocument = () => {
      setPopupOpen(true);
    };
  
    const handleClosePopup = () => {
      setPopupOpen(false);
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
                    <h1 className="text-2xl font-semibold text-gray-800">John Doe</h1>
                    <p className="text-gray-600">📞 9922867393</p>
                    <p className="text-gray-600">✉️ demo@gmail.com</p>
                    <p className="text-gray-600">📍 Katraj,pune</p>
                </motion.div>

                <motion.div className="space-y-2">
                    <div className="flex items-center justify-center md:justify-start">
                        <span
                            className={`px-4 py-1 rounded-full text-white cursor-pointer ${status === 'Active' ? 'bg-green-600' : 'bg-red-600'}`}
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
                            <h1 className='text-grey-600 mb-2'>Wallet Price</h1>
                            <span className="pt-8">100</span>
                        </p>
                        <p className=" text-grey-600">
                            <h1 className='text-grey-600 mb-2'>Rides</h1>
                            <span className="pt-5">78</span>
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
                        className={`cursor-pointer py-2 ${activeTab === 'reviews' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600'}`}
                        onClick={() => setActiveTab('reviews')}
                    >
                       Reviews
                    </li>
                    <li 
                        className={`cursor-pointer py-2 ${activeTab === 'TransactionHistory' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600'}`}
                        onClick={() => setActiveTab('TransactionHistory')}
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

                {/* Reviews Section */}
                    {activeTab === 'reviews' && (
                        <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        >
                        <h2 className="text-xl font-bold">Reviews</h2>
                        {/* Trip Summary content can be added here */}
                        </motion.div>
                    )}

                    {/* TransactionHistory Section */}
                    {activeTab === 'TransactionHistory' && (
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