

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { Car, User } from 'lucide-react';
import { motion } from 'framer-motion';
import ApiConfig from '../Consants/ApiConfig';

function Charges() {
  const [charges, setCharges] = useState({
    day_km_1_to_1_5: '0',
    day_km_1_5_plus: '0',
    night_km_1_to_1_5: '0',
    night_km_1_5_plus: '0',
    perRideCharges: '0',
    platform_fee: '0',
    driverReferral: '0',
    passengerReferral: '0',
    joining_bonus_driver: '0',
    joining_bonus_passenger: '0',
    waiting_charge: '0',
    cancellation_Charges: '0'
  });

  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCharges();
  }, []);

  const fetchCharges = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User is not authenticated. Please log in.');
        return;
      }

      const response = await axios.get(ApiConfig.getChargesEndpoint(), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data && response.data.data) {
        const chargesData = response.data.data;
        setCharges({
          day_km_1_to_1_5: chargesData.oneToOneAndHalf || '0',
          day_km_1_5_plus: chargesData.oneAndHalfPlus || '0',
          night_km_1_to_1_5: chargesData.night_oneToOneAndHalf || '0',
          night_km_1_5_plus: chargesData.night_oneAndHalfPlus || '0',
          perRideCharges: chargesData.perRideCharges || '0',
          platform_fee: chargesData.platform_fee || '0',
          driverReferral: chargesData.driver_refferal || '0',
          passengerReferral: chargesData.passenger_refferal || '0',
          joining_bonus_driver: chargesData.driver_joining_amount || '0',
          joining_bonus_passenger: chargesData.passenger_joining_amount || '0',
          waiting_charge: chargesData.waitingCharges || '0',
          cancellation_Charges: chargesData.cancellationCharges || '0'
        });
      } else {
        setError('Unexpected response structure from the API.');
      }
    } catch (error) {
      console.error("Error fetching charges: ", error);
      setError(`Failed to fetch charges. ${error.message}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Check if the value is a positive number
    if (value === '' || /^[0-9]+(\.[0-9]+)?$/.test(value)) {
      setCharges({
        ...charges,
        [name]: value
      });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const requestBody = {
      oneToOneAndHalf: charges.day_km_1_to_1_5,
      oneAndHalfPlus: charges.day_km_1_5_plus,
      passenger_joining_amount: charges.joining_bonus_passenger,
      driver_joining_amount: charges.joining_bonus_driver,
      passenger_refferal: charges.passengerReferral,
      driver_refferal: charges.driverReferral,
      perRideCharges: charges.perRideCharges,
      cancellationCharges: charges.cancellation_Charges,
      waitingCharges: charges.waiting_charge,
      platform_fee: charges.platform_fee
    };

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(ApiConfig.putChargesEndpoint(), requestBody, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log("Update response: ", response.data);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'An unknown error occurred';
      console.error("Error updating charges: ", errorMsg);
      setError(`Failed to update charges: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
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
          <StatCard name="Per Ride Driver Charge" icon={User} value={`₹${charges.perRideCharges}`} color="#EF4444" />
          <StatCard name="Platform Fee" icon={User} value={`₹${charges.platform_fee}`} color="#EF4444" />
          <StatCard name="Cancellation Charges" icon={User} value={`₹${charges.cancellation_Charges}`} color="#F59E0B" />
          <StatCard name="Waiting charges" icon={User} value={`${charges.waiting_charge}`} color="#6B7280" />
        </motion.div>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <div className="mt-6 mx-3 p-6 bg-white shadow-2xl rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-start">Updated Charges</h2>
          <table className="w-full text-lg">
            <thead>
              <tr className="bg-gray-300">
                <th className="text-left py-2 px-4">Charge Type</th>
                <th className="text-left py-2 px-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(charges).map((key) => (
                <tr className="border-b" key={key}>
                    <td className="py-2 px-4">
                      {key
                        .replace(/_/g, ' ') 
                        .replace(/1 5/g, '1.5') 
                        .replace(/\b\w/g, (c) => c.toUpperCase())} 
                    </td>
                  <td className="py-2 px-4">
                    {key === 'waiting_time' ? `${charges[key]} min` : `₹${charges[key]}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <form onSubmit={handleSubmit} className="mt-9 space-y-6 bg-white p-6 rounded-lg max-w-full mx-auto text-xl">
          <h2 className="text-xl font-bold mb-6 text-start">Travel Fair Charges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {Object.entries(charges).map(([key, value]) => (
              <div key={key}>
               <label className="block text-gray-700 text-lg font-bold mb-2">
                    {key
                      .replace(/_/g, ' ')
                      .replace(/1 5/g, '1.5') 
                      .replace(/\b\w/g, (c) => c.toUpperCase())} 
                  </label>

                <input
                  type="number"
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                  placeholder={`Enter ${key.replace(/_/g, ' ')}`}
                  required
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg shadow hover:bg-red-600 transition duration-300 ease-in-out"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Charges'}
            </button>
          </div>
        </form>

        {showPopup && (
          <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-lg">
            Charges updated successfully!
          </div>
        )}
      </div>
    </>
  );
}

export default Charges;
