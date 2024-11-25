import { motion } from "framer-motion";
import { ArrowRightLeft, CircleDollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import { ShimmerTable } from "react-shimmer-effects";
import usernotfound from '../../assets/usernotfound2.jpg';
import ApiConfig from '../../Consants/ApiConfig';
import StatCard from '../../components/common/StatCard';
import { ArrowDownUpIcon } from "lucide-react";

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('createdAt'); 
  const [sortOrder, setSortOrder] = useState('desc'); 
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10; 

  // Fetch data from the API
  useEffect(() => {
    fetchTransactions();
  }, [sortField, sortOrder, currentPage]);

  const fetchTransactions = async () => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
  
    setIsLoading(true);
    try {
      const response = await fetch(ApiConfig.getTransactionsEndPoint(), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Add token to headers
          'Content-Type': 'application/json',
        },
      });
  
      const result = await response.json();
  
      if (response.ok) {
        // Access the correct field based on the Swagger response
        const transactionsData = result.data || []; 
  
        // Apply sorting to the fetched transactions based on the sortField and sortOrder
        const sortedData = transactionsData.sort((a, b) => {
          const fieldA = new Date(getNestedField(a, sortField));
          const fieldB = new Date(getNestedField(b, sortField));
        
          if (sortOrder === "desc") {
            return fieldB - fieldA; // Latest first
          } else {
            return fieldA - fieldB; // Oldest first
          }
        });
        
  
        setTransactions(sortedData);
        setTotalPages(Math.ceil(result.pagination.totalCount / itemsPerPage)); // Calculate total pages
      } else {
        console.error("Error fetching transactions:", result.message);
      }
    } catch (error) {
      console.error("Error during API call:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  // Helper function to access nested fields (e.g., 'from.name')
  const getNestedField = (obj, fieldPath) => {
    return fieldPath.split('.').reduce((acc, field) => acc[field], obj);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc'); // Toggle sort order
    } else {
      setSortField(field); // Change sort field
      setSortOrder('desc'); // Reset to ascending order for new field
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

  // Calculate total transactions and total amount
  const totalTransactions = transactions.length;
  const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

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
      {/* State cards with dynamic data */}
      <motion.div
        className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 mb-8'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <StatCard
          name='Total Transactions'
          icon={ArrowRightLeft}
          value={totalTransactions}
          color='#6366F1'
        />
        <StatCard
          name='Total Amount' 
          icon={CircleDollarSign} 
          value={totalAmount.toFixed(2)} // Format amount to two decimal places
          color='#10B981' 
        />
      </motion.div>

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
                  <th onClick={() => handleSort("userId")} className="py-3 px-6 text-left cursor-pointer">
                    <span className="flex">User ID<ArrowDownUpIcon className="pl-2" /></span>
                  </th>
                 
                  <th onClick={() => handleSort("transactionType")} className="py-3 px-6 text-left cursor-pointer">
                    <span className="flex">Transaction Type<ArrowDownUpIcon className="pl-2" /></span>
                  </th>
                  <th onClick={() => handleSort("amount")} className="py-3 px-6 text-left cursor-pointer">
                    <span className="flex">Amount<ArrowDownUpIcon className="pl-2" /></span>
                  </th>
                  <th onClick={() => handleSort("message")} className="py-3 px-6 text-left cursor-pointer">
                    <span className="flex">Message<ArrowDownUpIcon className="pl-2" /></span>
                  </th>
                  <th onClick={() => handleSort("createdAt")} className="py-3 px-6 text-left cursor-pointer">
                    <span className="flex">Date/Time<ArrowDownUpIcon className="pl-2" /></span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.map((transaction) => (
                  <motion.tr
                    key={transaction.transactionID}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left">{transaction.userId || "N/A"}</td>
                    
                    <td className="py-3 px-6 text-left">{transaction.transactionType || "N/A"}</td>
                    <td className="py-3 px-6 text-left">{transaction.amount.toFixed(2) || "N/A"}</td>
                    <td className="py-3 px-6 text-left">{transaction.message || "N/A"}</td>
                    <td className="py-3 px-6 text-left">{new Date(transaction.createdAt).toLocaleString()}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
              Prev
            </button>
            <span className="px-4 py-2">{currentPage} of {totalPages}</span>
            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
              Next
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TransactionTable;



//remember to remove Transaction details file from pages 