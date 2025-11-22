import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

// --- Redesigned Header with new style and structure ---

export default function Header({ onOpenSidebar }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const location = useLocation();
  const profileRef = useRef();
  const notificationRef = useRef();

  const [user] = useState({
    name: "Aditya Gupta",
    email: "aditya@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=aditya",
  });

  // Animate border color for new effect
  const [borderColor, setBorderColor] = useState(0);
  useEffect(() => {
    const colors = [
      "#fde68a",
      "#a5b4fc",
      "#6d28d9",
      "#ec4899",
      "#10b981",
      "#f59e42",
    ];
    let i = 0;
    const intv = setInterval(() => {
      setBorderColor(c => (c + 1) % colors.length);
      i++;
    }, 700);
    return () => clearInterval(intv);
  }, []);

  // Smaller sticky header on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dropdown close handlers
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // For animating border color
  const animatedBorderColor = [
    "#fde68a",
    "#a5b4fc",
    "#6d28d9",
    "#ec4899",
    "#10b981",
    "#f59e42",
  ][borderColor];

  // Less neon/glass, new frosted glass & new arrangement
  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500`}
      style={{
        background: darkMode
          ? "rgba(11,20,36,0.93)"
          : "rgba(255,255,255,0.85)",
        backdropFilter: "blur(14px)",
        borderBottom: `4px solid ${animatedBorderColor}`,
        boxShadow: scrolled
          ? "0 4px 40px 0 #d1d5db58"
          : "0 1px 10px #c7d2fe14",
        minHeight: scrolled ? 44 : 66,
        transition: "min-height 0.3s",
      }}
    >
      {/* Top Shadow line as subtle accent  */}
      <div
        style={{
          width: "100%",
          height: "3px",
          background: `linear-gradient(90deg, #fbbf24 0%, #f472b6 15%, #818cf8 60%, #22d3ee 90%)`,
          opacity: 0.16,
          borderRadius: "0 0 8px 8px",
        }}
      />
      {/* MainBar */}
      <div
        className={`mx-auto flex items-center justify-between px-4 py-1.5 md:py-2 transition-all duration-300`}
        style={{
          maxWidth: 1100,
        }}
      >
        {/* LEFT: Logo & Sidebar */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSidebar}
            className={`p-2 rounded-xl bg-gradient-to-br from-indigo-50/60 to-pink-100/50 border-2 shadow-sm shadow-${darkMode ? "fuchsia-900/30" : "indigo-200/40"
              } border-indigo-200 dark:border-fuchsia-700 hover:scale-110 transition-all focus:outline-none`}
            aria-label="Open sidebar"
            tabIndex={0}
            style={{
              borderColor: animatedBorderColor,
              boxShadow: `0 0 0 2px ${animatedBorderColor}22`,
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-fuchsia-700 dark:text-fuchsia-100" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <rect width={16} height={2.6} x={4} y={6} rx={1.3} fill="currentColor" />
              <rect width={16} height={2.6} x={4} y={12.5} rx={1.3} fill="currentColor" />
            </svg>
          </button>
          <Link
            to="/"
            className="flex items-center gap-2 ml-1 group"
            style={{ userSelect: "none" }}
          >
            <div
              className="rounded-2xl border-2 p-1 bg-gradient-to-br from-yellow-100 to-fuchsia-100 dark:from-indigo-900/80 dark:to-fuchsia-900/50 shadow-xl relative"
              style={{
                borderColor: animatedBorderColor,
                minWidth: 36,
                minHeight: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/906/906175.png"
                alt="Logo"
                className="w-7 h-7 object-cover rounded-xl drop-shadow"
              />
            </div>
            <span className={`font-black text-xl tracking-tight bg-gradient-to-r from-fuchsia-600 to-emerald-400 bg-clip-text text-transparent transition-all duration-300 group-hover:drop-shadow-lg`}>
              LMS
            </span>
          </Link>
        </div>
        {/* MID: New Notification centered bar*/}
        <div className="flex-1 flex items-center justify-center">
          {showNotifications && (
            <div
              className={`absolute top-[60px] left-1/2 -translate-x-1/2 w-80 rounded-2xl shadow-2xl border border-fuchsia-200/40 dark:border-indigo-800/50
                bg-gradient-to-br from-white/95 via-fuchsia-50/85 to-indigo-100/65 dark:from-gray-900/98 dark:via-violet-950/70 dark:to-fuchsia-900/60
                text-gray-900 dark:text-fuchsia-100 backdrop-blur-xl animate-menu-pop z-50`}
            >
              <div className="px-5 py-3 font-bold border-b border-fuchsia-100/50 flex items-center gap-2 text-lg">
                <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse drop-shadow"></span>
                Notifications
              </div>
              <div className="max-h-40 overflow-y-auto py-1 flex flex-col gap-1">
                <p className="px-5 py-2 rounded-xl hover:bg-gradient-to-br hover:from-indigo-50/55 hover:to-fuchsia-50/40 dark:hover:bg-fuchsia-900/25 transition-all flex gap-2 items-center font-medium">
                  <span className="text-blue-400">📚</span>
                  New course added: <span className="font-bold text-indigo-500">React Mastery</span>
                </p>
                <p className="px-5 py-2 rounded-xl hover:bg-gradient-to-br hover:from-yellow-50/80 hover:to-pink-50/65 dark:hover:bg-fuchsia-700/20 transition-all flex gap-2 items-center font-medium">
                  <span className="text-yellow-400">🔔</span>
                  Your profile was updated successfully.
                </p>
                <p className="px-5 py-2 rounded-xl hover:bg-gradient-to-br hover:from-emerald-50/70 hover:to-indigo-50/60 dark:hover:bg-emerald-600/30 transition-all flex gap-2 items-center font-medium">
                  <span className="text-emerald-400">🎓</span>
                  3 new students joined your course.
                </p>
                <p className="px-5 py-2 rounded-xl hover:bg-gradient-to-br hover:from-purple-50/60 hover:to-emerald-50/55 dark:hover:bg-purple-700/15 transition-all flex gap-2 items-center font-medium">
                  <span className="text-purple-400">⭐</span>
                  Don't forget to check your assignments!
                </p>
              </div>
              <div className="border-t border-fuchsia-100/40 py-2 px-4 text-center text-fuchsia-500 font-semibold hover:underline cursor-pointer select-none text-sm hover:text-indigo-600 transition">
                View all
              </div>
            </div>
          )}
        </div>
        {/* RIGHT: Profile, Theme, Notification */}
        <div className="flex items-center gap-1 sm:gap-2 ml-auto relative">
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode((d) => !d)}
            className={`
            p-2 rounded-xl bg-gradient-to-t from-fuchsia-50/75 to-emerald-50/40 border-2 ${darkMode ? "border-emerald-400/80" : "border-fuchsia-300/60"}
            hover:scale-110 transition
            focus:outline-none
          `}
            aria-label="Toggle dark mode"
            style={{
              borderColor: darkMode ? "#67e8f9" : "#c026d3"
            }}
          >
            {darkMode ? (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-200">
                <path d="M9.37 5.51A7 7 0 1 0 18.49 14.63 7.001 7.001 0 0 1 9.37 5.51z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-indigo-400">
                <circle cx="12" cy="12" r="5" fill="#818cf8" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
                      stroke="#818cf8" strokeWidth={1.3} strokeLinecap="round" />
              </svg>
            )}
          </button>
          {/* Notifications */}
          <div ref={notificationRef} className="relative">
            <button
              onClick={() => setShowNotifications(s => !s)}
              className="p-2 rounded-xl bg-gradient-to-br from-yellow-50 to-fuchsia-100 border-2 border-pink-200 dark:border-indigo-700/60 transition-all hover:bg-gradient-to-tl hover:from-fuchsia-50 hover:to-pink-100 focus:outline-none"
              style={{ boxShadow: showNotifications ? `0 0 12px 2px #f472b6b8` : undefined, borderColor: "#f472b6" }}
              aria-label="Show notifications"
            >
              <svg className="w-5 h-5 text-fuchsia-600 dark:text-indigo-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.7}
                  d="M15 17h5l-1.405-1.405A2.03 2.03 0 0118 14V11a6 6 0 10-12 0v3c0 .53-.21 1.04-.59 1.42L4 17h5"
                />
                <circle cx="19" cy="8" r="2" fill="#f472b6" className="animate-ping" />
              </svg>
              <span className="absolute top-1 right-1 bg-pink-400 w-2 h-2 rounded-full animate-pulse ring-2 ring-white"></span>
            </button>
          </div>
          {/* User */}
          <div ref={profileRef} className="relative ml-1">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => setShowProfileMenu(s => !s)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-fuchsia-200/60 to-indigo-100/60 border-2 border-indigo-200 dark:border-fuchsia-800 shadow hover:bg-gradient-to-l hover:from-indigo-50 hover:to-pink-100 transition animate-glow-btn focus:outline-none"
                  style={{
                    borderColor: "#c7d2fe",
                  }}
                  aria-haspopup="true"
                  aria-expanded={showProfileMenu}
                  aria-label="Open profile menu"
                >
                  <img
                    src={user.avatar}
                    alt="User avatar"
                    className="h-7 w-7 rounded-full ring-2 ring-fuchsia-200/80 dark:ring-fuchsia-700 object-cover"
                  />
                  <span className="hidden md:block text-sm font-bold text-fuchsia-700 dark:text-fuchsia-100">{user.name}</span>
                  <span className="md:hidden text-lg">👤</span>
                  <svg
                    className={`ml-1 h-2.5 w-2.5 transition-transform duration-200 ${showProfileMenu ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="#818cf8"
                    strokeWidth={1.4}
                    viewBox="0 0 16 16"
                  >
                    <path d="M4 6l4 4 4-4" />
                  </svg>
                  {showProfileMenu && (
                    <span className="absolute -inset-2 rounded-2xl border-2 border-fuchsia-200/80 pointer-events-none animate-pulse-glow" />
                  )}
                </button>
                {showProfileMenu && (
                  <div
                    className="absolute right-0 mt-2 w-48 rounded-2xl shadow-xl shadow-indigo-400/10 border-2 border-indigo-100/30 dark:border-fuchsia-900/25 bg-white dark:bg-gray-950 text-gray-900 dark:text-fuchsia-100 backdrop-blur-2xl animate-menu-pop z-50 flex flex-col font-semibold text-base"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-3 rounded-t-2xl hover:bg-fuchsia-50 dark:hover:bg-fuchsia-900/15 hover:text-fuchsia-600 dark:hover:text-fuchsia-300 transition-all"
                    >
                      👤 My Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-3 hover:bg-indigo-50 dark:hover:bg-indigo-900/15 hover:text-indigo-700 dark:hover:text-fuchsia-400 transition-all"
                    >
                      ⚙️ Settings
                    </Link>
                    <div className="h-[1.5px] bg-gradient-to-r from-indigo-200 via-fuchsia-100 to-pink-200/80 my-1 rounded-full" />
                    <button
                      onClick={() => setIsLoggedIn(false)}
                      className="w-full text-left px-4 py-3 text-pink-600 dark:text-pink-300 hover:bg-pink-50 dark:hover:bg-pink-800/15 rounded-b-2xl font-bold hover:scale-[1.04] transition-all"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={() => setIsLoggedIn(true)}
                className="bg-gradient-to-r from-pink-400 via-fuchsia-500 to-indigo-500 text-white text-xs font-extrabold px-5 py-2 rounded-2xl hover:scale-110 shadow hover:shadow-fuchsia-100/80 transition border-2 border-fuchsia-200/40"
                style={{ borderColor: "#e879f9" }}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
      {/* New subtle color scrolling border on bottom */}
      <div
        className="w-full"
        style={{
          height: "5px",
          background: `linear-gradient(90deg, #fbbf24 0%, #f472b6 40%, #818cf8 70%, #22d3ee 100%)`,
          borderRadius: "0 0 9px 9px",
          opacity: 0.13,
          marginTop: "-2px",
          animation: "shinebar 9s linear infinite"
        }}
      ></div>
      {/* Minimal hover keyframes */}
      <style>{`
        @keyframes menu-pop {
          0% {transform:scale(0.91) translateY(-10px); opacity:0;}
          85%{transform:scale(1.07) translateY(2px); opacity:0.92;}
          100%{transform:scale(1) translateY(0); opacity:1;}
        }
        .animate-menu-pop{animation:menu-pop 0.23s cubic-bezier(0.32,0.9,0.68,1.35);}
        @keyframes glow-btn {
          0%,100% {box-shadow:0 0 11px 0 #c4b5fd44,0 1px 5px #a5b4fc34;}
          70%     {box-shadow:0 0 19px 3px #f9a8d450,0 2px 8px #818cf840;}
        }
        .animate-glow-btn {animation:glow-btn 1.7s infinite;}
        @keyframes pulse-glow {
          0%,100%{box-shadow:0 0 12px #a21caf66, 0 0 19px #38bdf855;}
          50%{box-shadow:0 0 25px #f472b6b9,0 0 20px #f0abfc44;}
        }
        .animate-pulse-glow{animation:pulse-glow 1.4s infinite;}
        @keyframes shinebar {
          0% {background-position:0% 0%;}
          100% {background-position:100% 0%;}
        }
      `}</style>
    </header>
  );
}
