import React from 'react'
import Header from "../components/common/Header";
import TransactionTable from "../components/Transaction/TransactionTable";
import { ArrowRightLeft,CircleDollarSign} from "lucide-react";
import StatCard from '../components/common/StatCard';
import { motion } from "framer-motion";

function TransactionsDetails() {
  return (
    <div className="bg-white flex-1 overflow-auto relative z-10 text-black">
      <Header title="Transactions" />
      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
      <motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard
						name='Total Transactions'
						icon={ArrowRightLeft}
						value="13"
						color='#6366F1'
					/>
					<StatCard
						name='Total Amount' 
						icon={CircleDollarSign} 
						value="2035"
						color='#10B981' 
					/>
				</motion.div>

					<TransactionTable />
			</main>
    </div>
  )
}

export default TransactionsDetails