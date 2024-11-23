import { motion } from "framer-motion";
import { Search, ArrowDownUp } from "lucide-react";
import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";
import ApiConfig from '../../Consants/ApiConfig';
import { ShimmerTable } from "react-shimmer-effects";
import usernotfound from '../../assets/usernotfound2.jpg';

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("datetime"); // Default sort
  const [sortOrder, setSortOrder] = useState("desc"); // Default sort order
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const itemsPerPage = 10;
  useEffect(() => {
    const fetchTransactionRequest = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
  
        const response = await fetch(ApiConfig.getTransactionHistoryEndPoint(), {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Add token to headers
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          console.error(`Error fetching transactions: ${response.status} ${response.statusText}`);
          setIsLoading(false);
          return;
        }
  
        const data = await response.json();
        console.log('API Response:', data); // Log the response to check its structure
  
        // Ensure the response contains the 'Transactions' array
        if (data && Array.isArray(data.items)) {
          // Sort the transactions by createdAt (default)
          const sortedData = data.items.sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
          );
          setTransactions(sortedData); // Set sorted transactions
        } else if (data && data.result && Array.isArray(data.result.items)) {
          // Handle nested response structure and sort
          const sortedData = data.result.items.sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
          );
          setTransactions(sortedData);
        } else {
          console.error('Failed to fetch Transactions: Invalid data format or missing Transactions');
          setTransactions([]); // Fallback to an empty array
        }
  
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error('Error fetching transaction data:', error);
      }
    };
  
    fetchTransactionRequest();
  }, [sortBy, searchTerm]); // Re-fetch data if sortBy or searchTerm changes
  
  
  // Search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  // Handle sort change
  const handleSortChange = (field) => {
    if (sortBy === field) {
      // Toggle the sort order if the same field is clicked again
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      // Set the new field and default sort order to ascending
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  // Filter and sort the transactions
  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.UserDetails.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.UserDetails.userRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(transaction.value).includes(searchTerm) ||
      String(transaction.createdAt).includes(searchTerm) ||
      transaction.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "desc"
        ? a.UserDetails.userName.localeCompare(b.UserDetails.userName)
        : b.UserDetails.userName.localeCompare(a.UserDetails.userName);
    }
    if (sortBy === "role") {
      return sortOrder === "desc"
        ? a.UserDetails.userRole.localeCompare(b.UserDetails.userRole)
        : b.UserDetails.userRole.localeCompare(a.UserDetails.userRole);
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
        ? a.createdAt.localeCompare(b.createdAt)
        : b.createdAt.localeCompare(a.createdAt);
    }
    return 0;
  });

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
  const currentItems = sortedTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Page change handler
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }) + ' ' + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <motion.div
      className="bg-white bg-opacity-50 backdrop-blur-md shadow-xl rounded-xl p-6 border-r border-red-400 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-black mb-4 md:mb-0">Withdraw History </h2>
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

      {/* Table Section */}
      {isLoading ? (
        <div className="border border-gray-300">
          <ShimmerTable row={10} col={7} />
        </div>
      ) : (
        <>
          {/* Check if filteredTransactions is empty */}
          {filteredTransactions.length === 0 ? (
            <div className="text-black flex flex-col justify-center items-center ">
              <img src={usernotfound} alt="" className="w-80 h-80" />
              <h1 className="text-lg font-semibold text-gray-600">No transaction found..!</h1>
            </div>
          ) : (
            <div className="TransactionRequestData">
              <motion.div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 shadow-lg">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th
                        className="py-3 px-6 text-left cursor-pointer"
                        onClick={() => handleSortChange("name")}
                      >
                        <span className="flex">
                          Name
                          <ArrowDownUp className="pl-2" />
                        </span>
                      </th>
                      <th
                        className="py-3 px-6 text-left cursor-pointer"
                        onClick={() => handleSortChange("role")}
                      >
                        <span className="flex">Role<ArrowDownUp className="pl-2" /></span>
                      </th>
                      <th
                        className="py-3 px-6 text-left cursor-pointer"
                        onClick={() => handleSortChange("value")}
                      >
                        <span className="flex">Value<ArrowDownUp className="pl-2" /></span>
                      </th>
                      <th
                        className="py-3 px-6 text-left cursor-pointer"
                        onClick={() => handleSortChange("datetime")}
                      >
                        <span className="flex">Date/Time<ArrowDownUp className="pl-2" /></span>
                      </th>
                      <th
                        className="py-3 px-6 text-left cursor-pointer"
                        onClick={() => handleSortChange("status")}
                      >
                        <span className="flex">Status<ArrowDownUp className="pl-2" /></span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentItems.map((transaction) => (
                      <motion.tr
                        key={transaction._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-800 transform transition duration-300 ease-in-out hover:scale-104 hover:bg-gray-100 hover:shadow-lg"
                      >
                        <td className="py-3 px-6">{transaction.UserDetails.userName}</td>
                        <td className="py-3 px-6">{transaction.UserDetails.userRole}</td>
                        <td className="py-3 px-6">{transaction.value}</td>
                        <td className="py-3 px-6">{formatDateTime(transaction.createdAt)}</td>
                        <td className="py-3 px-6">
                          <span
                            className={`${
                              transaction.status === "Success"
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600"
                            } py-1 px-3 rounded-full text-sm`}
                          >
                            {transaction.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>

              {/* Pagination */}
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-600">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} entries
                </div>
                <div>
                  {/* Add pagination controls */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 rounded-md text-gray-600"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="ml-2 px-4 py-2 bg-gray-300 rounded-md text-gray-600"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default TransactionTable;
