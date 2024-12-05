

import { UserSearchIcon,BarChart2, DollarSign, Menu, Users, Car, Lock, ArrowRightLeft, Megaphone, ChevronDown, X, CreditCard, Gift, ArrowDownCircle, HelpCircle } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../../assets/logo2.png";

const SIDEBAR_ITEMS = [
  { name: "Search User", icon: UserSearchIcon, color: "black", href: "/Home/searchuser" },
  { name: "Passengers", icon: Users, color: "black", href: "/Home/passengers" },
  { name: "Drivers", icon: Users, color: "black", href: "/Home/drivers" },
  { name: "Rides", icon: Car, color: "black", href: "/Home/rides" },
  { name: "Transactions", icon: DollarSign, color: "black", href: "/Home/transactions" },
  { name: "Withdraw History", icon: ArrowDownCircle, color: "black", href: "/Home/WithdrawHistory" },
  { name: "Withdraw Requests", icon: ArrowRightLeft, color: "black", href: "/Home/WithdrawRequest" },
  { name: "Advertisement", icon: Megaphone, color: "black", href: "#" },
  { name: "Charges", icon: CreditCard, color: "black", href: "/Home/charges" },
  { name: "Benefits", icon: Gift, color: "black", href: "#" },
  { name: "How It Works", icon: HelpCircle, color: "black", href: "#" },
  { name: "Deleted users", icon: CreditCard, color: "black", href: "/Home/deletedUsers" },
  { name: "Privacy Policy", icon: Lock, color: "black", href: "/Home/privacy" },
  { name: "T & C", icon: Lock, color: "black", href: "/Home/terms" },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAdMenuOpen, setIsAdMenuOpen] = useState(false);
  const [isBenefitsMenuOpen, setIsBenefitsMenuOpen] = useState(false);
  const [isHowItWorksMenuOpen, setIsHowItWorksMenuOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleItemClick = (href) => {
    setSelectedItem(href);
    if (href !== "advertisement" && href !== "benefits" && href !== "how-it-works") {
      setIsAdMenuOpen(false);
      setIsBenefitsMenuOpen(false);
      setIsHowItWorksMenuOpen(false);
    }
    if (window.innerWidth < 768) {
      setIsMobileSidebarOpen(false);
    }
  };

  const handleAdClick = () => setIsAdMenuOpen((prev) => !prev);
  const handleBenefitsClick = () => setIsBenefitsMenuOpen((prev) => !prev);
  const handleHowItWorksClick = () => setIsHowItWorksMenuOpen((prev) => !prev);

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-20 p-2 bg-gray-200 rounded-full shadow-lg"
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      >
        {isMobileSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <motion.div
        className={`fixed inset-y-0 left-0 z-30 bg-white shadow-lg w-64 p-4 transition-all duration-300 transform md:hidden ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent
          isSidebarOpen={true}
          selectedItem={selectedItem}
          handleItemClick={handleItemClick}
          isAdMenuOpen={isAdMenuOpen}
          handleAdClick={handleAdClick}
          isBenefitsMenuOpen={isBenefitsMenuOpen}
          handleBenefitsClick={handleBenefitsClick}
          isHowItWorksMenuOpen={isHowItWorksMenuOpen}
          handleHowItWorksClick={handleHowItWorksClick}
        />
      </motion.div>

      <motion.div
        className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 hidden md:block ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
        animate={{ width: isSidebarOpen ? 256 : 80 }}
      >
        <SidebarContent
          isSidebarOpen={isSidebarOpen}
          selectedItem={selectedItem}
          handleItemClick={handleItemClick}
          isAdMenuOpen={isAdMenuOpen}
          handleAdClick={handleAdClick}
          isBenefitsMenuOpen={isBenefitsMenuOpen}
          handleBenefitsClick={handleBenefitsClick}
          isHowItWorksMenuOpen={isHowItWorksMenuOpen}
          handleHowItWorksClick={handleHowItWorksClick}
        />
      </motion.div>
    </>
  );
};

const SidebarContent = ({
  isSidebarOpen,
  selectedItem,
  handleItemClick,
  isAdMenuOpen,
  handleAdClick,
  isBenefitsMenuOpen,
  handleBenefitsClick,
  isHowItWorksMenuOpen,
  handleHowItWorksClick,
}) => (
  <div className="h-full bg-gradient-to-b from-white via-gray-50 to-red-300 bg-opacity-90 backdrop-blur-md p-4 flex flex-col">
    <div className="flex justify-between items-center">
      <img src={logo} alt="Logo" className={`transition-all ${isSidebarOpen ? "w-12" : "w-7"}`} />
    </div>

    <nav className="mt-8 flex-grow overflow-y-auto">
      {SIDEBAR_ITEMS.map((item) =>
        item.name === "Advertisement" ? (
          <SidebarDropdown
            key={item.name}
            item={item}
            isOpen={isAdMenuOpen}
            handleToggle={handleAdClick}
            subItems={[
              { name: "Passenger Ad", href: "/Home/passangerAd" },
              { name: "Driver Ad", href: "/Home/driverAd" },
            ]}
            handleItemClick={handleItemClick}
          />
        ) : item.name === "Benefits" ? (
          <SidebarDropdown
            key={item.name}
            item={item}
            isOpen={isBenefitsMenuOpen}
            handleToggle={handleBenefitsClick}
            subItems={[
              { name: "Driver Benefits", href: "/Home/drivers-Benefits" },
              { name: "Passenger Benefits", href: "/Home/passengers-Benefits" },
            ]}
            handleItemClick={handleItemClick}
          />
        ) : item.name === "How It Works" ? (
          <SidebarDropdown
            key={item.name}
            item={item}
            isOpen={isHowItWorksMenuOpen}
            handleToggle={handleHowItWorksClick}
            subItems={[
              { name: "Passengers Work", href: "/Home/passengers-work" },
              { name: "Drivers Work", href: "/Home/drivers-work" },
            ]}
            handleItemClick={handleItemClick}
          />
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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
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

const SidebarDropdown = ({ item, isOpen, handleToggle, subItems, handleItemClick }) => (
  <div>
    <motion.div
      className={`flex items-center p-4 text-sm font-medium rounded-lg mb-2 text-black ${
        isOpen ? "bg-red-300 " : "hover:bg-[#ffffff]"
      }`}
      onClick={handleToggle}
    >
      <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
      <AnimatePresence>
        <motion.span
          className="ml-4 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {item.name}
        </motion.span>
      </AnimatePresence>
      <ChevronDown className="ml-auto" size={16} />
    </motion.div>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="pl-8"
        >
          {subItems.map((subItem) => (
            <Link key={subItem.href} to={subItem.href} onClick={() => handleItemClick(subItem.href)}>
              <motion.div className="p-2 text-sm font-medium rounded-lg mb-2 text-black hover:bg-[#ffffff]">
                {subItem.name}
              </motion.div>
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default Sidebar;
