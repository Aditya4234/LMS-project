import React, { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaBookOpen,
  FaPhoneAlt,
  FaChalkboardTeacher,
  FaPlus,
  FaTrash,
  FaEdit,
  FaEye,
  FaCut,
} from "react-icons/fa";
import { apiGet, apiPost, apiDelete } from "../api";

const avatarList = [
  "https://randomuser.me/api/portraits/men/75.jpg",
  "https://randomuser.me/api/portraits/women/64.jpg",
  "https://randomuser.me/api/portraits/men/41.jpg",
  "https://randomuser.me/api/portraits/women/47.jpg",
  "https://randomuser.me/api/portraits/men/28.jpg",
  "https://randomuser.me/api/portraits/women/15.jpg",
];

// NEW StatusBadge: flat design, pill color bar on the left
function StatusBadge({ status }) {
  let color = status === "Active" ? "bg-green-500" : "bg-yellow-400";
  let text = status === "Active" ? "text-green-900" : "text-yellow-900";
  let border = status === "Active" ? "border-green-400" : "border-yellow-500";
  return (
    <span
      className={`inline-flex items-center pl-0.5 pr-3 py-1 rounded-full border ${border} font-semibold text-xs shadow gap-2 bg-white`}
      style={{
        borderLeft: `9px solid ${status === "Active" ? "#22c55e" : "#fde047"
          }`,
        minWidth: 64,
      }}
    >
      <span className={"block w-2 h-2 rounded-full " + color}></span>
      <span className={text}>{status}</span>
    </span>
  );
}

// Redesign InstructorCard: glass effect, avatar badge, vertical button group, info on left
function InstructorCard({ t, i, onDelete, onCut }) {
  const [showActions, setShowActions] = useState(false);

  const handleCardClick = (e) => {
    if (e.target.tagName === "BUTTON" || e.target.closest("button")) return;
    setShowActions((show) => !show);
  };

  return (
    <div
      className="
        bg-white/60 backdrop-blur-lg
        rounded-xl shadow-2xl border-2 border-zinc-200 hover:border-blue-400 
        px-4 py-6 
        flex flex-row items-start gap-5 
        transition group relative min-w-[295px] max-w-md cursor-pointer
        "
      tabIndex={0}
      onClick={handleCardClick}
      onBlur={() => setShowActions(false)}
      style={{ minHeight: 180 }}
    >
      {/* Circular avatar w/ box-shadow, badge left, and small cutout if pending */}
      <div className="relative mr-2">
        <span className="
          block rounded-full overflow-hidden 
          w-20 h-20 border-4 border-white 
          shadow-lg shadow-indigo-100
          bg-gradient-to-b from-indigo-200 via-blue-100 to-white
        ">
          <img
            src={t.image || "https://via.placeholder.com/150"}
            alt={t.name}
            className="w-full h-full object-cover"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </span>
        {t.status !== "Active" && (
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2  bg-yellow-400 text-white px-2 py-0.5 text-xs rounded-full shadow border border-yellow-300 select-none">
            Pending
          </span>
        )}
      </div>
      {/* Main Info */}
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-extrabold text-gray-800">{t.name}</h2>
          <StatusBadge status={t.status || 'Active'} />
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-blue-800 font-semibold">
            <FaBookOpen className="inline opacity-80" />
            {t.courses || 0} Courses
          </span>
          <span className="text-sm text-indigo-400 font-semibold px-2 py-0.5 bg-indigo-50 rounded-full">{t.subject || t.specialization}</span>
        </div>
        <div className="flex flex-col gap-1 text-gray-600 text-xs mt-2">
          <div className="flex items-center gap-2">
            <FaEnvelope className="opacity-50" />
            <a href={`mailto:${t.email}`} className="hover:underline text-blue-900">{t.email}</a>
          </div>
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="opacity-50" />
            <span>{t.phone || 'N/A'}</span>
          </div>
        </div>
        <div className="italic text-gray-500 text-[12px] pt-2 px-1 break-words line-clamp-2">{t.bio}</div>
      </div>
      {/* Action column */}
      <div className="flex flex-col items-end gap-2 ml-2 z-20 absolute top-4 right-4">
        <button
          title="View"
          className="bg-blue-50 hover:bg-blue-200 text-blue-700 rounded-full p-2 transition shadow group-hover:scale-110"
        >
          <FaEye />
        </button>
        <button
          title="Edit"
          className="bg-green-50 hover:bg-green-200 text-green-700 rounded-full p-2 transition shadow group-hover:scale-110"
        >
          <FaEdit />
        </button>
        <button
          title="Delete"
          className="bg-red-50 hover:bg-red-200 text-red-700 rounded-full p-2 transition shadow group-hover:scale-125"
          onClick={onDelete}
        >
          <FaTrash />
        </button>
      </div>
      {/* Cut/Remove popup menu */}
      {showActions && (
        <div className="absolute top-24 right-4 z-30 bg-white/90 shadow-lg py-2 px-3 rounded-xl border border-gray-200 animate-pop flex flex-col gap-1">
          <button
            className="flex items-center gap-2 text-pink-700 hover:bg-pink-100 px-3 py-2 rounded transition font-semibold"
            onClick={(e) => {
              e.stopPropagation();
              onCut();
              setShowActions(false);
            }}
            title="Cut/Remove"
          >
            <FaCut /> Cut Instructor
          </button>
        </div>
      )}
    </div>
  );
}

