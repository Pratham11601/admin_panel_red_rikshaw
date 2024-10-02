import { motion } from "framer-motion";
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { Users, PlusCircle, CheckCircle, XCircle } from 'lucide-react';
import ProductsTable from "../components/Passengers/PassengerTable";

const Passengers = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Passangers' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8 bg-white'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Passengers' icon={Users} value={1234} color='#6366F1' />
					<StatCard name='Active Passengers' icon={CheckCircle} value={230} color='#F59E0B' />
					<StatCard name='Inactive Passengers' icon={XCircle} value={210} color='#EF4444' />

				</motion.div>

				<ProductsTable />

				{/* CHARTS */}
				{/* <div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
					<SalesTrendChart />
					<CategoryDistributionChart />
				</div> */}
			</main>
		</div>
	);
};
export default Passengers;
