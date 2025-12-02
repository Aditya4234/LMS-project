import React, { useState, memo, useMemo, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import ProgressTracker from "../Components/ProgressTracker.jsx";
import { apiGet } from "../api";
import {
  Users,
  BookOpen,
  DollarSign,
  UserPlus,
  TrendingUp,
  Video,
  MoreHorizontal,
  Plus,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  X,
  LogOut,
} from "lucide-react";

const initialStats = [
  {
    title: "Total Users",
    value: "0",
    change: "+0%",
    icon: Users,
    color: "bg-blue-500",
    lightColor: "bg-blue-50 dark:bg-blue-900/20",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Active Courses",
    value: "0",
    change: "+0",
    icon: BookOpen,
    color: "bg-emerald-500",
    lightColor: "bg-emerald-50 dark:bg-emerald-900/20",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Revenue",
    value: "₹0",
    change: "+0%",
    icon: DollarSign,
    color: "bg-violet-500",
    lightColor: "bg-violet-50 dark:bg-violet-900/20",
    textColor: "text-violet-600 dark:text-violet-400",
  },
  {
    title: "Active Instructors",
    value: "0",
    change: "+0%",
    icon: UserPlus,
    color: "bg-amber-500",
    lightColor: "bg-amber-50 dark:bg-amber-900/20",
    textColor: "text-amber-600 dark:text-amber-400",
  },
];

const revenueData = [
  { month: "Jan", revenue: 40000, enrollments: 110 },
  { month: "Feb", revenue: 30000, enrollments: 90 },
  { month: "Mar", revenue: 50000, enrollments: 150 },
  { month: "Apr", revenue: 47000, enrollments: 130 },
  { month: "May", revenue: 60000, enrollments: 170 },
  { month: "Jun", revenue: 75000, enrollments: 190 },
];

const roleData = [
  { name: "Students", value: 60, color: "#3b82f6" },
  { name: "Instructors", value: 25, color: "#10b981" },
  { name: "Admins", value: 15, color: "#f59e42" },
];

const recentActivities = [
  {
    user: "Aditya Gupta",
    action: "enrolled in React Course",
    time: "2 hours ago",
    icon: UserPlus,
    color: "text-blue-500",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    user: "Riya Sharma",
    action: "completed JavaScript Course",
    time: "5 hours ago",
    icon: CheckCircle2,
    color: "text-emerald-500",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  {
    user: "System",
    action: "Server maintenance scheduled",
    time: "1 day ago",
    icon: AlertCircle,
    color: "text-amber-500",
    bg: "bg-amber-100 dark:bg-amber-900/30",
  },
  {
    user: "Priya Singh",
    action: "submitted assignment for Node.js",
    time: "3 hours ago",
    icon: CheckCircle2,
    color: "text-purple-500",
    bg: "bg-purple-100 dark:bg-purple-900/30",
  },
  {
    user: "Rahul Kumar",
    action: "started Python Fundamentals",
    time: "6 hours ago",
    icon: UserPlus,
    color: "text-indigo-500",
    bg: "bg-indigo-100 dark:bg-indigo-900/30",
  },
];

const topCourses = [
  {
    title: "React Mastery",
    instructor: "Rohit Sharma",
    students: 320,
    rating: 4.8,
    progress: 75,
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    title: "JavaScript Bootcamp",
    instructor: "Riya Mehta",
    students: 280,
    rating: 4.7,
    progress: 60,
    image:
      "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    title: "UI/UX Design",
    instructor: "Ankit Verma",
    students: 210,
    rating: 4.6,
    progress: 45,
    image:
      "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    title: "Python for Data Science",
    instructor: "Neha Patel",
    students: 195,
    rating: 4.9,
    progress: 30,
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
];

const upcomingEvents = [
  {
    title: "React Workshop",
    date: "Nov 25, 2025",
    time: "10:00 AM",
    type: "Workshop",
    color: "bg-blue-500",
  },
  {
    title: "JavaScript Quiz",
    date: "Nov 26, 2025",
    time: "2:00 PM",
    type: "Assessment",
    color: "bg-purple-500",
  },
  {
    title: "UI/UX Webinar",
    date: "Nov 28, 2025",
    time: "4:00 PM",
    type: "Webinar",
    color: "bg-emerald-500",
  },
];

const quickStats = [
  { label: "Completion Rate", value: "87%", trend: "up" },
  { label: "Avg. Score", value: "92/100", trend: "up" },
  { label: "Study Hours", value: "124h", trend: "up" },
  { label: "Certificates", value: "12", trend: "neutral" },
];

export default function Dashboard() {
  const [dashboardStats, setDashboardStats] = useState(initialStats);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [dateFilter, setDateFilter] = useState("Last 30 Days");
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await apiGet('/reports');
        setDashboardStats([
          { ...initialStats[0], value: data.totalStudents.toString() },
          { ...initialStats[1], value: data.totalCourses.toString() },
          { ...initialStats[2], value: `₹${data.revenue}` },
          { ...initialStats[3], value: data.activeInstructors.toString() },
        ]);
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      }
    };
    fetchStats();
  }, []);

  const dateOptions = ["Last 7 Days", "Last 30 Days", "Last 90 Days", "This Year"];

  // --- SIGN OUT HANDLER ADDED HERE ---
  const handleSignOut = () => {
    // Add your sign out logic here, such as clearing tokens, calling API, and redirecting.
    // For demo, we'll just alert and reload:
    // Remove below comments and replace with actual sign out method if needed.
    // localStorage.removeItem('token'); // Example
    alert("Signed out successfully!");
    // If you want to redirect, you could use window.location or useNavigate from react-router-dom
    window.location.href = "/login";
  };

  // Mock handlers for demonstration
  const handleAddCourse = (e) => {
    e.preventDefault();
    setShowAddCourseModal(false);
    // Logic to add course would go here
    alert("Course added successfully! (Demo)");
  };

  const handleAddVideo = (e) => {
    e.preventDefault();
    setShowVideoModal(false);
    // Logic to add video would go here
    alert("Video uploaded successfully! (Demo)");
  };

  const handleViewAllCourses = () => {
    alert("Navigating to all courses page...");
    // In real app: navigate('/courses')
  };

  const handleViewCalendar = () => {
    alert("Opening calendar view...");
    // In real app: navigate('/calendar')
  };

  const handleMoreOptions = (section) => {
    alert(`Opening more options for ${section}...`);
  };

  const handleDateFilterChange = (option) => {
    setDateFilter(option);
    setShowDateDropdown(false);
    alert(`Filter changed to: ${option}`);
  };

  return (
    <div className="space-y-6 relative">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Welcome back, here's what's happening today.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {/* Date Filter Dropdown */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setShowDateDropdown(!showDateDropdown)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm min-h-[44px]"
            >
              <Calendar size={16} />
              <span className="hidden sm:inline">{dateFilter}</span>
              <span className="sm:hidden">Filter</span>
            </button>
            {showDateDropdown && (
              <div className="absolute top-full mt-2 right-0 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-10">
                {dateOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleDateFilterChange(option)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${option === dateFilter ? 'text-blue-600 font-medium' : 'text-gray-700 dark:text-gray-200'
                      } ${index === 0 ? 'rounded-t-xl' : ''} ${index === dateOptions.length - 1 ? 'rounded-b-xl' : ''}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => setShowVideoModal(true)}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm min-h-[44px]"
          >
            <Video size={16} />
            <span className="hidden sm:inline">Upload Video</span>
          </button>
          <button
            onClick={() => setShowAddCourseModal(true)}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-xl text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200 dark:shadow-none min-h-[44px]"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Add Course</span>
            <span className="sm:hidden">Add</span>
          </button>
          {/* SIGN OUT BUTTON (WORKS!) */}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-50 dark:bg-gray-900 border border-red-200 dark:border-red-600 rounded-xl text-xs sm:text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800 transition-colors shadow-sm min-h-[44px]"
            data-testid="signout-btn"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#1e1f2e] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.lightColor} ${stat.textColor}`}>
                <stat.icon size={22} />
              </div>
              <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg">
                <TrendingUp size={12} className="mr-1" />
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {stat.title}
              </p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1e1f2e] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Revenue & Enrollments
            </h2>
            <button
              onClick={() => handleMoreOptions('Revenue & Enrollments')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-400"
            >
              <MoreHorizontal size={20} />
            </button>
          </div>
          <div className="h-[300px] w-full" style={{ minHeight: '300px' }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={revenueData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5E7EB"
                  opacity={0.5}
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  cursor={{ fill: "#F3F4F6", opacity: 0.4 }}
                />
                <Bar
                  dataKey="revenue"
                  fill="#3b82f6"
                  radius={[6, 6, 0, 0]}
                  barSize={32}
                />
                <Bar
                  dataKey="enrollments"
                  fill="#a855f7"
                  radius={[6, 6, 0, 0]}
                  barSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Distribution */}
        <div className="bg-white dark:bg-[#1e1f2e] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
            User Distribution
          </h2>
          <div className="h-[220px] w-full relative" style={{ minHeight: '220px' }}>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={roleData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {roleData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      strokeWidth={0}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                1.2k
              </span>
              <span className="text-xs text-gray-500">Total Users</span>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {roleData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-600 dark:text-gray-300">
                    {item.name}
                  </span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-white to-gray-50 dark:from-[#1e1f2e] dark:to-[#252637] p-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  {stat.label}
                </p>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </h3>
              </div>
              {stat.trend === "up" && (
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
                  <TrendingUp size={16} className="text-emerald-600 dark:text-emerald-400" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Progress Tracker */}
      <ProgressTracker stats={{ completed: 5, assignments: 12, streak: 7, certificates: 3 }} />

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Courses - Now takes 2 columns */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1e1f2e] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Top Performing Courses
            </h2>
            <button
              onClick={handleViewAllCourses}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topCourses.map((course, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate text-sm">
                      {course.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      by {course.instructor}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-medium text-amber-600">
                        {course.rating} ⭐
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">
                        {course.students} students
                      </span>
                    </div>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400">Progress</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white dark:bg-[#1e1f2e] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Upcoming Events
            </h2>
            <Calendar size={20} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="border-l-4 pl-4 py-2"
                style={{ borderColor: event.color.replace('bg-', '#') }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-white">
                      {event.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {event.date}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-lg ${event.color} text-white font-medium`}>
                    {event.type}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                  <Clock size={12} />
                  <span>{event.time}</span>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleViewCalendar}
            className="w-full mt-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-200 dark:border-blue-800 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            View Calendar
          </button>
        </div>
      </div>

      {/* Recent Activity - Full Width */}
      <div className="bg-white dark:bg-[#1e1f2e] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Recent Activity
          </h2>
          <button
            onClick={() => handleMoreOptions('Recent Activity')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-400"
          >
            <MoreHorizontal size={20} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${activity.bg} ${activity.color}`}
              >
                <activity.icon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 dark:text-white">
                  <span className="font-semibold">{activity.user}</span>{" "}
                  {activity.action}
                </p>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <Clock size={12} />
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Course Modal */}
      {showAddCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-[#1e1f2e] w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Add New Course
              </h3>
              <button
                onClick={() => setShowAddCourseModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddCourse} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Course Title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="e.g. Advanced React Patterns"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Instructor Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="e.g. John Doe"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="4999"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Duration (Hrs)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="24"
                  />
                </div>
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-200 dark:shadow-none transition-all active:scale-[0.98]"
                >
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upload Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-[#1e1f2e] w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Upload Video
              </h3>
              <button
                onClick={() => setShowVideoModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddVideo} className="p-6 space-y-4">
              <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3">
                  <Video size={24} />
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  MP4, WebM or Ogg (Max 800MB)
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Video Title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="e.g. Intro to Hooks"
                  required
                />
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-200 dark:shadow-none transition-all active:scale-[0.98]"
                >
                  Upload Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
