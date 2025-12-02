import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  GraduationCap,
  ClipboardList,
  CalendarCheck,
  Award,
  Megaphone,
  BarChart3,
  Settings,
  X,
  LogOut
} from "lucide-react";

export default function Sidebar({ open = false, onClose } = {}) {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
    { name: "Courses", path: "/courses", icon: <BookOpen size={20} /> },
    { name: "Students", path: "/students", icon: <Users size={20} /> },
    { name: "Instructors", path: "/instructors", icon: <GraduationCap size={20} /> },
    { name: "Assignments", path: "/assignments", icon: <ClipboardList size={20} /> },
    { name: "Attendance", path: "/attendance", icon: <CalendarCheck size={20} /> },
    { name: "Grades", path: "/grades", icon: <Award size={20} /> },
    { name: "Announcements", path: "/announcements", icon: <Megaphone size={20} /> },
    { name: "Reports", path: "/reports", icon: <BarChart3 size={20} /> },
  ];

  const bottomItems = [
    { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
  ];

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-[#1e1f2e] border-r border-gray-100 dark:border-gray-800 transform transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          } flex flex-col h-screen shadow-2xl lg:shadow-none`}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center px-6 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-600/20">
              L
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
              LMS<span className="text-blue-600">.</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="ml-auto lg:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
            Menu
          </div>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors duration-200 ${isActive
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
              >
                <span className={`transition-colors duration-200 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                  }`}>
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            );
          })}

          <div className="mt-8 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
            Preferences
          </div>
          {bottomItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors duration-200 ${isActive
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
              >
                <span className={`transition-colors duration-200 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                  }`}>
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* User Profile Snippet */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex-shrink-0">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-0.5">
              <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=aditya"
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                Aditya Gupta
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                Student
              </p>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
              }}
              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              title="Sign Out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}