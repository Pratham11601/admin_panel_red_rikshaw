import { motion } from "framer-motion";
import { CheckCircle, XCircle, Clock, FileText, ArrowDownRight, ArrowUpRight } from "lucide-react";

const transactionOverviewData = [
  { name: "Total Transactions", value: "12,345", change: 5.5, icon: FileText },
  { name: "Completed Transactions", value: "9,876", change: 8.3, icon: CheckCircle },
  { name: "Pending Transactions", value: "1,234", change: -2.1, icon: Clock },
  { name: "Cancelled Transactions", value: "567", change: -1.5, icon: XCircle },
];

const TransactionOverviewCards = () => {
  return (
    <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'>
      {transactionOverviewData.map((item, index) => (
        <motion.div
          key={item.name}
          className='bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-xl
            rounded-xl p-6 border-b border-red-400'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className='flex items-center justify-between'>
            <div>
              <h3 className='text-sm font-medium text-black'>{item.name}</h3>
              <p className='mt-1 text-xl font-semibold text-black'>{item.value}</p>
            </div>

            <div
              className={`p-3 rounded-full bg-opacity-20 ${item.change >= 0 ? "bg-green-500" : "bg-red-500"}`}
            >
              <item.icon className={`size-6 ${item.change >= 0 ? "text-green-500" : "text-red-500"}`} />
            </div>
          </div>
          {/* <div
            className={`mt-4 flex items-center ${item.change >= 0 ? "text-green-500" : "text-red-500"}`}
          >
            {item.change >= 0 ? <ArrowUpRight size='20' /> : <ArrowDownRight size='20' />}
            <span className='ml-1 text-sm font-medium'>{Math.abs(item.change)}%</span>
            <span className='ml-2 text-sm text-gray-400'>vs last period</span>
          </div> */}
        </motion.div>
      ))}
    </div>
  );
};

export default TransactionOverviewCards;
