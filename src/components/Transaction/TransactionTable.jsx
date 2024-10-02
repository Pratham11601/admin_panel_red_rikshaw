// src/components/TransactionTable.jsx

import { motion } from "framer-motion";
import { Search, Trash2 } from "lucide-react";
import { useState } from "react";
import TRANSACTION_DATA from "../Transaction/DATA"; // Ensure the path is correct
import { FadeLoader } from "react-spinners";

const TransactionTable = () => {

  const [searchTerm, setSearchTerm] = useState("");
  
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newly-added"); // Default sort
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const itemsPerPage = 10;

  // Search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1); // Reset to first page on new search
  };

  // Sort functionality
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1); // Reset to first page on sort change
  };

  // Filter and sort the transaction data based on search and sort conditions
  const filteredTransactions = TRANSACTION_DATA.filter(
    (transaction) =>
      transaction.passengerName.toLowerCase().includes(searchTerm) ||
      transaction.driverName.toLowerCase().includes(searchTerm) ||
      transaction.transactionNo.toLowerCase().includes(searchTerm)
  );

  // Sort transactions by selected option
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === "total-cost") {
      return b.totalCost - a.totalCost; // Sort by total cost (descending)
    }
    if (sortBy === "status-completed") {
      return a.status === "Completed" ? -1 : 1; // Completed first
    }
    if (sortBy === "status-pending") {
      return a.status === "Pending" ? -1 : 1; // Pending first
    }
    if (sortBy === "status-cancelled") {
      return a.status === "Cancelled" ? -1 : 1; // Cancelled first
    }
    // Default sort: Newly Added (id descending)
    return b.id - a.id;
  });

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
  const currentItems = sortedTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Page change handler
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle View action
  const handleView = (transaction) => {
    setSelectedTransaction(transaction);
  };

  // Handle Delete action
  const handleDelete = (transactionId) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      // Implement deletion logic here (e.g., API call)
      alert(`Transaction ${transactionId} deleted successfully.`);
      // For demonstration, we'll just log it
      console.log(`Deleted transaction with ID: ${transactionId}`);
    }
  };

  // Close Modal
  const closeModal = () => {
    setSelectedTransaction(null);
  };

  return (
    <motion.div
      className="bg-white bg-opacity-50 backdrop-blur-md shadow-xl rounded-xl p-6 border-r border-red-400 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >

{/* {
        isLoading ?
        (
            <div className="flex justify-center items-center h-64">
              <FadeLoader color="#e42727" radius={3} className=""/>
            </div>
        ) :
        ( */}
            <div className="transactionData">
              {/* Header Section */}
              <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-black mb-4 md:mb-0">Transaction List</h2>
                <div className="relative w-full md:w-1/3">
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    className="bg-white text-black placeholder-black rounded-lg pl-10 pr-4 py-2 w-full border"
                    onChange={handleSearch}
                    value={searchTerm}
                  />
                  <Search className="absolute left-3 top-2.5 text-black" size={18} />
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="mb-4 flex flex-col md:flex-row items-center">
                <label htmlFor="sort" className="text-black mr-2 mb-2 md:mb-0">
                  Sort By:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={handleSortChange}
                  className="bg-white text-black rounded-lg px-4 py-2 w-full md:w-auto border"
                >
                  
                  <option value="status-completed"> Completed</option>
                  <option value="status-pending"> Pending</option>
                  <option value="status-cancelled"> Cancelled</option>
                </select>
              </div>

              {/* Transaction Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full ">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Transaction No
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Passenger
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Driver
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Total Cost
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider hidden sm:table-cell">
                        Coins in Wallet
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-700">
                    {currentItems.map((transaction) => (
                      <motion.tr
                        key={transaction.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black truncate max-w-xs">
                          {transaction.transactionNo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                          {transaction.passengerName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                          {transaction.driverName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                          ${transaction.totalCost.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black hidden sm:table-cell">
                          {transaction.coinsInWallet}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              transaction.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : transaction.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {transaction.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                          <button
                            className="text-indigo-400 hover:text-indigo-300 mr-2"
                            onClick={() => handleView(transaction)}
                          >
                            View
                          </button>
                        
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Navigation */}
              <nav aria-label="Page navigation" className="mb-2 sm:mb-0 mt-4">
              <ul className="flex space-x-2">
                  <li>
                    <button
                      className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === 1 ? "bg-transparent text-black cursor-not-allowed" : "bg-white text-black hover:bg-gray-600"}`}
                      onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      aria-label="Previous Page"
                    >
                      Previous
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <li key={index}>
                      <button
                        className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-white text-black hover:bg-gray-600"}`}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === totalPages ? "bg-transparent text-black cursor-not-allowed" : "bg-white text-black hover:bg-gray-600"}`}
                      onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      aria-label="Next Page"
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>

              {/* Transaction Details Modal */}
              {selectedTransaction && (
                <div className="fixed inset-0 text-black flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white rounded-lg p-6 w-11/12 max-w-md mx-auto">
                    <h3 className="text-lg font-semibold mb-4">Transaction Details</h3>
                    <p><strong>Transaction No:</strong> {selectedTransaction.transactionNo}</p>
                    <p><strong>Passenger Name:</strong> {selectedTransaction.passengerName}</p>
                    <p><strong>Driver Name:</strong> {selectedTransaction.driverName}</p>
                    <p><strong>Total Cost:</strong> ${selectedTransaction.totalCost.toFixed(2)}</p>
                    <p><strong>Coins in Wallet:</strong> {selectedTransaction.coinsInWallet}</p>
                    <p><strong>Status:</strong> {selectedTransaction.status}</p>
                    <button
                      onClick={closeModal}
                      className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>

            
        {/* )
      } */}

    </motion.div>
  );
};

export default TransactionTable;
