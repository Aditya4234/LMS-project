
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from "recharts";
import { Line } from "recharts";

// Data as before...
const motivationalQuotes = [
  "Learning never exhausts the mind. — Leonardo da Vinci",
  "Success is not an activity but a process.",
  "The beautiful thing about learning is that no one can take it away from you.",
  "Every day is a chance to learn something new!",
  "Consistency is the key to mastery. Keep going!",
  "Great things never come from comfort zones. — Anonymous",
  "Push yourself, because no one else is going to do it for you.",
];

const funFacts = [
  "👨‍🏫 Did you know? The first online course was launched in 1986.",
  "🎓 Our students are from 13+ countries!",
  "📚 Most popular day for new enrollments: Tuesday.",
  "🕒 The longest streak by a user is 47 days.",
  "🏅 The fastest course completion was in 3 hours!",
  "🌐 Over 500 hours of video watched last month.",
  "🦸 Featured Instructor: Riya Mehta (4.9⭐ rating!)",
];

const dashboardTips = [
  "Tip: You can add your own course by clicking 'Add New'.",
  "Did you know? Hovering cards reveals more details.",
  "Check the charts for your monthly performance.",
  "Use the theme toggle for day/night mode.",
  "Shortcut: Press '/' to search courses instantly.",
  "Customize your dashboard with the Theme button.",
  "Invite new users from the Users tab.",
];

const milestoneData = [
  { milestone: "First 10 Users", achieved: true, date: "2024-06-01" },
  { milestone: "First ₹50,000 Revenue", achieved: true, date: "2024-06-10" },
  { milestone: "Launched 5th Course", achieved: true, date: "2024-06-12" },
  { milestone: "100 Enrollments in a Month", achieved: false },
];

const heatmapActivityData = [
  { day: "Mon", count: 6 },
  { day: "Tue", count: 8 },
  { day: "Wed", count: 13 },
  { day: "Thu", count: 10 },
  { day: "Fri", count: 7 },
  { day: "Sat", count: 4 },
  { day: "Sun", count: 2 },
];

// Confetti (updated with a different design)
function ConfettiBanner({ show }) {
  if (!show) return null;
  return (
    <div className="pointer-events-none fixed z-50 inset-x-0 top-0 flex items-center justify-center animate-fade-in-slow">
      <div className="w-full max-w-3xl mx-auto flex justify-center relative py-3">
        {[...Array(24)].map((_, i) => (
          <span
            key={i}
            className="inline-block text-2xl sm:text-4xl animate-fall-fancy"
            style={{
              left: `${Math.random() * 100}%`,
              position: "relative",
              fontSize: `${1.1 + Math.random() * 1.7}rem`,
              color: ["#2563eb", "#facc15", "#10b981", "#eab308", "#6366f1", "#ec4899"][i % 6],
              margin: "0 5px",
              zIndex: 110,
            }}
            aria-hidden
          >
            {["🎊", "✨", "🎈", "💎", "🔥", "🌟", "🚀", "🥳"][i % 8]}
          </span>
        ))}
      </div>
    </div>
  );
}

// Badge rain (changed to falling stars w/ color variety)
function RainBadge() {
  const badges = ["⭐", "💫", "🌟", "🏅", "✨", "🎖️"];
  return (
    <div
      className="pointer-events-none absolute z-30 inset-x-0 top-0"
      style={{ height: 0 }}
      aria-hidden
    >
      {[...Array(14)].map((_, idx) => (
        <span
          key={idx}
          className="absolute animate-badge-drop"
          style={{
            left: `${idx * 7 + Math.random() * 6}%`,
            animationDelay: `${Math.random()}s`,
            fontSize: `${1.7 + Math.random() * 1.5}em`,
            color: ["#f59e42", "#facc15", "#6366f1", "#ec4899", "#22d3ee", "#14b8a6"][idx % 6],
            top: "-1.3em",
            textShadow: "1px 2px 10px #fff1"
          }}
        >
          {badges[idx % badges.length]}
        </span>
      ))}
    </div>
  );
}

function getRandomElement(arr) {
  if (!arr || arr.length === 0) return "";
  return arr[Math.floor(Math.random() * arr.length)];
}

// Gradient divider component for segment splitting
function SectionDivider({ color = "from-cyan-200 via-blue-300 to-cyan-100", className = "" }) {
  return (
    <div
      className={`h-[4px] w-full rounded-full my-9 bg-gradient-to-r ${color} shadow-lg ${className}`}
    />
  );
}

