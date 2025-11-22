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

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Yeh bhi
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // Remove green color from background, replace it with blue/gray tone
  return (
    <BrowserRouter>
      <div className="min-h-screen flex bg-blue-50/90">
        {/* Sidebar */}
        <Sidebar open={sidebarOpen} onClose={toggleSidebar} />

        {/* Main content area */}
        <div
          className={`flex-1 min-h-screen flex flex-col transition-all duration-300 ease-in-out ${
            sidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          <Header onOpenSidebar={toggleSidebar} />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
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
        </div>
      </div>
    </BrowserRouter>
  );
}
