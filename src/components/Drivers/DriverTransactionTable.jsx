import { motion } from "framer-motion";
import { Search, ArrowDownUp } from "lucide-react";
import { useEffect, useState } from "react";
import { ShimmerTable } from "react-shimmer-effects";
import usernotfound from '../../assets/usernotfound2.jpg';
import ApiConfig from '../../Consants/ApiConfig';

const DriverTransactionTable = ({ driverId }) => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt"); // Default sort by createdAt
  const [sortOrder, setSortOrder] = useState("desc"); // Default order: descending
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchTransactionRequest = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        const endpoint = ApiConfig.getDriverTransactionHistoryEndpoint(driverId, currentPage,itemsPerPage);
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.error(`Error fetching transactions: ${response.statusText}`);
          return;
        }

        const data = await response.json();
        console.log('API Response:', data);

        if (data && Array.isArray(data.Transactions)) {
          setTransactions(data.Transactions);
          // setTotalPages(data.totalPages || 1); // Assuming API provides total pages
          setTotalPages(Math.ceil(data.Pagination.totalCount / itemsPerPage));
        } else {
          console.error('Invalid response format or Transactions is not an array');
          setTransactions([]);
        }
      } catch (error) {
        console.error('Error fetching transaction data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactionRequest();
  }, [driverId, currentPage, itemsPerPage]);

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  // Handle sort change
  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  // Filter transactions
  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.message.toLowerCase().includes(searchTerm) ||
      String(transaction.amount).includes(searchTerm) ||
      transaction.transactionType.toLowerCase().includes(searchTerm)
  );

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
  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === "amount") {
      return sortOrder === "desc" ? a.amount - b.amount : b.amount - a.amount;
    }
    if (sortBy === "createdAt") {
      return sortOrder === "desc"
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  });

  // Format date
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  // Truncate long messages
  const truncateMessage = (message, length = 50) =>
    message.length > length ? `${message.slice(0, length)}...` : message;

  return (
    <motion.div
      className="bg-white shadow-lg rounded-xl p-6 text-black"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Transaction History</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-200 rounded-lg pl-10 pr-4 py-2"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-2 text-gray-500" />
        </div>
      </div>

      {/* Table Section */}
      {isLoading ? (
        <ShimmerTable row={10} col={5} />
      ) : transactions.length === 0 ? (
        <div className="flex flex-col items-center">
          <img src={usernotfound} alt="No data" className="w-40" />
          <p className="text-gray-600 mt-4">No transactions found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th
                  className="py-3 px-6 text-left cursor-pointer"
                  onClick={() => handleSortChange("transactionType")}
                >
                  Transaction Type <ArrowDownUp />
                </th>
                <th
                  className="py-3 px-6 text-left cursor-pointer"
                  onClick={() => handleSortChange("amount")}
                >
                  Amount <ArrowDownUp />
                </th>
                <th className="py-3 px-6 text-left">Message</th>
                <th
                  className="py-3 px-6 text-left cursor-pointer"
                  onClick={() => handleSortChange("createdAt")}
                >
                  Date & Time <ArrowDownUp />
                  
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.map((transaction) => (
                <tr key={transaction._id} className="border-t">
                  <td className="py-3 px-6">{transaction.transactionType}</td>
                  <td className="py-3 px-6">Rs {transaction.amount.toFixed(2)}</td>
                  <td className="py-3 px-6">
                    <div
                      className="truncate max-w-xs"
                      title={transaction.message}
                    >
                      {truncateMessage(transaction.message)}
                    </div>
                  </td>
                  <td className="py-3 px-6">{formatDateTime(transaction.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

     
         {/* Pagination */}

          
<div className="flex flex-col justify-center items-center mt-4 space-y-2">
  {/* Pagination Buttons */}
  <div className="flex space-x-2">
    {/* Previous Button */}
    <button
      className={`px-3 py-1 rounded-md text-sm font-medium ${
        currentPage === 1 ? "bg-transparent text-black cursor-not-allowed" : "bg-white text-black hover:bg-gray-600"
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
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                currentPage === pageIndex ? "bg-blue-600 text-white" : "bg-white text-black hover:bg-gray-600"
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
      className={`px-3 py-1 rounded-md text-sm font-medium ${
        currentPage === totalPages ? "bg-transparent text-black cursor-not-allowed" : "bg-white text-black hover:bg-gray-600"
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

export default DriverTransactionTable;
