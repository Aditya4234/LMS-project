import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Bell, Search, Menu, Sun, Moon, User, Settings, LogOut } from "lucide-react";

export default function Header({ onOpenSidebar }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const profileRef = useRef();
  const notificationRef = useRef();

  const [user] = useState({
    name: "Aditya Gupta",
    email: "aditya@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=aditya",
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle Dark Mode (Mock implementation)
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${scrolled
        ? "bg-white/80 dark:bg-[#1e1f2e]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm"
        : "bg-transparent"
        }`}
    >
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Sidebar Toggle & Search */}
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={onOpenSidebar}
            className="lg:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>

          <div className="hidden md:flex items-center max-w-md w-full">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all sm:text-sm"
                placeholder="Search courses, students, or assignments..."
              />
            </div>
          </div>
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors relative"
            >
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-[#1e1f2e]" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#1e1f2e] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                  <span className="text-xs text-blue-600 font-medium cursor-pointer hover:underline">Mark all read</span>
                </div>
                <div className="max-h-[320px] overflow-y-auto">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer border-b border-gray-50 dark:border-gray-800/50 last:border-0">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                          <Bell size={14} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">New Assignment Posted</p>
                          <p className="text-xs text-gray-500 mt-0.5">React Hooks Deep Dive • 2 hours ago</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-center">
                  <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
            >
              <img
                src={user.avatar}
                alt="Avatar"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-white dark:ring-gray-800 shadow-sm"
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white leading-none">{user.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Student</p>
              </div>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1e1f2e] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                <div className="p-2">
                  <Link to="/profile" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors">
                    <User size={16} />
                    Profile
                  </Link>
                  <Link to="/settings" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors">
                    <Settings size={16} />
                    Settings
                  </Link>
                </div>
                <div className="h-px bg-gray-100 dark:bg-gray-800 mx-2" />
                <div className="p-2">
                  <button
                    onClick={() => {
                      // Clear authentication token
                      localStorage.removeItem('token');
                      localStorage.removeItem('user');
                      // Redirect to login page
                      window.location.href = '/login';
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
