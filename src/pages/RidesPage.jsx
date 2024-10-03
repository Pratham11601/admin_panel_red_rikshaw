import { motion } from "framer-motion";
import Header from "../components/common/Header";
import Rides from "../components/Rides/RideTable";



const RidesPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Rides' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8 bg-white'>
				<Rides />
				
			</main>
		</div>
	);
};
export default RidesPage;
