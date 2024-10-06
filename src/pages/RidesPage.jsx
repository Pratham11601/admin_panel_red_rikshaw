import { motion } from "framer-motion";
import Header from "../components/common/Header";
import Rides from "../components/Rides/RideTable";
import StatCard from "../components/common/StatCard";
import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";

const RidesPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Rides' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8 bg-white'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard
						name='Total Rides'
						icon={UsersIcon}
						value='35'
						color='#6366F1'
					/>
					<StatCard 
						name='Completed Rides' 
						icon={UserPlus} 
						value='20' 
						color='#10B981' 
					/>
					<StatCard
						name='Pending Rides'
						icon={UserCheck}
						value='5'
						color='#F59E0B'
					/>
					<StatCard 
						name='Cancelled Rides' 
						icon={UserX} 
						value='10'
						color='#EF4444' 
					/>
				</motion.div>
				<Rides />
				
			</main>
		</div>
	);
};
export default RidesPage;
