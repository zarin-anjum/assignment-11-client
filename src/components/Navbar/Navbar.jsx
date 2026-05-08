import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = ({ theme, toggleTheme }) => {
  const { user, logoutUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    ...(user ? [{ name: "All Contests", path: "/all-contests" }] : []),
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Impact", path: "/impact" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".profile-dropdown")) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "py-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-700/50"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Section  */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-9 h-9 bg-[#534AB7] rounded-xl flex items-center justify-center shadow-sm group-hover:rotate-12 transition-transform">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-semibold text-gray-900 dark:text-white">
              ContestHub
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-[#534AB7] dark:hover:text-[#AFA9EC] transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {/* Theme Toggle  */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === "dark" ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-slate-600" />
              )}
            </button>

            {user ? (
              <div className="relative profile-dropdown">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-1 rounded-full border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
                >
                  <img
                    src={user.photoURL}
                    alt="profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-3 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 py-2"
                    >
                      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                        <div className="flex items-center space-x-3">
                          <img
                            src={user.photoURL || "https://i.pravatar.cc/100"}
                            alt="profile"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-bold truncate">
                              {user.displayName}
                            </p>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full text-white ${
                                user?.role === "Admin"
                                  ? "bg-red-500"
                                  : user?.role === "Creator"
                                    ? "bg-[#534AB7]"
                                    : "bg-blue-500"
                              }`}
                            >
                              {user?.role || "User"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-cyan-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        <LayoutDashboard size={16} /> <span>Dashboard</span>
                      </Link>
                      <button
                        onClick={logoutUser}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <LogOut size={16} /> <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-[#534AB7] hover:bg-[#3C3489] text-white px-6 py-2 rounded-full font-medium transition-colors"
              >
                Join Now
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button onClick={toggleTheme}>
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 dark:text-white"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block px-3 py-4 text-base font-medium border-b border-slate-50 dark:border-slate-800"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {!user && (
                <Link
                  to="/login"
                  className="block w-full text-center mt-4 bg-[#534AB7] text-white py-3 rounded-xl font-medium"
                >
                  Login / Register
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
