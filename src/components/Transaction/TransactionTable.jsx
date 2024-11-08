import { motion } from "framer-motion";
import { Search, ArrowDownUp, ArrowDownUpIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { ShimmerTable } from "react-shimmer-effects";
import usernotfound from '../../assets/usernotfound2.jpg';
import ApiConfig from '../../Consants/ApiConfig';

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('createdAt'); // Default sort field
  const [sortOrder, setSortOrder] = useState('asc'); // Default sort order
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10; // Number of transactions per page

  // Fetch data from the API
  useEffect(() => {
    fetchTransactions();
  }, [sortField, sortOrder, currentPage]);

  const fetchTransactions = async () => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
	
    setIsLoading(true);
    const response = await fetch(ApiConfig.getTransactionsEndPoint(),{
      method: 'GET',
					headers: {
						'Authorization': `Bearer ${token}`,  // Add token to headers
						'Content-Type': 'application/json'
					}
    });
    const data = await response.json();

    // Apply sorting to the fetched transactions based on the sortField and sortOrder
    const sortedData = data.transfers.sort((a, b) => {
      const fieldA = getNestedField(a, sortField);
      const fieldB = getNestedField(b, sortField);

      if (sortOrder === "asc") {
        return fieldA > fieldB ? 1 : -1;
      } else {
        return fieldA < fieldB ? 1 : -1;
      }
    });

    setTransactions(sortedData);
    setTotalPages(Math.ceil(data.transfers.length / itemsPerPage)); // Calculate total pages
    setIsLoading(false);
  };

  // Helper function to access nested fields (e.g., 'from.name')
  const getNestedField = (obj, fieldPath) => {
    return fieldPath.split('.').reduce((acc, field) => acc[field], obj);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sort order
    } else {
      setSortField(field); // Change sort field
      setSortOrder('asc'); // Reset to ascending order for new field
    }
  };

  // Handle pagination logic
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Get current transactions for the current page
  const currentItems = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
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
        <h2 className="text-xl font-semibold text-black mb-4 md:mb-0">
          Transactions
        </h2>
      </div>

      {/* Table Section */}
      {isLoading ? (
        <div className="border border-gray-300">
          <ShimmerTable row={10} col={7} />
        </div>
      ) : transactions.length === 0 ? (
        <div className="text-black flex flex-col justify-center items-center ">
          <img src={usernotfound} alt="" className="w-80 h-80" />
          <h1 className="text-lg font-semibold text-gray-600">No transactions found..!</h1>
        </div>
      ) : (
        <div className="TransactionRequestData">
          <motion.div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 shadow-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th onClick={() => handleSort('from.name')} className="py-3 px-6 text-left cursor-pointer">
                    <span className="flex">From Name<ArrowDownUpIcon className="pl-2"/></span>
                  </th>
                  <th onClick={() => handleSort('from.userType')} className="py-3 px-6 text-left cursor-pointer">
                    <span className="flex">From Role<ArrowDownUpIcon className="pl-2"/></span>
                  </th>
                  <th onClick={() => handleSort('to.name')} className="py-3 px-6 text-left cursor-pointer">
                    <span className="flex">To Name<ArrowDownUpIcon className="pl-2"/></span>
                  </th>
                  <th onClick={() => handleSort('to.userType')} className="py-3 px-6 text-left cursor-pointer">
                    <span className="flex">To Role<ArrowDownUpIcon className="pl-2"/></span>
                  </th>
                  <th onClick={() => handleSort('amount')} className="py-3 px-6 text-left cursor-pointer">
                    <span className="flex">Amount<ArrowDownUpIcon className="pl-2"/></span>
                  </th>
                  <th onClick={() => handleSort('createdAt')} className="py-3 px-6 text-left cursor-pointer">
                    <span className="flex">Date/Time<ArrowDownUpIcon className="pl-2"/></span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.map((transaction) => (
                  <motion.tr
                    key={transaction._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left">
                    {transaction.from.userId ? transaction.from.userId.name : "N/A"}

                    </td>
                    <td className="py-3 px-6 text-left">
                    {transaction.from.userType || "N/A"}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {transaction.to.userId ? transaction.to.userId.name : "N/A"}
                    </td>
                    <td className="py-3 px-6 text-left">
                    {transaction.to.userType || "N/A"}

                    </td>
                    <td className="py-3 px-6 text-left">{transaction.amount}</td>
                    <td className="py-3 px-6 text-left">
                    {formatDateTime(transaction.createdAt)}
                    </td>

                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <ul className="flex space-x-2">
              <li>
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === 1 ? "bg-transparent text-black cursor-not-allowed" : "bg-white text-black hover:bg-gray-600"}`}
                >
                  Previous
                </button>
              </li>

              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index}>
                  <button
                    className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-white text-black hover:bg-gray-600"}`}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}

              <li>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === totalPages ? "bg-transparent text-black cursor-not-allowed" : "bg-white text-black hover:bg-gray-600"}`}
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TransactionTable;
