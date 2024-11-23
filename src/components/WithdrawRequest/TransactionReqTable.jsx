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
  useEffect(() => {
    const fetchTransactionRequest = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
  
        if (!token) {
          console.error("No token found");
          return; // Exit early if no token is available
        }

  
        // Fetch the transaction data from the backend
        const response = await fetch(ApiConfig.getTransactionRequestEndPoint(), {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Add token to headers
            'Content-Type': 'application/json'
          }
        });
  
        // Check if the response is successful
        if (!response.ok) {
          console.error("Failed to fetch data:", response.statusText);
          return;
        }
  
        // Parse the response data
        const data = await response.json();
        const transactions = data.items;
  
        console.log("Fetched transactions:", transactions);
  
        setIsLoading(false);
  
        if (Array.isArray(transactions)) {
          setTransactions(transactions);
        } else {
          console.error('Failed to fetch transaction data');
        }
      } catch (error) {
        console.error('Error fetching transaction data:', error);
        setIsLoading(false);  // Make sure loading state is updated even on error
      }
    };
  
    fetchTransactionRequest();
  }, [sortBy, searchTerm]);  // Refetch when sorting or search term changes
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
  const handleSave = async () => {
    if (selectedTransaction) {
      try {
        const requestBody = {
          id: selectedTransaction._id,
          status: updatedStatus,
        };
  
        const responseData = await fetch(ApiConfig.putTransactionRequestEndPoint(), {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
  
        if (responseData.ok) {
          const data = await responseData.json();
  
          if (data.status === 1) {
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
            localStorage.setItem(`transaction-status-${selectedTransaction._id}`, updatedStatus);
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
  
    closeModal();
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
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            transaction.status === "Paid"
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
        <button
          className="text-indigo-400 hover:text-indigo-300 mr-2"
          onClick={() => handleViewTransactionDetails(transaction)}
        >
          Edit
        </button>
      </td>
    </motion.tr>
  ))}
</tbody>


            </table>
          </motion.div>

                  <div className="flex justify-center mt-4">
  {/* Previous Button */}
  <button
    className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === 1 ? "bg-transparent text-black cursor-not-allowed" : "bg-white text-black hover:bg-gray-600"}`}
    onClick={() => currentPage > 1 && paginate(currentPage - 1)}
    disabled={currentPage === 1}
  >
    Previous
  </button>

  {/* Page Numbers */}
  {Array.from({ length: totalPages }).map((_, index) => (
    <button
      key={index}
      className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-white text-black hover:bg-gray-600"}`}
      onClick={() => paginate(index + 1)}
    >
      {index + 1}
    </button>
  ))}

  {/* Next Button */}
  <button
    className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === totalPages ? "bg-transparent text-black cursor-not-allowed" : "bg-white text-black hover:bg-gray-600"}`}
    onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
    disabled={currentPage === totalPages}
  >
    Next
  </button>
</div>

        </div>
      )}

      {/* Popup Modal */}
      {selectedTransaction && (
  <div className="fixed inset-0 text-black flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Transaction Details</h2>
      <p><strong>Name:</strong> {selectedTransaction.UserDetails.userName}</p>
      <p><strong>Account No:</strong> {selectedTransaction._id}</p>
      <p><strong>Status:</strong> {selectedTransaction.status}</p>
      <p>
  <strong>Balance:</strong>{" "}
  {selectedTransaction.bankDetails?.balance !== undefined
    ? `₹${selectedTransaction.bankDetails.balance}`
    : "N/A"}
</p>

<div className="mt-4">
  <h3 className="text-md font-semibold mb-2">QR Code</h3>
  {selectedTransaction.bankDetails?.qrCodePhoto ? (
    <img
      src={selectedTransaction.bankDetails.qrCodePhoto}
      alt="QR Code"
      className="w-32 h-32 object-contain border border-gray-300 rounded"
    />
  ) : (
    <p>No QR Code available</p>
  )}
</div>

      {/* Edit Status */}
      <div className="mt-4">
  <h3 className="text-md font-semibold">Update Status</h3>
  <div className="flex space-x-2 mt-2">
    <button
      className={`px-3 py-2 text-black shadow-xl ${updatedStatus === "Paid" ? "bg-green-500 shadow-xl" : "bg-white-400"}`}
      onClick={() => handleStatusChange("Paid")}>
      Paid
    </button>
    <button
      className={`px-3 py-2 text-black shadow-lg ${updatedStatus === "Queued" ? "bg-yellow-500 shadow-xl" : "bg-white-400"}`}
      onClick={() => handleStatusChange("Queued")}>
      Queued
    </button>
    <button
      className={`px-3 py-2 text-black shadow-lg ${updatedStatus === "Cancelled" ? "bg-red-500 shadow-xl" : "bg-white-400"}`}
      onClick={() => handleStatusChange("Cancelled")}>
      Cancelled
    </button>
  </div>
  <div>
    {/* Debug log */}
    <p>Updated Status: {updatedStatus}</p>
  </div>
</div>


      <div className="flex justify-end mt-6">
        <button className="bg-gray-500 text-white px-4 py-2 mr-2" onClick={closeModal}>Cancel</button>
        <button className="bg-blue-500 text-white px-4 py-2" onClick={handleSave}>Save</button>
      </div>
    </div>
  </div>
)}

    </motion.div>
  );
};

export default TransactionReqTable;



