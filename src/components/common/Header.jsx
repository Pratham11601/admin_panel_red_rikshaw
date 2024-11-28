


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
    window.location.reload(); // Refresh the page
  };

  return (
    <header className="bg-[#ffffff] bg-opacity-100 backdrop-blur-md shadow-lg border-b border-[#F8F9EC]">
      <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Title */}
        <h1 className="text-xl font-semibold text-black">{title}</h1>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Refresh button */}
          <div onClick={handleRefresh} className="cursor-pointer">
            <motion.div
              className="flex items-center p-2 text-sm font-medium rounded-lg transition-colors"
            >
              <RefreshCw size={20} style={{ color: "black", minWidth: "20px" }} />
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.span
                    className="ml-2 whitespace-nowrap"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2, delay: 0.3 }}
                  >
                    Refresh
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Logout button */}
          <div onClick={handleLogout} className="cursor-pointer">
            <motion.div
              className="flex items-center p-2 text-sm font-medium rounded-lg transition-colors"
            >
              <LogOut size={20} style={{ color: "black", minWidth: "20px" }} />
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.span
                    className="ml-2 whitespace-nowrap"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2, delay: 0.3 }}
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
