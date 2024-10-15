import { motion } from "framer-motion";
import Header from "../components/common/Header";
import TransactionReqTable from "../components/WithdrawRequest/TransactionReqTable";




const TransactionRequest = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Withdraw Request' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8 bg-white'>
				<TransactionReqTable/>

			
				
			</main>
		</div>
	);
};
export default TransactionRequest;