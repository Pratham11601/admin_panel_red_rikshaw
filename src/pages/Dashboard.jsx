import React, { useState, useEffect } from "react";
import { Car, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import ApiConfig from '../Consants/ApiConfig'
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
//import SalesOverviewChart from "../components/Dashboard/SalesOverviewChart";
import CategoryDistributionChart from "../components/Dashboard/CategoryDistributionChart";
import BarGraph from "../components/Dashboard/Bargaph";

const Dashboard = () => {
    const [totalRides,setTotalRides] = useState(0);
	const [runningRides,setRunningRides] = useState(0);
	const [completedRides,setCompletedRides] = useState(0);
    const [cancelledRides,setCancelledRides] = useState(0);

    const [pieChartData, setPieChartData] = useState([]);
    
  useEffect(() => {

    const fetchRides = async () => {
        try {
          fetch(ApiConfig.getDashboardData())
            .then((response) => response.json())
            .then((data) => {

              setTotalRides(data.Todays_Rides);
              setRunningRides(data.rides.ongoing);
              setCompletedRides(data.rides.completed);
              setCancelledRides(data.rides.canceled);
              console.log(data.rides);
              
              const ridesArray = Object.entries(data.rides).map(([name, value]) => ({ name, value }));

              setPieChartData(ridesArray);
              

          })
        } catch (error) {
            console.error('Error fetching privacy policies:', error);
        }
    };

    fetchRides();
        
}, []);



    return (
        <main className='flex-1 overflow-auto relative z-10 bg-[#ffffff]'>
            <Header title='Statistics' />

            {/* STATS */}
            <motion.div
                className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-12 mt-10 mx-3' // Horizontal margins for smaller screens
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <StatCard name='Total Rides' icon={Car} value={totalRides} color='#6366F1' />
                <StatCard name='Running Rides' icon={Car} value={runningRides} color='#8B5CF6' />
                <StatCard name='Completed Rides' icon={CheckCircle} value={completedRides} color='#4CAF50' />
                <StatCard name='Cancelled Rides' icon={XCircle} value={cancelledRides} color='#EF4444' />
            </motion.div>

            {/* CHARTS */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mx-3'>
                <div className="h-full">
                    <BarGraph />
                </div>
                <div className="h-full">
                    <CategoryDistributionChart data={pieChartData} />
                </div>
        
            </div>
        </main>
    );
};

export default Dashboard;
