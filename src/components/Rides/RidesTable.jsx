import React, { useState, useEffect } from 'react';
import ApiConfig from '../../Consants/ApiConfig';
import { motion } from "framer-motion";
import { Search, Trash2, ArrowDownUp } from "lucide-react";

const RideTable = () => {
  const [ridesData, setRidesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState('status');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(ridesData.length / itemsPerPage);

  // Search functionality
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1); // Reset to first page on new search
  };

  // Sort field change
  const handleSortChange = (e) => {
    setSortField(e.target.value);
    setCurrentPage(1); // Reset to first page on sort change
  };

  // Toggle sort order (asc/desc)
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Fetch ride data
  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await fetch(ApiConfig.getAllRidesEndpoint());
        const data = await response.json();
        const Rides = data.data;

        if (Array.isArray(Rides)) {
          setRidesData(Rides);
        } else {
          console.error('Failed to fetch Rides Data');
        }
      } catch (error) {
        console.error('Error fetching privacy policies:', error);
      }
    };

    fetchRides();
  }, [sortField,searchTerm]);

  // Filter and sort ride data based on search and sort conditions
  const filteredData = ridesData
    .filter((record) => {
      const status = record.status ? record.status.toLowerCase() : '';
      const driver = record.driverId ? record.driverId.toLowerCase() : '';
      const passenger = record.passengerID ? record.passengerID.toLowerCase() : '';

      return (
        status.includes(searchTerm.toLowerCase()) ||
        driver.includes(searchTerm.toLowerCase()) ||
        passenger.includes(searchTerm.toLowerCase())
      );
    })
    .sort((a, b) => {
      
        
        if (sortField === "status-completed") {
          return b.status - a.status; // Completed first
        }
        if (sortField === "status-pending") {
          return a.status === "Pending" ? -1 : 1; // Pending first
        }
        if (sortField === "status-ongoing") {
          return a.status === "Ongoing" ? -1 : 1; // Cancelled first
        }
        return b[field].localeCompare(a[field]);
    


    });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  // Page change handler
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <motion.div
      className="bg-white bg-opacity-50 backdrop-blur-md shadow-xl rounded-xl p-6 border-r border-red-400 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-black">Ride List</h2>
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search rides..."
            className="bg-white text-black placeholder-black rounded-lg pl-10 pr-4 py-2 focus:outline-none border w-full"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Search className="absolute left-3 top-2.5 text-black" size={18} />
        </div>
      </div>

      {/* Sort Dropdown */}
      <div className="mb-4 flex items-center">
        <label htmlFor="sort" className="text-black mr-2">
          Sort By:
        </label>
        <select
          id="sort"
          value={sortField}
          onChange={handleSortChange}
          className="bg-white text-black rounded-lg px-4 py-2 border"
        >
          <option value="status-completed"> Completed</option>
          <option value="status-pending"> Pending</option>
          <option value="status-ongoing"> Ongoing</option>
        </select>
        <button onClick={toggleSortOrder} className="ml-4 p-2 bg-gray-200 rounded-lg hover:bg-gray-300">
          <ArrowDownUp className="text-black" size={18} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              {["Ride No", "Passenger", "Driver", "Total Cost", "Status", "Actions"].map((header) => (
                <th key={header} className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-black">
            {currentItems.map((ride) => (
              <motion.tr key={ride._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">{ride._id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{ride.passengerID}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{ride.driverId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{ride.totalCost && `$${ride.totalCost.toFixed(2)}`}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      ride.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : ride.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {ride.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                  <button className="text-indigo-400 hover:text-indigo-300 mr-2">View</button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Navigation */}
      <nav aria-label="Page navigation" className="mb-2 sm:mb-0 mt-4">
        <ul className="flex space-x-2">
          <li>
            <button
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                currentPage === 1 ? "bg-transparent text-black cursor-not-allowed" : "bg-white text-black hover:bg-gray-600"
              }`}
              onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous Page"
            >
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index}>
              <button
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-white text-black hover:bg-gray-600"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                currentPage === totalPages ? "bg-transparent text-black cursor-not-allowed" : "bg-white text-black hover:bg-gray-600"
              }`}
              onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next Page"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </motion.div>
  );
};

export default RideTable;
