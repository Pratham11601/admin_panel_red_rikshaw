import { UserSearchIcon,BarChart2, DollarSign, Menu, Users, Car, Lock, ArrowRightLeft, Megaphone, ChevronDown, X, CreditCard } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from '../../assets/logo2.png';

const SIDEBAR_ITEMS = [
  { name: "SearchUser", icon: UserSearchIcon, color: "black", href: "/Home/searchuser" },
  { name: "Statistics", icon: BarChart2, color: "black", href: "/Home/Dashboard" },
  { name: "Passengers", icon: Users, color: "black", href: "/Home/passengers" },
  { name: "Drivers", icon: Users, color: "black", href: "/Home/drivers" },
  { name: "Rides", icon: Car, color: "black", href: "/Home/rides" },
  { name: "Transactions", icon: DollarSign, color: "black", href: "/Home/transactions" },
  { name: "Withdraw History", icon: ArrowRightLeft, color: "black", href: "/Home/withdrawHistory" },
  { name: "Withdraw Request", icon: ArrowRightLeft, color: "black", href: "/Home/withdrawrequest" },
  { name: "Advertisement", icon: Megaphone, color: "black", href: "#" },
  { name: "Charges", icon: CreditCard, color: "black", href: "/Home/charges" },
  { name: "T & C", icon: Lock, color: "black", href: "/Home/terms" },
  { name: "Privacy Policy", icon: Lock, color: "black", href: "/Home/privacy" },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAdMenuOpen, setIsAdMenuOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleItemClick = (href) => {
    setSelectedItem(href);
    // Close the advertisement submenu when selecting other items
    if (href !== "advertisement") {
      setIsAdMenuOpen(false);
    }
    // Close mobile sidebar on selection
    if (window.innerWidth < 768) {
      setIsMobileSidebarOpen(false);
    }
  };

  const handleAdClick = () => {
    setIsAdMenuOpen((prevState) => !prevState);
  };

  return (
    <>
      {/* Sidebar toggle button for mobile view */}
      <button
        className="md:hidden fixed top-4 left-4 z-20 p-2 bg-gray-200 rounded-full shadow-lg"
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      >
        {isMobileSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile sidebar */}
      <motion.div
        className={`fixed inset-y-0 left-0 z-30 bg-white shadow-lg w-64 p-4 transition-all duration-300 transform md:hidden ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent
          isSidebarOpen={true}
          setIsSidebarOpen={setIsSidebarOpen}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          isAdMenuOpen={isAdMenuOpen}
          setIsAdMenuOpen={setIsAdMenuOpen}
          handleItemClick={handleItemClick}
          handleAdClick={handleAdClick}
        />
      </motion.div>

      {/* Desktop sidebar */}
      <motion.div
        className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 hidden md:block ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
        animate={{ width: isSidebarOpen ? 256 : 80 }}
      >
        <SidebarContent
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          isAdMenuOpen={isAdMenuOpen}
          setIsAdMenuOpen={setIsAdMenuOpen}
          handleItemClick={handleItemClick}
          handleAdClick={handleAdClick}
        />
      </motion.div>
    </>
  );
};

const SidebarContent = ({
  isSidebarOpen,
  setIsSidebarOpen,
  selectedItem,
  handleItemClick,
  isAdMenuOpen,
  handleAdClick,
}) => (
  <div className="h-full bg-gradient-to-b from-white via-gray-50 to-red-300 bg-opacity-90 backdrop-blur-md p-4 flex flex-col">
    <div className="flex justify-between items-center">
      <div className={`flex items-center ${isSidebarOpen ? 'mr-4' : 'justify-center'}`}>
        <img src={logo} alt="Logo" className={`transition-all ${isSidebarOpen ? 'w-12' : 'w-7'}`} />
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="p-2 rounded-full hover:bg-[#ffffff] transition-colors max-w-fit"
      >
        <Menu size={24} color="black" />
      </motion.button>
    </div>

    <nav className="mt-8 flex-grow overflow-y-auto"> {/* Enable scrolling here */}
      {SIDEBAR_ITEMS.map((item) =>
        item.name === "Advertisement" ? (
          <div key={item.name}>
            <motion.div
              className={`flex items-center p-4 text-sm font-medium rounded-lg mb-2 text-black ${
                selectedItem === item.href ? "bg-red-300 " : "hover:bg-[#ffffff]"
              }`}
              onClick={handleAdClick}
            >
              <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.span
                    className="ml-4 whitespace-nowrap"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2, delay: 0.3 }}
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
              {isSidebarOpen && <ChevronDown className="ml-auto" size={16} />}
            </motion.div>

            {/* Submenu for Advertisement */}
            <AnimatePresence>
              {isAdMenuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="pl-8"
                >
                  <Link to="/Home/passangerAd" onClick={() => handleItemClick("passengerAd")}>
                    <motion.div className="p-2 text-sm font-medium rounded-lg mb-2 text-black hover:bg-[#ffffff]">
                      Passenger Ad
                    </motion.div>
                  </Link>
                  <Link to="/Home/driverAd" onClick={() => handleItemClick("driverAd")}>
                    <motion.div className="p-2 text-sm font-medium rounded-lg text-black hover:bg-[#ffffff]">
                      Driver Ad
                    </motion.div>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link key={item.href} to={item.href} onClick={() => handleItemClick(item.href)}>
            <motion.div
              className={`flex items-center p-4 text-sm font-medium rounded-lg mb-2 text-black ${
                selectedItem === item.href ? "bg-red-300 " : "hover:bg-[#ffffff]"
              }`}
            >
              <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.span
                    className="ml-4 whitespace-nowrap"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2, delay: 0.3 }}
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>
        )
      )}
    </nav>
  </div>
);

export default Sidebar;
