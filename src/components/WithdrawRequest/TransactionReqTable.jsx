// import { motion } from "framer-motion";
// import { Search, ArrowDownUp } from "lucide-react";
// import { useEffect, useState } from "react";
// import { ShimmerTable } from "react-shimmer-effects";
// import usernotfound from '../../assets/usernotfound2.jpg';
// import ApiConfig from '../../Consants/ApiConfig';
// import fetchWithToken from "../../utils/fetchWithToken";
// import axios from "axios";

// const TransactionReqTable = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortBy, setSortBy] = useState("datetime");
//   const [sortOrder, setSortOrder] = useState("desc");
//   const [selectedTransaction, setSelectedTransaction] = useState('');
//   const [selectedTransactionId, setSelectedTransactionId] = useState();
//   const [updatedStatus, setUpdatedStatus] = useState(null);
//   const itemsPerPage = 10;
//   const [loading, setLoading] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [error, setError] = useState(null);


// //const TransactionDetails = ({ selectedTransaction }) => {
//   //const [updatedStatus, setUpdatedStatus] = useState(null);

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value.toLowerCase());
//     setCurrentPage(1);
//   };

//   const handleSortChange = (field) => {
//     if (sortBy === field) {
//       setSortOrder(sortOrder === "desc" ? "asc" : "desc");
//     } else {
//       setSortBy(field);
//       setSortOrder("desc");
//     }
//   };

//   // useEffect(() => {
//   //   const fetchTransactionRequest = async () => {
//   //     try {
//   //       const token = localStorage.getItem('token'); // Retrieve token from localStorage

//   //       if (!token) {
//   //         console.error("No token found");
//   //         return; // Exit early if no token is available
//   //       }

//   //       // Fetch the transaction data from the backend
//   //       const response = await fetch(ApiConfig.getTransactionRequestEndPoint(), {
//   //         method: 'GET',
//   //         headers: {
//   //           'Authorization': `Bearer ${token}`,  // Add token to headers
//   //           'Content-Type': 'application/json',
//   //         },
//   //       });

//   //       if (!response.ok) {
//   //         console.error("Failed to fetch data:", response.statusText);
//   //         return;
//   //       }

//   //       const data = await response.json();
//   //       const transactions = data.items;

//   //       console.log("Fetched transactions:", transactions);

//   //       setIsLoading(false);

//   //       if (Array.isArray(transactions)) {
//   //         // Ensure localStorage status is applied to each transaction
//   //         const updatedTransactions = transactions.map((transaction) => {
//   //           const statusKey = `transaction-status-${transaction._id}`;
//   //           const savedStatus = localStorage.getItem(statusKey);
//   //           if (savedStatus) {
//   //             // Apply saved status if it exists in localStorage
//   //             transaction.status = savedStatus;
//   //           }
//   //           return transaction;
//   //         });

//   //         setTransactions(updatedTransactions);
//   //       } else {
//   //         console.error('Failed to fetch transaction data');
//   //       }
//   //     } catch (error) {
//   //       console.error('Error fetching transaction data:', error);
//   //       setIsLoading(false);  // Ensure loading state is updated even on error
//   //     }
//   //   };

//   //   fetchTransactionRequest();
//   // }, [sortBy, searchTerm]);  // Refetch when sorting or search term changes
//   useEffect(() => {
//     const fetchTransactionRequest = async () => {
//       try {
//         const token = localStorage.getItem('token'); // Retrieve token from localStorage

//         if (!token) {
//           console.error("No token found");
//           return; // Exit early if no token is available
//         }

//         // Fetch the transaction data from the backend with pagination
//         const response = await fetch(
//           `${ApiConfig.getTransactionRequestEndPoint()}?page=${currentPage}&itemsPerPage=${itemsPerPage}`, // Include pagination params
//           {
//             method: 'GET',
//             headers: {
//               Authorization: `Bearer ${token}`, // Add token to headers
//               'Content-Type': 'application/json',
//             },
//           }
//         );

//         if (!response.ok) {
//           console.error("Failed to fetch data:", response.statusText);
//           setIsLoading(false);
//           return;
//         }

//         const data = await response.json();

