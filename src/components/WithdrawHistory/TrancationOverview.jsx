import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { CheckCircle, XCircle, Clock, FileText } from "lucide-react";
import ApiConfig from "../../Consants/ApiConfig"; // Ensure the correct path to ApiConfig

const TransactionOverviewCards = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch transaction data
  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage

        const response = await fetch(ApiConfig.getTransactionRequestEndPoint(), {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        const transactions = data.items || []; 
        setTransactionData(transactions);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching transaction data:", error);
        setIsLoading(false);
      }
    };

    fetchTransactionData();
  }, []);

  // Memoize transaction statistics calculation to avoid recalculating on every render
  const transactionStatistics = useMemo(() => {
    const totalTransactions = transactionData.length;
    const completedTransactions = transactionData.filter(t => t.status === "completed").length;
    const pendingTransactions = transactionData.filter(t => t.status === "pending").length;
    const cancelledTransactions = transactionData.filter(t => t.status === "cancelled").length;

    return {
      totalTransactions,
      completedTransactions,
      pendingTransactions,
      cancelledTransactions
    };
  }, [transactionData]);

  const transactionOverviewData = [
    { name: "Total Transactions", value: transactionStatistics.totalTransactions, change: 0, icon: FileText },
    { name: "Completed Transactions", value: transactionStatistics.completedTransactions, change: 0, icon: CheckCircle },
    { name: "Pending Transactions", value: transactionStatistics.pendingTransactions, change: 0, icon: Clock },
    { name: "Cancelled Transactions", value: transactionStatistics.cancelledTransactions, change: 0, icon: XCircle },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      {isLoading ? (
        <div>Loading...</div> // You can replace this with a loading spinner or skeleton loader
      ) : (
        transactionOverviewData.map((item, index) => (
          <motion.div
            key={item.name}
            className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-xl rounded-xl p-6 border-b border-red-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-black">{item.name}</h3>
                <p className="mt-1 text-xl font-semibold text-black">{item.value}</p>
              </div>

              <div
                className={`p-3 rounded-full bg-opacity-20 ${item.change >= 0 ? "bg-green-500" : "bg-red-500"}`}
              >
                <item.icon className={`h-6 w-6 ${item.change >= 0 ? "text-green-500" : "text-red-500"}`} />
              </div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
};

export default TransactionOverviewCards;
