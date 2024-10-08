// import React, { useState } from 'react';
// import Header from "../components/common/Header";
// import StatCard from "../components/common/StatCard";
// import { Car, User } from 'lucide-react';
// import { motion } from 'framer-motion';
// import ApiConfig from '../Consants/ApiConfig';

// function Charges() {
//   const [charges, setCharges] = useState({
//     km_1_10: '',
//     km_10_20: '',
//     km_10_30: '',
//     driverReferral: '',
//     passengerReferral: ''
//   });

//   const [showPopup, setShowPopup] = useState(false); 

//   const handleChange = (e) => {
//     setCharges({
//       ...charges,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(charges);
//     setShowPopup(true); 

//     setTimeout(() => {
//       setShowPopup(false);
//     }, 3000);
//   };

//   return (
//     <div className="bg-white flex-1 overflow-auto relative z-10 text-black">
//       <Header title="Charges Management" />
//       <motion.div
//         className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 mb-12 mt-10 mx-3"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//       >
//         <StatCard name="1-10 KM Charge" icon={Car} value={charges.km_1_10} color="#6366F1" />
//         <StatCard name="10-20 KM Charge" icon={Car} value={charges.km_10_20} color="#8B5CF6" />
//         <StatCard name="20-30 KM Charge" icon={Car} value={charges.km_10_30} color="#8B5CF6" />
//         <StatCard name="Driver Referral" icon={User} value={charges.driverReferral} color="#EF4444" />
//         <StatCard name="Passenger Referral" icon={User} value={charges.passengerReferral} color="#EF4444" />
//       </motion.div>

//       <form
//         onSubmit={handleSubmit}
//         className="mt-9 space-y-6 bg-white p-6 rounded-lg shadow-2xl max-w-full mx-auto text-lg"
//       >
//         <h2 className="text-xl font-bold mb-6 text-center">Travel Fair</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               1-10 KM Charge
//             </label>
//             <input
//               type="text"
//               name="km_1_10"
//               value={charges.km_1_10}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
//               placeholder="Enter charge "
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               10-20 KM Charge
//             </label>
//             <input
//               type="text"
//               name="km_10_20"
//               value={charges.km_10_20}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
//               placeholder="Enter charge "
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               10-30 KM Charge
//             </label>
//             <input
//               type="text"
//               name="km_10_30"
//               value={charges.km_10_30}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
//               placeholder="Enter charge "
//               required
//             />
//           </div>
//         </div>

//         <h2 className="text-xl font-bold mb-4 text-center mt-5">Referral Amount</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Driver Referral Amount
//             </label>
//             <input
//               type="text"
//               name="driverReferral"
//               value={charges.driverReferral}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
//               placeholder="Enter amount "
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Passenger Referral Amount
//             </label>
//             <input
//               type="text"
//               name="passengerReferral"
//               value={charges.passengerReferral}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
//               placeholder="Enter amount "
//               required
//             />
//           </div>
//         </div>

//         <div className="flex justify-center">
//           <button
//             type="submit"
//             className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg shadow hover:bg-red-600 transition duration-300 ease-in-out"
//           >
//             Update Charges
//           </button>
//         </div>
//       </form>

//       {showPopup && (
//         <div className="fixed top-4 right-4 p-4 bg-green-500 text-white rounded-lg shadow-lg transition-opacity duration-500 ease-in-out">
//           Charges updated successfully!
//         </div>
//       )}
//     </div>
//   );
// }

// export default Charges;



import React, { useState, useEffect } from 'react';
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { Car, User } from 'lucide-react';
import { motion } from 'framer-motion';
import ApiConfig from '../Consants/ApiConfig'; // Make sure the ApiConfig has BASE_URL defined

function Charges() {
  const [charges, setCharges] = useState({
    km_1_10: '',
    km_10_20: '',
    km_10_30: '',
    driverReferral: '',
    passengerReferral: ''
  });

  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error state

  // API Endpoints
  const getChargesEndpoint = `${ApiConfig.BASE_URL}/api/Charges`;
  const putChargesEndpoint = `${ApiConfig.BASE_URL}/api/Charges`;

  // Fetch charges when component mounts
  useEffect(() => {
    const fetchCharges = async () => {
      try {
        setLoading(true);
        const response = await fetch(getChargesEndpoint);
        if (!response.ok) throw new Error('Failed to fetch charges');
        const data = await response.json();
        setCharges({
          km_1_10: data.km_1_10,
          km_10_20: data.km_10_20,
          km_10_30: data.km_10_30,
          driverReferral: data.driverReferral,
          passengerReferral: data.passengerReferral,
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCharges();
  }, [getChargesEndpoint]);

  const handleChange = (e) => {
    setCharges({
      ...charges,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(putChargesEndpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(charges)
      });

      if (!response.ok) throw new Error('Failed to update charges');
      
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white flex-1 overflow-auto relative z-10 text-black">
      <Header title="Charges Management" />

      {loading ? (
        <div className="text-center text-lg font-bold">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 font-bold">Error: {error}</div>
      ) : (
        <>
          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 mb-12 mt-10 mx-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <StatCard name="1-10 KM Charge" icon={Car} value={charges.km_1_10} color="#6366F1" />
            <StatCard name="10-20 KM Charge" icon={Car} value={charges.km_10_20} color="#8B5CF6" />
            <StatCard name="20-30 KM Charge" icon={Car} value={charges.km_10_30} color="#8B5CF6" />
            <StatCard name="Driver Referral" icon={User} value={charges.driverReferral} color="#EF4444" />
            <StatCard name="Passenger Referral" icon={User} value={charges.passengerReferral} color="#EF4444" />
          </motion.div>

          <form
            onSubmit={handleSubmit}
            className="mt-9 space-y-6 bg-white p-6 rounded-lg shadow-2xl max-w-full mx-auto text-lg"
          >
            <h2 className="text-xl font-bold mb-6 text-center">Travel Fair</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  1-10 KM Charge
                </label>
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
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  10-20 KM Charge
                </label>
                <input
                  type="text"
                  name="km_10_20"
                  value={charges.km_10_20}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                  placeholder="Enter charge"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  10-30 KM Charge
                </label>
                <input
                  type="text"
                  name="km_10_30"
                  value={charges.km_10_30}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                  placeholder="Enter charge"
                  required
                />
              </div>
            </div>

            <h2 className="text-xl font-bold mb-4 text-center mt-5">Referral Amount</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Driver Referral Amount
                </label>
                <input
                  type="text"
                  name="driverReferral"
                  value={charges.driverReferral}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                  placeholder="Enter amount"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Passenger Referral Amount
                </label>
                <input
                  type="text"
                  name="passengerReferral"
                  value={charges.passengerReferral}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                  placeholder="Enter amount"
                  required
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg shadow hover:bg-red-600 transition duration-300 ease-in-out"
              >
                Update Charges
              </button>
            </div>
          </form>
        </>
      )}

      {showPopup && (
        <div className="fixed top-4 right-4 p-4 bg-green-500 text-white rounded-lg shadow-lg transition-opacity duration-500 ease-in-out">
          Charges updated successfully!
        </div>
      )}
    </div>
  );
}

export default Charges;
