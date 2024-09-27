import { Car, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import SalesOverviewChart from "../components/Dashboard/SalesOverviewChart";
import CategoryDistributionChart from "../components/Dashboard/CategoryDistributionChart";
// import SalesChannelChart from "../components/overview/SalesChannelChart";

const Dashboard = () => {
    return (
        <main className='flex-1 overflow-auto relative z-10 bg-[#ffffff]'>
            <Header title='Dashboard' />

            {/* STATS */}
            <motion.div
                className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-12 mt-10 mx-3' // Horizontal margins for smaller screens
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <StatCard name='Total Rides' icon={Car} value='3,345' color='#6366F1' />
                <StatCard name='Running Rides' icon={Car} value='1,234' color='#8B5CF6' />
                <StatCard name='Completed Rides' icon={CheckCircle} value='567' color='#4CAF50' />
                <StatCard name='Cancelled Rides' icon={XCircle} value='12' color='#EF4444' />
            </motion.div>

            {/* CHARTS */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mx-3'>
                <div className="h-full">
                    <SalesOverviewChart />
                </div>
                <div className="h-full">
                    <CategoryDistributionChart />
                </div>
                {/* <SalesChannelChart /> */}
            </div>
        </main>
    );
};

export default Dashboard;
