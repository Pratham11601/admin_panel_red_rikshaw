import Header from "../components/common/Header";

//import OverviewCards from "../components/analytics/OverviewCards";
// import RevenueChart from "../components/analytics/RevenueChart";
// import ChannelPerformance from "../components/analytics/ChannelPerformance";
// import ProductPerformance from "../components/analytics/ProductPerformance";
// import UserRetention from "../components/analytics/UserRetention";
// import CustomerSegmentation from "../components/analytics/CustomerSegmentation";
// import AIPoweredInsights from "../components/analytics/AIPoweredInsights";
import Transactions from "../components/Transaction/TransactionTable";
import Card from "../components/Transaction/TrancationOverview";

const TransactionPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10 bg-white'>
			<Header title={"Transactions Details"} />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<Card />


					<Transactions />
			</main>
		</div>
	);
};
export default TransactionPage;
