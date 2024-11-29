import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ArrowDownUp } from "lucide-react";
import UserCard from "./PassengerCard";
import ApiConfig from '../../Consants/ApiConfig';
import { ShimmerCategoryItem } from "react-shimmer-effects";
import usernotfound from '../../assets/usernotfound2.jpg';
import StatCard from "../common/StatCard";
import { Users, PlusCircle, CheckCircle, XCircle } from 'lucide-react';
import fetchWithToken from '../../utils/fetchWithToken';

const PassengerTable = () => {
  const [passengerData, setPassengerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  //const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  // const totalPages = Math.ceil(passengerData.length / itemsPerPage);
  // const maxRetries = 3;  // Max number of retries for failed requests
  const [stats, setStats] = useState({
    totalPassengers: 0,
    newPassengersCount: 0,
  });
  const itemsPerPage = 12; // Match API limit but here is take 2 extra data for match UI
  const maxRetries = 3;  

  const totalPages = Math.ceil(stats.totalPassengers / itemsPerPage);


  // Fetch passengers data from API
  useEffect(() => {
    const fetchPassengers = async (retryCount = 0) => {
      try {
        const response = await fetchWithToken(
          `${ApiConfig.getPassengersEndpoint()}?page=${currentPage}&itemsPerPage=${itemsPerPage}&sortBy=${sortField}&sortOrder=${sortOrder}`,
        {
          method: 'GET',
        });

  //       const passengers = response.passengers;
  //       setIsLoading(false);
  //       if (Array.isArray(passengers)) {
  //         setPassengerData(passengers);
  //       } else {
  //         console.error('Failed to fetch passengers data');
  //       }
  //     } catch (error) {
  //       if (retryCount < maxRetries) {
  //         console.warn(`Retrying fetch... (${retryCount + 1}/${maxRetries})`);
  //         setTimeout(() => fetchPassengers(retryCount + 1), 1000);  // Retry after 1 second
  //       } else {
  //         console.error('Error fetching passenger data after retries:', error);
  //         setIsLoading(false);
  //       }
  //     }
  //   };

  //   fetchPassengers();
  // }, [currentPage]);


  setPassengerData(response.passengers || []);
        setStats({
          totalPassengers: response.totalPassengers || 0,
          newPassengersCount: response.newPassengersCount || 0,
        });

        setIsLoading(false);
      } catch (error) {
        if (retryCount < maxRetries) {
          console.warn(`Retrying fetch... (${retryCount + 1}/${maxRetries})`);
          setTimeout(() => fetchPassengers(retryCount + 1), 1000);  // Retry after 1 second
        } else {
          console.error('Error fetching passenger data after retries:', error);
          setIsLoading(false);
        }
      }
    };

    fetchPassengers();
  }, [currentPage, sortField, sortOrder]);


  // Filter and sort passengers data
  // const filteredData = passengerData
  //   .filter((record) => {
  //     const name = record.name ? record.name.toLowerCase() : '';
  //     return name.includes(searchTerm.toLowerCase());
  //   })
  //   .sort((a, b) => {
  //     if (sortOrder === 'asc') {
  //       return a[sortField] > b[sortField] ? 1 : -1;
  //     } else {
  //       return a[sortField] < b[sortField] ? 1 : -1;
  //     }
  //   });

  const filteredData = passengerData.filter((record) => {
    const name = record.name ? record.name.toLowerCase() : '';
    return name.includes(searchTerm.toLowerCase());
  });

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Handle search change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setSortField(e.target.value);
    setCurrentPage(1);
  };

  // Pagination handlers
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

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.filter((_, index) => index >= startIndex && index < endIndex);

  

  const { totalPassengers, newPassengersCount } = stats;
  
  const activePassengers = passengerData.filter((p) => p.blockStatus === false).length;
  const inactivePassengers = passengerData.filter((p) => p.blockStatus === true).length;

  return (
    <motion.div
      className="bg-white bg-opacity-50 backdrop-blur-md shadow-xl rounded-xl p-6 border-r border-red-400 w-full max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >

      {/* STATS */}
      {/* <motion.div
        className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-12 mt-7 mx-3'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <StatCard name='Total Passengers' icon={Users} value={totalPassengers} color='#6366F1' />
        <StatCard name='New Passengers' icon={CheckCircle} value={newPassengers} color='#F59E0B' />
        <StatCard name='Active Passengers' icon={CheckCircle} value={activePassengers} color='#F59E0B' />
        <StatCard name='Inactive Passengers' icon={XCircle} value={inactivePassengers} color='#EF4444' />
      </motion.div> */}

<motion.div
        className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-12 mt-7 mx-3'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <StatCard name='Total Passengers' icon={Users} value={totalPassengers} color='#6366F1' />
        <StatCard name='New Passengers' icon={PlusCircle} value={newPassengersCount} color='#F59E0B' />
        <StatCard name='Active Passengers' icon={CheckCircle} value={activePassengers} color='#34D399' />
        <StatCard name='Inactive Passengers' icon={XCircle} value={inactivePassengers} color='#EF4444' />
      </motion.div>

      {/* Search and Sort */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <h2 className="text-xl font-semibold text-black">Passengers</h2>
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

      <div className="mb-4 flex item-center justify-left">
        <label htmlFor="sort" className="text-black mr-2">Sort By:</label>
        <select
          id="sort"
          value={sortField}
          onChange={handleSortChange}
          className="bg-white text-black rounded-lg px-4 py-2 border"
        >
          <option value="recent">Recent</option>
          <option value="name">Name</option>
        </select>
        <button onClick={toggleSortOrder} className="flex items-center text-black">
          <ArrowDownUp />
        </button>
      </div>

      {/* Display passenger data */}
      {isLoading ? (
        <motion.div
          className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-10'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="p-3 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
              <ShimmerCategoryItem height={150} rounded hasImage imageType="circular" imageWidth={60} imageHeight={60} text cta />
            </div>
          ))}
        </motion.div>
      ) : filteredData.length === 0 ? (
        <div className="text-black flex flex-col justify-center items-center">
          <img src={usernotfound} alt="Not Found" className="w-80 h-80" />
          <h1 className="text-lg font-semibold text-gray-600">User Not Found...</h1>
        </div>
      ) : (
        <div className="passengersCard">
          <motion.div
            className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-10'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {currentData.map((passenger, index) => (
              <UserCard key={index} passenger={passenger} />
            ))}
          </motion.div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-4"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="px-4 py-2 text-black">{currentPage} of {totalPages}</span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg ml-4"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </motion.div>
  );
};

export default PassengerTable;
