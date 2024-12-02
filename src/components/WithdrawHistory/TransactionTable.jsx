import { motion } from "framer-motion";
import { Search, ArrowDownUp } from "lucide-react";
import { useEffect, useState } from "react";
import { ShimmerTable } from "react-shimmer-effects";
import usernotfound from "../../assets/usernotfound2.jpg";
import ApiConfig from "../../Consants/ApiConfig";

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("datetime"); // Default sort
  const [sortOrder, setSortOrder] = useState("desc"); // Default sort order
  const itemsPerPage = 10;

  

  // useEffect(() => {
  //   const fetchTransactionRequest = async () => {
  //     try {
  //       const token = localStorage.getItem("token"); // Retrieve token from localStorage
  //       const response = await fetch(ApiConfig.getTransactionHistoryEndPoint(), {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (!response.ok) {
  //         console.error(`Error fetching transactions: ${response.status} ${response.statusText}`);
  //         setIsLoading(false);
  //         return;
  //       }

  //       const data = await response.json();
  //       if (data && Array.isArray(data.items)) {
  //         // Sort transactions by createdAt
  //         const sortedData = data.items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  //         setTransactions(sortedData);
  //       } else {
  //         console.error("Invalid data format or missing transactions");
  //         setTransactions([]);
  //       }

  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching transaction data:", error);
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchTransactionRequest();
  // }, [sortBy, searchTerm]);

  useEffect(() => {
    const fetchTransactionRequest = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        const response = await fetch(
          `${ApiConfig.getTransactionHistoryEndPoint()}?page=${currentPage}&itemsPerPage=${itemsPerPage}`, // Add pagination parameters to the API request
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        if (!response.ok) {
          console.error(`Error fetching transactions: ${response.status} ${response.statusText}`);
          setIsLoading(false);
          return;
        }
  
        const data = await response.json();
        if (data && Array.isArray(data.items)) {
          // Sort transactions by createdAt
          const sortedData = data.items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setTransactions(sortedData);
          setTotalPages(data.totalPages); // Set totalPages from the API response
        } else {
          console.error("Invalid data format or missing transactions");
          setTransactions([]);
        }
  
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching transaction data:", error);
        setIsLoading(false);
      }
    };
  
    fetchTransactionRequest();
  }, [currentPage, sortBy, searchTerm]); // Add currentPage to the dependency array to re-fetch data when the page changes
  
  // Search functionality
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

  // Filter and sort the transactions
  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.UserDetails.userName.toLowerCase().includes(searchTerm) ||
      transaction.UserDetails.userRole.toLowerCase().includes(searchTerm) ||
      String(transaction.value).includes(searchTerm) ||
      String(transaction.createdAt).includes(searchTerm) ||
      transaction.status.toLowerCase().includes(searchTerm)
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
      return sortOrder === "desc" ? b.value - a.value : a.value - b.value;
    }
    if (sortBy === "datetime") {
      return sortOrder === "desc"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt);
    }
    return 0;
  });

  
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
  // const currentItems = sortedTransactions.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);  // Use filteredTransactions for pagination
  const currentItems = sortedTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return (
      date.toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" }) +
      " " +
      date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })
    );
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
        <h2 className="text-xl font-semibold text-black mb-4 md:mb-0">Withdraw History</h2>
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
      ) : filteredTransactions.length === 0 ? (
        <div className="text-black flex flex-col justify-center items-center">
          <img src={usernotfound} alt="No data" className="w-80 h-80" />
          <h1 className="text-lg font-semibold text-gray-600">No transaction found..!</h1>
        </div>
      ) : (
        <div className="TransactionRequestData">
          <motion.div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 shadow-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
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
