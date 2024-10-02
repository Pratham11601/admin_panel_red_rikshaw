// import React, { useState, useEffect } from 'react';
// import ApiConfig from '../../Consants/ApiConfig';
// import { motion } from "framer-motion";
// import { Search, Trash2, ArrowDownUp } from "lucide-react";
// import { FadeLoader } from 'react-spinners';

// const RideTable = () => {
//   const [ridesData, setRidesData] = useState([]);
//   const [isLoading,setIsLoading] = useState(true);
//   const [driverData,setDriverData] = useState([]);
//   const [passengerData,setPassengerData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortField, setSortField] = useState('status');
//   const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;
//   const totalPages = Math.ceil(ridesData.length / itemsPerPage);

//   // Search functionality
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value.toLowerCase());
//     setCurrentPage(1); // Reset to first page on new search
//   };

//   // Sort field change
//   const handleSortChange = (e) => {
//     setSortField(e.target.value);
//     setCurrentPage(1); // Reset to first page on sort change
//   };

//   // Toggle sort order (asc/desc)
//   const toggleSortOrder = () => {
//     setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//   };

  // // Fetch ride data
  // useEffect(() => {
  //   const fetchRides = async () => {
  //     try {
  //       const response = await fetch(ApiConfig.getAllRidesEndpoint());
  //       const data = await response.json();
  //       const Rides = data.data;

  //       setIsLoading(false)

  //       if (Array.isArray(Rides)) {
  //         setRidesData(Rides);
  //       } else {
  //         console.error('Failed to fetch Rides Data');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching privacy policies:', error);
  //     }
  //   };

  //   fetchRides();
  // }, [sortField,searchTerm]);

//   // Filter and sort ride data based on search and sort conditions
//   const filteredData = ridesData
//     .filter((record) => {
//       const status = record.status ? record.status.toLowerCase() : '';
//       const driver = record.driverId.name ? record.driverId.name.toLowerCase() : '';
//       const passenger = record.passengerID ? record.passengerID.toLowerCase() : '';

//       return (
//         status.includes(searchTerm.toLowerCase()) ||
//         driver.includes(searchTerm.toLowerCase()) ||
//         passenger.includes(searchTerm.toLowerCase())
//       );
//     })
//     .sort((a, b) => {
      
        
//         if (sortField === "status-completed") {
//           return b.status - a.status; // Completed first
//         }
//         if (sortField === "status-pending") {
//           return a.status === "Pending" ? -1 : 1; // Pending first
//         }
//         if (sortField === "status-ongoing") {
//           return a.status === "Ongoing" ? -1 : 1; // Cancelled first
//         }
//         // return b[field].localeCompare(a[field]);
    


//     });

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentItems = filteredData.slice(startIndex, endIndex);

//   // Page change handler
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <motion.div
//       className="bg-white bg-opacity-50 backdrop-blur-md shadow-xl rounded-xl p-6 border-r border-red-400 mb-8"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.2 }}
//     >
//       {isLoading && <FadeLoader color="#e42727" radius={3} className=""/>}

//       <div className="flex flex-col md:flex-row justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold text-black">Ride List</h2>
//         <div className="relative w-full md:w-1/3">
//           <input
//             type="text"
//             placeholder="Search rides..."
//             className="bg-white text-black placeholder-black rounded-lg pl-10 pr-4 py-2 focus:outline-none border w-full"
//             value={searchTerm}
//             onChange={handleSearchChange}
//           />
//           <Search className="absolute left-3 top-2.5 text-black" size={18} />
//         </div>
//       </div>

//       {/* Sort Dropdown */}
//       <div className="mb-4 flex items-center">
//         <label htmlFor="sort" className="text-black mr-2">
//           Sort By:
//         </label>
//         <select
//           id="sort"
//           value={sortField}
//           onChange={handleSortChange}
//           className="bg-white text-black rounded-lg px-4 py-2 border"
//         >
//           <option value="status-completed"> Completed</option>
//           <option value="status-pending"> Pending</option>
//           <option value="status-ongoing"> Ongoing</option>
//         </select>
//         <button onClick={toggleSortOrder} className="ml-4 p-2 bg-gray-200 rounded-lg hover:bg-gray-300">
//           <ArrowDownUp className="text-black" size={18} />
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full">
//           <thead>
//             <tr>
//               {["Ride No", "Passenger", "Driver", "Total Cost", "Status", "Actions"].map((header) => (
//                 <th key={header} className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
//                   {header}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-black">
//             {currentItems.map((ride) => (
//               <motion.tr key={ride._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">{ride._id}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{ride.passengerID}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{ride.driverId}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{ride.totalCost && `$${ride.totalCost.toFixed(2)}`}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
//                   <span
//                     className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                       ride.status === "completed"
//                         ? "bg-green-100 text-green-800"
//                         : ride.status === "pending"
//                         ? "bg-yellow-100 text-yellow-800"
//                         : "bg-red-100 text-red-800"
//                     }`}
//                   >
//                     {ride.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
//                   <button className="text-indigo-400 hover:text-indigo-300 mr-2">View</button>
//                 </td>
//               </motion.tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Navigation */}
//       <nav aria-label="Page navigation" className="mb-2 sm:mb-0 mt-4">
//         <ul className="flex space-x-2">
//           <li>
//             <button
//               className={`px-3 py-1 rounded-md text-sm font-medium ${
//                 currentPage === 1 ? "bg-transparent text-black cursor-not-allowed" : "bg-white text-black hover:bg-gray-600"
//               }`}
//               onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//               aria-label="Previous Page"
//             >
//               Previous
//             </button>
//           </li>
//           {Array.from({ length: totalPages }, (_, index) => (
//             <li key={index}>
//               <button
//                 className={`px-3 py-1 rounded-md text-sm font-medium ${
//                   currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-white text-black hover:bg-gray-600"
//                 }`}
//                 onClick={() => handlePageChange(index + 1)}
//               >
//                 {index + 1}
//               </button>
//             </li>
//           ))}
//           <li>
//             <button
//               className={`px-3 py-1 rounded-md text-sm font-medium ${
//                 currentPage === totalPages ? "bg-transparent text-black cursor-not-allowed" : "bg-white text-black hover:bg-gray-600"
//               }`}
//               onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               aria-label="Next Page"
//             >
//               Next
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </motion.div>
//   );
// };