//         console.log("Fetched transactions:", data.items);

//         setIsLoading(false);

//         if (data && Array.isArray(data.items)) {
//           // Ensure localStorage status is applied to each transaction
//           const updatedTransactions = data.items.map((transaction) => {
//             const statusKey = `transaction-status-${transaction._id}`;
//             const savedStatus = localStorage.getItem(statusKey);
//             if (savedStatus) {
//               // Apply saved status if it exists in localStorage
//               transaction.status = savedStatus;
//             }
//             return transaction;
//           });

//           setTransactions(updatedTransactions);
//           setTotalPages(data.totalPages); // Set total pages from API response
//         } else {
//           console.error('Failed to fetch transaction data');
//         }
//       } catch (error) {
//         console.error('Error fetching transaction data:', error);
//         setIsLoading(false); // Ensure loading state is updated even on error
//       }
//     };

//     fetchTransactionRequest();
//   }, [currentPage, sortBy, searchTerm]); // Refetch when currentPage, sortBy, or searchTerm changes

//   useEffect(() => {
//     if (selectedTransaction && selectedTransaction._id) {
//       const statusKey = `transaction-status-${selectedTransaction._id}`;
//       const savedStatus = localStorage.getItem(statusKey);
//       if (savedStatus) {
//         setUpdatedStatus(savedStatus);  // Set the saved status if it exists
//       } else {
//         setUpdatedStatus(selectedTransaction.status);  // Fallback to initial status
//       }
//     }
//   }, [selectedTransaction]);  // Run this whenever selectedTransaction changes

//   const filteredTransaction = transactions.filter(
//     (transaction) =>
//       transaction.UserDetails.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       transaction.UserDetails.userRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       String(transaction.value).includes(searchTerm) ||
//       String(transaction.createdAt).includes(searchTerm) ||
//       transaction.status.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const sortedTransactions = [...filteredTransaction].sort((a, b) => {
//     if (sortBy === "name") {
//       return sortOrder === "desc"
//         ? a.UserDetails.userName.localeCompare(b.name)
//         : b.UserDetails.userName.localeCompare(a.name);
//     }
//     if (sortBy === "role") {
//       return sortOrder === "desc"
//         ? a.UserDetails.userRole.localeCompare(b.role)
//         : b.UserDetails.userRole.localeCompare(a.role);
//     }
//     if (sortBy === "value") {
//       return sortOrder === "desc" ? a.value - b.value : b.value - a.value;
//     }
//     if (sortBy === "status") {
//       return sortOrder === "desc"
//         ? a.status.localeCompare(b.status)
//         : b.status.localeCompare(a.status);
//     }
//     if (sortBy === "datetime") {
//       return sortOrder === "desc"
//         ? a.createdAt.localeCompare(b.status)
//         : b.createdAt.localeCompare(a.status);
//     }
//     return 0;
//   });

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
//   const currentItems = sortedTransactions.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );




//   const handleViewTransactionDetails = (transaction) => {
//     console.log(transaction)
//     setSelectedTransaction(transaction);
//     setUpdatedStatus(transaction.status); // Set initial status for editing
//     setSelectedTransactionId(transaction._id)
//     console.log("Selected transaction:", transaction);


//   };

//   /*const handleStatusChange = (status) => {
//     setUpdatedStatus(status);
//     console.log("Updated Status:", status);  
//   };*/
//   const handleStatusChange = (status) => {
//     // Save the updated status in localStorage using the transaction ID
//     const statusKey = `transaction-status-${selectedTransaction._id}`;
//     localStorage.setItem(statusKey, status);

//     // Update the state with the new status
//     setUpdatedStatus(status);
//     console.log("Updated Status:", status);
//   };


//   const closeModal = () => {
//     setSelectedTransaction(null);
//   };

//   const handleSave = async () => {
//     if (selectedTransaction) {
//       try {
//         // Prepare the request body for the status update
//         const requestBody = {
//           id: selectedTransaction._id,
//           status: updatedStatus,
//         };

//         const token = localStorage.getItem("token"); // Retrieve the token from localStorage

