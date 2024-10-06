import { motion } from "framer-motion";
import { Search, ArrowDownUp } from "lucide-react";
import { useState } from "react";
import TRANSACTION_DATA from "../Transaction/DATA"; // Ensure the path is correct

const TransactionTable = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newly-added"); // Default sort field
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const itemsPerPage = 10;

  // Search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1); // Reset to first page on new search
  };

  // Sort functionality
  const handleSortChange = (field) => {
    // Toggle the sort order if the same field is clicked
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setSortBy(field);
    setCurrentPage(1); // Reset to first page on sort change
  };

  // Filter and sort the transaction data based on search and sort conditions
  const filteredTransactions = TRANSACTION_DATA.filter(
    (transaction) =>
      transaction.passengerName.toLowerCase().includes(searchTerm) ||
      transaction.driverName.toLowerCase().includes(searchTerm) ||
      transaction.transactionNo.toLowerCase().includes(searchTerm)
  );

  // Sort transactions by selected field and order
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === "transactionNo") {
      return sortOrder === "asc"
        ? a.transactionNo.localeCompare(b.transactionNo)
        : b.transactionNo.localeCompare(a.transactionNo);
    }
    if (sortBy === "passengerName") {
      return sortOrder === "asc"
        ? a.passengerName.localeCompare(b.passengerName)
        : b.passengerName.localeCompare(a.passengerName);
    }
    if (sortBy === "driverName") {
      return sortOrder === "asc"
        ? a.driverName.localeCompare(b.driverName)
        : b.driverName.localeCompare(a.driverName);
    }
    if (sortBy === "totalCost") {
      return sortOrder === "asc" ? a.totalCost - b.totalCost : b.totalCost - a.totalCost;
    }
    if (sortBy === "coinsInWallet") {
      return sortOrder === "asc" ? a.coinsInWallet - b.coinsInWallet : b.coinsInWallet - a.coinsInWallet;
    }
    if (sortBy === "status") {
      return sortOrder === "asc"
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status);
    }
    return 0;
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

  // Close Modal
  const closeModal = () => {
    setSelectedTransaction(null);
  };

  return (
    <motion.div className="bg-white bg-opacity-50 backdrop-blur-md shadow-xl rounded-xl p-6 border-r border-red-400 mb-8">
      {/* Transaction List */}
      <div className="transactionData">
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
          <label htmlFor="sort" className="text-black mr-2 mb-2 md:mb-0">Sort By:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="bg-white text-black rounded-lg px-4 py-2 w-full md:w-auto border"
          >
            <option value="transactionNo">Transaction No</option>
            <option value="passengerName">Passenger Name</option>
            <option value="driverName">Driver Name</option>
            <option value="totalCost">Total Cost</option>
            <option value="coinsInWallet">Coins in Wallet</option>
            <option value="status">Status</option>
          </select>
        </div>

        {/* Transaction Table */}
        <motion.div className="overflow-x-auto mt-8">
          <table className="min-w-full bg-white border border-gray-300 shadow-lg">
            <thead>
              <tr className="h-12 bg-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase cursor-pointer"
                  onClick={() => handleSortChange("transactionNo")}>
                  <span className="flex">Transaction No <ArrowDownUp className="pl-2 pb-2" /></span>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase cursor-pointer"
                  onClick={() => handleSortChange("passengerName")}>
                  <span className="flex">Passenger <ArrowDownUp className="pl-2 pb-2" /></span>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase cursor-pointer"
                  onClick={() => handleSortChange("driverName")}>
                  <span className="flex">Driver <ArrowDownUp className="pl-2 pb-2" /></span>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase cursor-pointer"
                  onClick={() => handleSortChange("totalCost")}>
                  <span className="flex">Total Cost <ArrowDownUp className="pl-2 pb-2" /></span>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase  hidden sm:table-cell cursor-pointer"
                  onClick={() => handleSortChange("coinsInWallet")}>
                  <span className="flex align-center justify-center">Coins in Wallet <ArrowDownUp className="pl-2 pb-2" /></span>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase cursor-pointer "
                  onClick={() => handleSortChange("status")}>
                  <span className="flex">Status <ArrowDownUp className="pl-2 pb-2" /></span>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase ">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {currentItems.map((transaction) => (
                <motion.tr key={transaction.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
                  className="text-gray-200 transform transition duration-300 ease-in-out hover:scale-104 hover:bg-gray-100 hover:shadow-lg"
                >
                  <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-black  max-w-xs">{transaction.transactionNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{transaction.passengerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{transaction.driverName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">${transaction.totalCost.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black  sm:table-cell">{transaction.coinsInWallet}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.status === "Completed"
                        ? "bg-green-200 text-green-900"
                        : transaction.status === "Pending"
                        ? "bg-yellow-200 text-yellow-900"
                        : "bg-red-200 text-red-900"
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    <button
                      className="text-blue-500 "
                      onClick={() => handleView(transaction)}
                    >
                      View
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`mx-1 px-4 py-2 rounded-lg ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default TransactionTable;