// export default RideTable;




import React, { useState, useEffect } from 'react';
import ApiConfig from '../../Consants/ApiConfig';
import { motion } from 'framer-motion';
import { ArrowDownUp } from 'lucide-react';

const RideTable = ({ data }) => {
    const [ridesData, setRidesData] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedField, setSortedField] = useState(null);
  const [isAsc, setIsAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [ridesPerPage] = useState(12);
  const [selectedRide, setSelectedRide] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (field) => {
    setIsAsc(!isAsc);
    setSortedField(field);
  };

    // Fetch ride data
  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await fetch(ApiConfig.getAllRidesEndpoint());
        const data = await response.json();
        const Rides = data.data;

        setIsLoading(false)

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
  }, [sortedField,searchTerm]);

  const filteredRides = ridesData.filter((ride) => {
    return (
      ride.driverId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.passengerId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.pickupLocation.place.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.dropoffLocation.place.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const sortedRides = ridesData.sort((a, b) => {
    if (sortedField) {
      const fieldA = a[sortedField] || ''; // Default to an empty string if undefined
      const fieldB = b[sortedField] || ''; // Default to an empty string if undefined
  
      if (isAsc) {
        return fieldA.localeCompare(fieldB);
      } else {
        return fieldB.localeCompare(fieldA);
      }
    }
    return 0; // No sorting if sortedField is null
  });

  const indexOfLastRide = currentPage * ridesPerPage;
  const indexOfFirstRide = indexOfLastRide - ridesPerPage;
  const currentRides = sortedRides.slice(indexOfFirstRide, indexOfLastRide);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

   // Handle View action
   const handleViewInvoice = (ride) => {
    setSelectedRide(ride);
  };
   // Close Modal
   const closeModal = () => {
    setSelectedRide(null);
  };

  return (
    <motion.div
      className="bg-white text-black bg-opacity-50 backdrop-blur-md shadow-xl rounded-xl p-6 border-r border-red-400 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
    
      {/* Search bar */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search rides..."
          className="border border-gray-300 p-2 rounded"
          onChange={handleSearch}
        />
      </div>

      {/* Ride table */}
      <motion.table
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-w-full bg-white border border-gray-300 overflow-x-auto"
      >
        <thead>
          <tr className="text-left h-12 bg-gray-200">
            <th className="p-2 cursor-pointer   " onClick={() => handleSort('driverId.name')}>
                <h2>Driver Name </h2> 
            </th>
            <th className="p-2 cursor-pointer   " onClick={() => handleSort('passengerId.name')}>
                <h2>Passenger Name</h2>  
            </th>
            <th className="p-2 ">
              <h2>Fare</h2>
            </th>
            <th className="p-2 cursor-pointer    " onClick={() => handleSort('pickupLocation.place')}>
                <h2>From Place</h2> 
            </th>
            <th className="p-2 cursor-pointer    " onClick={() => handleSort('dropoffLocation.place')}>
                To Place
            </th>
            <th className="p-2 cursor-pointer "><h2>View Invoice</h2></th>
          </tr>
        </thead>
        <tbody>
          {currentRides.map((ride) => (
            <motion.tr
              key={ride._id}
              className="border-b border-gray-300 h-[1cm] hover:bg-gray-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <td className="p-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-xs">{ride.driverId.name}</td>
              <td className="p-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-xs">{ride.passengerId.name}</td>
              <td className="p-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-xs">$15.00</td>
              <td className="p-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-xs">{ride.pickupLocation.place}</td>
              <td className="p-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-xs">{ride.dropoffLocation.place}</td>
              <td className="p-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-xs">
                <button className="text-blue-500 p-2 "
                  onClick={() => handleViewInvoice(ride)}
                >
                  View
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded mx-2"
        >
          Previous
        </button>
        <span className="px-3 py-2">{` ${currentPage}`}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredRides.length / ridesPerPage)}
          className="px-4 py-2 bg-gray-300 rounded mx-2"
        >
          Next
        </button>
      </div>
      {selectedRide && (
                <div className="fixed inset-0 text-black flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white rounded-lg p-6 w-11/12 max-w-md mx-auto">
                    <h3 className="text-lg font-semibold mb-4">Ride Details</h3>
                    {/* <p><strong>Ride No:</strong> {selectedTransaction.transactionNo}</p> */}
                    <p><strong>Passenger Name:</strong> {selectedRide.passengerId.name}</p>
                    <p><strong>Driver Name:</strong> {selectedRide.driverId.name}</p>
                    <p><strong>Total Cost:</strong> $15.00</p>
                    {/* <p><strong>Coins in Wallet:</strong> {selectedTransaction.coinsInWallet}</p> */}
                    <p><strong>Status:</strong> {selectedRide.status}</p>
                    <button
                      onClick={closeModal}
                      className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
      </motion.div>
  );
};

export default RideTable;
