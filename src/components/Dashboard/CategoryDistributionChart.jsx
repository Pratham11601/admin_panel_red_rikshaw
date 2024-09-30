import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const categoryData = [
    { name: "Complete Rides", value: 500 },
    { name: "Running Rides", value: 200 },
    { name: "Cancelled", value: 300 },
];

const COLORS = ["#00AC07", "#DC8400", "#F10000"];

const CategoryDistributionChart = ({data}) => {
    return (
        <motion.div
            className='bg-white bg-opacity-20 backdrop-blur-md shadow-xl rounded-xl p-6 border-l border-red-400'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            <h2 className='text-lg font-medium mb-4 text-black'>Trip Statistics</h2>
            <div className='h-80 w-full'> {/* Set a specific height and full width */}
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx={"50%"}
                            cy={"50%"}
                            labelLine={false}
                            outerRadius={80}
                            dataKey='value'
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(31, 41, 55, 0.9)",
                                borderColor: "#4B5563",
                                borderRadius: "8px",
                                padding: "10px",
                            }}
                            itemStyle={{ color: "#E5E7EB" }}
                        />
                        <Legend
                            layout="vertical"
                            verticalAlign="middle"
                            align="right"
                            wrapperStyle={{
                                paddingLeft: '20px',
                                color: '#4B5563',
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default CategoryDistributionChart;
