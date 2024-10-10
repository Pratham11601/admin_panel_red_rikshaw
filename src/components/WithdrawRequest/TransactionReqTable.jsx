import { motion } from "framer-motion";
import { Search, ArrowDownUp } from "lucide-react";
import { useEffect, useState } from "react";
import TRANSACTION_DATA from "../WithdrawHistory/DATA";
import { FadeLoader } from "react-spinners";
import ApiConfig from '../../Consants/ApiConfig';
import { ShimmerTable } from "react-shimmer-effects";
import usernotfound from '../../assets/usernotfound2.jpg';


const TransactionReqTable = () => {
const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newly-added"); // Default sort
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order
  const [selectedtransaction,setSelectedtransaction] = useState(null);
  const itemsPerPage = 10;

  // Search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1);
  };
  // Handle sort change
  const handleSortChange = (field) => {
    if (sortBy === field) {
      // Toggle the sort order if the same field is clicked again
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set the new field and default sort order to ascending
      setSortBy(field);
      setSortOrder("asc");
    }
  };
  useEffect(() => {
    const fetchTransactionRequest = async () => {
      try {
        const response = await fetch(ApiConfig.getTransactionRequestEndPoint());
        const data = await response.json();
        const transaction = data.items;

        setIsLoading(false);

        if (Array.isArray(transaction)) {
          setTransactions(transaction);
        } else {
          console.error('Failed to fetch Rides Data');
        }
      } catch (error) {
        console.error('Error fetching privacy policies:', error);
      }
    };

    fetchTransactionRequest();
 
  }, [sortBy, searchTerm]);



  // Filter and sort the ride data
  const filteredTransaction = transactions.filter(
    (transaction) =>
        transaction.UserDetails.userName.toLowerCase().includes(searchTerm.toLowerCase())||
        transaction.UserDetails.userRole.toLowerCase().includes(searchTerm.toLowerCase())||
        String(transaction.value).includes(searchTerm) ||
        String(transaction.createdAt).includes(searchTerm) ||  
        transaction.status.toLowerCase().includes(searchTerm.toLowerCase()) 
  );


  // Sort the rides based on selected field
  const sortedTransactions = [...filteredTransaction].sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc"
        ? a.UserDetails.userName.localeCompare(b.name)
        : b.UserDetails.userName.localeCompare(a.name);
    }
    if (sortBy === "role") {
      return sortOrder === "asc"
        ? a.UserDetails.userRole.localeCompare(b.role)
        : b.UserDetails.userRole.localeCompare(a.role);
    }
    if (sortBy === "value") {
      return sortOrder === "asc" ? a.value - b.value : b.value - a.value;
    }
    if (sortBy === "status") {
      return sortOrder === "asc"
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status);
    }
    if (sortBy === "datetime") {
      return sortOrder === "asc"
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

  // Page change handler
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle View action
  const handleViewTransactionDetails = (transaction) => {
    setSelectedtransaction(transaction);
  };
  
  // Close Modal
  const closeModal = () => {
    setSelectedtransaction(null);
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

      {/* Table Section */}
      {isLoading ? (
        <div className="border border-gray-300">
          <ShimmerTable row={10} col={7} />
        </div>
      ) : 
      (
        <>
            {/* Check if filteredRides is empty */}
          {filteredTransaction.length === 0 ? (
            <div className="text-black flex flex-col justify-center items-center ">
                <img src={usernotfound} alt="" className="w-80 h-80" />
                <h1 className="text-lg font-semibold text-gray-600">No transaction found..!</h1>
            </div>

          ) : (
            <div className="TransactionRequestData">
                <motion.div 
                     className="overflow-x-auto"
                >
                <table className="min-w-full bg-white border border-gray-300 shadow-lg">
                    <thead>
                    <tr className="h-12 bg-gray-200">    


                        <th
                        className="px-6 py-3 text-center text-sm font-medium text-black uppercase  cursor-pointer"
                        onClick={() => handleSortChange("name")}
                        >
                            <span className="flex" >Name<ArrowDownUp className="pl-2"/></span>
                        </th>
                        <th
                        className="px-6 py-3 text-center text-sm font-medium text-black uppercase  cursor-pointer"
                        onClick={() => handleSortChange("role")}
                        >
                            <span className="flex">Role<ArrowDownUp className="pl-2"/></span>
                        </th>
                        <th
                        className="px-6 py-3 text-center text-sm font-medium text-black uppercase cursor-pointer"
                        onClick={() => handleSortChange("value")}
                        >
                            <span className="flex">Value<ArrowDownUp className="pl-2"/></span>
                        </th>
                        <th className="  px-6 py-3 text-center text-sm font-medium text-black uppercase cursor-pointer "
                            onClick={() => handleSortChange("datetime")}
                        >
                            <span className="flex"> Date/Time<ArrowDownUp className="pl-2"/></span>
                       
                        </th>
                        <th className="  px-6 py-3 text-center text-sm font-medium text-black uppercase cursor-pointer"
                            onClick={() => handleSortChange("status")}
                        >
                            <span className="flex"> Status<ArrowDownUp className="pl-2"/></span>
                       
                        </th>
                        <th className="px-6 py-3 text-center text-sm font-medium text-black uppercase "
                        >
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {currentItems.map((transaction) => (
                        <motion.tr
                        // key={ride._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-800 transform transition duration-300 ease-in-out hover:scale-104 hover:bg-gray-100 hover:shadow-lg"
                        >
 
                        <td className="px-6 py-4 text-left text-sm  text-black ">
                            {transaction.UserDetails.userName}
                        </td>
                        <td className="px-6 py-4  text-left text-sm  text-black">
                            {transaction.UserDetails.userRole}
                        </td>
                        <td className="px-6 py-4  text-left text-sm text-black">
                            {transaction.value}
                        </td>
                        <td className="px-6 py-4 text-left text-sm  text-black  ">
                            {transaction.createdAt}
                        </td>
                        <td className="px-6 py-4 text-left text-sm text-black  ">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              transaction.status === "completed"
                                ? "bg-green-200 text-green-900"
                                : transaction.status === "pending"
                                ? "bg-yellow-200 text-yellow-900"
                                : "bg-red-200 text-red-900"
                            }`}>
                                {transaction.status}
                            </span>
                        </td>
                        <td className="px-3 py-4  text-center text-sm  text-black">
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
                       
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                <li>

                
                <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(filteredTransaction.length / itemsPerPage)}
                className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === totalPages ? "bg-transparent text-black cursor-not-allowed" : "bg-white text-black hover:bg-gray-600"}`}
                >
                Next
                </button>
                </li>
                </ul>
            </div>

            {/* View Invoice Modal */}
            {selectedtransaction && (
                <div className="fixed inset-0 text-black bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Edit Transaction</h2>
                    <p>Name : </p>
                    <p>Role :</p>
                    <p>Date/Time :</p>
                    <p>Value :</p>
                    <button
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                    onClick={closeModal}
                    >
                    Close
                    </button>
                </div>
                </div>
            
            
                )
            }
            </div>
          )
          }

        </>
    )}
    </motion.div>
  );
};

export default TransactionReqTable;
