import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const salesData = [
	{ name: "Jul", sales: 4200 },
	{ name: "Aug", sales: 3800 },
	{ name: "Sep", sales: 100 },
	{ name: "Oct", sales: 4600 },
	{ name: "Nov", sales: 5400 },
	{ name: "Dec", sales: 4200 },
	{ name: "Jan", sales: 6100 },
	{ name: "Feb", sales: 5900 },
	{ name: "Mar", sales: 5800 },
	{ name: "Apr", sales: 6300 },
	{ name: "May", sales: 7100 },
	{ name: "Jun", sales: 12500 },
];

const SalesOverviewChart = () => {
	return (
		<motion.div
			className='bg-white bg-opacity-50 backdrop-blur-md shadow-xl rounded-xl p-6 border-l border-red-400'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<h2 className='text-lg font-medium mb-4 text-black'>Monthly Earning</h2>

			<div className='h-80'>
				<ResponsiveContainer width={"90%"} height={"90%"}>
						<LineChart data={salesData}>
							<CartesianGrid vertical={false} strokeDasharray="3 3" /> {/* Horizontal grid lines */}
							<XAxis dataKey={"name"} stroke='black' />
							<YAxis stroke='black' />
							<Tooltip
								contentStyle={{
									backgroundColor: "rgba(31, 41, 55, 0.8)",
									borderColor: "black",
								}}
								itemStyle={{ color: "#E5E7EB" }}
							/>
							<Line
								type='monotone'
								dataKey='sales'
								stroke='purple'
								strokeWidth={2}
								dot={{ fill: "#575551", strokeWidth: 1, r: 3 }}
								activeDot={{ r: 8, strokeWidth: 1 }}
							/>
						</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default SalesOverviewChart;
