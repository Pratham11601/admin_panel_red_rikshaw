import React, { useState } from 'react';
import Header from "../components/common/Header";

function Charges() {
  const [charges, setCharges] = useState({
    km_1_10: '',
    km_10_20: '',
    km_10_30: '',
    driverReferral: '',
    passengerReferral: ''
  });

  const [showPopup, setShowPopup] = useState(false); 

  const handleChange = (e) => {
    setCharges({
      ...charges,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(charges);
    setShowPopup(true); 

    setTimeout(() => {
      setShowPopup(false);
    }, 3000);  //3sec
  };

  return (
    <div className="bg-white flex-1 overflow-auto relative z-10  text-black">
      <Header title="Charges Management" />

      <form
        onSubmit={handleSubmit}
        className="mt-9 space-y-6 bg-white p-6 rounded-lg shadow-2xl max-w-2xl mx-auto text-lg"
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
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter charge for 1-10 KM"
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
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter charge for 10-20 KM"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              20-30 KM Charge
            </label>
            <input
              type="text"
              name="km_10_30"
              value={charges.km_10_30}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter charge for 20-30 KM"
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
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter amount for driver referral"
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
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter amount for passenger referral"
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

      {/* Popup Notification */}
      {showPopup && (
        <div className="fixed top-4 right-4 p-4 bg-green-500 text-white rounded-lg shadow-lg transition-opacity duration-500 ease-in-out">
          Charges updated successfully!
        </div>
      )}
    </div>
  );
}

export default Charges;
