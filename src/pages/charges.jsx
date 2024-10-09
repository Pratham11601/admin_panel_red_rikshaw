import React, { useState } from 'react';
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { Car, User } from 'lucide-react';
import { motion } from 'framer-motion';

function Charges() {
  const [charges, setCharges] = useState({
    km_1_5: '5',
    km_1_10: '10',
    km_10_plus: '15',
    discount_1_5_10: '5',
    discount_10_plus: '10',
    per_ride_driver: '3',
    per_ride_passenger: '2',
    driverReferral: '50',
    passengerReferral: '30'
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
    <div className="bg-white flex-1 overflow-auto relative z-10 text-black">
      <Header title="Charges Management" />
      <motion.div
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-12 mt-10 mx-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Stat Cards Displaying Updated Fields */}
        <StatCard name="10+ KM Charge" icon={Car} value={charges.km_10_plus} color="#8B5CF6" />
        <StatCard name="10+ KM Discount %" icon={Car} value={charges.discount_10_plus} color="#34D399" />
        <StatCard name="Per Ride Driver Charge" icon={User} value={charges.per_ride_driver} color="#EF4444" />
        <StatCard name="Per Ride Passenger Charge" icon={User} value={charges.per_ride_passenger} color="#EF4444" />
      </motion.div>

      {/* Search Bar and Update Button */}
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
      <h2 className="text-xl font-bold mb-6 text-center">Travel Fair Charges</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
  {/* Charge Fields */}
  <div>
    <label className="block text-gray-700 text-sm font-bold mb-2">1-5 KM Charge</label>
    <input
      type="text"
      name="km_1_5"
      value={charges.km_1_5}
      onChange={handleChange}
      className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
      placeholder="Enter charge"
      required
    />
  </div>

  <div>
    <label className="block text-gray-700 text-sm font-bold mb-2">1-10 KM Charge</label>
    <input
      type="text"
      name="km_1_10"
      value={charges.km_1_10}
      onChange={handleChange}
      className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
      placeholder="Enter charge"
      required
    />
  </div>

  <div>
    <label className="block text-gray-700 text-sm font-bold mb-2">10+ KM Charge</label>
    <input
      type="text"
      name="km_10_plus"
      value={charges.km_10_plus}
      onChange={handleChange}
      className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
      placeholder="Enter charge"
      required
    />
  </div>
</div>


        <h2 className="text-xl font-bold mb-4 text-center mt-5">Discounts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Discount Fields */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">1.5-10 KM Discount %</label>
            <input
              type="text"
              name="discount_1_5_10"
              value={charges.discount_1_5_10}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="Enter discount"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">10+ KM Discount %</label>
            <input
              type="text"
              name="discount_10_plus"
              value={charges.discount_10_plus}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="Enter discount"
              required
            />
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4 text-center mt-5">Per Ride Charges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Per Ride Charge Fields */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Per Ride Driver Charge</label>
            <input
              type="text"
              name="per_ride_driver"
              value={charges.per_ride_driver}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="Enter charge"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Per Ride Passenger Charge</label>
            <input
              type="text"
              name="per_ride_passenger"
              value={charges.per_ride_passenger}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="Enter charge"
              required
            />
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4 text-center mt-5">Referral Rewards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Referral Fields */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Driver Referral Reward</label>
            <input
              type="text"
              name="driverReferral"
              value={charges.driverReferral}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="Enter reward"
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
              placeholder="Enter reward"
              required
            />
          </div>
        </div>

      </form>

      {showPopup && (
        <div className="fixed top-4 right-4 p-4 bg-green-500 text-white rounded-lg shadow-lg transition-opacity duration-500 ease-in-out">
          Charges updated successfully!
        </div>
      )}
    </div>
  );
}

export default Charges;
