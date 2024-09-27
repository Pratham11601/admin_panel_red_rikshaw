import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, File, FileMinus } from "lucide-react";
import UserCard from "./UserCard";
import ApiConfig from '../../Consants/ApiConfig'


const UsersTable = () => {
  const [driverData,setDriverData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc'); 
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(driverData.length / itemsPerPage);

  useEffect(() => {
    const fetchDrivers = async () => {
        try {
          fetch(ApiConfig.getDriversEndpoint())
            .then((response) => response.json())
            .then((data) => {
              
              
            const Drivers = data.data; 
            if (Array.isArray(Drivers)) {
              setDriverData(Drivers);
            } else {
                console.error('Failed to fetch Rides Data');
            }
          })
        } catch (error) {
            console.error('Error fetching Rides Data', error);
        }
    };

    fetchDrivers();
        

}, []);

  const filteredData = driverData
  .filter((record) => {
      
      const name = record.name ? record.name.toLowerCase() : '';
      const vehicleNo = record.vehicleNo ? record.vehicle_number.toLowerCase() : '';
      return (
          name.includes(searchTerm.toLowerCase()) ||
          vehicleNo.includes(searchTerm.toLowerCase())
      );
  })
  .sort((a, b) => {
      // Sort by selected field and order
      if (sortOrder === 'asc') {
          return a[sortField] > b[sortField] ? 1 : -1;
      } else {
          return a[sortField] < b[sortField] ? 1 : -1;
      }
});
const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
};
const handleSortChange = (e) => {
    setSortField(e.target.value);
    setCurrentPage(1); // Reset to first page when sorting changes
};
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );



  return (
    <motion.div
      className="bg-white bg-opacity-50 backdrop-blur-md shadow-xl rounded-xl p-6 border-r border-red-400 w-full max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <h2 className="text-xl font-semibold text-black">Riders</h2>
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search users..."
            className="bg-white text-black placeholder-black rounded-lg pl-10 pr-4 py-2 w-full border "
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Search className="absolute right-5 top-2.5 text-black" size={18} />
        </div>
      </div>

      {/* Sort Dropdown */}
      <div className="mb-4">
        <label htmlFor="sort" className="text-black mr-2">Sort By:</label>
        <select
          id="sort"
          value={sortField}
          onChange={handleSortChange}
          className="bg-white text-black rounded-lg px-4 py-2 border"
        >
          <option value="recent">Recent</option>
          <option value="name">Name</option>
          <option value="vehicleNo">Vehicle Number</option>
          {/* <option value="rating">Rating</option> */}
        </select>
      </div>

      {/* Table */}
      <motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-10'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
          {filteredData.map((driver,index) => (
          <UserCard 
            key={driver.id}
            name={driver.name}
            phoneNumber={driver.phoneNumber}
            vehicleNo={driver.vehicle_number}
            status={driver.status}
            // role={driver.role}
          />
        ))}
      </motion.div>


      {/* pagination controls */}
      <div className="flex justify-center items-center space-x-4 mt-6">

         <nav aria-label="Page navigation" className="mb-2 sm:mb-0">
          <ul className="flex space-x-2">
            <li>
              <button
                className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === 1 ? "bg-transparent text-black cursor-not-allowed" : "bg-white text-black hover:bg-gray-600"}`}
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                aria-label="Previous Page"
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <button
                  className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-white text-black hover:bg-gray-600"}`}
                  onClick={handleNextPage}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === totalPages ? "bg-transparent text-black cursor-not-allowed" : "bg-white text-black hover:bg-gray-600"}`}
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                aria-label="Next Page"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
        </div>
    </motion.div>
  );
};

export default UsersTable;