export default function Dashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [showBadges, setShowBadges] = useState(false);

  // Stats and chart data as before.
  const stats = [
    {
      title: "Total Users",
      value: "1,245",
      color: "from-cyan-500 via-blue-400 to-cyan-200",
      icon: "👥",
    },
    {
      title: "Active Courses",
      value: "32",
      color: "from-lime-500 via-emerald-400 to-green-300",
      icon: "📚",
    },
    {
      title: "Revenue",
      value: "₹2,40,000",
      color: "from-fuchsia-400 via-indigo-300 to-sky-200",
      icon: "💰",
    },
    {
      title: "New Enrollments",
      value: "124",
      color: "from-orange-300 via-yellow-300 to-amber-100",
      icon: "📝",
    },
    {
      title: "Milestones Reached",
      value: milestoneData.filter((m) => m.achieved).length,
      color: "from-yellow-200 via-yellow-400 to-yellow-200",
      icon: "🏅",
      onClick: () => {
        setConfetti(true);
        setShowBadges(true);
        setTimeout(() => setConfetti(false), 1800);
        setTimeout(() => setShowBadges(false), 2000);
      },
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

  const radialData = [
    { name: "Students", value: 60, fill: "#2563eb" },
    { name: "Instructors", value: 25, fill: "#10b981" },
    { name: "Admins", value: 15, fill: "#f59e42" },
  ];

  // Recent Activities (with an extra type for visual variation)
  const activityIcons = {
    enroll: {
      icon: "🟢",
      bg: "bg-green-50",
      color: "text-green-600",
      ring: "ring-green-200",
    },
    complete: {
      icon: "✅",
      bg: "bg-blue-50",
      color: "text-blue-600",
      ring: "ring-blue-200",
    },
    new: {
      icon: "👤",
      bg: "bg-yellow-50",
      color: "text-yellow-600",
      ring: "ring-yellow-200",
    },
    purchase: {
      icon: "💳",
      bg: "bg-indigo-50",
      color: "text-indigo-600",
      ring: "ring-indigo-200",
    },
    milestone: {
      icon: "🏆",
      bg: "bg-yellow-100",
      color: "text-yellow-700",
      ring: "ring-yellow-200",
    },
    tip: {
      icon: "🤖",
      bg: "bg-blue-50",
      color: "text-blue-500",
      ring: "ring-blue-200",
    },
    default: {
      icon: "🔔",
      bg: "bg-gray-50",
      color: "text-gray-600",
      ring: "ring-gray-200",
    },
    funfact: {
      icon: "🤩",
      bg: "bg-pink-50",
      color: "text-fuchsia-800",
      ring: "ring-fuchsia-300",
    },
    video: {
      icon: "🎬",
      bg: "bg-orange-50",
      color: "text-orange-600",
      ring: "ring-orange-200",
    },
    inspiration: {
      icon: "🌈",
      bg: "bg-cyan-50",
      color: "text-cyan-700",
      ring: "ring-cyan-200"
    }
  };

  const recentActivities = [
    {
      user: "Aditya Gupta",
      action: "enrolled in React Course",
      time: "2 hours ago",
      type: "enroll",
    },
    {
      user: "Riya Sharma",
      action: "completed JavaScript Course",
      time: "5 hours ago",
      type: "complete",
    },
    {
      user: "Karan Singh",
      action: "joined as a new user",
      time: "1 day ago",
      type: "new",
    },
    {
      user: "Priya Verma",
      action: "purchased Pro Plan",
      time: "2 days ago",
      type: "purchase",
    },
    {
      user: "DashboardBot",
      action: "sent a dashboard tip",
      time: "just now",
      type: "tip",
    },
    {
      user: "System",
      action: `reached "First 10 Users" milestone! 🎯`,
      time: "3 days ago",
      type: "milestone",
    },
    {
      user: "ESME-FUN",
      action: getRandomElement(funFacts),
      time: "now",
      type: "funfact",
    },
    {
      user: "Amit Sheoran",
      action: "uploaded new video: 'Mastering Node.js'",
      time: "3 min ago",
      type: "video",
    },
    {
      user: "MotivationBot",
      action: getRandomElement(motivationalQuotes),
      time: "today",
      type: "inspiration",
    },
  ];
  const getActivityIconProps = (type) =>
    activityIcons[type] || activityIcons.default;

  // Top courses (unchanged; but grid changes!)
  const [topCourses, setTopCourses] = useState([
    {
      title: "React Mastery",
      instructor: "Rohit Sharma",
      rating: 4.8,
      students: 320,
      progress: 90,
      image:
        "https://cdn.dribbble.com/users/1126939/screenshots/16770502/media/5b89081b6df9a17b53f5ad9cbf792165.png",
    },
    {
      title: "JavaScript Bootcamp",
      instructor: "Riya Mehta",
      rating: 4.7,
      students: 280,
      progress: 75,
      image:
        "https://cdn.dribbble.com/userupload/3081793/file/original-b91b9d029769b4b41bb6ac1b492be7ce.png",
    },
    {
      title: "UI/UX Design",
      instructor: "Ankit Verma",
      rating: 4.6,
      students: 210,
      progress: 60,
      image:
        "https://cdn.dribbble.com/users/4382412/screenshots/15240103/media/2b2a7cb858b4065cb2aef6b08c65e34b.png",
    },
  ]);

  // Modal and misc states
  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    instructor: "",
    rating: "",
    students: "",
    progress: "",
    image: "",
  });

  // Add video modal state
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoForm, setVideoForm] = useState({
    title: "",
    url: "",
    description: "",
    uploader: "",
  });
  const [uploadedVideos, setUploadedVideos] = useState([]);

  const [quote] = useState(getRandomElement(motivationalQuotes));
  const [tip] = useState(getRandomElement(dashboardTips));
  const [funFact] = useState(getRandomElement(funFacts));

  const handleAddCourse = () => {
    if (!newCourse.title.trim() || !newCourse.instructor.trim()) {
      alert("Please fill all details!");
      return;
    }
    const courseToAdd = {
      title: newCourse.title,
      instructor: newCourse.instructor,
      rating: newCourse.rating === "" ? 0 : parseFloat(newCourse.rating),
      students:
        newCourse.students === "" ? 0 : parseInt(newCourse.students, 10),
      progress:
        newCourse.progress === "" ? 0 : parseInt(newCourse.progress, 10),
      image: newCourse.image,
    };
    setTopCourses([...topCourses, courseToAdd]);
    setShowModal(false);
    setNewCourse({
      title: "",
      instructor: "",
      rating: "",
      students: "",
      progress: "",
      image: "",
    });
  };

  // New handler for upload video
  const handleAddVideo = () => {
    if (
      !videoForm.title.trim() ||
      !videoForm.uploader.trim() ||
      !videoForm.url.trim()
    ) {
      alert("Please fill all video details!");
      return;
    }
    setUploadedVideos([
      ...uploadedVideos,
      { ...videoForm, date: new Date().toISOString() },
    ]);
    setShowVideoModal(false);
    setVideoForm({
      title: "",
      url: "",
      description: "",
      uploader: "",
    });
  };

  useEffect(() => {
    let t;
    if (confetti) {
      t = setTimeout(() => setConfetti(false), 1500);
    }
    return () => t && clearTimeout(t);
  }, [confetti]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("bg-gradient-to-br", "from-stone-900", "to-stone-800", "text-white");
    } else {
      document.body.classList.remove("bg-gradient-to-br", "from-stone-900", "to-stone-800", "text-white");
    }
    return () => {
      document.body.classList.remove("bg-gradient-to-br", "from-stone-900", "to-stone-800", "text-white");
    };
  }, [isDarkMode]);
  
  // ========== MAIN DASHBOARD RETURN ==========
  
  return (
    <div
      className={`p-0 m-0 min-h-screen min-w-full w-full h-full relative transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-stone-900 to-stone-800 text-white"
          : "bg-gradient-to-br from-blue-100 via-white to-cyan-100"
      }`}
      style={{
        width: "100vw",
        minHeight: "100vh",
        height: "auto",
        overflow: "hidden"
      }}
    >
      {/* Animated rain/stars and confetti */}
      {showBadges && <RainBadge />}
      <ConfettiBanner show={confetti} />
      <div className="w-full h-full">
        {/* Modern Header with gradient highlight underlay, avatar, and shadows */}
        <header className="relative flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 rounded-3xl bg-gradient-to-br from-indigo-200/60 via-blue-50/80 to-cyan-100/80 dark:from-stone-700/80 dark:via-stone-900 dark:to-blue-950/60 px-9 py-10 shadow-2xl border border-indigo-200 dark:border-stone-800 w-full overflow-hidden">
          <div className="absolute z-0 inset-x-0 h-8 -bottom-6 bg-gradient-to-r from-yellow-200 via-fuchsia-100 to-blue-200 blur-2xl opacity-35 rounded-full pointer-events-none" />
          <div className="flex-1 min-w-0 relative z-10">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight flex items-center gap-6 mb-1 text-transparent bg-clip-text bg-gradient-to-tr from-blue-900 via-indigo-400 to-cyan-600 dark:from-blue-200 dark:via-indigo-300 dark:to-blue-500 drop-shadow-lg leading-tight">
              <span className="inline-block rounded-full shadow-xl border-4 border-white bg-cyan-300/50 text-4xl p-1 pb-0">📈</span>
              ESME Dashboard
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-3">
              <span className="text-lg italic font-medium text-blue-700 dark:text-blue-200 truncate flex items-center gap-2 opacity-80">
                <span>💡</span>{quote}
              </span>
              <span className="hidden md:inline text-base px-3 py-1 rounded-xl bg-blue-100/85 dark:bg-stone-800 text-blue-500 dark:text-blue-200 font-semibold border border-blue-200 dark:border-stone-700 shadow">{tip}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 mt-6 sm:mt-0 z-10">
            <button
              onClick={() => setIsDarkMode((dark) => !dark)}
              title="Toggle dark/light mode"
              className={`ml-2 px-5 py-2 rounded-xl font-bold shadow-lg border-2 border-indigo-200 dark:border-stone-600 text-[1.3rem] bg-white/90 dark:bg-stone-900/90 hover:bg-blue-200/50 dark:hover:bg-blue-900/50 transition-colors
                ${
                  isDarkMode
                    ? "bg-stone-800 text-yellow-200 border-stone-400"
                    : "text-yellow-700"
                }
              `}
              aria-label="theme-toggle"
            >
              {isDarkMode ? (
                <span role="img" aria-label="Moon">
                  🌙
                </span>
              ) : (
                <span role="img" aria-label="Sun">
                  🌞
                </span>
              )}
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="px-7 py-2 bg-gradient-to-r from-blue-600 via-cyan-400 to-sky-300 text-white rounded-[2rem] font-semibold shadow-xl hover:scale-105 hover:bg-blue-900/85 transition-all duration-150 border-2 border-blue-700/20 text-lg"
            >
              + Add Course
            </button>
            <button
              onClick={() => setShowVideoModal(true)}
              className="px-7 py-2 bg-gradient-to-br from-orange-500 via-yellow-400 to-pink-300 text-white rounded-[2rem] font-semibold shadow-xl hover:scale-105 hover:bg-orange-900/50 transition-all duration-150 border-2 border-orange-500/20 text-lg ml-2"
            >
              + Upload Video
            </button>
          </div>
        </header>
        
        {/* Gradient Section Divider */}
        <SectionDivider color="from-cyan-200 via-blue-100 to-fuchsia-100" />

        {/* Fun fact + Minimal tip row below header */}
        <section className="flex flex-col md:flex-row gap-3 items-stretch mb-8 w-full">
          <div className="flex-1 flex flex-col gap-2 min-w-0">
            <div className="flex items-center gap-3 px-7 py-3 rounded-2xl bg-gradient-to-r from-pink-100 to-fuchsia-100 dark:from-fuchsia-800/30 dark:to-fuchsia-900/40 border-l-8 border-fuchsia-400/40 shadow-lg animate-fade-in w-full">
              <span className="text-fuchsia-500 dark:text-fuchsia-200 text-2xl font-bold drop-shadow">🤩</span>
              <span className="text-fuchsia-800 dark:text-fuchsia-100 text-base font-semibold">{funFact}</span>
            </div>
          </div>
        </section>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-7 mb-14 w-full px-1" style={{
          width: "100%",
          minHeight: "230px",
        }}>
          {stats.map((item, index) => (
            <div
              key={index}
              className={`
                relative bg-gradient-to-tr ${item.color}
                rounded-[2.1rem] overflow-visible shadow-2xl hover:shadow-blue-200 transition-transform duration-200 hover:scale-105 border-0
                flex flex-col items-center justify-between cursor-pointer group
                ${isDarkMode ? "bg-gradient-to-tr from-stone-800 via-stone-900 to-slate-800 border-white/10" : ""}
              `}
              style={{
                boxShadow: "0 12px 46px 0 rgba(56,189,248,0.16), 0 2px 6px 0 rgba(79,70,229,0.10)",
                minWidth: "200px",
                width: "100%",
                height: "230px",
                maxWidth: "100%",
                flex: "1 1 0px"
              }}
              onClick={item.onClick}
              tabIndex={item.onClick ? 0 : undefined}
              onKeyDown={e => { if(item.onClick && (e.key === "Enter" || e.key === " ")) item.onClick(); }}
              title={item.title === 'Milestones Reached' ? "Celebrate with Confetti!" : undefined}
            >
              {item.title === "Milestones Reached" && showBadges && <RainBadge />}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-20 h-9 blur-2xl opacity-30 bg-gradient-to-r from-white via-blue-100 to-sky-100 dark:from-stone-700 dark:via-stone-800 dark:to-stone-800 rounded-full pointer-events-none"></div>
              <div className="relative mt-6 mb-3 z-10">
                <span className={`
                  inline-flex items-center justify-center shadow-xl rounded-2xl bg-white dark:bg-stone-800 border-4 border-white dark:border-stone-900
                  w-[62px] h-[62px] text-4xl group-hover:scale-125 group-hover:ring-4 group-hover:ring-white/80 transition-[scale] duration-200
                `}>
                  {item.icon}
                </span>
                <span className="absolute right-1 bottom-2 w-6 h-6 bg-gradient-to-tr from-blue-500 via-cyan-400 to-blue-600 rounded-full border-2 border-white dark:border-stone-800 flex items-center justify-center shadow animate-jump text-xs text-white">
                  {index === 0 && "👑"}
                  {index === 1 && "🔥"}
                  {index === 2 && "₹"}
                  {index === 3 && "🆕"}
                  {index === 4 && "🏆"}
                </span>
              </div>
              <div className="flex flex-col items-center mb-2 z-20">
                <div className="text-xs uppercase tracking-wider font-bold text-gray-700/95 dark:text-blue-100 mb-2 drop-shadow">
                  {item.title}
                </div>
                <div className="text-3xl text-gray-900 dark:text-white font-extrabold tracking-wide drop-shadow">
                  {item.value}
                </div>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-2 rounded-full bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-200 opacity-30 blur-xl group-hover:opacity-75 group-hover:blur-[2px] transition-all"/>
              <div className="absolute top-3 left-4 w-2 h-2 rounded-full bg-blue-400/40"></div>
              <div className="absolute top-3 right-4 w-2 h-2 rounded-full bg-cyan-400/40"></div>
              {item.title === "Milestones Reached" && (
                <span className="absolute -top-4 right-5 bg-yellow-300 px-2 py-1 rounded-full text-xs font-bold shadow-xl text-gray-800 animate-bounce" aria-label="celebrate!">
                  🎉
                </span>
              )}
            </div>
          ))}
        </div>
        
        {/* Charts Section */}
        <div className="flex flex-col lg:flex-row gap-10 mb-10 w-full px-1" style={{width: "100%", minHeight: "340px"}}>
          {/* Bar+Line Chart */}
          <div className="bg-gradient-to-tr from-white via-indigo-50 to-sky-100 dark:from-stone-700/80 dark:via-stone-900 dark:to-stone-800 rounded-3xl p-8 shadow-xl border border-blue-100 dark:border-stone-800 flex-1 h-full w-full">
            <h2 className="text-2xl font-extrabold text-indigo-900 dark:text-indigo-200 mb-6 flex items-center gap-3">
              <span className="text-2xl">📈</span> Monthly Revenue & Enrollments
            </h2>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={revenueData} margin={{ top: 24, right: 32, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="4 8" stroke="#a3bffa" />
                <XAxis dataKey="month" tick={{ fill: isDarkMode ? "#a3bffa" : "#3b3663", fontWeight: 700, fontSize: 16 }} />
                <YAxis yAxisId="left" tick={{ fill: "#06b6d4", fontWeight: 700 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: "#f59e42", fontWeight: 700 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, background: "#c7d2fe", border: "none" }}
                  labelStyle={{ fontWeight: 800 }}
                />
                <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="#2563eb" radius={[18, 18, 0, 0]} barSize={37} />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="enrollments"
                  name="Enrollments"
                  stroke="#f59e42"
                  strokeWidth={4}
                  dot={{ r: 7, fill: "#fff", stroke: "#f59e42", strokeWidth: 3, filter: "drop-shadow(0 1px 8px #fbbf24cc)" }}
                  activeDot={{ r: 13 }}
                />
              </BarChart>
            </ResponsiveContainer>
            {/* New: Activity Heatmap with a legend below */}
            <div className="mt-8">
              <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2 text-lg">
                🗓️ Weekly Platform Activity
              </h3>
              <div className="flex items-end gap-2 w-full h-14 rounded-xl p-2 bg-gradient-to-r from-cyan-100 via-blue-100 to-indigo-100 dark:from-stone-700/60 dark:via-stone-900/90 dark:to-stone-900/70 border border-blue-100 dark:border-stone-900 shadow-inner">
                {heatmapActivityData.map(({ day, count }, idx) => (
                  <div key={day} className="flex flex-col items-center justify-end flex-1">
                    <div
                      className="w-7 sm:w-9 rounded-t-[1.6rem] transition-all"
                      style={{
                        background:
                          count > 10
                            ? "linear-gradient(180deg,#facc15, #f59e42)"
                            : count > 7
                            ? "linear-gradient(180deg,#2563eb,#06b6d4)"
                            : "linear-gradient(180deg,#e0e7ff,#a5b4fc)",
                        height: `${Math.round((count / 13) * 52)}px`,
                        boxShadow: count > 9 ? "0 0 12px #facc1580" : "0 0 3px #a5b4fc80",
                        border: "2px solid #fff",
                        marginBottom: "0.25rem",
                      }}
                      title={`${day}: ${count} actions`}
                    ></div>
                    <div className="text-xs mt-[2.5px] text-blue-900 dark:text-blue-200">{day}</div>
                  </div>
                ))}
              </div>
              <div className="text-xs mt-2 flex items-center gap-4">
                <span className="text-yellow-500 font-bold">⬆️ Most active: Wed</span>
                <span className="text-blue-500 font-bold">⬇️ Least: Sun</span>
              </div>
            </div>
          </div>
          {/* Donut/Radial Chart */}
          <div className="bg-gradient-to-b from-indigo-50 via-blue-100 to-white dark:from-stone-800 dark:via-stone-900 dark:to-stone-900 rounded-3xl p-8 shadow-xl border border-blue-100 dark:border-stone-800 flex flex-col items-center justify-center h-full"
            style={{minWidth: "340px", maxWidth: "430px", flex: "0 0 28%"}}>
            <h2 className="text-2xl font-extrabold text-indigo-900 dark:text-indigo-200 mb-4 text-center px-2">🧑‍💻 <span className="bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-blue-300 bg-clip-text text-transparent">User Roles Distribution</span></h2>
            <ResponsiveContainer width="100%" height={270}>
              <RadialBarChart
                cx="50%"
                cy="65%"
                innerRadius="62%"
                outerRadius="95%"
                barSize={34}
                data={radialData}
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar
                  minAngle={24}
                  label={{
                    position: "insideStart",
                    fill: isDarkMode ? "#c7d2fe" : "#374151",
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                  background
                  clockWise
                  dataKey="value"
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="w-full flex flex-row justify-center items-center gap-3 text-xs mt-3">
              <span className="flex items-center gap-1"><span className="w-3 h-3 inline-block rounded-full bg-blue-500" />Students</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 inline-block rounded-full bg-green-400" />Instructors</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 inline-block rounded-full bg-amber-400" />Admins</span>
            </div>
            <SectionDivider color="from-indigo-200 via-blue-100 to-fuchsia-100" className="my-5" />
            <div className="mt-2 w-full">
              <div className="text-center font-bold text-indigo-700 dark:text-blue-300 mb-1 flex items-center gap-2 justify-center">
                🏅 <span className="tracking-wide text-lg">Milestones</span>
              </div>
              <ul className="flex flex-col gap-1 items-center">
                {milestoneData.map((m, i) => (
                  <li
                    key={m.milestone}
                    className={`flex items-center gap-2 text-xs px-3 py-1 rounded-full border-2 transition font-semibold shadow
                      ${
                        m.achieved
                          ? "bg-gradient-to-r from-green-200/90 to-blue-100 border-green-400 text-green-700 dark:bg-stone-800 dark:text-green-200 dark:border-green-900"
                          : "bg-white border-gray-300 text-gray-500 dark:bg-stone-900 dark:text-gray-200 dark:border-stone-700"
                      }
                    `}
                  >
                    {m.achieved ? (
                      <span className="text-lg">🏆</span>
                    ) : (
                      <span className="text-base text-gray-400">⏳</span>
                    )}
                    <span>{m.milestone}</span>
                    {m.achieved && (
                      <span className="ml-1 text-[11px] text-green-500 italic">
                        ({m.date})
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              {/* Random Fun Stat */}
              <div className="mt-3 text-center text-fuchsia-700 dark:text-fuchsia-200 font-bold text-xs bg-fuchsia-50/75 dark:bg-fuchsia-900/20 px-3 py-1 rounded-full inline-block shadow">
                {getRandomElement(funFacts)}
              </div>
            </div>
          </div>
        </div>
        
        <SectionDivider color="from-fuchsia-200 via-blue-200 to-cyan-100" />

        {/* Top Courses Section - new layout, shadow, and grid improvement */}
        <div className="bg-gradient-to-r from-white via-indigo-50 to-sky-100 dark:from-stone-900 dark:via-stone-900 dark:to-stone-900 rounded-[2.2rem] p-8 shadow-2xl border border-indigo-100 dark:border-stone-700 mb-14 w-full max-w-[98vw] mx-auto" style={{width: "100vw"}}>
          <h2 className="text-2xl font-extrabold text-indigo-900 dark:text-indigo-200 mb-7 flex items-center gap-2">
            <span className="text-2xl">🏆</span> Top Courses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
            {topCourses.map((course, index) => (
              <div
                key={index}
                className="relative group bg-white dark:bg-stone-900 rounded-[2rem] shadow-2xl hover:shadow-blue-400/20 border border-indigo-100 dark:border-stone-800 overflow-hidden transition-all transform hover:-translate-y-1 hover:scale-105 flex flex-col w-full"
                style={{
                  minHeight: "390px",
                  borderWidth: 2
                }}
              >
                <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-blue-200/20 dark:bg-stone-700 opacity-35 blur-2xl z-0 animate-pulse" />
                <img
                  src={
                    course.image && course.image.trim() !== ""
                      ? course.image
                      : "https://via.placeholder.com/400x200?text=No+Image"
                  }
                  alt={course.title}
                  className="w-full h-[160px] object-cover object-top mt-0 rounded-t-3xl border-b-2 border-indigo-100 dark:border-stone-800"
                  loading="lazy"
                />
                <div className="p-7 pt-6 pb-4 flex-1 flex flex-col justify-between z-10">
                  <div className="flex items-start gap-2">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-[2px] truncate max-w-[70%]">
                      {course.title}
                    </h3>
                    <div className="ml-auto flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 via-indigo-300 to-cyan-100 dark:from-indigo-600 dark:via-indigo-900 dark:to-gray-800 border-2 border-white flex items-center justify-center text-lg font-bold text-white shadow-lg">
                      {course.instructor
                        .split(" ")
                        .map((w) => w[0].toUpperCase())
                        .join("")
                        .slice(0, 2)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-blue-200 mb-2">
                    By <span className="font-bold">{course.instructor}</span>
                  </p>
                  <div className="flex items-end justify-between mb-3">
                    <span className="text-yellow-500 text-lg font-black flex items-center gap-2 animate-pulse">
                      ⭐{course.rating !== undefined && course.rating !== null
                        ? course.rating
                        : 0}
                    </span>
                    <span className="text-blue-400 text-base font-semibold dark:text-cyan-200">
                      {course.students !== undefined && course.students !== null
                        ? course.students
                        : 0}
                      <span className="ml-1 text-sm font-normal text-gray-400 dark:text-indigo-200">students</span>
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-stone-700 rounded-full h-3 mt-1 mb-3 relative overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-sky-400 h-3 rounded-full transition-all"
                      style={{
                        width: `${
                          course.progress !== undefined && course.progress !== null
                            ? course.progress
                            : 0
                        }%`,
                        transition: "width .5s cubic-bezier(.4,2,.4,1)"
                      }}
                    >
                      <span
                        className="absolute right-0 -top-1 w-4 h-4 rounded-full bg-white border-2 border-blue-500 shadow animate-pulse"
                        style={{
                          left: `calc(${Math.min(
                            course.progress !== undefined &&
                              course.progress !== null
                              ? course.progress
                              : 0,
                            100
                          )}% - 8px)`,
                          display:
                            course.progress !== undefined &&
                            course.progress !== null &&
                            course.progress > 0
                              ? "block"
                              : "none",
                        }}
                      ></span>
                    </div>
                  </div>
                  <p className="text-xs text-blue-500 mt-1 font-bold tracking-wide dark:text-blue-200">
                    Progress:{" "}
                    <span className="font-extrabold text-indigo-700 dark:text-indigo-200">
                      {course.progress !== undefined && course.progress !== null
                        ? course.progress
                        : 0}
                      %
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Uploaded Videos Section (with more card aspect) */}
        {uploadedVideos.length > 0 && (
          <div className="bg-gradient-to-br from-white via-yellow-100 to-orange-50 dark:from-stone-800 dark:via-stone-900 dark:to-yellow-900 rounded-[2.2rem] p-10 shadow-2xl border border-orange-100 dark:border-orange-700 mb-14 w-full max-w-[98vw]" style={{width:"100vw"}}>
            <h2 className="text-2xl font-extrabold text-orange-800 dark:text-orange-200 mb-7 flex items-center gap-2">
              <span className="text-2xl">🎬</span> Uploaded Videos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
              {uploadedVideos.map((video, idx) => (
                <div key={idx} className="rounded-2xl bg-white dark:bg-stone-800 shadow-lg border-2 border-orange-100 dark:border-orange-800 p-7 flex flex-col w-full">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl">🎬</span>
                    <span className="font-bold text-orange-800 dark:text-orange-200 text-lg truncate">{video.title}</span>
                  </div>
                  <span className="text-xs text-orange-700 dark:text-orange-300 mb-1">
                    <span className="font-semibold">By {video.uploader}</span>
                    <span className="mx-1">&middot;</span>
                    {new Date(video.date).toLocaleString()}
                  </span>
                  {video.url.startsWith('http') ? (
                    <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 dark:text-blue-200 hover:underline truncate">
                      {video.url}
                    </a>
                  ) : (
                    <span className="text-sm text-gray-400">{video.url}</span>
                  )}
                  {video.description && (
                    <p className="text-sm text-gray-600 dark:text-orange-200 mt-2">
                      {video.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <SectionDivider color="from-blue-100 via-indigo-100 to-fuchsia-100" />
        
        {/* Recent Activity - wider, pastel, hoverable with new color segments */}
        <div className="bg-gradient-to-r from-indigo-50 via-sky-50 to-fuchsia-100 dark:from-stone-800 dark:via-stone-900 dark:to-stone-900 rounded-[2.2rem] p-0 shadow-2xl border border-blue-100 dark:border-stone-800 overflow-hidden w-full max-w-[100vw]" style={{width:'100vw', maxWidth:'100vw'}}>
          <div className="flex flex-wrap items-center justify-between px-8 pt-8 pb-2 border-b border-gray-100 dark:border-stone-800 bg-gradient-to-l from-indigo-50 via-blue-50 to-white dark:from-stone-900 dark:via-stone-800 dark:to-stone-900 w-full">
            <h2 className="text-2xl font-extrabold text-indigo-900 dark:text-indigo-200 flex items-center gap-2 drop-shadow">
              <span className="text-3xl">🕒</span> Recent Activities
            </h2>
            <a
              href="#"
              className="text-blue-600 dark:text-blue-300 text-base font-bold hover:underline transition-colors"
            >
              View All
            </a>
          </div>
          <div className="divide-y divide-blue-50 dark:divide-stone-700 w-full">
            {recentActivities.map((activity, index) => {
              const { icon, bg, color, ring } = getActivityIconProps(
                activity.type
              );
              const isFun = activity.type === "funfact";
              const isVideo = activity.type === "video";
              const isInspiration = activity.type === "inspiration";
              return (
                <div
                  key={index}
                  className={`
                  group flex flex-col sm:flex-row sm:items-center gap-4 px-8 py-6 relative
                  hover:bg-gradient-to-tr hover:from-fuchsia-50/95 hover:via-blue-50 hover:to-white dark:hover:from-stone-700 dark:hover:to-stone-900 transition cursor-pointer
                  ${
                    isFun
                      ? "bg-fuchsia-50/60 dark:bg-fuchsia-900/20 shadow-md ring-2 ring-fuchsia-200 animate-pulse"
                      : isVideo
                      ? "bg-orange-50/70 dark:bg-orange-900/20 ring-2 ring-orange-200"
                      : isInspiration
                      ? "bg-cyan-50/80 dark:bg-cyan-900/10 ring-2 ring-cyan-400 font-extrabold"
                      : ""
                  }
                `}
                  style={{
                    ...(
                      isFun
                        ? { borderLeft: "5px solid #ec4899" }
                        : isVideo
                        ? { borderLeft: "5px solid #fdba74" }
                        : isInspiration
                        ? { borderLeft: "5px solid #06b6d4" }
                        : {}
                    ),
                    width:'100%'
                  }}
                >
                  <span
                    className="absolute left-0 top-0 h-full w-1.5 rounded-bl-2xl rounded-tl-2xl"
                    style={{
                      background:
                        activity.type === "enroll"
                          ? "linear-gradient(to bottom,#8de5a2,#38bdf8)"
                          : activity.type === "complete"
                          ? "linear-gradient(to bottom,#c7d2fe,#6366f1)"
                          : activity.type === "new"
                          ? "linear-gradient(to bottom,#fef08a,#fbbf24)"
                          : activity.type === "purchase"
                          ? "linear-gradient(to bottom,#a5b4fc,#818cf8)"
                          : activity.type === "milestone"
                          ? "linear-gradient(to bottom,#ffe082,#fbbf24)"
                          : activity.type === "funfact"
                          ? "linear-gradient(to bottom,#f9a8d4,#fef08a,#a5b4fc)"
                          : activity.type === "video"
                          ? "linear-gradient(to bottom,#fde68a,#fdba74)"
                          : activity.type === "inspiration"
                          ? "linear-gradient(to bottom,#99f6e4,#e0e7ff,#f9a8d4)"
                          : "linear-gradient(to bottom,#d1d5db,#cbd5e1)",
                      opacity: 0.87,
                    }}
                  />
                  <div className="flex items-center">
                    <span
                      className={
                        `relative w-16 h-16 rounded-[1.2rem] flex items-center justify-center text-3xl font-bold shadow-lg transition-transform duration-200 group-hover:scale-110 border-2 border-white/90 ring-4 ${bg} ${ring}` +
                        " " +
                        color
                      }
                      aria-label={activity.user + " activity icon"}
                    >
                      {icon}
                      <span
                        className={`absolute bottom-2 right-2 w-3 h-3 rounded-full shadow-lg animate-pulse opacity-70 ${
                          activity.type === "enroll"
                            ? "bg-green-400"
                            : activity.type === "complete"
                            ? "bg-blue-400"
                            : activity.type === "purchase"
                            ? "bg-indigo-400"
                            : activity.type === "milestone"
                            ? "bg-yellow-300"
                            : activity.type === "funfact"
                            ? "bg-pink-400"
                            : activity.type === "video"
                            ? "bg-orange-400"
                            : activity.type === "inspiration"
                            ? "bg-cyan-400"
                            : "bg-gray-400"
                        }`}
                      ></span>
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="font-extrabold text-gray-900 dark:text-white truncate max-w-[170px]">
                        {activity.user}
                      </span>
                      <span
                        className={
                          "text-xs px-3 py-[2px] rounded-full font-semibold capitalize shadow " +
                          (activity.type === "enroll"
                            ? "bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-200 border border-green-300 dark:border-green-800"
                            : activity.type === "complete"
                            ? "bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 border border-blue-300 dark:border-blue-800"
                            : activity.type === "new"
                            ? "bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 border border-yellow-400 dark:border-yellow-900"
                            : activity.type === "purchase"
                            ? "bg-indigo-50 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-900"
                            : activity.type === "milestone"
                            ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 border border-yellow-300 dark:border-yellow-900"
                            : activity.type === "tip"
                            ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-200 border border-blue-300 dark:border-blue-900"
                            : activity.type === "funfact"
                            ? "bg-fuchsia-100 dark:bg-fuchsia-700 text-fuchsia-800 dark:text-fuchsia-100 border border-fuchsia-300 dark:border-fuchsia-800"
                            : activity.type === "video"
                            ? "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 border border-orange-300 dark:border-orange-900"
                            : activity.type === "inspiration"
                            ? "bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 border border-cyan-300 dark:border-cyan-800"
                            : "bg-gray-50 dark:bg-stone-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-stone-700")
                        }
                      >
                        {activity.type === "enroll"
                          ? "Enrolled"
                          : activity.type === "complete"
                          ? "Completed"
                          : activity.type === "new"
                          ? "Joined"
                          : activity.type === "purchase"
                          ? "Purchased"
                          : activity.type === "milestone"
                          ? "Milestone"
                          : activity.type === "tip"
                          ? "Tip"
                          : activity.type === "funfact"
                          ? "Fun Fact"
                          : activity.type === "video"
                          ? "Video Uploaded"
                          : activity.type === "inspiration"
                          ? "Inspiration"
                          : "Info"}
                      </span>
                    </div>
                    <div
                      className={`text-base ${
                        isFun
                          ? "font-bold text-fuchsia-700 dark:text-fuchsia-100"
                          : isVideo
                          ? "font-bold text-orange-600 dark:text-orange-200"
                          : isInspiration
                          ? "font-bold bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-blue-500 bg-clip-text text-transparent"
                          : "text-gray-800 dark:text-indigo-100"
                      } mt-2 font-semibold`}
                    >
                      {activity.action}
                      {isFun && (
                        <span className="ml-2 text-2xl animate-bounce">✨</span>
                      )}
                      {isVideo && (
                        <span className="ml-2 text-lg animate-bounce">🎬</span>
                      )}
                      {isInspiration && (
                        <span className="ml-2 text-2xl animate-jump">🌈</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end ml-2 min-w-[80px]">
                    <span
                      className={`text-xs px-2 py-1 bg-white/80 dark:bg-white/10 rounded-lg font-semibold border shadow-sm ${
                        isFun
                          ? "text-fuchsia-700 dark:text-fuchsia-200 border-fuchsia-200 dark:border-fuchsia-700"
                          : isVideo
                          ? "text-orange-600 dark:text-orange-300 border-orange-200 dark:border-orange-700"
                          : isInspiration
                          ? "text-cyan-800 dark:text-cyan-200 border-cyan-200 dark:border-cyan-800"
                          : "text-gray-400 dark:text-indigo-200 border-gray-200 dark:border-stone-800"
                      }`}
                    >
                      {activity.time}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== Add New Course Modal (unchanged) ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 w-full h-full">
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-8 w-[94%] max-w-md shadow-2xl">
            <h2 className="text-2xl font-extrabold text-indigo-800 dark:text-indigo-200 mb-6 text-center">
              Add New Course
            </h2>
            <input
              type="text"
              placeholder="Course Title"
              className="w-full border-2 border-blue-200 dark:border-blue-800 p-3 rounded-[15px] mb-4 shadow focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-800 outline-none text-gray-900 dark:text-white text-base font-semibold bg-white dark:bg-stone-800"
              value={newCourse.title}
              onChange={(e) =>
                setNewCourse({ ...newCourse, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Instructor Name"
              className="w-full border-2 border-blue-200 dark:border-blue-800 p-3 rounded-[15px] mb-4 shadow focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-800 outline-none text-gray-900 dark:text-white text-base font-semibold bg-white dark:bg-stone-800"
              value={newCourse.instructor}
              onChange={(e) =>
                setNewCourse({ ...newCourse, instructor: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Rating (e.g., 4.5)"
              className="w-full border-2 border-purple-200 dark:border-purple-800 p-3 rounded-[15px] mb-4 shadow focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-800 outline-none text-gray-900 dark:text-white text-base bg-white dark:bg-stone-800"
              value={newCourse.rating}
              min="0"
              max="5"
              step="0.1"
              onChange={(e) =>
                setNewCourse({ ...newCourse, rating: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Students (e.g., 100)"
              className="w-full border-2 border-green-200 dark:border-green-800 p-3 rounded-[15px] mb-4 shadow focus:ring-2 focus:ring-green-400 dark:focus:ring-green-800 outline-none text-gray-900 dark:text-white text-base bg-white dark:bg-stone-800"
              value={newCourse.students}
              min="0"
              onChange={(e) =>
                setNewCourse({ ...newCourse, students: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Progress (%)"
              className="w-full border-2 border-cyan-200 dark:border-cyan-800 p-3 rounded-[15px] mb-4 shadow focus:ring-2 focus:ring-cyan-400 dark:focus:ring-cyan-800 outline-none text-gray-900 dark:text-white text-base bg-white dark:bg-stone-800"
              value={newCourse.progress}
              min="0"
              max="100"
              onChange={(e) =>
                setNewCourse({ ...newCourse, progress: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Image URL (optional)"
              className="w-full border-2 border-indigo-200 dark:border-indigo-800 p-3 rounded-[15px] mb-6 shadow focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-800 outline-none text-gray-900 dark:text-white text-base bg-white dark:bg-stone-800"
              value={newCourse.image}
              onChange={(e) =>
                setNewCourse({ ...newCourse, image: e.target.value })
              }
            />
            <div className="flex gap-4 flex-row-reverse">
              <button
                onClick={handleAddCourse}
                className="bg-gradient-to-r from-blue-600 via-indigo-400 to-cyan-400 text-white px-6 py-2 rounded-2xl font-semibold shadow-lg hover:scale-105 hover:bg-blue-800 transition-all"
              >
                Add
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 dark:bg-stone-700 text-gray-900 dark:text-indigo-100 px-5 py-2 rounded-2xl font-bold shadow hover:bg-gray-400 dark:hover:bg-stone-800 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ===== Upload Video Modal ===== */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 w-full h-full">
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-8 w-[94%] max-w-md shadow-2xl">
            <h2 className="text-2xl font-extrabold text-orange-800 dark:text-orange-200 mb-6 text-center">
              Upload Video
            </h2>
            <input
              type="text"
              placeholder="Video Title"
              className="w-full border-2 border-orange-200 dark:border-orange-700 p-3 rounded-[15px] mb-4 shadow focus:ring-2 focus:ring-orange-400 dark:focus:ring-orange-800 outline-none text-gray-900 dark:text-white text-base font-semibold bg-white dark:bg-stone-800"
              value={videoForm.title}
              onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
            />
            <input
              type="url"
              placeholder="Video URL (YouTube, Vimeo, etc)"
              className="w-full border-2 border-orange-200 dark:border-orange-700 p-3 rounded-[15px] mb-4 shadow focus:ring-2 focus:ring-orange-400 dark:focus:ring-orange-800 outline-none text-gray-900 dark:text-white text-base font-semibold bg-white dark:bg-stone-800"
              value={videoForm.url}
              onChange={(e) => setVideoForm({ ...videoForm, url: e.target.value })}
            />
            <input
              type="text"
              placeholder="Uploader Name"
              className="w-full border-2 border-orange-200 dark:border-orange-700 p-3 rounded-[15px] mb-4 shadow focus:ring-2 focus:ring-orange-400 dark:focus:ring-orange-800 outline-none text-gray-900 dark:text-white text-base font-semibold bg-white dark:bg-stone-800"
              value={videoForm.uploader}
              onChange={(e) => setVideoForm({ ...videoForm, uploader: e.target.value })}
            />
            <textarea
              placeholder="Description (optional)"
              className="w-full border-2 border-orange-200 dark:border-orange-700 p-3 rounded-[15px] mb-6 shadow focus:ring-2 focus:ring-orange-400 dark:focus:ring-orange-800 outline-none text-gray-900 dark:text-white text-base bg-white dark:bg-stone-800"
              value={videoForm.description}
              onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
              rows="3"
            />
            <div className="flex gap-4 flex-row-reverse">
              <button
                onClick={handleAddVideo}
                className="bg-gradient-to-r from-orange-600 via-orange-400 to-yellow-400 text-white px-6 py-2 rounded-2xl font-semibold shadow-lg hover:scale-105 hover:bg-orange-800 transition-all"
              >
                Upload
              </button>
              <button
                onClick={() => setShowVideoModal(false)}
                className="bg-gray-300 dark:bg-stone-700 text-gray-900 dark:text-orange-100 px-5 py-2 rounded-2xl font-bold shadow hover:bg-gray-400 dark:hover:bg-stone-800 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

