import Header from "../components/common/Header";
import WithdrawHistoryTable from "../components/WithdrawHistory/TransactionTable";
//import TrancationOverview from "../components/WithdrawHistory/TrancationOverview";

const TransactionPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10 bg-white'>
			<Header title={"Withdraw History"} />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
					{/* <TrancationOverview /> */}

					<WithdrawHistoryTable />
			</main>
		</div>
	);
};
export default TransactionPage;
