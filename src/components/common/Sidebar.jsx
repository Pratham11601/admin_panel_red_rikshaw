

import { BarChart2, DollarSign, Menu, Users, Car, Lock } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from '../../assets/logo2.png'; 

const SIDEBAR_ITEMS = [
	{
		name: "Dashboard",
		icon: BarChart2,
		color: "black",
		href: "/Home/Dashboard",
	},
	{ name: "Passengers", icon: Users, color: "black", href: "/Home/passengers" },
	{ name: "Drivers", icon: Users, color: "black", href: "/Home/drivers" },
	{ name: "Rides", icon: Car, color: "black", href: "/Home/rides" },
	{ name: "Transaction", icon: DollarSign, color: "black", href: "/Home/transaction" },
	{ name: "T & C", icon: Lock, color: "black", href: "/Home/terms" },
	{ name: "Privacy Policy", icon: Lock, color: "black", href: "/Home/privacy" },
];

const Sidebar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	return (
		<motion.div
			className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSidebarOpen ? "w-64" : "w-20"}`}
			animate={{ width: isSidebarOpen ? 256 : 80 }}
		>
			{/* Add gradient background with light gray shades */}
			<div
				className='h-full bg-gradient-to-b from-white via-gray-50 to-red-300 bg-opacity-90 backdrop-blur-md p-4 flex flex-col'
			>
				{/* Adjust Flexbox to align logo and button in one line */}
				<div className="flex justify-between items-center">
					{/* Logo */}
					<div className={`flex items-center ${isSidebarOpen ? 'mr-4' : 'justify-center'}`}>
						<img 
							src={logo} 
							alt="Logo" 
							className={`transition-all ${isSidebarOpen ? 'w-12' : 'w-7'}`} 
						/>
					</div>
					
					{/* Sidebar Toggle Button */}
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={() => setIsSidebarOpen(!isSidebarOpen)}
						className='p-2 rounded-full hover:bg-[#ffffff] transition-colors max-w-fit'
					>
						<Menu size={24} color="black" />
					</motion.button>
				</div>

				<nav className='mt-8 flex-grow'>
					{SIDEBAR_ITEMS.map((item) => (
						<Link key={item.href} to={item.href}>
							<motion.div className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-[#ffffff] transition-colors mb-2 text-black'>
								<item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
								<AnimatePresence>
									{isSidebarOpen && (
										<motion.span
											className='ml-4 whitespace-nowrap'
											initial={{ opacity: 0, width: 0 }}
											animate={{ opacity: 1, width: "auto" }}
											exit={{ opacity: 0, width: 0 }}
											transition={{ duration: 0.2, delay: 0.3 }}
										>
											{item.name}
										</motion.span>
									)}
								</AnimatePresence>
							</motion.div>
						</Link>
					))}
				</nav>
			</div>
		</motion.div>
	);
};

export default Sidebar;
