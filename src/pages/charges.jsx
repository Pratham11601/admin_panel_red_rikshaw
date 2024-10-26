import React, { useState } from 'react';
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { Car, User } from 'lucide-react';
import { motion } from 'framer-motion';

function Charges() {
  const [charges, setCharges] = useState({
    km_0_1_5: '37', 
    km_1_5_plus: '16', 
    per_ride_driver: '3',
    per_ride_passenger: '2',
    platform_fee: '5',
    driverReferral: '50',
    passengerReferral: '30',
    joining_bonus_driver: '51',
    joining_bonus_passenger: '51',
    waiting_threshold: '10', 
    waiting_charge: '7' 
  });

  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    setCharges({
      ...charges,
      [e.target.name]: e.target.value
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      console.log("Updated Charges: ", charges);
      setShowPopup(true);
      setLoading(false);
      setTimeout(() => setShowPopup(false), 3000);
    }, 1000);
  };

  return (
    <>
      <div className="bg-white flex-1 overflow-auto relative z-10 text-black">
        <Header title="Charges Management" />
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-12 mt-10 mx-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          
          <StatCard name="0-1.5 KM Charge" icon={Car} value={`₹${charges.km_0_1_5}`} color="#8B5CF6" />
          <StatCard name="1.5+ KM Charge" icon={Car} value={`₹${charges.km_1_5_plus}`} color="#34D399" />
          <StatCard name="Per Ride Driver Charge" icon={User} value={`₹${charges.per_ride_driver}`} color="#EF4444" />
          <StatCard name="Platform Fee" icon={User} value={`₹${charges.platform_fee}`} color="#EF4444" />
        </motion.div>

       
        <div className="flex justify-between items-center mb-6 mx-3">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500 w-full md:w-1/2"
            placeholder="Search..."
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="ml-4 px-6 py-2 bg-red-500 text-white font-bold rounded-lg shadow hover:bg-red-600 transition duration-300 ease-in-out"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Charges'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-9 space-y-6 bg-white p-6 rounded-lg max-w-full mx-auto text-lg">
          <h2 className="text-xl font-bold mb-6 text-start">Travel Fair Charges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {/* Charge Fields */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">0-1.5 KM Charge</label>
              <input
                type="text"
                name="km_0_1_5"
                value={charges.km_0_1_5}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                placeholder="Enter charge"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">1.5+ KM Charge</label>
              <input
                type="text"
                name="km_1_5_plus"
                value={charges.km_1_5_plus}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                placeholder="Enter charge"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Platform Fee</label>
              <input
                type="text"
                name="platform_fee"
                value={charges.platform_fee}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                placeholder="Enter platform fee"
                required
              />
            </div>
          </div>

          <h2 className="text-xl font-bold mb-4 text-start mt-5">Waiting Charges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Waiting Time (in minutes)</label>
              <input
                type="text"
                name="waiting_threshold"
                value={charges.waiting_threshold}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                placeholder="Enter wait time (in min)"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Charge After Waiting Time</label>
              <input
                type="text"
                name="waiting_charge"
                value={charges.waiting_charge}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                placeholder="Enter waiting charge"
                required
              />
            </div>
          </div>

          <h2 className="text-xl font-bold mb-4 text-start mt-5">Referral Rewards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Driver Referral Reward</label>
              <input
                type="text"
                name="driverReferral"
                value={charges.driverReferral}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                placeholder="Enter driver referral reward"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Passenger Referral Reward</label>
              <input
                type="text"
                name="passengerReferral"
                value={charges.passengerReferral}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                placeholder="Enter passenger referral reward"
                required
              />
            </div>
          </div>

          <h2 className="text-xl font-bold mb-4 text-start mt-5">Joining Bonuses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Joining Bonus for Driver</label>
              <input
                type="text"
                name="joining_bonus_driver"
                value={charges.joining_bonus_driver}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                placeholder="Enter driver joining bonus"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Joining Bonus for Passenger</label>
              <input
                type="text"
                name="joining_bonus_passenger"
                value={charges.joining_bonus_passenger}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                placeholder="Enter passenger joining bonus"
                required
              />
            </div>
          </div>
        </form>

        {/* new card  updated charges*/}
        <div className="mt-6 mx-3 p-6 bg-white shadow-2xl rounded-lg ">
  <h2 className="text-xl font-bold mb-4 text-start">Updated Charges</h2>
  <table className="w-full">
    <thead>
      <tr className="bg-gray-300">
        <th className="text-left py-2 px-4">Charge Type</th>
        <th className="text-left py-2 px-4">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b">
        <td className="py-2 px-4">0-1.5 KM Charge</td>
        <td className="py-2 px-4">₹{charges.km_0_1_5}</td>
      </tr>
      <tr className="border-b">
        <td className="py-2 px-4">1.5+ KM Charge</td>
        <td className="py-2 px-4">₹{charges.km_1_5_plus}</td>
      </tr>
      <tr className="border-b">
        <td className="py-2 px-4">Platform Fee</td>
        <td className="py-2 px-4">₹{charges.platform_fee}</td>
      </tr>
      <tr className="border-b">
        <td className="py-2 px-4">Waiting Charge</td>
        <td className="py-2 px-4">₹{charges.waiting_charge}</td>
      </tr>
      <tr className="border-b">
        <td className="py-2 px-4">Driver Referral Reward</td>
        <td className="py-2 px-4">₹{charges.driverReferral}</td>
      </tr>
      <tr className="border-b">
        <td className="py-2 px-4">Passenger Referral Reward</td>
        <td className="py-2 px-4">₹{charges.passengerReferral}</td>
      </tr>
      
    </tbody>
  </table>
</div>


        {showPopup && (
          <div className="fixed top-4 right-4 p-4 bg-green-500 text-white rounded-lg shadow-lg transition-opacity duration-500 ease-in-out">
            Charges updated successfully!
          </div>
        )}
      </div>
    </>
  );
}

export default Charges;
