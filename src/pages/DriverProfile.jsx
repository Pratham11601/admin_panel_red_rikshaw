import React, { useState, useEffect } from 'react';
import Header from "../components/common/Header";
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import driverImage from '../assets/driverimg.jpg';
import DocumentPopup from '../components/Drivers/DocumentPopup';
import RidesTable from '../components/Rides/RideTable';
import TransactionTable from '../components/WithdrawHistory/TransactionTable';
import DriverRides from '../components/Drivers/DriverRides';
import defaultUser from "../assets/default_user.png"
import blockedUser from "../assets/blocked_user.png"
import DriverTransactionTable from '../components/Drivers/DriverTransactionTable';
import DriverReviewRatings from '../components/Drivers/DriverReviewRatings';
import axios from 'axios';
import ApiConfig from '../Consants/ApiConfig';

const DriverProfile = (driverData) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [driver, setDriver] = useState(location.state ? location.state.driver : null);
    // const [driver, setDriver] = useState(location.state.driver); // State for driver data
    const [loading, setLoading] = useState(false); // Loading state for API call
    const [activeTab, setActiveTab] = useState('profileSummary');
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [status, setStatus] = useState('Block');
    const [walletBalance, setWalletBalance] = useState(driver.bankDetails ? driver.bankDetails.balance : 0); // Initial wallet balance
    const [lockBalance, setLockBalance] = useState(0);
    const [showAddMoneyPopup, setShowAddMoneyPopup] = useState(false);       // State to control popup visibility
    const [addAmount, setAddAmount] = useState(0);
    const [documentUrls, setDocumentUrls] = useState({ front: '', back: '' });
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showVehicleEditPopup, setShowVehicleEditPopup] = useState(false);
    const [password, setPassword] = useState('');
    const [driverRides, setDriverRides] = useState()
    const [phoneNumber, setPhoneNumber] = useState('');
    const searchUser = location.state.searchUser
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        rating: 0,
    });
    const [vehicleData, setVehicleData] = useState({
        vehicleNumber: '',
        licenseNumber: '',
        driverType: 'Driver',
    });
    console.log(driver)


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : type === "number" ? parseFloat(value) : value,
        });
    };
    const handleVehicleChange = (e) => {
        const { name, value } = e.target;
        setVehicleData({
            ...vehicleData,
            [name]: value,
        });
    };


    useEffect(() => {
        const fetchRides = async () => {
            const token = localStorage.getItem("token")
            const url = ApiConfig.getDriverRidesEndpoint(driver._id, 1, 15);
            console.log("Requesting rides from:", url); // Log the URL for debugging

            // Fetch the data
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            console.log(data)
            setDriverRides(data.totalRides)
        }
        fetchRides()
    }, [])

    const toggleStatus = () => {
        const newStatus = status === 'Block' ? 'Unblock' : 'Block';
        setStatus(newStatus);


    };

    const togglePopup = () => {
        setShowAddMoneyPopup(!showAddMoneyPopup);
    };


    const handleBlockToggle = async () => {
        setLoading(true);
        const token = localStorage.getItem('token'); // Get token from localStorage

        try {
            const response = await fetch(ApiConfig.putBlockStatus(driver._id), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,

                },
                body: JSON.stringify({
                    blockStatus: !driver.blockStatus,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Block status updated:', data);
                setDriver({ ...driver, blockStatus: !driver.blockStatus });
                fetchDriverData();
            } else {
                alert('Failed to update block status. Please try again.');
            }
        } catch (error) {
            //console.error('Error toggling block status:', error);
            alert('An error occurred while updating the block status.');
        } finally {
            setLoading(false);
        }
    };

    const fetchDriverData = async () => {
        try {
            const response = await fetch(ApiConfig.getDriverDetails(driver._id));
            if (response.ok) {
                const data = await response.json();
                console.log("Fetched driver data:", data); // Debugging log
                setDriver(data.user); // Update the state with the updated user data
            } else {
                console.error('Failed to fetch driver data');
            }
        } catch (error) {
            console.error('Error fetching driver data:', error);
        }
    };
    const handleAddMoney = async () => {
        const newAmount = parseFloat(addAmount);
        if (isNaN(newAmount) || newAmount <= 0) {
            alert('Please enter a valid amount.');
            return;
        }

        const postData = {
            userId: driver._id,
            amount: newAmount
        }
        const token = localStorage.getItem('token');
        console.log(postData)
        try {
            const response = await axios.post(ApiConfig.postAddMoneyEndpoint(), postData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
            console.log("response ----")
            console.log(response.data)
            if (response.status == 200) {
                // alert(response.data.message)
                setWalletBalance(walletBalance + newAmount);
            }
            else {
                console.log("failed to add money")
            }
        } catch (error) {
            console.log(error)
        }
        // setWalletBalance(walletBalance + newAmount);
        setAddAmount(0)
        togglePopup()
        setActiveTab('profileSummary')
    }

    const handleViewDocument = () => {
        setPopupOpen(true);
        setDocumentUrls({
            front: driver.adhar_img_front,

            back: driver.adhar_img_back
        });

    };

    const handleClosePopup = () => {
        setPopupOpen(false);
    };


    const handleBackClick = () => {
        if (searchUser) {
            navigate("/Home/searchuser");
        } else {
            navigate(-1)
        }
        // navigate(-1); 
    };
    // Simplify useEffect to only depend on a single source of truth
    useEffect(() => {
        if (driver) {
            setFormData({
                name: driver.name || '',
                phone: driver.phone || '',
                email: driver.email || '',
                address: driver.address || '',
                rating: driver.rating || 0,
                blockStatus: driver.blockStatus || false,
            });
        }
    }, [driver]);

    const handleEditClick = () => {
        setShowEditPopup(true);
        // If `driver` is the source of truth, no need to reset formData again.
    };


    const editDriver = async () => {
        try {
            console.log("edit api called")
            const token = localStorage.getItem("token")
            const response = await axios.put(ApiConfig.putEditDriverDetails(driver._id), formData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log("edit response")
            console.log(response)
            if (response.data.status === 1) {
                setDriver(response.data.data)
                fetchDriverData(); // Optionally refetch driver data from the server
            } else {
                console.error("failed to edit driver")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted with data:", formData); // Check the form data
        console.log(formData);
        editDriver();
        setShowEditPopup(false)
    };
    console.log("driver ID:", driver?._id);
    console.log("Endpoint URL:", ApiConfig.putEditDriverDetails(driver?._id));

    console.log(driver)

    //  Function to close the edit popup without saving changes
    const handleCloseEditPopup = (e) => {
        e.preventDefault();
        setShowEditPopup(false);
    };

    const handleDeleteClick = () => {
        setShowDeletePopup(true); // Open delete confirmation popup

    };
    const handleDeleteConfirm = async () => {
        try {
            // Step 1: Fetch admin login details
            const loginResponse = await fetch('http://ec2-3-110-123-252.ap-south-1.compute.amazonaws.com/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: phoneNumber, // Use admin phone number
                    password: password, // Password entered in the confirmation popup
                }),
            });

            if (!loginResponse.ok) {
                alert('Incorrect phone no or password. Please try again.');
                return;
            }

            const loginData = await loginResponse.json();
            const adminToken = loginData.token;

            // Step 2: Make delete user request
            const deleteResponse = await fetch('http://ec2-3-110-123-252.ap-south-1.compute.amazonaws.com/api/adminpanel/delete-user', {

                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${adminToken}`,
                },
                body: JSON.stringify({
                    userId: driver._id,
                    adminPassword: password,
                    role: driver.role,
                }),
            });

            if (!deleteResponse.ok) {
                const errorData = await deleteResponse.json();
                alert(`Failed to delete user: ${errorData.message}`);
                return;
            }

            alert('User deleted successfully!');
            setShowDeletePopup(false);
            setPassword('');
            navigate('/Home/drivers'); // Redirect after deletion

        } catch (error) {
            console.error('Error deleting user:', error);
            alert('An error occurred while deleting the user. Please try again.');
        }

    };
    const handleCloseDeletePopup = () => {
        console.log('Popup closed');
        setShowDeletePopup(false);
        setPassword('');
    };

    const handleBankdetails = () => {
        if (driver.bankDetails) {
            setShowAddMoneyPopup(true)
            setActiveTab("")

        }
        else {
            alert("The user has not provided their bank details, Money can not be added")
        }
    }

    const handleVehicleSubmit=(e)=>{
        e.preventDefault()
        console.log(vehicleData)
        if(!vehicleData){
            alert("Enter valid data")
            return
        }
        const updateVehicleDetails = async()=>{
            try {
                const token = localStorage.getItem("token")
                const response = await axios.patch(ApiConfig.patchVehicleDetails(driver._id),vehicleData,{
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })

                console.log("update vehicles response")
                console.log(response)
                
            } catch (error) {
                console.log("error",error)
            }
        }
        updateVehicleDetails()

    }


    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title='Drivers Profile' />
            <button
                onClick={handleBackClick}
                className="flex items-center bg-white text-black pl-8 pt-3 whitespace-nowrap"
            >
                <ChevronLeft size={30} style={{ color: "black", minWidth: "20px" }} />
                <h2 className="pl-2 font-bold text-m ">Back</h2>
            </button>
            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8 bg-white'>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-white shadow-lg rounded-lg p-6 text-black"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/*  Profile Image */}
                    <motion.div
                        className="flex justify-center md:justify-start"

                    >
                        <img
                            src={driver.blockStatus ? blockedUser : (driver.profile_img || defaultUser)}
                            alt="Driver"

                            className="w-40 h-45 md:w-40 md:h-40 rounded-full object-cover shadow-md"
                        />

                    </motion.div>

                    {/*  Name, Phone, Email, Address */}
                    <motion.div className="text-center md:text-left space-y-2">

                        <h1 className="text-2xl font-semibold text-gray-800">{driver.name}</h1>

                        <p className="text-gray-600">📞 {driver.phone}</p>
                        <p className="text-gray-600">✉️ {driver.email}</p>
                        {/* <p className="text-gray-600">📍 {driver.address}</p> */}
                        <p className="text-gray-600">🚗 {driverRides || 0} Total Trips</p>
                        <p className="text-gray-600">⭐ {driver.rating} Reviews</p>

                    </motion.div>

                    {/*  Status, Total Trips, Reviews */}
                    <motion.div className="space-y-3">

                        <div className="flex items-center justify-center md:justify-start">
                            <button
                                onClick={() => handleEditClick(true)}
                                className="ml-4 px-3 py-1 bg-yellow-500 text-white my-2 font-semibold rounded hover:bg-yellow-600"
                            >
                                Edit
                            </button>

                            <button
                                onClick={handleBlockToggle}
                                className={`ml-4 px-5 py-1 rounded-full font-semibold text-white ${driver.blockStatus ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                                disabled={loading} // Disable button while API call is in progress
                            >
                                {loading ? 'Processing...' : driver.blockStatus ? 'Unblock' : 'Block'}
                            </button>


                            <button
                                onClick={handleDeleteClick}
                                className="ml-4 px-3 py-1 bg-red-600 text-white my-2 font-semibold rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                            {!driver.blockStatus ? !driver.bankDetails ? (
                                <p className='text-sm m-2 font-semibold text-red-500' >Money can not be added because user did not provided their bank details</p>
                            ) : (
                                <button
                                    onClick={handleBankdetails}
                                    className="ml-4 px-3 py-1 my-2 bg-blue-400 text-white font-semibold rounded hover:bg-blue-700"
                                >
                                    Add Money
                                </button>
                            ) : <p className='text-sm m-2 font-semibold text-red-500' >Money can not be added because user is blocked</p>}

                        </div>
                        <div className="flex items-center justify-center md:justify-start pt-3">
                            <div className="flex w-full flex-col justify-center gap-3 items-start">
                                <div className="bg-white flex w-full flex-wrap flex-row justify-around ">
                                    <h1 className="text-xl font-semibold">Wallet Balance</h1>
                                    {/* <p className="text-xl ">₹{driver.bankDetails ? (driver.bankDetails.balance ? driver.bankDetails.balance : walletBalance) :walletBalance }</p> */}
                                    <p className='text-xl'>₹ {walletBalance || 0} </p>
                                </div>
                                {/* Conditionally Render "Add Money" Button */}
                                <div className="bg-white flex w-full flex-wrap flex-row justify-around ">
                                    <h1 className="text-xl font-semibold">Lock Balance</h1>
                                    <p className="text-xl ">₹{driver.bankDetails ? (driver.bankDetails.lock_amount ? driver.bankDetails.lock_amount : lockBalance) : lockBalance}</p>
                                </div>

                            </div>
                        </div>

                        {/* Edit Confirmation Popup */}
                        {showEditPopup && (
                            <div className="fixed inset-0 flex items-center justify-center text-black bg-gray-900 bg-opacity-50">
                                <div className="bg-white p-6 rounded-lg shadow-md w-80">
                                    <h2 className="text-xl font-semibold mb-4">Edit Driver Details</h2>
                                    {/* <button
            onClick={() => setShowEditPopup(false)}
            className="text-gray-500 hover:text-gray-800 text-xl focus:outline-none"
            >
            &times;
            </button> */}
                                    {/* </div> */}
                                    <form onSubmit={handleSubmit} className="space-y-2 max-h-[80vh] overflow-auto">
                                        <div className="mb-4">
                                            <label className="block text-gray-700">Name:</label>
                                            <input
                                                type="text"
                                                name="name"

                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-2 border border-gray-300 rounded"
                                                placeholder="Enter name"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700">Phone:</label>
                                            <input
                                                type="text"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-2 border border-gray-300 rounded"
                                                placeholder="Enter phone number"
                                                pattern="\d*" // HTML validation for digits only
                                                maxLength={10}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700">Email:</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full p-2 border border-gray-300 rounded"
                                                placeholder="Enter email"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700">Address:</label>
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                className="w-full p-2 border border-gray-300 rounded"
                                                placeholder="Enter address"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700">Rating:</label>
                                            <input
                                                type="number"
                                                name="rating"
                                                value={formData.rating}
                                                onChange={handleChange}
                                                className="w-full p-2 border border-gray-300 rounded"
                                                placeholder="Enter rating"
                                                min="0"
                                                max="5"
                                                step="0.1"
                                            />
                                        </div>
                                        {/* <div className="mb-4">
                    <label className="block text-gray-700">Block Status:</label>
                    <input
                        type="checkbox"
                        name="blockStatus"
                        checked={formData.blockStatus}
                        onChange={handleChange}
                      className="mr-2"
                    />
                    <span>Blocked</span>
                </div> */}
                                        <div className="flex justify-between">
                                            <button
                                                type="Confirm Edit"
                                                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                            >
                                                Confirm Edit
                                            </button>
                                            <button
                                                onClick={handleCloseEditPopup}
                                                className="ml-2 w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        )}

                        {showVehicleEditPopup && (
                            <div className="fixed inset-0 flex items-center justify-center text-black bg-gray-900 bg-opacity-50">
                                <div className="bg-white p-6 rounded-lg shadow-md w-80">
                                    <h2 className="text-xl font-semibold mb-4">Edit vehicle Details</h2>
                                    {/* <button
            onClick={() => setShowEditPopup(false)}
            className="text-gray-500 hover:text-gray-800 text-xl focus:outline-none"
            >
            &times;
            </button> */}
                                    {/* </div> */}
                                    <form onSubmit={handleVehicleSubmit} className="space-y-2 max-h-[80vh] overflow-auto">
                                        <div className="mb-4">
                                            <label className="block text-gray-700">Vehicle nummber:</label>
                                            <input
                                                type="text"
                                                name="vehicleNumber"

                                                value={vehicleData.vehicleNumber}
                                                onChange={handleVehicleChange}
                                                required
                                                className="w-full p-2 border border-gray-300 rounded"
                                                placeholder="Vehicle nummber"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700">License Number:</label>
                                            <input
                                                type="text"
                                                name="licenseNumber"
                                                value={vehicleData.licenseNumber}
                                                onChange={handleVehicleChange}
                                                required
                                                className="w-full p-2 border border-gray-300 rounded"
                                                placeholder="Enter License Number"
                                                pattern="\d*" // HTML validation for digits only
                                                maxLength={10}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700">Driver Type:</label>
                                            <select
                                                name="driverType"
                                                value={vehicleData.driverType}
                                                onChange={handleVehicleChange}
                                                required
                                                className="w-full p-2 border border-gray-300 rounded"
                                            >
                                                <option value="Driver">Driver</option>
                                                <option value="Owner">Owner</option>
                                            </select>
                                        </div>



                                        <div className="flex justify-between">
                                            <button
                                                type="confirm vehicle details"
                                                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                            >
                                                Confirm Edit
                                            </button>
                                            <button
                                                onClick={() => setShowVehicleEditPopup(false)}
                                                className="ml-2 w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        )}

                        {/* Delete Confirmation Popup */}
                        {showDeletePopup && (
                            <div className="fixed inset-0 flex items-center justify-center text-black bg-gray-900 bg-opacity-50 z-50">
                                <div className="bg-white p-6 rounded-lg shadow-md w-80">
                                    <h2 className="text-xl font-semibold mb-4">Please enter your number and password to confirm:</h2>
                                    <input
                                        type="text"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded mb-4"
                                        placeholder="Enter phone number"
                                    />
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

                {showAddMoneyPopup && (
                    <div className="fixed inset-0 flex items-center justify-center text-black bg-gray-900 bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-md w-80">
                            <h2 className="text-xl font-semibold mb-4">Please enter your amount to confirm:</h2>
                            <input
                                type="text"
                                value={addAmount}
                                onChange={(e) => setAddAmount(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mb-4"
                                placeholder="Enter amount"
                            />

                            <button
                                onClick={handleAddMoney}
                                className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                Add amount
                            </button>
                            <button
                                onClick={() => {
                                    togglePopup()
                                    setActiveTab("profileSummary")
                                }}
                                className="mt-2 w-full px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
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
                        <li
                            className={`cursor-pointer py-2 ${activeTab === 'reviewRatings' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-700'}`}
                            onClick={() => setActiveTab('reviewRatings')}
                        >
                            Review & Ratings    
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


                        <div className="p-4 bg-white shadow-lg rounded-lg text-black">
                            <div className='flex items-center justify-between'>
                                <h3 className="text-xl font-bold mb-3">Auto Details</h3>
                                <button
                                    onClick={() => setShowVehicleEditPopup(true)}
                                    className="ml-4 px-3 mx-10 py-1 bg-yellow-500 text-white my-2 font-semibold rounded hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                            </div>
                            <p className="">
                                Driver Type: {driver.vehicleDetails?.driverType || "No Driver Type"}
                            </p>
                            <p className="">
                                Vehicle Number: {driver.vehicleDetails?.Vehicle_number || "No Vehicle Number"}
                            </p>
                            <p>
                                License Number: {driver.vehicleDetails?.license_no || "No license Number"}
                            </p>

                            <div className="flex flex-col">
                                {driver.vehicleDetails?.vehicle_img_front ? (
                                    <img
                                        src={driver.vehicleDetails.vehicle_img_front}
                                        alt="Auto Image Front"
                                        className="w-50 max-w-xs"
                                    />
                                ) : (
                                    <p>Front image not available</p>
                                )}
                                {driver.vehicleDetails?.vehicle_img_back ? (
                                    <img
                                        src={driver.vehicleDetails.vehicle_img_back}
                                        alt="Auto Image Back"
                                        className="w-70 max-w-xs"
                                    />
                                ) : (
                                    <p>Back image not available</p>
                                )}
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
                        <DriverRides driverId={driver._id} />
                        {/* <DriverRides driverId={driver.driverId} /> */}
                    </motion.div>
                )}

                {activeTab === 'transactionHistory' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >

                        <DriverTransactionTable driverId={driver._id} />
                    </motion.div>
                )}



{//reviewRatings
}

{activeTab === 'reviewRatings' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >

                        <DriverReviewRatings driverId={driver._id} />
                    </motion.div>
                )}
            </main>

        </div>
    )
}

export default DriverProfile;