//         // Make the PUT request to update the transaction status on the backend
//         const response = await fetch(ApiConfig.putTransactionRequestEndPoint(), {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`,
//           },
//           body: JSON.stringify(requestBody),
//         });

//         if (response.ok) {
//           const data = await response.json();

//           if (data.status === 1) {
//             // Update the transaction status in the local state
//             setTransactions((prev) =>
//               prev.map((transaction) =>
//                 transaction._id === selectedTransaction._id
//                   ? { ...transaction, status: updatedStatus }
//                   : transaction
//               )
//             );
//             setError(null);

//             // Save the updated status in localStorage
//             console.log(`Saving status for transaction ${selectedTransaction._id} to localStorage`);
//             localStorage.setItem(
//               `transaction-status-${selectedTransaction._id}`,
//               updatedStatus
//             );
//           } else {
//             setError(data.message || "Failed to update the transaction status.");
//           }
//         } else {
//           setError("Failed to update the transaction status.");
//         }
//       } catch (err) {
//         setError(`Unexpected error: ${err.message}`);
//       }
//     }

//     closeModal(); // Close the modal after saving
//   };


//   return (
//     <motion.div className="bg-white bg-opacity-50 backdrop-blur-md shadow-xl rounded-xl p-6 border-r border-red-400 mb-8">
//       <div className="flex flex-col md:flex-row justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold text-black mb-4 md:mb-0">Withdraw Requests </h2>
//         <div className="relative w-full md:w-1/3">
//           <input
//             type="text"
//             placeholder="Search Transactions..."
//             className="bg-white text-black placeholder-black rounded-lg pl-10 pr-4 py-2 w-full border"
//             onChange={handleSearch}
//             value={searchTerm}
//           />
//           <Search className="absolute left-3 top-2.5 text-black" size={18} />
//         </div>
//       </div>

//       {isLoading ? (
//         <div className="border border-gray-300">
//           <ShimmerTable row={10} col={7} />
//         </div>
//       ) : filteredTransaction.length === 0 ? (
//         <div className="text-black flex flex-col justify-center items-center">
//           <img src={usernotfound} alt="" className="w-80 h-80" />
//           <h1 className="text-lg font-semibold text-gray-600">No transaction found..!</h1>
//         </div>
//       ) : (
//         <div className="TransactionRequestData">
//           <motion.div className="overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-300 shadow-lg">
//               <thead>
//                 <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
//                   {/* Table Headers */}
//                   <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSortChange("name")}>
//                     <span className="flex">Name<ArrowDownUp className="pl-2" /></span>
//                   </th>
//                   <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSortChange("role")}>
//                     <span className="flex">Role<ArrowDownUp className="pl-2" /></span>
//                   </th>
//                   <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSortChange("value")}>
//                     <span className="flex">Value<ArrowDownUp className="pl-2" /></span>
//                   </th>
//                   <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSortChange("datetime")}>
//                     <span className="flex">Date/Time<ArrowDownUp className="pl-2" /></span>
//                   </th>
//                   <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSortChange("status")}>
//                     <span className="flex">Status<ArrowDownUp className="pl-2" /></span>
//                   </th>
//                   <th className="py-3 px-6 text-left">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//   {currentItems.map((transaction) => (
//     <motion.tr
//       key={transaction._id}
//       className="text-gray-800 transform transition duration-300 ease-in-out hover:scale-104 hover:bg-gray-100 hover:shadow-lg"
//     >
//       <td className="px-6 py-4 text-left text-sm text-black">{transaction.UserDetails.userName}</td>
//       <td className="px-6 py-4 text-left text-sm text-black">{transaction.UserDetails.userRole}</td>
//       <td className="px-6 py-4 text-left text-sm text-black">{transaction.value}</td>
//       <td className="px-6 py-4 text-left text-sm text-black">{new Date(transaction.createdAt).toLocaleString()}</td>

//       {/* Status column with dynamic classes based on new schema */}
//       <td className="py-3 px-6 text-left">
//         <span
//           className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//             transaction.status === "Paid"
//               ? "bg-green-200 text-green-900"
//               : transaction.status === "Cancelled"
//               ? "bg-red-200 text-red-900"
//               : transaction.status === "Queued"
//               ? "bg-blue-200 text-blue-900"
//               : "bg-yellow-200 text-yellow-900" // Default for Pending
//           }`}
//         >
//           {transaction.status}
//         </span>
//       </td>

