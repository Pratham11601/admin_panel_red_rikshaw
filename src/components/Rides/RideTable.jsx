

import { motion } from "framer-motion";
import { Search, ArrowDownUp } from "lucide-react";
import { useEffect, useState } from "react";
import { ShimmerTable } from "react-shimmer-effects";
import usernotfound from '../../assets/usernotfound2.jpg';
import StatCard from "../common/StatCard";
import { UsersIcon } from "lucide-react";
import fetchWithToken from '../../utils/fetchWithToken';
import ApiConfig from '../../Consants/ApiConfig';

const RideTable = () => {
  const [ridesData, setRidesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [totalPages, setTotalPages] = useState(2)
  const [totalRides, setTotalRides] = useState()
  const itemsPerPage = 10;
  const [ShowDetails, setShowDetails] = useState(false)
  const [currentRide, setCurrentRide] = useState()

  // Enum for Ride Status
  const RideStatus = Object.freeze({
    SEARCHING: 'searching',
    ACCEPTED: 'accepted',
    ONGOING: 'ongoing',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    NO_DRIVER_FOUND: 'nodriverFound',
    UNACCEPTED: 'unaccepted',
  });

  // Fetch ride data
  useEffect(() => {
    const fetchRides = async () => {
      setIsLoading(true);
      try {
        const data = await fetchWithToken(
          // `${ApiConfig.getAllRidesEndpoint()}?page=${currentPage}&itemsPerPage=${itemsPerPage}`,
          ApiConfig.getAllRidesEndpoint(currentPage, itemsPerPage),
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );

        if (data?.data && Array.isArray(data.data)) {
          const totalRidesCount = data.totalPages || 0;
          setTotalRides(data.totalRides)
          const noOfRides = data.totalRides
          setTotalPages(Math.ceil(noOfRides / itemsPerPage));
          setRidesData(data.data);
          console.log(data)
        } else {
          console.error("Unexpected API response format");
        }
      } catch (error) {
        console.error("Error fetching Rides Data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRides();
  }, [currentPage]);

  console.log("rides data")
  ridesData.map((item) => console.log(item))

  // Search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1); // Reset to the first page on search
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

  // Filter and sort the ride data
  const filteredRides = ridesData.filter((ride) => {
    const passengerName = ride.passengerId?.name?.toLowerCase() || "";
    const pickupPlace = ride.sourceToDestination?.source?.address.toLowerCase() || "";
    const dropoffPlace = ride.sourceToDestination?.destination?.address?.toLowerCase() || "";

    return (
      passengerName.includes(searchTerm) ||
      pickupPlace.includes(searchTerm) ||
      dropoffPlace.includes(searchTerm)
    );
  });

  const sortedRides = [...filteredRides].sort((a, b) => {
    if (sortBy === "createdAt") {
      const aDate = new Date(a.createdAt);
      const bDate = new Date(b.createdAt);
      return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
    }
    if (sortBy === "pickupLocation") {
      return sortOrder === "asc"
        ? a.pickupLocation?.place?.localeCompare(b.pickupLocation?.place || "")
        : b.pickupLocation?.place?.localeCompare(a.pickupLocation?.place || "");
    }
    if (sortBy === "dropoffLocation") {
      return sortOrder === "asc"
        ? a.dropoffLocation?.place?.localeCompare(b.dropoffLocation?.place || "")
        : b.dropoffLocation?.place?.localeCompare(a.dropoffLocation?.place || "");
    }
    return 0;
  });

  // Pagination
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // const totalPages = Math.ceil(sortedRides.length / itemsPerPage);
  // const currentItems = sortedRides.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // const totalPages = Math.ceil(sortedRides.length / itemsPerPage);
  // const currentItems = sortedRides.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );
  const currentItems = sortedRides;

  // Dynamic Stat Calculations
  // const totalRides = ridesData.length;
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
          <ShimmerTable row={10} col={5} />
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
                        onClick={() => handleSortChange("pickupLocation")}
                      >
                        <span className="flex">From Place<ArrowDownUp className="pl-2" /></span>
                      </th>
                      <th
                        className="py-3 px-6 text-left cursor-pointer"
                        onClick={() => handleSortChange("dropoffLocation")}
                      >
                        <span className="flex">To Place<ArrowDownUp className="pl-2" /></span>
                      </th>
                      <th
                        className="py-3 px-6 text-left cursor-pointer"
                        onClick={() => handleSortChange("status")}
                      >
                        <span className="flex">Status<ArrowDownUp className="pl-2" /></span>
                      </th>
                      <th className="py-3 px-6 text-left cursor-pointer">
                        <span className="flex">Details<ArrowDownUp className="pl-2" /></span>
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
                          {ride.passengerId?.name || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-black">
                          {ride.acceptedBy?.name || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-left text-sm text-black break-words">
                          {ride.sourceToDestination?.source?.address || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-left text-sm text-black break-words">
                          {ride.sourceToDestination?.destination?.address || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-black">
                          {RideStatus[ride.status.toUpperCase()] || "Unknown"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-black">
                          <button
                            onClick={() => {
                              setShowDetails(true);
                              setCurrentRide(ride);
                            }}
                            className="px-3 py-2 bg-blue-400 rounded-lg font-semibold"
                          >
                            View
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>

              </motion.div>

              {ShowDetails && (
                <div className="fixed inset-0 text-black flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                  <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] border border-gray-300 overflow-y-auto">
                    <h1 className="text-2xl font-extrabold text-gray-800 mb-6">Ride Details</h1>

                    <div className="space-y-6">
                      {/* Status */}
                      <div className="flex items-center">
                        <span className="font-semibold text-gray-600">Status:</span>
                        <span className="ml-2 text-gray-800">{currentRide.status}</span>
                      </div>

                      {/* Accepted By */}
                      <div className="flex items-center">
                        <span className="font-semibold text-gray-600">Accepted By:</span>
                        <span className="ml-2 text-gray-800">{currentRide.acceptedBy?.name || "N/A"}</span>
                      </div>

                      {/* Passenger */}
                      <div className="flex items-center">
                        <span className="font-semibold text-gray-600">Passenger:</span>
                        <span className="ml-2 text-gray-800">{currentRide.passengerId?.name || "N/A"}</span>
                      </div>

                      {/* Ride ID */}
                      <div className="flex items-center">
                        <span className="font-semibold text-gray-600">Ride ID:</span>
                        <span className="ml-2 text-gray-800">{currentRide.rideId}</span>
                      </div>

                      {/* Source to Destination */}
                      <div>
                        <h2 className="font-bold text-lg text-gray-800 mb-2">Source to Destination</h2>
                        <div className="space-y-2">
                          <p>
                            <strong className="text-gray-600">Source:</strong>{" "}
                            <span className="text-gray-800">{currentRide.sourceToDestination?.source?.address || "N/A"}</span>
                          </p>
                          <p>
                            <strong className="text-gray-600">Destination:</strong>{" "}
                            <span className="text-gray-800">{currentRide.sourceToDestination?.destination?.address || "N/A"}</span>
                          </p>
                          <p>
                            <strong className="text-gray-600">Fare:</strong>{" "}
                            <span className="text-gray-800">₹{currentRide.sourceToDestination?.fare?.cost || 0}</span>
                          </p>
                          <p>
                            <strong className="text-gray-600">Distance:</strong>{" "}
                            <span className="text-gray-800">
                              {(currentRide.sourceToDestination?.fare?.distanceInMeters / 1000).toFixed(2) || 0} km
                            </span>
                          </p>
                          <p>
                            <strong className="text-gray-600">Duration:</strong>{" "}
                            <span className="text-gray-800">
                              {Math.floor((currentRide.sourceToDestination?.fare?.duration || 0) / 60)} mins
                            </span>
                          </p>
                          {currentRide.sourceToDestination?.polyline && <p>
                            <strong className="text-gray-600">Polyline:</strong>
                            <div className=" flex flex-wrap overflow-x-scroll p-5 ">
                              <span className="text-gray-800 flex flex-wrap ">
                                {currentRide.sourceToDestination?.polyline || "N/A"}
                              </span>
                            </div>
                          </p>}
                        </div>
                      </div>

                      {/* Driver to Source */}
                      <div>
                        <h2 className="font-bold text-lg text-gray-800 mb-2">Driver to Source</h2>
                        <div className="space-y-2">
                          <p>
                            <strong className="text-gray-600">Source:</strong>{" "}
                            <span className="text-gray-800">{currentRide.driverToSource?.source?.address || "N/A"}</span>
                          </p>
                          <p>
                            <strong className="text-gray-600">Destination:</strong>{" "}
                            <span className="text-gray-800">{currentRide.driverToSource?.destination?.address || "N/A"}</span>
                          </p>
                          <p>
                            <strong className="text-gray-600">Distance:</strong>{" "}
                            <span className="text-gray-800">
                              {(currentRide.driverToSource?.fare?.distanceInMeters / 1000).toFixed(2) || 0} km
                            </span>
                          </p>
                          <p>
                            <strong className="text-gray-600">Duration:</strong>{" "}
                            <span className="text-gray-800">
                              {Math.floor((currentRide.driverToSource?.fare?.duration || 0) / 60)} mins
                            </span>
                          </p>
                          {currentRide.driverToSource?.polyline && <p>
                            <strong className="text-gray-600">Polyline:</strong>
                            <div className=" flex flex-wrap overflow-x-scroll p-5 ">
                              <span className="text-gray-800 flex flex-wrap ">
                                {currentRide.driverToSource?.polyline || "N/A"}
                              </span>
                            </div>
                          </p>}
                        </div>
                      </div>

                      {/* Polyline */}
                      {/* <div className="truncate">
                      <strong className="text-gray-600">Route Polyline:</strong>{" "}
                      <span className="text-gray-800">{currentRide.polyline}</span>
                    </div> */}

                      {/* Timestamps */}
                      <div className="space-y-2">
                        <p>
                          <strong className="text-gray-600">Created At:</strong>{" "}
                          <span className="text-gray-800">{new Date(currentRide.createdAt).toLocaleString()}</span>
                        </p>
                        <p>
                          <strong className="text-gray-600">Updated At:</strong>{" "}
                          <span className="text-gray-800">{new Date(currentRide.updatedAt).toLocaleString()}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end mt-6 gap-4">
                      <button
                        className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
                        onClick={() => setShowDetails(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>


              )}

              {/* Pagination */}

              <div className="flex flex-col justify-center items-center mt-4 space-y-2">
                {/* Pagination Buttons */}
                <div className="flex space-x-2">
                  {/* Previous Button */}
                  <button
                    className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === 1 ? "bg-transparent text-black cursor-not-allowed" : "bg-white text-black hover:bg-gray-600"
                      }`}
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>

                  {/* Page Numbers */}
                  {Array.from({ length: Math.min(3, totalPages) }) // Show only 3 pages
                    .map((_, index) => {
                      const pageIndex = Math.max(1, currentPage - 1) + index; // Adjust visible range
                      return (
                        pageIndex <= totalPages && ( // Ensure the page index doesn't exceed total pages
                          <button
                            key={pageIndex}
                            className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === pageIndex ? "bg-blue-600 text-white" : "bg-white text-black hover:bg-gray-600"
                              }`}
                            onClick={() => paginate(pageIndex)}
                          >
                            {pageIndex}
                          </button>
                        )
                      );
                    })}

                  {/* Next Button */}
                  <button
                    className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === totalPages ? "bg-transparent text-black cursor-not-allowed" : "bg-white text-black hover:bg-gray-600"
                      }`}
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>

                {/* Total Pages Info */}
                <div className="text-sm font-medium text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>
              </div>

            </div>


          )}
        </>
      )}
    </motion.div>
  );
};

export default RideTable;
