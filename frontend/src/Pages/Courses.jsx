import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Redesigned modern hero strip for E Liye
const EliyeStrip = () => (
  <div className="relative flex justify-center pb-10 pt-2">
    <svg
      width="100%"
      height="80"
      viewBox="0 0 1200 80"
      fill="none"
      aria-hidden
      className="absolute left-0 right-0 top-0 w-full"
    >
      {/* Smooth background blob for visual depth */}
      <ellipse
        cx="600"
        cy="40"
        rx="560"
        ry="36"
        fill="url(#paint0_linear_eliye)"
        opacity="0.2"
      />
      {/* Modern zigzag with gradient */}
      <path
        d="M30 44 Q 300 2 600 43 Q 930 78 1170 42"
        stroke="url(#paint1_linear_eliye)"
        strokeWidth="7"
        fill="none"
        opacity="0.13"
      />
      {/* Stylized dots for dynamic effect */}
      <circle cx="105" cy="34" r="6" fill="#0ea5e9" />
      <circle cx="210" cy="46" r="7" fill="#f59e42" />
      <circle cx="335" cy="35" r="5" fill="#fb7185" />
      <circle cx="495" cy="44" r="6" fill="#34d399" />
      <circle cx="612" cy="53" r="7" fill="#fbbf24" />
      <circle cx="810" cy="31" r="5" fill="#a78bfa" />
      <circle cx="970" cy="43" r="6" fill="#38bdf8" />
      <circle cx="1090" cy="33" r="7" fill="#f472b6" />
      {/* ELIYE text with new modern style */}
      <text x="55" y="69" fontSize="2.7em" fontWeight="900" fill="url(#paint2_linear_eliye)" fontFamily="Poppins, sans-serif" letterSpacing="3">E  L  I  Y  E</text>
      <defs>
        <linearGradient id="paint0_linear_eliye" x1="0" y1="0" x2="1200" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#dbeafe"/>
          <stop offset="0.37" stopColor="#fce7f3"/>
          <stop offset="1" stopColor="#fef3c7"/>
        </linearGradient>
        <linearGradient id="paint1_linear_eliye" x1="0" y1="0" x2="1200" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38bdf8" />
          <stop offset="1" stopColor="#f472b6" />
        </linearGradient>
        <linearGradient id="paint2_linear_eliye" x1="0" y1="0" x2="500" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0ea5e9"/>
          <stop offset="0.5" stopColor="#f59e42"/>
          <stop offset="1" stopColor="#f472b6"/>
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const quotes = [
  "Design apne tareeke se — E Liye par har ek course unique hai! 🚀",
  "Create. Collaborate. Conquer. Sab kuch yahan milega ✨",
  "Apne skills ko ek nayi direction do — Join the E Liye movement!",
  "Tech aur design: yahan milta hai future ka power-up 😎",
  "Sapno ko reality mein badlo, start your journey on E Liye! 🎨"
];

const EliyeBanner = () => {
  const [quote, setQuote] = useState(quotes[0]);
  // Change quote on every mount/refresh for liveliness
  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    // eslint-disable-next-line
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: -16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.18 }}
      className="max-w-2xl mx-auto mb-8 z-20"
    >
      <div className="bg-white/90 border-2 border-sky-100 rounded-3xl py-5 px-6 shadow-2xl flex items-center justify-center gap-4 relative">
        <span className="animate-pulse text-3xl">🚀</span>
        <span className="text-lg md:text-xl font-bold text-gradient bg-gradient-to-r from-cyan-500 via-fuchsia-400 to-yellow-500 bg-clip-text text-transparent">
          {quote}
        </span>
        <span className="animate-spin-slow text-3xl">🌈</span>
      </div>
    </motion.div>
  );
};

// Sleek glassmorphism gradients for cards
const eliyeGradients = [
  "bg-gradient-to-br from-cyan-50/80 via-white/75 to-fuchsia-50/60 backdrop-blur-sm",
  "bg-gradient-to-br from-yellow-50/70 via-white/75 to-violet-50/60 backdrop-blur-sm",
  "bg-gradient-to-br from-emerald-50/70 via-white/80 to-cyan-50/75 backdrop-blur-sm",
  "bg-gradient-to-br from-fuchsia-100/80 via-white/75 to-amber-50/70 backdrop-blur-sm"
];

// New badge designs
const eliyeBadges = {
  Beginner: "bg-cyan-400/15 text-cyan-600 ring-2 ring-cyan-100",
  Intermediate: "bg-pink-400/15 text-fuchsia-700 ring-2 ring-pink-100",
  Advanced: "bg-yellow-400/15 text-yellow-700 ring-2 ring-yellow-100",
};

const EliyeIcon = () => (
  <svg className="ml-1 inline h-4 w-4 animate-spin-slow text-cyan-400" fill="none" viewBox="0 0 18 18">
    <g>
      <circle cx="9" cy="9" r="8" stroke="#0ea5e9" strokeWidth="2" />
      <circle cx="9" cy="9" r="3" fill="#f472b6" opacity="0.7" />
    </g>
  </svg>
);

