import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header.jsx";
import Login from "./Components/Login.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Courses from "./Pages/Courses.jsx";
import Students from "./Pages/Students.jsx";
import Settings from "./Pages/Setting.jsx";
import Instructors from "./Pages/Instructors.jsx";
import Assignments from "./Pages/Assignments.jsx";
import Attendance from "./Pages/Attendance.jsx";
import Grades from "./Pages/Grades.jsx";
import Announcements from "./Pages/Announcements.jsx";
import Reports from "./Pages/Reports.jsx";
import Profile from "./Pages/Profile.jsx";
import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
import Sidebar from "./Components/Sidebar.jsx";
import QuickActions from "./Components/QuickActions.jsx";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-[#151625] transition-colors duration-300">
        {/* Sidebar */}
        <Sidebar open={sidebarOpen} onClose={toggleSidebar} />

        {/* Main content area */}
        <div className="lg:pl-64 min-h-screen flex flex-col transition-all duration-300">
          <Header onOpenSidebar={toggleSidebar} />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/students" element={<Students />} />
              <Route path="/instructors" element={<Instructors />} />
              <Route path="/assignments" element={<Assignments />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/grades" element={<Grades />} />
              <Route path="/announcements" element={<Announcements />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>

          {/* Quick Actions FAB */}
          <QuickActions />
        </div>
      </div>
    </BrowserRouter>
  );
}