//       <td className="px-3 py-4 text-center text-sm text-black">
//         <button
//           className="text-indigo-400 hover:text-indigo-300 mr-2"
//           onClick={() => handleViewTransactionDetails(transaction)}
//         >
//           Edit
//         </button>
//       </td>
//     </motion.tr>
//   ))}
// </tbody>


//             </table>
//           </motion.div>
//         </div>
//       )}

//       {/* Popup Modal */}
//       {selectedTransaction && (
//   <div className="fixed inset-0 text-black flex items-center justify-center z-60 bg-gray-900 bg-opacity-50">
//     <div className="bg-white p-6 rounded-lg shadow-lg w-[50%]">
//       <h2 className="text-2xl font-semibold mb-4">Transaction Details</h2>
//       <p><strong>Name:</strong> {selectedTransaction.UserDetails.userName}</p>
//       <p><strong>Account No:</strong> {selectedTransaction._id}</p>
//       <p><strong>Status:</strong> {selectedTransaction.status}</p>
//       <p>
//   <strong>Balance:</strong>{" "}
//   {selectedTransaction.bankDetails?.balance !== undefined
//     ? `₹${selectedTransaction.bankDetails.balance}`
//     : "N/A"}
// </p>

// <div className="mt-5 ">
//   <h3 className="text-md font-semibold mb-4">QR Code</h3>
//   {selectedTransaction.bankDetails?.qrCodePhoto ? (
//     <img
//       src={selectedTransaction.bankDetails.qrCodePhoto}
//       alt="QR Code"
//       className="w-[40%] h-45 object-contain ml-[25%] border border-gray-300 rounded justify-center flex items-center"
//     />
//   ) : (
//     <p>No QR Code available</p>
//   )}
// </div>

//       {/* Edit Status */}
//       <div className="mt-4">
//   <h3 className="text-md font-semibold">Update Status</h3>
//   <div className="flex space-x-2 mt-2 ">
//     <button
//       className={`px-3 py-2 text-black shadow-xl border rounded-xl bg-green-300 border-black font-semibold  ${updatedStatus === "Paid" ? "bg-green-500 shadow-xl" : "bg-white-400"}`}
//       onClick={() => handleStatusChange("Paid")}>
//       Paid
//     </button>
//     <button
//       className={`px-3 py-2 text-black shadow-xl border rounded-xl bg-yellow-200 border-black font-semibold ${updatedStatus === "Queued" ? "bg-yellow-500 shadow-xl" : "bg-white-400"}`}
//       onClick={() => handleStatusChange("Queued")}>
//       Queued
//     </button>
//     <button
//       className={`px-3 py-2 text-black shadow-xl border rounded-xl bg-red-500 border-black font-semibold ${updatedStatus === "Cancelled" ? "bg-red-500 shadow-xl" : "bg-white-400"}`}
//       onClick={() => handleStatusChange("Cancelled")}>
//       Cancelled
//     </button>
//   </div>
//   <div>
//     {/* Debug log */}
//     <p className="mt-4 font-semibold">Updated Status: {updatedStatus}</p>
//   </div>
// </div>


//       <div className="flex justify-end mt-6">
//         <button className="bg-gray-500 text-white px-4 py-2 mr-2" onClick={closeModal}>Cancel</button>
//         <button className="bg-blue-500 text-white px-4 py-2" onClick={handleSave}>Save</button>
//       </div>
//     </div>
//   </div>
// )}



// <div className="flex justify-center mt-4">
//   {/* Previous Button */}
//   <button
//     className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === 1 ? "bg-transparent text-black cursor-not-allowed" : "bg-white text-black hover:bg-gray-600"}`}
//     onClick={() => currentPage > 1 && paginate(currentPage - 1)}
//     disabled={currentPage === 1}
//   >
//     Previous
//   </button>

