import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ArrowDownUp } from "lucide-react";
import UserCard from "./UserCard";
import ApiConfig from '../../Consants/ApiConfig';
import { FadeLoader } from "react-spinners";
import { ShimmerCategoryItem } from "react-shimmer-effects";
import usernotfound from '../../assets/usernotfound2.jpg';
import fetchWithToken from '../../utils/fetchWithToken'; 

const UsersTable = () => {
  const [driverData, setDriverData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(driverData.length / itemsPerPage);
  const maxRetries = 3; // Maximum number of retry attempts
  const retryDelay = 1000; // Delay between retries (in milliseconds)

  // Retry function
  const retryFetch = async (url, retries, delay) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (retries > 0) {
        console.warn(`Retrying fetch... Attempts left: ${retries}`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return retryFetch(url, retries - 1, delay);
      } else {
        throw error;
      }
    }
  };

  useEffect(() => {
    const fetchDrivers = async () => {
      setIsLoading(true);
      try {
        const data = await fetchWithToken(ApiConfig.getDriversEndpoint());
        const Drivers = data.data;
        setIsLoading(false);
        if (Array.isArray(Drivers)) {
          setDriverData(Drivers);
        } else {
          console.error("Failed to fetch Drivers Data");
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching Drivers Data", error);
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
      if (sortOrder === "asc") {
        return a[sortField] > b[sortField] ? 1 : -1;
      } else {
        return a[sortField] < b[sortField] ? 1 : -1;
      }
    });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
// Page change handler
const handlePageChange = (page) => {
  setCurrentPage(page);
};
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };

  const handleSortChange = (e) => {
    setSortField(e.target.value);
    setCurrentPage(1); 
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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.filter((_, index) => index >= startIndex && index < endIndex);

  return (
    <motion.div
      className="bg-white bg-opacity-50 backdrop-blur-md shadow-xl rounded-xl p-6 border-r border-red-400 w-full max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
                <h2 className="text-xl font-semibold text-black">Drivers</h2>
                
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
              <div className="mb-4 flex item-center justify-left">
                <label htmlFor="sort" className="text-black mr-2">Sort By:</label>
                <select
                  id="sort"
                  value={sortField}
                  onChange={handleSortChange}
                  className="bg-white text-black rounded-lg px-4 py-2 border"
                >
                  <option value="name">Name</option>
                  <option value="vehicleNo">Vehicle Number</option>
                  <option value="rating">Rating</option>
                </select>
                <button onClick={toggleSortOrder} className="flex items-center text-black">
                  
                    {sortOrder === 'asc' ? <ArrowDownUp /> : <ArrowDownUp />}
                </button>
              </div>


      {/* Other JSX code */}
      {isLoading ? (
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {Array.from({ length: 12 }).map(() => (
            <div className="p-3 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
              <ShimmerCategoryItem
                height={150}
                rounded
                hasImage
                imageType="circular"
                imageWidth={60}
                imageHeight={60}
                text
                cta
              />
            </div>
          ))}
        </motion.div>
      ) : (
        <div>
          {filteredData.length === 0 ? (
            <div className="text-black flex flex-col justify-center items-center ">
              <img src={usernotfound} alt="" className="w-80 h-80" />
              <h1 className="text-lg font-semibold text-gray-600">User Not Found...</h1>
            </div>
          ) : (
            <div className="Drivercards">
              {/* Table */}
              <motion.div
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                {currentData.map((driver, index) => (
                  <UserCard key={driver.id} driver={driver} />
                ))}
              </motion.div>

              {/* Pagination controls */}
              <div className="flex justify-center items-center space-x-4 mt-6">
                <nav aria-label="Page navigation" className="mb-2 sm:mb-0">
                  <ul className="flex space-x-2">
                    <li>
                      <button
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          currentPage === 1
                            ? "bg-transparent text-black cursor-not-allowed"
                            : "bg-white text-black hover:bg-gray-600"
                        }`}
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
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}

                   

                    <li>
                      <button
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          currentPage === totalPages
                            ? "bg-transparent text-black cursor-not-allowed"
                            : "bg-white text-black hover:bg-gray-600"
                        }`}
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
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default UsersTable;
