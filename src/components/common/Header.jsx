
import { LogOut, RefreshCw } from "lucide-react"; 
import { Link, useNavigate } from "react-router-dom"; 
import { motion, AnimatePresence } from "framer-motion"; 

const Header = ({ title, isSidebarOpen, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Call any logout logic
    if (onLogout) {
      onLogout(); 
    }
    navigate("/login"); 
  };

  const handleRefresh = () => {
    window.location.reload(); 
  };

  return (
    <header className="bg-[#ffffff] bg-opacity-100 backdrop-blur-md shadow-lg border-b border-[#F8F9EC]">
      <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Title */}
        <h1 className="text-xl font-semibold text-black">{title}</h1>

        {/* Actions */}
        <div className="flex items-center space-x-4">
        {/* Refresh button */}
        <div 
          onClick={handleRefresh} 
          className="cursor-pointer group"
        >
          <motion.div
              className="flex items-center p-2 text-sm font-medium rounded-md bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-300"
            // className="flex items-center p-2 text-sm font-medium rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors shadow-sm hover:shadow-md"
          >
            <RefreshCw 
              size={20} 
              className="transition-transform transform group-hover:rotate-90 duration-300" 
            />
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.span
                  className="ml-2 whitespace-nowrap text-sm font-medium"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                >
                  Refresh
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </div>


          {/* Logout button */}
          <div 
            onClick={handleLogout} 
            className="cursor-pointer group"
          >
            <motion.div
                className="flex items-center p-2 text-sm font-medium rounded-md bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white shadow-md hover:shadow-lg transition-all duration-300"
              // className="flex items-center p-2 text-sm font-medium rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors shadow-sm hover:shadow-md"
            >
              <LogOut 
                size={20} 
                className="transition-transform transform group-hover:translate-x-1 duration-300" 
              />
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.span
                    className="ml-2 whitespace-nowrap text-sm font-medium"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2, delay: 0.2 }}
                  >
                    Logout
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
