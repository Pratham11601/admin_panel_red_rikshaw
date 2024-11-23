import { motion } from "framer-motion";
import { Search, ArrowDownUp } from "lucide-react";
import { useEffect, useState } from "react";
import { ShimmerTable } from "react-shimmer-effects";
import usernotfound from '../../assets/usernotfound2.jpg';
import StatCard from "../common/StatCard";
import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import fetchWithToken from '../../utils/fetchWithToken'; 
import ApiConfig from '../../Consants/ApiConfig';

const RideTable = () => {
  const [ridesData, setRidesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newly-added"); // Default to sorting by newly-added
  const [sortOrder, setSortOrder] = useState("desc"); // Default to descending for the latest data on top
  const [selectedRide, setSelectedRide] = useState(null);
  const itemsPerPage = 10;

  // Search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  // Sort functionality
  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc"); // Default to ascending when changing the field
    }
    setCurrentPage(1); // Reset to the first page when sorting changes
  };

  // Fetch ride data using fetchWithToken
  useEffect(() => {
    const fetchRides = async () => {
      try {
        const data = await fetchWithToken(ApiConfig.getAllRidesEndpoint(), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const Rides = data.data;

        setIsLoading(false);

        if (Array.isArray(Rides)) {
          setRidesData(Rides);
        } else {
          console.error('Failed to fetch Rides Data');
        }
      } catch (error) {
        console.error('Error fetching Rides Data:', error);
      }
    };

    fetchRides();
  }, [sortBy, searchTerm]); // Re-fetch when sorting or search term changes

  // Filter and sort the ride data
  const filteredRides = ridesData.filter(
    (ride) =>
      ride.pickupLocation.place.toLowerCase().includes(searchTerm) ||
      ride.dropoffLocation.place.toLowerCase().includes(searchTerm)
  );

  // Sort the rides based on selected field
  const sortedRides = [...filteredRides].sort((a, b) => {
    if (sortBy === "rideNo") {
      return sortOrder === "asc" ? a._id - b._id : b._id - a._id;
    }
    if (sortBy === "fare") {
      return sortOrder === "asc" ? a.totalCost - b.totalCost : b.totalCost - a.totalCost;
    }
    if (sortBy === "newly-added") {
      // Sort by newly-added (assuming this is a timestamp or creation date)
      const aDate = new Date(a.newlyAdded); // Replace 'newlyAdded' with your actual field name
      const bDate = new Date(b.newlyAdded);
      return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
    }
    return 0;
  });

  // Pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(sortedRides.length / itemsPerPage);
  const currentItems = sortedRides.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle View action
  const handleViewInvoice = (ride) => {
    setSelectedRide(ride);
  };

  // Close Modal
  const closeModal = () => {
    setSelectedRide(null);
  };

  // Dynamic Stat Calculations
  const totalRides = ridesData.length;
  const totalFare = ridesData.reduce((total, ride) => total + ride.totalCost, 0);

  return (
    <motion.div
      className="bg-white bg-opacity-50 backdrop-blur-md shadow-xl rounded-xl p-6 border-r border-red-400 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >

      {/* Dynamic Stats */}
      <motion.div
        className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <StatCard
          name='Total Rides'
          icon={UsersIcon}
          value={totalRides}
          color='#6366F1'
        />
        
      </motion.div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-black mb-4 md:mb-0">Rides List</h2>
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search Rides..."
            className="bg-white text-black placeholder-black rounded-lg pl-10 pr-4 py-2 w-full border"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-black" size={18} />
        </div>
      </div>

      {/* Table Section */}
      {isLoading ? (
        <div className="border border-gray-300">
          <ShimmerTable row={10} col={7} />
        </div>
      ) : (
        <>
          {filteredRides.length === 0 ? (
            <div className="text-black flex flex-col justify-center items-center">
              <img src={usernotfound} alt="" className="w-80 h-80" />
              <h1 className="text-lg font-semibold text-gray-600">No rides found matching your search.</h1>
            </div>
          ) : (
            <div className="RidesData">
              <motion.div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 shadow-lg">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th
                        className="py-3 px-6 text-left cursor-pointer"
                        onClick={() => handleSortChange("passenger")}
                      >
                        <span className="flex">Passenger<ArrowDownUp className="pl-2" /></span>
                      </th>
                      <th
                        className="py-3 px-6 text-left cursor-pointer"
                        onClick={() => handleSortChange("driver")}
                      >
                        <span className="flex">Driver<ArrowDownUp className="pl-2" /></span>
                      </th>
                      <th
                        className="py-3 px-6 text-left cursor-pointer"
                        onClick={() => handleSortChange("fare")}
                      >
                        <span className="flex">Fare<ArrowDownUp className="pl-2" /></span>
                      </th>
                      <th
                        className="py-3 px-6 text-left cursor-pointer"
                        onClick={() => handleSortChange("fromplace")}
                      >
                        <span className="flex">From Place<ArrowDownUp className="pl-2" /></span>
                      </th>
                      <th
                        className="py-3 px-6 text-left cursor-pointer"
                        onClick={() => handleSortChange("toplace")}
                      >
                        <span className="flex">To Place<ArrowDownUp className="pl-2" /></span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentItems.map((ride) => (
                      <motion.tr
                        key={ride._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-800 transform transition duration-300 ease-in-out hover:scale-104 hover:bg-gray-100 hover:shadow-lg"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-black">
                          {ride.passengerId ? ride.passengerId.name : "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-black">
                          {ride.driverId ? ride.driverId.name : "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-black">
                          {ride.totalCost ? `₹ ${ride.totalCost}` : "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-black">
                          {ride.pickupLocation?.place || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-black">
                          {ride.dropoffLocation?.place || "N/A"}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>

              {/* Pagination */}
              <div className="flex justify-center mt-6">
                <button
                  className="py-2 px-4 bg-blue-500 text-white rounded-lg mx-1"
                  onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                >
                  Previous
                </button>
                <button
                  className="py-2 px-4 bg-blue-500 text-white rounded-lg mx-1"
                  onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default RideTable;