//   {/* Page Numbers */}
//   {Array.from({ length: totalPages }).map((_, index) => (
//     <button
//       key={index}
//       className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-white text-black hover:bg-gray-600"}`}
//       onClick={() => paginate(index + 1)}
//     >
//       {index + 1}
//     </button>
//   ))}

//   {/* Next Button */}
//   <button
//     className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === totalPages ? "bg-transparent text-black cursor-not-allowed" : "bg-white text-black hover:bg-gray-600"}`}
//     onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
//     disabled={currentPage === totalPages}
//   >
//     Next
//   </button>
// </div>

//     </motion.div>
//   );
// };

// export default TransactionReqTable;





import { motion } from "framer-motion";
import { Search, ArrowDownUp } from "lucide-react";
import { useEffect, useState } from "react";
import { ShimmerTable } from "react-shimmer-effects";
import usernotfound from '../../assets/usernotfound2.jpg';
import ApiConfig from '../../Consants/ApiConfig';
import fetchWithToken from "../../utils/fetchWithToken";
import axios from "axios";

const TransactionReqTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("datetime");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedTransaction, setSelectedTransaction] = useState('');
  const [selectedTransactionId, setSelectedTransactionId] = useState();
  const [updatedStatus, setUpdatedStatus] = useState(null);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState(null);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [password, setPassword] = useState("")
  const [phoneNumber,setPhoneNumber] = useState("")


  //const TransactionDetails = ({ selectedTransaction }) => {
  //const [updatedStatus, setUpdatedStatus] = useState(null);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  // useEffect(() => {
  //   const fetchTransactionRequest = async () => {
  //     try {
  //       const token = localStorage.getItem('token'); // Retrieve token from localStorage

  //       if (!token) {
  //         console.error("No token found");
  //         return; // Exit early if no token is available
  //       }

  //       // Fetch the transaction data from the backend
  //       const response = await fetch(ApiConfig.getTransactionRequestEndPoint(), {
  //         method: 'GET',
  //         headers: {
  //           'Authorization': `Bearer ${token}`,  // Add token to headers
  //           'Content-Type': 'application/json',
  //         },
  //       });

  //       if (!response.ok) {
  //         console.error("Failed to fetch data:", response.statusText);
  //         return;
  //       }

  //       const data = await response.json();
  //       const transactions = data.items;

  //       console.log("Fetched transactions:", transactions);

  //       setIsLoading(false);

  //       if (Array.isArray(transactions)) {
  //         // Ensure localStorage status is applied to each transaction
  //         const updatedTransactions = transactions.map((transaction) => {
  //           const statusKey = `transaction-status-${transaction._id}`;
  //           const savedStatus = localStorage.getItem(statusKey);
  //           if (savedStatus) {
  //             // Apply saved status if it exists in localStorage
  //             transaction.status = savedStatus;
  //           }
  //           return transaction;
  //         });

  //         setTransactions(updatedTransactions);
  //       } else {
  //         console.error('Failed to fetch transaction data');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching transaction data:', error);
  //       setIsLoading(false);  // Ensure loading state is updated even on error
  //     }
  //   };

  //   fetchTransactionRequest();
  // }, [sortBy, searchTerm]);  // Refetch when sorting or search term changes
  useEffect(() => {
    const fetchTransactionRequest = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage

        if (!token) {
          console.error("No token found");
          return; // Exit early if no token is available
        }

        // Fetch the transaction data from the backend with pagination
        const response = await fetch(
          `${ApiConfig.getTransactionRequestEndPoint()}?page=${currentPage}&itemsPerPage=${itemsPerPage}`, // Include pagination params
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`, // Add token to headers
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          console.error("Failed to fetch data:", response.statusText);
          setIsLoading(false);
          return;
        }

        const data = await response.json();

        console.log("Fetched transactions:", data.items);

        setIsLoading(false);

        if (data && Array.isArray(data.items)) {
          // Ensure localStorage status is applied to each transaction
          const updatedTransactions = data.items.map((transaction) => {
            const statusKey = `transaction-status-${transaction._id}`;
            const savedStatus = localStorage.getItem(statusKey);
            if (savedStatus) {
              // Apply saved status if it exists in localStorage
              transaction.status = savedStatus;
            }
            return transaction;
          });

          setTransactions(updatedTransactions);
          setTotalPages(data.totalPages); // Set total pages from API response
        } else {
          console.error('Failed to fetch transaction data');
        }
      } catch (error) {
        console.error('Error fetching transaction data:', error);
        setIsLoading(false); // Ensure loading state is updated even on error
      }
    };

    fetchTransactionRequest();
  }, [currentPage, sortBy, searchTerm]); // Refetch when currentPage, sortBy, or searchTerm changes

  useEffect(() => {
    if (selectedTransaction && selectedTransaction._id) {
      const statusKey = `transaction-status-${selectedTransaction._id}`;
      const savedStatus = localStorage.getItem(statusKey);
      if (savedStatus) {
        setUpdatedStatus(savedStatus);  // Set the saved status if it exists
      } else {
        setUpdatedStatus(selectedTransaction.status);  // Fallback to initial status
      }
    }
  }, [selectedTransaction]);  // Run this whenever selectedTransaction changes

  const filteredTransaction = transactions.filter(
    (transaction) =>
      transaction.UserDetails.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.UserDetails.userRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(transaction.value).includes(searchTerm) ||
      String(transaction.createdAt).includes(searchTerm) ||
      transaction.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTransactions = [...filteredTransaction].sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "desc"
        ? a.UserDetails.userName.localeCompare(b.name)
        : b.UserDetails.userName.localeCompare(a.name);
    }
    if (sortBy === "role") {
      return sortOrder === "desc"
        ? a.UserDetails.userRole.localeCompare(b.role)
        : b.UserDetails.userRole.localeCompare(a.role);
    }
    if (sortBy === "value") {
      return sortOrder === "desc" ? a.value - b.value : b.value - a.value;
    }
    if (sortBy === "status") {
      return sortOrder === "desc"
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status);
    }
    if (sortBy === "datetime") {
      return sortOrder === "desc"
        ? a.createdAt.localeCompare(b.status)
        : b.createdAt.localeCompare(a.status);
    }
    return 0;
  });

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
  const currentItems = sortedTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );




  const handleViewTransactionDetails = (transaction) => {
    console.log(transaction)
    setSelectedTransaction(transaction);
    setUpdatedStatus(transaction.status); // Set initial status for editing
    setSelectedTransactionId(transaction._id)
    console.log("Selected transaction:", transaction);


  };

  /*const handleStatusChange = (status) => {
    setUpdatedStatus(status);
    console.log("Updated Status:", status);  
  };*/
  const handleStatusChange = (status) => {
    // Save the updated status in localStorage using the transaction ID
    const statusKey = `transaction-status-${selectedTransaction._id}`;
    localStorage.setItem(statusKey, status);

    // Update the state with the new status
    setUpdatedStatus(status);
    console.log("Updated Status:", status);
  };


  const closeModal = () => {
    setSelectedTransaction(null);
  };

  const handlePassword= async()=>{
    try {
      const loginResponse = await fetch('http://ec2-3-110-123-252.ap-south-1.compute.amazonaws.com/api/admin/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            phone: phoneNumber, // Use admin phone number
            password: password, // Password entered in the confirmation popup
        }),
    });

    if (!loginResponse.ok) {
        alert('Incorrect phone no or password. Please try again.');
        return;
    }

    } catch (error) {
      console.log("Error: ",error)
    }
  }

  const handleSave = async () => {
    if (selectedTransaction) {
      try {
        // Prepare the request body for the status update
        const requestBody = {
          id: selectedTransaction._id,
          status: updatedStatus,
        };

        const token = localStorage.getItem("token"); // Retrieve the token from localStorage

        // Make the PUT request to update the transaction status on the backend
        const response = await fetch(ApiConfig.putTransactionRequestEndPoint(), {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        });

        if (response.ok) {
          const data = await response.json();

          if (data.status === 1) {
            // Update the transaction status in the local state
            setTransactions((prev) =>
              prev.map((transaction) =>
                transaction._id === selectedTransaction._id
                  ? { ...transaction, status: updatedStatus }
                  : transaction
              )
            );
            setError(null);

            // Save the updated status in localStorage
            console.log(`Saving status for transaction ${selectedTransaction._id} to localStorage`);
            localStorage.setItem(
              `transaction-status-${selectedTransaction._id}`,
              updatedStatus
            );
          } else {
            setError(data.message || "Failed to update the transaction status.");
          }
        } else {
          setError("Failed to update the transaction status.");
        }
      } catch (err) {
        setError(`Unexpected error: ${err.message}`);
      }
    }

    closeModal(); // Close the modal after saving
  };


  return (
    <motion.div className="bg-white bg-opacity-50 backdrop-blur-md shadow-xl rounded-xl p-6 border-r border-red-400 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-black mb-4 md:mb-0">Withdraw Requests </h2>
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search Transactions..."
            className="bg-white text-black placeholder-black rounded-lg pl-10 pr-4 py-2 w-full border"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-black" size={18} />
        </div>
      </div>

      {isLoading ? (
        <div className="border border-gray-300">
          <ShimmerTable row={10} col={7} />
        </div>
      ) : filteredTransaction.length === 0 ? (
        <div className="text-black flex flex-col justify-center items-center">
          <img src={usernotfound} alt="" className="w-80 h-80" />
          <h1 className="text-lg font-semibold text-gray-600">No transaction found..!</h1>
        </div>
      ) : (
        <div className="TransactionRequestData">
          <motion.div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 shadow-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  {/* Table Headers */}
                  <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSortChange("name")}>
                    <span className="flex">Name<ArrowDownUp className="pl-2" /></span>
                  </th>
                  <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSortChange("role")}>
                    <span className="flex">Role<ArrowDownUp className="pl-2" /></span>
                  </th>
                  <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSortChange("value")}>
                    <span className="flex">Value<ArrowDownUp className="pl-2" /></span>
                  </th>
                  <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSortChange("datetime")}>
                    <span className="flex">Date/Time<ArrowDownUp className="pl-2" /></span>
                  </th>
                  <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSortChange("status")}>
                    <span className="flex">Status<ArrowDownUp className="pl-2" /></span>
                  </th>
                  <th className="py-3 px-6 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.map((transaction) => (
                  <motion.tr
                    key={transaction._id}
                    className="text-gray-800 transform transition duration-300 ease-in-out hover:scale-104 hover:bg-gray-100 hover:shadow-lg"
                  >
                    <td className="px-6 py-4 text-left text-sm text-black">{transaction.UserDetails.userName}</td>
                    <td className="px-6 py-4 text-left text-sm text-black">{transaction.UserDetails.userRole}</td>
                    <td className="px-6 py-4 text-left text-sm text-black">{transaction.value}</td>
                    <td className="px-6 py-4 text-left text-sm text-black">{new Date(transaction.createdAt).toLocaleString()}</td>

                    {/* Status column with dynamic classes based on new schema */}
                    <td className="py-3 px-6 text-left">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${transaction.status === "Paid"
                            ? "bg-green-200 text-green-900"
                            : transaction.status === "Cancelled"
                              ? "bg-red-200 text-red-900"
                              : transaction.status === "Queued"
                                ? "bg-blue-200 text-blue-900"
                                : "bg-yellow-200 text-yellow-900" // Default for Pending
                          }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-center text-sm text-black">
                      <div className="flex justify-center items-center pr-10 md:pr-0">
                        <button
                          className="bg-indigo-400 text-white font-semibold px-3 py-1 rounded-lg shadow-md hover:bg-indigo-500 hover:shadow-lg transition duration-200 ease-in-out"
                          onClick={() => handleViewTransactionDetails(transaction)}
                        >
                          Pay Now
                        </button>
                      </div>
                    </td>


                  </motion.tr>
                ))}
              </tbody>


            </table>
          </motion.div>
        </div>
      )}

      {/* Popup Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 text-black flex items-center justify-center z-60 bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-gray-300 pb-2">Transaction Details</h2>

            <div className="space-y-2">
              <p className="text-sm sm:text-base">
                <strong className="text-sm sm:text-base">Name: </strong>
                <span className="font-semibold text-black-500">{selectedTransaction.UserDetails.userName}</span>
              </p>

              <p className="text-sm sm:text-base">
                <strong className="text-sm sm:text-base">Account No: </strong>
                <span className="font-semibold text-black-500">{selectedTransaction._id}</span>
              </p>

              <p className="text-sm sm:text-base">
                <strong className="text-sm sm:text-base">Status: </strong>
                <span className={`font-semibold ${selectedTransaction.status === 'Paid' ? 'text-green-600' :
                    selectedTransaction.status === 'Queued' ? 'text-yellow-500' :
                      selectedTransaction.status === 'Cancelled' ? 'text-red-600' :
                        selectedTransaction.status === 'Pending' ? 'text-blue-600' :
                          'text-gray-500'
                  }`}>{selectedTransaction.status}</span>
              </p>

              <p className="text-sm sm:text-base">
                <strong className="text-sm sm:text-base">Balance: </strong>
                <span className={`font-semibold ${selectedTransaction.bankDetails?.balance !== undefined ? 'text-green-600' : 'text-gray-500'}`}>
                  {selectedTransaction.bankDetails?.balance !== undefined ? `₹${selectedTransaction.bankDetails.balance}` : "N/A"}
                </span>
              </p>
            </div>

            <div className="mt-2 flex flex-col items-center">
              <h3 className="text-lg font-bold text-center mb-2">QR Code</h3>
              {selectedTransaction.bankDetails?.qrCodePhoto ? (
                <div className="flex justify-center items-center border border-gray-300 rounded-lg p-2 sm:p-4 shadow-md">
                  <img src={selectedTransaction.bankDetails.qrCodePhoto} alt="QR Code" className="w-32 h-32 sm:w-40 sm:h-40 object-contain" />
                </div>
              ) : (
                <p className="text-gray-500 text-xs sm:text-sm">No QR Code available</p>
              )}
            </div>

            {/* Edit Status */}
            <div className="mt-4 flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-2 text-center">Update Status</h3>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                <button className={`px-3 py-1 sm:px-4 sm:py-2 text-black shadow-md border rounded-xl font-semibold transition-transform transform hover:scale-105 ${updatedStatus === "Paid" ? "bg-green-500" : "bg-green-300"}`} onClick={() => handleStatusChange("Paid")}>Paid</button>
                <button className={`px-3 py-1 sm:px-4 sm:py-2 text-black shadow-md border rounded-xl font-semibold transition-transform transform hover:scale-105 ${updatedStatus === "Queued" ? "bg-yellow-500" : "bg-yellow-200"}`} onClick={() => handleStatusChange("Queued")}>Queued</button>
                <button className={`px-3 py-1 sm:px-4 sm:py-2 text-black shadow-md border rounded-xl font-semibold transition-transform transform hover:scale-105 ${updatedStatus === "Cancelled" ? "bg-red-500" : "bg-red-400"}`} onClick={() => handleStatusChange("Cancelled")}>Cancelled</button>
              </div>
              <div className="mt-4">
                {/* Debug log */}
                <p className="font-semibold text-base sm:text-lg text-center">
                  Updated Status: <span className={`${updatedStatus === "Paid" ? "text-green-500" : updatedStatus === "Queued" ? "text-yellow-500" : updatedStatus === "Cancelled" ? "text-red-500" : "text-blue-700"}`}>{updatedStatus}</span>
                </p>
              </div>
            </div>

            <div className="flex justify-end mt-4 gap-2 sm:gap-4">
              <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 sm:px-6 py-1 sm:py-2 rounded-lg shadow-md transition-transform transform hover:scale-105" onClick={closeModal}>Cancel</button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-6 py-1 sm:py-2 rounded-lg shadow-md transition-transform transform hover:scale-105" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}

      {showPasswordPopup && (
        <div className="fixed inset-0 flex items-center justify-center text-black bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <h2 className="text-xl font-semibold mb-4">Please enter your number and password to confirm:</h2>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Enter phone number"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Enter password"
            />
            <button
              onClick={handlePassword}
              className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Confirm Delete
            </button>
            <button
              onClick={()=>setShowPasswordPopup(false)}
              className="mt-2 w-full px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

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


    </motion.div>
  );
};

export default TransactionReqTable;





