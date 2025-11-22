import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// --- Even More Changed & Playful Sidebar Design ---

const gradients = [
  "bg-gradient-to-tr from-[#A770EF]/80 via-[#FDB99B]/70 to-[#FFD6E0]/70", // Pink-Purple
  "bg-gradient-to-br from-[#43e97b]/80 via-[#38f9d7]/80 to-[#fa709a]/80", // Green-Blue
  "bg-gradient-to-br from-[#30cfd0]/80 to-[#330867]/60"
];
const avatarImages = [
  "https://randomuser.me/api/portraits/men/75.jpg",
  "https://randomuser.me/api/portraits/women/68.jpg",
  "https://randomuser.me/api/portraits/men/44.jpg"
];

export default function Sidebar({ open = false, onClose } = {}) {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <span className="text-[30px]">📊</span> },
    { name: "Courses", path: "/courses", icon: <span className="text-[28px]">📚</span> },
    { name: "Students", path: "/students", icon: <span className="text-[28px]">👥</span> },
    { name: "Instructors", path: "/instructors", icon: <span className="text-[28px]">🧑‍🏫</span> },
    { name: "Assignments", path: "/assignments", icon: <span className="text-[27px]">📝</span> },
    { name: "Attendance", path: "/attendance", icon: <span className="text-[27px]">📅</span> },
    { name: "Grades", path: "/grades", icon: <span className="text-[27px]">📒</span> },
    { name: "Announcements", path: "/announcements", icon: <span className="text-[27px]">📢</span> },
    { name: "Reports", path: "/reports", icon: <span className="text-[29px]">📈</span> },
    { name: "Login", path: "/login", icon: <span className="text-[28px]">🔐</span> },
    { name: "Settings", path: "/settings", icon: <span className="text-[28px]">⚙️</span> },
  ];

  // Randomly select one background and avatar for fun!
  const backgroundIdx = React.useMemo(() => Math.floor(Math.random() * gradients.length), []);
  const avatarIdx = React.useMemo(() => Math.floor(Math.random() * avatarImages.length), []);

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
    <div className="relative">
      {/* Blurred Vibrant Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-gradient-to-br from-[#a770ef]/60 via-[#fdb99b]/50 to-[#ffffff]/70 backdrop-blur-2xl animate-fadein z-40 transition-all"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed left-0 top-0 flex flex-col w-72 h-screen ${gradients[backgroundIdx]} border-r-2 border-white/40 z-50 transition-all duration-500 shadow-2xl overflow-hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          boxShadow: "0 14px 46px 8px rgba(167,112,239,0.21), 0 1.5px 20px 4px #fff3"
        }}
      >
        {/* Top: New Avatar, Logo, Neon Name Plate */}
        <div className="pt-7 pb-3 px-8 flex flex-col items-center gap-2 border-b border-white/20 bg-gradient-to-r from-white/50 to-white/30 relative z-10">
          <div className="relative mb-1 w-20 h-20 rounded-full shadow-lg border-4 border-white/70 overflow-hidden hover:rotate-2 transition-all">
            <img
              src={avatarImages[avatarIdx]}
              alt="Profile Avatar"
              className="object-cover w-full h-full"
              draggable="false"
            />
            <span className="absolute right-0 bottom-1 w-5 h-5 bg-green-400 border-white border-2 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <span className="text-[0.8em]" role="img" aria-label="online">
                🟢
              </span>
            </span>
          </div>
          <div className="relative flex flex-col items-center gap-1">
            <span className="text-indigo-800 text-2xl font-black tracking-wide drop-shadow uppercase flex items-center">
              LMS
              <span className="ml-2 text-sm font-bold text-pink-500 animate-bounce">✨</span>
            </span>
            <span className="rounded-xl px-3 py-1 bg-indigo-900/70 text-white text-xs font-semibold tracking-wider mt-2 shadow-xl glass-glow border-2 border-indigo-200/70 opacity-95">
              Dashboard
            </span>
          </div>
          <p className="text-xs text-indigo-600/80 mt-1 text-center italic font-medium">Welcome Back, Student!</p>
          <button
            onClick={onClose}
            className="absolute right-6 top-6 p-1.5 rounded-full bg-white/80 hover:bg-pink-200/90 shadow-lg transition border border-pink-400/30"
            aria-label="Close sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.9} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Magic Sparkle Accent Left Bar */}
        <div className="absolute left-1.5 top-32 w-2.5 h-[60%] rounded-full bg-gradient-to-b from-pink-300 via-[#a770ef] to-indigo-500 opacity-80 shadow-md animate-gradient-y" />

        {/* Curvy Menu Section */}
        <div className="flex-1 px-4 py-6 overflow-y-auto relative z-10">
          <nav className="flex flex-col gap-2">
            {menuItems.map((item, idx) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`group flex items-center gap-4 px-5 py-3 font-bold rounded-full text-base transition-shadow duration-150 shadow-none select-none border-2 ${
                    active
                      ? "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-2xl border-white/80 scale-105"
                      : "bg-white/50 border-white/40 text-indigo-800 hover:border-pink-400 hover:shadow-lg hover:scale-[1.04] hover:bg-pink-50/70"
                  }`}
                  style={
                    active
                      ? {
                          boxShadow: "0 6px 32px 0px #a770ef44, 0 2px 10px 2px #fdb99bbb",
                          background: "linear-gradient(92deg,#fd5c63 0%,#a770ef 77%,#30cfd0 100%)"
                        }
                      : {}
                  }
                >
                  <span
                    className={`mr-1 flex items-center justify-center rounded-lg p-2 transition-all duration-150 ${
                      active
                        ? "bg-white/10 shadow-lg text-white scale-125 drop-shadow-glow"
                        : "bg-indigo-100 text-indigo-500 group-hover:bg-pink-100 group-hover:text-pink-500"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="tracking-wide">{item.name}</span>
                  {active && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-pink-300 animate-pulse border border-white shadow-inner" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
        {/* Playful Animated Footer */}
        <div className="p-6 pb-7 text-center text-xs font-semibold tracking-tight border-t border-white/40 bg-gradient-to-br from-white/50 to-pink-50/80 z-10 relative flex flex-col gap-2 items-center">
          <span className="flex items-center gap-2">
            <span className="text-lg text-indigo-400">©</span>
            <span className="font-extrabold text-pink-500 drop-shadow-glow">LMS</span>
            <span className="text-indigo-700 font-bold">{new Date().getFullYear()}</span>
          </span>
          <span className="text-[12px] tracking-[0.11em] text-indigo-400/90 flex items-center gap-1 animate-shine">
            Made with 
            <span className="animate-heartbeat text-pink-500 px-1">❤️</span>
            <span className="text-sm animate-bounce text-indigo-400">for students</span>
          </span>
          <span className="text-[10px] opacity-60 italic mt-2 font-normal">Let’s make learning beautiful!</span>
        </div>
      </aside>
      {/* Fun floating sparkles */}
      <div className={`pointer-events-none fixed top-0 left-0 z-[100] w-72 h-screen`}>
        {[...Array(11)].map((_, i) => (
          <span
            className="absolute animate-floatingSparkle select-none opacity-70"
            key={i}
            style={{
              left: `${10 + Math.random() * 50}%`,
              top: `${Math.random() * 94}%`,
              fontSize: `${0.7 + Math.random()}em`,
              filter: "blur(0.5px)",
              color: ["#fd5c63", "#a770ef", "#30cfd0", "#FDB99B", "#FFD6E0"][i%5]
            }}
          >{["✨","💫","🦄","⚡","🌸"][i%5]}</span>
        ))}
      </div>
      {/* Glow CSS & fun keyframes */}
      <style>{`
        .glass-glow { box-shadow: 0 0 15px #a770ef55, 0 2px 8px #fff8 inset; }
        .drop-shadow-glow { filter: drop-shadow(0 0 8px #fff9) drop-shadow(0 1px 5px #a770efaa);}
        @keyframes floatingSparkle {
          0% { transform: translateY(0) scale(1) rotate(0deg); opacity:0.5;}
          60% { opacity:0.87;}
          80% { opacity:1;}
          100% { transform: translateY(-44px) scale(1.09) rotate(18deg); opacity:0.6;}
        }
        .animate-floatingSparkle {
          animation: floatingSparkle 3.5s cubic-bezier(0.18,0.98,0.67,0.89) infinite alternate;
        }
        @keyframes gradient-y {
          0%,100%{background-position:0% 0%;}
          50%{background-position:0% 100%;}
        }
        .animate-gradient-y {
          background-size: 100% 200%;
          animation: gradient-y 7s ease-in-out infinite alternate;
        }
        @keyframes heartbeat{
          0%,100%{transform:scale(1);}
          20%{transform:scale(1.12);}
          40%{transform:scale(0.95);}
          70%{transform:scale(1.1);}
          90%{transform:scale(0.97);}
        }
        .animate-heartbeat{animation:heartbeat 2.2s infinite;}
        @keyframes shine{
          0%{opacity:.78;}
          35%{opacity:1;}
          60%{opacity:.82;}
          100%{opacity:.78;}
        }
        .animate-shine{animation:shine 2.6s infinite;}
        @media (max-width: 1024px) {
          aside { width: 100vw !important; min-width: 0 !important; }
          .fixed.w-72 { width: 100vw !important; }
        }
      `}</style>
    </div>
  );
}