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

  const handleChange = (e) => {
    setCharges({
      ...charges,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(charges);
    alert("Charges updated successfully!");
  };

  return (
    <div className="bg-white flex-1 overflow-auto relative z-10 p-4 text-black">
      <Header title="Charges Management" />

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6 bg-gray-50 p-6 rounded-lg shadow-lg max-w-2xl mx-auto"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            1-10 KM Charge
          </label>
          <input
            type="text"
            name="km_1_10"
            value={charges.km_1_10}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter charge for 1-10 KM"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            10-20 KM Charge
          </label>
          <input
            type="text"
            name="km_10_20"
            value={charges.km_10_20}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter charge for 10-20 KM"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            10-30 KM Charge
          </label>
          <input
            type="text"
            name="km_10_30"
            value={charges.km_10_30}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter charge for 10-30 KM"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Driver Referral Amount
          </label>
          <input
            type="text"
            name="driverReferral"
            value={charges.driverReferral}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount for driver referral"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Passenger Referral Amount
          </label>
          <input
            type="text"
            name="passengerReferral"
            value={charges.passengerReferral}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount for passenger referral"
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Update Charges
          </button>
        </div>
      </form>

      <div className="mt-10 p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
        <h2 className="text-lg font-bold mb-4 text-center">Updated Charges</h2>
        <ul className="space-y-2">
          <li className="text-gray-700"><strong>1-10 KM Charge:</strong> {charges.km_1_10 || 'Not updated'}</li>
          <li className="text-gray-700"><strong>10-20 KM Charge:</strong> {charges.km_10_20 || 'Not updated'}</li>
          <li className="text-gray-700"><strong>10-30 KM Charge:</strong> {charges.km_10_30 || 'Not updated'}</li>
          <li className="text-gray-700"><strong>Driver Referral Amount:</strong> {charges.driverReferral || 'Not updated'}</li>
          <li className="text-gray-700"><strong>Passenger Referral Amount:</strong> {charges.passengerReferral || 'Not updated'}</li>
        </ul>
      </div>
    </div>
  );
}

export default Charges;
