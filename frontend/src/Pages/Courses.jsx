import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Custom design strip for e liye
const EliyeStrip = () => (
  <div className="relative z-0 flex justify-center pb-7 pt-1">
    <svg
      width="100%"
      height="55"
      viewBox="0 0 1300 55"
      fill="none"
      className="absolute left-0 right-0 top-0"
      style={{ minWidth: "100vw" }}
      aria-hidden
    >
      {/* Simple and elegant: wavy line with "E", "L", "I", "Y", "E" letters and bulbs */}
      <path
        d="M0 25 Q 300 0 650 27 Q 1000 54 1300 23"
        stroke="#3493f2"
        strokeWidth="5"
        fill="none"
        opacity="0.08"
      />
      <text x="70" y="36" fontSize="2.2em" fontWeight="bold" fill="#ee2677" fontFamily="monospace">E</text>
      <circle cx="110" cy="23" r="5" fill="#fdba74" />
      <text x="175" y="46" fontSize="2.2em" fontWeight="bold" fill="#04b67d" fontFamily="monospace">L</text>
      <circle cx="218" cy="31" r="6" fill="#38bdf8" />
      <text x="289" y="35" fontSize="2.2em" fontWeight="bold" fill="#facc15" fontFamily="monospace">I</text>
      <circle cx="340" cy="24" r="4.5" fill="#a3e635" />
      <text x="420" y="44" fontSize="2.2em" fontWeight="bold" fill="#a5b4fc" fontFamily="monospace">Y</text>
      <circle cx="485" cy="27" r="5" fill="#f472b6" />
      <text x="570" y="33" fontSize="2.2em" fontWeight="bold" fill="#04b67d" fontFamily="monospace">E</text>
      <circle cx="617" cy="37" r="6" fill="#83ffb0" />
      {/* Accent bulbs further out */}
      <circle cx="1180" cy="20" r="6" fill="#fdba74" />
      <circle cx="1250" cy="32" r="4" fill="#ee2677" />
    </svg>
  </div>
);

// Banner designed for e liye
const EliyeBanner = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, y: -10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.25 }}
    className="max-w-xl mx-auto mb-6 text-center relative z-10"
  >
    <div className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-sky-50 via-pink-100 to-amber-50 rounded-2xl shadow-xl border border-sky-200/70">
      <span className="animate-bounce text-2xl">🌟</span>
      <span className="font-bold text-sky-600 text-base md:text-lg">
        {[
          "E Liye: Apni khud ki journey, khud design karo 🚀",
          "Design socho – Code likho – e liye badho!",
          "Yahan har course tumhare growth ke liye bana hai.",
          "Naye design, naye ideas – sab milenge e liye par 😎",
          "Seekho aur apne sapno ka design banao, E Liye ke sath! ✨"
        ][Math.floor(Math.random() * 5)]}
      </span>
      <span className="animate-bounce text-2xl">🎨</span>
    </div>
  </motion.div>
);

// Custom gradients for e liye
const eliyeGradients = [
  "bg-gradient-to-br from-sky-100 via-white to-pink-100",
  "bg-gradient-to-br from-pink-50 via-white to-violet-100",
  "bg-gradient-to-br from-lime-50 via-white to-teal-100",
  "bg-gradient-to-br from-amber-50 via-white to-yellow-100"
];

// Badge styles
const eliyeBadges = {
  Beginner: "bg-sky-400/10 text-sky-600 ring-2 ring-sky-200",
  Intermediate: "bg-pink-400/10 text-pink-700 ring-2 ring-pink-200",
  Advanced: "bg-yellow-400/10 text-yellow-700 ring-2 ring-yellow-200",
};

const EliyeIcon = () => (
  <svg className="inline ml-1 -mt-0.5 h-4 w-4 animate-spin-slow text-sky-400 drop-shadow" fill="none" viewBox="0 0 18 18">
    <g>
      <circle cx="9" cy="9" r="7.5" stroke="#4287f5" strokeWidth="2.2" />
      <circle cx="9" cy="9" r="2.7" fill="#f472b6" opacity="0.7" />
    </g>
  </svg>
);

export default function Courses() {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("All");
  const [sortBy, setSortBy] = useState("title");

  // API se laane ke liye states
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Backend se API call
  useEffect(() => {
    setLoading(true);
    setError("");
    // Yahan pe apne backend ka url daalein, e.g. http://localhost:5000/api/courses ya production url
    fetch("/api/courses")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Server error");
        }
        return res.json();
      })
      .then((data) => {
        // API response structure: expect array
        setCourses(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        setError("Courses laane me dikkat aa gayi 😥");
        setCourses([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Filtering, sorting logic (same as pehle)
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

  // corners replace with design icons
  const leftCorner = (
    <motion.div
      initial={{ opacity: 0, x: -28, y: -11 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 1.1, delay: 0.25 }}
      className="absolute left-1 top-0 text-3xl select-none pointer-events-none"
    ><span role="img" aria-label="paint palette">🎨</span></motion.div>
  );
  const rightCorner = (
    <motion.div
      initial={{ opacity: 0, x: 26, y: -11 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 1.2, delay: 0.29 }}
      className="absolute right-1 top-0 text-3xl select-none pointer-events-none"
    ><span role="img" aria-label="bulb">💡</span></motion.div>
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-tl from-sky-50 via-pink-50 to-white px-4 py-8">

      {/* Top: e liye strip */}
      <EliyeStrip />

      {/* Header (e liye style) */}
      <motion.div
        initial={{ opacity: 0, y: -28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-5 flex flex-col items-center gap-1"
      >
        <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-600 via-pink-500 to-amber-500 drop-shadow-lg text-center">
          🖌️ e liye design karo, future banawo!
        </h1>
        <p className="text-base mt-1 max-w-xl text-center text-gray-500">
          Har course me design aur tech ka perfect blend. Apna creative side jagao!
        </p>
      </motion.div>

      {/* Fun e liye banner */}
      <EliyeBanner />

      {/* Filter/Sort Bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, delay: 0.11 }}
        className="bg-white rounded-xl shadow-lg p-4 flex flex-col md:flex-row justify-between items-center gap-4 mb-10 border border-sky-50 hover:border-pink-200 transition-all"
      >
        <div className="w-full md:w-1/2 flex gap-2">
          <input
            type="text"
            placeholder="🎨 Search e liye course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-sky-50 border border-gray-200 focus:ring-2 focus:ring-pink-100 outline-none transition"
          />
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="p-3 rounded-lg border border-gray-200 bg-white shadow-inner focus:ring-2 focus:ring-sky-100"
          >
            <option value="All">Sare levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
          </select>
        </div>
        <div className="flex gap-2 items-center w-full md:w-auto">
          <span className="font-medium text-sm text-pink-600">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-pink-100"
          >
            <option value="title">Name</option>
            <option value="rating">Rating</option>
            <option value="price">Price</option>
          </select>
        </div>
      </motion.div>

      {/* Loading/ Error Handling */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="text-pink-400 font-bold flex items-center gap-3 text-lg">
            <span className="animate-bounce">⏳</span>Kourses load ho rahe hain...
          </div>
        </div>
      ) : error ? (
        <div className="flex justify-center py-12">
          <div className="text-red-500 font-semibold flex items-center gap-2">
            <span className="text-2xl">🚫</span> {error}
          </div>
        </div>
      ) : (
        <>
          {/* Grid: Design-themed corners */}
          <div style={{ minHeight: 0, position: "relative" }}>
            {leftCorner}
            {rightCorner}
          </div>
          {/* Course List (tilt, but e-liye design) */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative"
          >
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
