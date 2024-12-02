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
  const [totalTransactions, setTotalTransactions] = useState(0); // Total transactions across all pages
const [totalAmount, setTotalAmount] = useState(0); // Total amount across all pages

  const itemsPerPage = 10; 

  // Fetch data from the API
  useEffect(() => {
    fetchTransactions();
  }, [sortField, sortOrder, currentPage]);

  const fetchTransactions = async () => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
  
    setIsLoading(true);
    try {
      const response = await fetch(
        ApiConfig.getTransactionsEndPoint(currentPage),
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      const result = await response.json();
  
  //     if (response.ok) {
  //       const transactionsData = result.data || [];
  //       setTransactions(transactionsData);
  //       setTotalPages(Math.ceil(result.pagination.totalCount / itemsPerPage));
  //     } else {
  //       console.error("Error fetching transactions:", result.message);
  //     }
  //   } catch (error) {
  //     console.error("Error during API call:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  if (response.ok) {
    const transactionsData = result.data || [];
    setTransactions(transactionsData);

    // Extract total count and amount from the response
    const totalTransactionCount = result.pagination.totalCount || 0;
    // const totalTransactionAmount = result.pagination.totalAmount || 0;
    

    setTotalPages(Math.ceil(totalTransactionCount / itemsPerPage));

    // Update state for StatCard values
    setTotalTransactions(totalTransactionCount);
    // setTotalAmount(totalTransactionAmount);
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
  // const getNestedField = (obj, fieldPath) => {
  //   return fieldPath.split('.').reduce((acc, field) => acc[field], obj);
  // };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  // Handle pagination logic
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

 
  // Calculate total transactions and total amount
  // const totalTransactions = transactions.length;
  // const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }) +
      " " +
      date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
  };

  // const currentItems = transactions.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

  const currentItems = transactions; // Backend handles pagination


  return (
    <motion.div
      className="bg-white bg-opacity-50 backdrop-blur-md shadow-xl rounded-xl p-6 border-r border-red-400 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* State cards with dynamic data */}
      <motion.div
  className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 mb-8"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
>
  <StatCard
    name="Total Transactions"
    icon={ArrowRightLeft}
    value={totalTransactions} // Updated value from state
    color="#6366F1"
  />
  {/* <StatCard
    name="Total Amount"
    icon={CircleDollarSign}
    value={totalAmount.toFixed(2)} // Updated value from state
    color="#10B981"
  /> */}
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
                {currentItems.map((transaction, index) => (
                  <motion.tr
                    key={index}
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

</div>

       
      )}
    </motion.div>
  );
};

export default TransactionTable;


//remember to remove Transaction details file from pages 