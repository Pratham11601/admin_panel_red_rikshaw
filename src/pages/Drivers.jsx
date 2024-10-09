// Driversdata
import React, { useState, useEffect } from "react";
import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";
import ApiConfig from '../Consants/ApiConfig'
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import UsersTable from "../components/Drivers/UsersTable";



const Drivers = () => {
	const [totalDriver,setTotalDriver] = useState(0);
	const [activeDriver,setActiveDriver] = useState(0);
	const [inactiveDriver,setInactiveDriver] = useState(0);
	const active=0;
	const inactive=0;
	useEffect(() => {
		const fetchDrivers = async () => {

			try {
			  fetch(ApiConfig.getDriversEndpoint())
				.then((response) => response.json())
				.then((data) => {  
				  setTotalDriver(data.totalUsers);

				  const active = data.data.filter(driver => driver.isActive === true);
				  const inactive = data.data.filter(driver => driver.isActive === false);

				  
				  setActiveDriver(active.length);
				  setInactiveDriver(inactive.length);
				  
				  
			
			  })
			} catch (error) {
				console.error('Error fetching Rides Data', error);
			}
		};
	
		fetchDrivers();
			
	
	}, []);
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Drivers' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8 bg-white'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard
						name='Total Drivers'
						icon={UsersIcon}
						value={totalDriver.toLocaleString()}
						color='#6366F1'
					/>
					{/* <StatCard 
						name='New Drivers Today' 
						icon={UserPlus} 
						// value={userStats.newUsersToday} 
						color='#10B981' 
					/> */}
					<StatCard
						name='Active Drivers'
						icon={UserCheck}
						value={activeDriver.toLocaleString()}
						color='#F59E0B'
					/>
					<StatCard 
						name='Inactive Users' 
						icon={UserX} 
						value={inactiveDriver.toLocaleString()} 
						color='#EF4444' 
					/>
				</motion.div>
				{/* <Demo/>	 */}


				<UsersTable />

				{/* USER CHARTS */}
				{/* <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
					<UserGrowthChart />
					<UserActivityHeatmap />
					<UserDemographicsChart />
				</div> */}
			</main>
		</div>
	);
};
export default Drivers;