export default function Courses() {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("All");
  const [sortBy, setSortBy] = useState("title");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch API
  useEffect(() => {
    setLoading(true);
    setError("");
    fetch("/api/courses")
      .then((res) => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
      })
      .then((data) => setCourses(Array.isArray(data) ? data : []))
      .catch(() => {
        setError("Courses laane me dikkat aa gayi 😥");
        setCourses([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredCourses = courses
    .filter(
      (course) =>
        (course.title || "").toLowerCase().includes(search.toLowerCase()) &&
        (levelFilter === "All" || course.level === levelFilter)
    )
    .sort((a, b) => {
      if (sortBy === "title") return (a.title || "").localeCompare(b.title || "");
      if (sortBy === "rating") return (b.rating ?? 0) - (a.rating ?? 0);
      if (sortBy === "price")
        return (
          Number((a.price || "").replace(/[^0-9]/g, "")) -
          Number((b.price || "").replace(/[^0-9]/g, ""))
        );
      return 0;
    });

  // Corners with floating neon dots
  const leftCorner = (
    <motion.div
      initial={{ opacity: 0, x: -24, y: -12 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.9, delay: 0.18 }}
      className="absolute left-2 top-0 z-20 pointer-events-none"
    >
      <span className="block h-6 w-6 rounded-full bg-cyan-300 shadow-[0_0_18px_0_rgba(6,182,212,0.41)] animate-pulse"></span>
    </motion.div>
  );
  const rightCorner = (
    <motion.div
      initial={{ opacity: 0, x: 24, y: -12 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.9, delay: 0.22 }}
      className="absolute right-2 top-0 z-20 pointer-events-none"
    >
      <span className="block h-6 w-6 rounded-full bg-pink-300 shadow-[0_0_18px_0_rgba(244,114,182,0.28)] animate-pulse"></span>
    </motion.div>
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-cyan-50 via-amber-50 to-white px-3 py-10 overflow-x-clip">

      {/* Top hero/strip */}
      <EliyeStrip />

      {/* Header (Bold, layered, with gradient drop shadow) */}
      <motion.div
        initial={{ opacity: 0, y: -32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
        className="flex flex-col items-center mb-6"
      >
        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-transparent bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-yellow-500 bg-clip-text shadow-lg text-center drop-shadow-[0_8px_28px_rgba(34,211,238,0.10)]">
          <span className="inline-block align-middle">E Liye Courses</span>
        </h1>
        <p className="mt-2 text-lg md:text-xl max-w-2xl text-center text-gray-500 font-medium bg-white/80 px-4 py-2 rounded-xl shadow-sm">
          Explore creativity aur technology ka fusion. Har course, ek nayi learning journey! 🚀
        </p>
      </motion.div>

      {/* Fun, new quotable banner */}
      <EliyeBanner />

      {/* Modern filter + sort bar, with glassy look */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.12 }}
        className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12 bg-gradient-to-r from-cyan-100/60 via-white/50 to-fuchsia-100/60 border border-cyan-100 rounded-2xl shadow-lg px-4 py-5 backdrop-blur"
      >
        <div className="w-full md:w-1/2 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <label className="sr-only" htmlFor="eliye-search">Search Courses</label>
          <input
            id="eliye-search"
            type="text"
            autoComplete="off"
            placeholder="🔍 Kya seekhna hai? Search yahan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-3 rounded-xl bg-white/85 border border-gray-300 shadow-inner placeholder:text-gray-400 focus:ring-2 focus:ring-pink-200 outline-none transition text-lg"
          />
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="p-2.5 rounded-xl border border-gray-200 bg-white/90 shadow-inner focus:ring-2 focus:ring-cyan-100 text-base font-semibold text-cyan-700"
            aria-label="Level Filter"
          >
            <option value="All">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div className="flex gap-2 items-center w-full md:w-auto">
          <span className="font-semibold text-sm text-pink-500">Sort by</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-yellow-100 text-base"
          >
            <option value="title">Name</option>
            <option value="rating">Rating</option>
            <option value="price">Price</option>
          </select>
        </div>
      </motion.div>

      {/* Loading/ Error */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex justify-center py-16"
          >
            <div className="text-lg flex items-center gap-2 text-fuchsia-500 font-bold">
              <span className="animate-spin-slow text-3xl">🌀</span>Courses loading...
            </div>
          </motion.div>
        )}
        {!loading && error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex justify-center py-16"
          >
            <div className="text-red-500 font-bold flex items-center gap-2 text-lg">
              <span className="text-2xl">🚫</span>
              {error}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN COURSE GRID */}
      { !loading && !error && (
        <>
          <div style={{ minHeight: 0, position: "relative" }}>
            {leftCorner}
            {rightCorner}
          </div>
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10"
          >
            <AnimatePresence>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{
                      y: -8,
                      scale: 1.016,
                      rotate: course.featured ? 0.5 : 0,
                      boxShadow: "0 7px 18px 0 rgba(52, 146, 242, 0.08)"
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 115, delay: idx * 0.05 }}
                    className={`relative rounded-[2rem] border border-pink-100 shadow-xl overflow-hidden transition-all duration-300 hover:scale-[1.018] focus-within:ring-2 focus-within:ring-sky-200 ${eliyeGradients[idx % eliyeGradients.length]}`}
                  >
                    {/* 🌟 Featured for e liye  */}
                    {course.featured && (
                      <motion.div
                        initial={{ scale: 0, rotate: 16 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.21 }}
                        className="absolute -top-2 left-2 z-20 bg-gradient-to-tr from-sky-200 via-amber-100 to-pink-100 text-pink-700 font-black px-3 py-0.5 rounded-2xl text-xs shadow ring-2 ring-amber-100 animate-pulse"
                      >
                        <span role="img" aria-label="Featured">👑 e liye</span>
                      </motion.div>
                    )}

                    {/* Rating and badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                      <div className="flex items-center bg-white/90 px-2 py-1 rounded-full shadow text-xs font-semibold text-sky-500 gap-1">
                        <svg
                          className="inline w-4 h-4 text-amber-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.174c.969 0 1.371 1.24.588 1.81l-3.377 2.455a1 1 0 00-.364 1.118l1.287 3.972c.302.93-.755 1.688-1.54 1.119l-3.376-2.454a1 1 0 00-1.176 0L5.6 15.066c-.785.569-1.842-.189-1.54-1.12l1.285-3.971A1 1 0 005 8.977l-3.378-2.455c-.783-.57-.38-1.81.588-1.81h4.174a1 1 0 00.95-.689l1.286-3.97z" />
                        </svg>
                        {course.rating}
                      </div>
                    </div>
                    <span
                      className={`absolute top-3 right-3 z-10 text-xs px-3 py-1 rounded-full font-bold drop-shadow-md ring-2 ${
                        eliyeBadges[course.level] || "bg-sky-100 ring-sky-200"
                      }`}
                    >
                      {course.level}
                    </span>

                    {/* Course logo/image */}
                    <motion.div
                      initial={{ scale: 0.93 }}
                      animate={{ scale: 1 }}
                      className="flex justify-center items-center bg-white/60 py-8 px-2 h-32"
                    >
                      <img
                        src={course.image}
                        alt={course.title}
                        className="h-14 w-14 object-contain filter drop-shadow"
                        style={{ filter: course.featured ? "drop-shadow(0px 0px 8px #f472b6)" : undefined }}
                      />
                    </motion.div>

                    {/* Floating accent if featured */}
                    {course.featured && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.41 }}
                        className="absolute right-5 top-11 text-pink-400 text-lg animate-pulse"
                      >✨</motion.div>
                    )}

                    {/* Course content */}
                    <div className="p-6 flex flex-col gap-2">
                      <h2 className="text-xl font-extrabold text-sky-900 mb-1 flex items-center gap-2">
                        {course.title}
                      </h2>
                      <p className="text-gray-600 mb-1 text-sm line-clamp-2 italic">
                        {course.description || "Creative skills for digital future, e liye."}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mt-1">
                        <span>👩‍🎨 {course.instructor}</span>
                        <span>⏱ {course.duration}</span>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-xl font-bold text-pink-600">{course.price}</span>
                        <motion.button
                          whileTap={{ scale: 0.96 }}
                          whileHover={{ scale: 1.09 }}
                          onClick={() =>
                            window.confirm(`Enroll karein "${course.title}" me?`) &&
                            alert(`🎉 Mubarak! Aap enroll ho gaye: ${course.title}`)
                          }
                          className={`bg-gradient-to-r from-sky-400 to-pink-400 px-5 py-2 rounded-lg font-bold text-white uppercase tracking-wide shadow hover:from-pink-400 hover:to-sky-400 transition flex items-center gap-1 ${
                            course.featured ? "ring-4 ring-amber-100" : ""
                          }`}
                        >
                          e liye Enroll
                          <EliyeIcon />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  className="col-span-full flex flex-col items-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4076/4076432.png"
                    alt="No results"
                    className="h-24 mb-4 opacity-60"
                  />
                  <p className="text-lg text-gray-500 font-medium">
                    Koi course nahi mila, try dusra search 😅
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}

      {/* Footer in e liye style */}
      <div className="text-center mt-14 text-gray-500 text-sm flex flex-col items-center">
        <motion.hr
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.55 }}
          className="w-24 border-t-2 border-sky-200 mb-2"
        />
        <span className="flex items-center justify-center">
          {"Design with "}
          <motion.span
            animate={{ scale: [1, 1.18, 1] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="text-pink-400 px-1"
            role="img"
            aria-label="heart"
          >
            ❤
          </motion.span>
          &amp;
          <motion.span
            animate={{ rotate: [0, 14, -14, 0] }}
            transition={{ repeat: Infinity, duration: 2.3 }}
            className="text-amber-400 px-1"
            role="img"
            aria-label="sparkle"
          >
            ✨
          </motion.span>
          {"by E Liye team"}
        </span>
        <span className="mt-1 text-xs opacity-70">
          Apni creativity ko milao naye design ke sath!
        </span>
      </div>
    </div>
  );
}