export default function Instructors() {
  const [isOpen, setIsOpen] = useState(false);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newInstructor, setNewInstructor] = useState({
    name: "",
    email: "",
    phone: "",
    image: "",
    courses: 1,
    specialization: "", // mapped to subject in backend
    status: "Active",
    bio: "",
  });

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      setLoading(true);
      const data = await apiGet('/api/instructors');
      setInstructors(data);
    } catch (error) {
      console.error("Failed to fetch instructors", error);
    } finally {
      setLoading(false);
    }
  };

  // Add Instructor
  const handleAddInstructor = async () => {
    try {
      const payload = {
        ...newInstructor,
        subject: newInstructor.specialization, // mapping
        image: newInstructor.image || avatarList[Math.floor(Math.random() * avatarList.length)]
      };
      const savedInstructor = await apiPost('/api/instructors', payload);
      setInstructors((prev) => [savedInstructor, ...prev]);
      setIsOpen(false);
      setNewInstructor({
        name: "",
        email: "",
        phone: "",
        image: "",
        courses: 1,
        specialization: "",
        status: "Active",
        bio: "",
      });
    } catch (error) {
      console.error("Failed to add instructor", error);
      alert("Failed to add instructor");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Are you sure you want to remove this instructor?`)) {
      try {
        await apiDelete(`/api/instructors/${id}`);
        setInstructors((prev) => prev.filter((inst) => inst._id !== id));
      } catch (error) {
        console.error("Failed to delete instructor", error);
        alert("Failed to delete instructor");
      }
    }
  };

  // "Cut" instructor logic (same as delete for now)
  const handleCut = async (id) => {
    if (window.confirm(`Are you sure you want to CUT (remove) this instructor?`)) {
      try {
        await apiDelete(`/api/instructors/${id}`);
        setInstructors((prev) => prev.filter((inst) => inst._id !== id));
      } catch (error) {
        console.error("Failed to delete instructor", error);
        alert("Failed to delete instructor");
      }
    }
  };

  // --- Major design: Purple radial bg with grid dots, rounded cards, top sticky header, bigger title
  return (
    <div className="relative min-h-screen bg-gradient-to-bl from-indigo-50 via-blue-100 to-cyan-50 p-0">
      {/* Subtle dot pattern overlay */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <svg width="100%" height="100%" className="absolute inset-0" style={{ opacity: 0.08 }}>
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="2" fill="#6366f1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      {/* HEADER */}
      <div className="sticky top-0 z-20 px-0 pt-0 pb-0 bg-gradient-to-r from-indigo-600/90 via-blue-500/80 to-blue-300/80 shadow-lg backdrop-blur border-b border-indigo-100">
        <div className="flex items-center justify-between px-10 py-7">
          <div className="flex items-center gap-6">
            <span className="bg-white text-indigo-700 w-16 h-16 flex items-center justify-center rounded-full text-4xl shadow-blur-lg border-2 border-blue-400">
              <FaChalkboardTeacher />
            </span>
            <div>
              <h1 className="text-5xl font-black text-white tracking-tighter drop-shadow-xl">Faculty</h1>
              <div className="text-lg text-blue-100/90 font-bold ml-1 -mt-1">
                Discover &amp; Manage Your Team
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="
              flex items-center gap-3 
              bg-white text-indigo-700 px-8 py-3 rounded-full font-extrabold shadow-md
              border-2 border-indigo-500/30
              hover:bg-indigo-100 hover:text-indigo-900 hover:scale-105
              transition text-lg
            "
          >
            <FaPlus className="text-2xl" /> Add Instructor
          </button>
        </div>
      </div>
      {/* New faculty grid, centered, bigger gap, card hover makes slightly lift */}
      <div className="relative z-10 px-8 md:px-16 pb-28 pt-10">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
          </div>
        ) : instructors.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40">
            <img
              src="https://illustrations.popsy.co/blue/teacher.svg"
              alt="No instructors"
              className="w-56 h-56 opacity-80 mb-4"
              draggable={false}
            />
            <div className="mt-4 text-2xl font-bold text-indigo-500">
              No faculty members yet!
            </div>
            <div className="text-gray-400 mt-1">Add your first instructor above.</div>
          </div>
        ) : (
          <div className="grid gap-x-11 gap-y-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-items-center pt-2">
            {instructors.map((t, i) => (
              <InstructorCard
                t={t}
                i={i}
                key={t._id || i}
                onDelete={() => handleDelete(t._id)}
                onCut={() => handleCut(t._id)}
              />
            ))}
          </div>
        )}
      </div>
      {/* Modal: new design, "pop up" white with blue border, shadow, borderless inputs, bigger headings */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 animate-fade-in">
          <div className="relative bg-white p-0 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border-4 border-blue-200/70 animate-pop">
            {/* Modal Title Bar */}
            <div className="bg-gradient-to-r from-blue-400 via-indigo-400 to-indigo-500 h-[80px] flex items-center px-10">
              <span className="bg-white/95 text-indigo-700 w-14 h-14 flex items-center justify-center rounded-2xl text-3xl shadow border-2 border-blue-200 mr-4">
                <FaChalkboardTeacher />
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide drop-shadow">Add Faculty</h2>
              <button
                className="ml-auto border-none bg-white/40 hover:bg-pink-200/70 text-gray-900 hover:text-pink-700 transition px-6 py-1 rounded-2xl font-bold text-3xl"
                onClick={() => setIsOpen(false)}
                title="Close"
                type="button"
              >
                ×
              </button>
            </div>
            {/* FORM */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddInstructor();
              }}
            >
              <div className="px-10 py-8 flex flex-col gap-5">
                {/* Name */}
                <div>
                  <label className="block text-base text-indigo-800 mb-2 font-semibold pl-1">Name</label>
                  <input
                    type="text"
                    autoFocus
                    placeholder="e.g. Abdullah Iqbal"
                    className="w-full px-4 py-2 border-0 border-b-2 border-blue-200 bg-transparent focus:ring-0 focus:border-indigo-400 font-medium text-lg transition"
                    value={newInstructor.name}
                    onChange={e => setNewInstructor({ ...newInstructor, name: e.target.value })}
                    required
                  />
                </div>
                {/* Email */}
                <div>
                  <label className="block text-base text-indigo-800 mb-2 font-semibold pl-1">Email</label>
                  <input
                    type="email"
                    placeholder="e.g. abdullah@email.com"
                    className="w-full px-4 py-2 border-0 border-b-2 border-blue-200 bg-transparent focus:ring-0 focus:border-indigo-400 font-medium text-lg transition"
                    value={newInstructor.email}
                    onChange={e => setNewInstructor({ ...newInstructor, email: e.target.value })}
                    required
                  />
                </div>
                {/* Phone & Courses */}
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="w-full">
                    <label className="block text-base text-indigo-800 mb-2 font-semibold pl-1">
                      Phone
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 0312-1234567"
                      className="w-full px-4 py-2 border-0 border-b-2 border-blue-200 bg-transparent focus:ring-0 focus:border-indigo-400 font-medium text-lg transition"
                      value={newInstructor.phone}
                      onChange={e => setNewInstructor({ ...newInstructor, phone: e.target.value })}
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-base text-indigo-800 mb-2 font-semibold pl-1">Courses Taught</label>
                    <input
                      type="number"
                      min="1"
                      className="w-full px-4 py-2 border-0 border-b-2 border-blue-200 bg-transparent focus:ring-0 focus:border-indigo-400 font-medium text-lg transition"
                      value={newInstructor.courses}
                      onChange={e => setNewInstructor({ ...newInstructor, courses: e.target.value })}
                    />
                  </div>
                </div>
                {/* Specialization */}
                <div>
                  <label className="block text-base text-indigo-800 mb-2 font-semibold pl-1">Specialization</label>
                  <input
                    type="text"
                    placeholder="e.g. Data Science"
                    className="w-full px-4 py-2 border-0 border-b-2 border-blue-200 bg-transparent focus:ring-0 focus:border-indigo-400 font-medium text-lg transition"
                    value={newInstructor.specialization}
                    onChange={e => setNewInstructor({ ...newInstructor, specialization: e.target.value })}
                  />
                </div>
                {/* Photo */}
                <div>
                  <label className="block text-base text-indigo-800 mb-2 font-semibold pl-1">Profile Photo URL</label>
                  <input
                    type="url"
                    placeholder="Paste image URL (optional)"
                    className="w-full px-4 py-2 border-0 border-b-2 border-blue-200 bg-transparent focus:ring-0 focus:border-indigo-400 font-medium text-lg transition"
                    value={newInstructor.image}
                    onChange={e => setNewInstructor({ ...newInstructor, image: e.target.value })}
                  />
                </div>
                {/* Status */}
                <div>
                  <label className="block text-base text-indigo-800 mb-2 font-semibold pl-1">Status</label>
                  <select
                    className="w-full px-4 py-2 border-0 border-b-2 border-blue-200 bg-transparent focus:ring-0 focus:border-indigo-400 font-medium text-lg transition"
                    value={newInstructor.status}
                    onChange={e => setNewInstructor({ ...newInstructor, status: e.target.value })}
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
                {/* Short Bio */}
                <div>
                  <label className="block text-base text-indigo-800 mb-2 font-semibold pl-1">Short Bio</label>
                  <textarea
                    className="w-full px-4 py-2 border-0 border-b-2 border-blue-200 bg-transparent focus:ring-0 focus:border-indigo-400 font-medium text-base transition resize-none"
                    rows={2}
                    maxLength={150}
                    placeholder="A little about the instructor..."
                    value={newInstructor.bio}
                    onChange={e => setNewInstructor({ ...newInstructor, bio: e.target.value })}
                  />
                </div>
                {/* Footer Buttons */}
                <div className="flex justify-end gap-5 pt-6">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-7 py-2 text-gray-700 border border-gray-200 rounded-full hover:bg-gray-50 hover:text-indigo-600 font-semibold shadow-sm transition text-base"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-indigo-500 to-blue-400 text-white px-12 py-2.5 rounded-full font-bold shadow-xl border-2 border-indigo-400/40 hover:from-indigo-700 hover:to-blue-700 hover:scale-105 transition text-lg"
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Footer bar: new blue sparkle pill bar */}
      <div className="pointer-events-none fixed bottom-0 left-0 w-full h-20 z-0 flex bg-none">
        <div className="rounded-full bg-gradient-to-tr from-blue-200/40 to-indigo-50/60 blur-2xl opacity-60 w-full h-24" />
        <svg width="200" height="20" className="absolute right-10 bottom-3 opacity-60">
          <circle cx="10" cy="10" r="3" fill="#6366f1" />
          <circle cx="40" cy="5" r="2" fill="#a5b4fc" />
          <circle cx="80" cy="14" r="1.5" fill="#3b82f6" />
        </svg>
      </div>
    </div>
  );
}
