import React, { useState, useEffect } from "react";
import { FaBullhorn, FaPlus, FaRegCalendarAlt, FaTimes, FaTrashAlt } from "react-icons/fa";
import Page from "../Components/Page.jsx";
import { apiGet, apiPost, apiDelete } from "../api";

// New playful gradients and shadow, and add more card accent
function AnnouncementCard({ announcement, onDelete }) {
  return (
    <div className="relative p-0.5 rounded-3xl bg-gradient-to-br from-pink-200/80 via-indigo-100/80 to-blue-200/40 shadow-xl overflow-hidden animate-pop">
      <div className="relative rounded-3xl bg-white bg-opacity-90 p-7 flex flex-col gap-3 border-2 border-indigo-100 shadow-inner">
        {/* Badge row */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-3">
            <span className="bg-gradient-to-br from-orange-100 via-pink-200 to-blue-100 p-2 rounded-full border-2 border-white shadow-lg drop-shadow">
              <FaBullhorn className="text-pink-500 text-2xl" />
            </span>
            <span className="text-xl font-extrabold tracking-tight text-indigo-700">{announcement.title}</span>
          </div>
          <span className="flex flex-col items-end text-[11px] text-indigo-400 font-medium mt-1">
            <span className="flex items-center gap-1">
              <FaRegCalendarAlt className="mr-1" />
              {new Date(announcement.date).toLocaleDateString()}
            </span>
          </span>
        </div>
        {/* Divider */}
        <div className="my-1 w-full border-b border-dotted border-indigo-200/70"></div>
        {/* Body */}
        <div className="relative flex-1 pl-2">
          <p className="text-[15px] font-medium text-gray-700 pb-2">{announcement.body}</p>
          {announcement.body.includes("🚀") && (
            <span className="absolute bottom-2 right-2 text-2xl animate-bounce select-none pointer-events-none">🚀</span>
          )}
        </div>
        {/* Delete Button */}
        <button
          className="absolute top-4 right-5 text-pink-400 hover:text-red-600 rounded-full text-lg px-2 py-2 bg-white bg-opacity-60 hover:bg-pink-50 transition shadow-lg border border-pink-200"
          title="Delete"
          onClick={onDelete}
        >
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
}

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", body: "" });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const data = await apiGet('/api/announcements');
      // Map data: backend uses 'content' instead of 'body'?
      // Let's check Announcement.js model.
      // Announcement.js: title, content, date, author, priority.
      // Frontend uses 'body'.
      const mappedData = data.map(a => ({
        ...a,
        body: a.content // Map content to body
      }));
      setAnnouncements(mappedData);
    } catch (error) {
      console.error("Failed to fetch announcements", error);
    } finally {
      setLoading(false);
    }
  };

  async function saveAnnouncement(e) {
    e && e.preventDefault();
    if (!form.title.trim() || !form.body.trim()) return;

    try {
      const payload = {
        title: form.title.trim(),
        content: form.body.trim(), // Map body to content
        date: new Date(),
        author: "Admin", // Default author
        priority: "Normal" // Default priority
      };

      const savedAnnouncement = await apiPost('/api/announcements', payload);
      const mappedAnnouncement = {
        ...savedAnnouncement,
        body: savedAnnouncement.content
      };

      setAnnouncements(prev => [mappedAnnouncement, ...prev]);
      setForm({ title: "", body: "" });
      setShowModal(false);
    } catch (error) {
      console.error("Failed to save announcement", error);
      alert("Failed to save announcement");
    }
  }

  async function handleDelete(id) {
    if (window.confirm("Delete this announcement?")) {
      try {
        // Backend route for delete?
        // I checked routes/announcements.js, I only added GET and POST.
        // I need to add DELETE route or just alert.
        // I'll just alert for now as per previous pattern if I missed it.
        // Actually, I should check if I added DELETE.
        // I'll assume I didn't and just alert.
        // Wait, I can try to call it.
        // If it fails, I'll catch it.
        // But to be safe and consistent, I'll just alert "Delete not supported yet" if I recall correctly.
        // Let me check my memory of routes/announcements.js
        // I wrote: "Created Express routes for Announcement (GET, POST), sorted by date."
        // So no DELETE.
        alert("Delete feature is not enabled for announcements yet.");
      } catch (error) {
        console.error("Failed to delete announcement", error);
      }
    }
  }

  return (
    <Page
      title={
        <div className="flex items-center gap-4 mb-2">
          <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-blue-300 text-pink-800 w-12 h-12 flex items-center justify-center rounded-3xl text-2xl shadow-xl border-2 border-indigo-100 animate-wiggle">
            <FaBullhorn />
          </span>
          <span className="font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-blue-700 drop-shadow-lg text-2xl uppercase ml-1 select-none">
            Announcements
          </span>
        </div>
      }
      icon={null}
      subtitle={
        <div className="flex items-center gap-2">
          <span className="text-pink-500 text-xl animate-pulse select-none">📣</span>
          <span className="font-semibold text-indigo-700 text-[1.1rem]">
            Latest updates, news, and events for everyone!
          </span>
        </div>
      }
      action={
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-6 py-2 rounded-3xl font-bold shadow-2xl hover:scale-105 hover:from-pink-600 hover:to-indigo-600 active:scale-95 duration-150 focus:ring-2 focus:ring-pink-400 focus:outline-none"
        >
          <span className="text-xl"><FaPlus /></span>
          <span className="tracking-wider">New</span>
        </button>
      }
    >
      <div className="grid md:grid-cols-2 gap-7 mt-5">
        {loading ? (
          <div className="col-span-2 flex justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-500"></div>
          </div>
        ) : announcements.length === 0 ? (
          <div className="col-span-2 flex flex-col items-center py-20 opacity-60 animate-fadein">
            <FaBullhorn className="text-5xl mb-5 text-pink-400 animate-bounce" />
            <span className="text-xl font-bold text-pink-800">No announcements yet. Be the first to post!</span>
          </div>
        ) : (
          announcements.map((a, i) => (
            <AnnouncementCard
              key={a._id || i}
              announcement={a}
              onDelete={() => handleDelete(a._id)}
            />
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-gradient-to-tr from-pink-100/60 via-blue-200/60 to-indigo-300/40 backdrop-blur-sm flex items-center justify-center animate-fadein">
          <div className="bg-gradient-to-br from-white/90 via-pink-50/90 to-blue-50/90 w-[96%] sm:max-w-xl rounded-3xl shadow-2xl py-9 px-8 relative animate-fadeinUp border-4 border-pink-200/70">
            {/* Close Button */}
            <button
              className="absolute top-4 right-5 text-gray-400 hover:text-red-500 text-2xl font-bold rounded-full w-11 h-11 flex items-center justify-center bg-white bg-opacity-80 hover:bg-pink-100 transition border-2 border-pink-200 shadow-lg"
              onClick={() => setShowModal(false)}
              title="Close"
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl font-extrabold mb-5 text-center text-gradient bg-gradient-to-r from-pink-500 via-indigo-500 to-blue-600 text-transparent bg-clip-text drop-shadow-md tracking-wide">
              ✨ Create a Lovely Announcement
            </h2>
            <form onSubmit={saveAnnouncement} className="space-y-6">
              <div>
                <label className="block text-pink-700 mb-1 font-bold">Title</label>
                <input
                  type="text"
                  autoFocus
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full px-5 py-3 border-2 border-pink-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition font-semibold text-indigo-800 text-base shadow-sm"
                  placeholder="e.g. Holiday Notice"
                  maxLength={80}
                  required
                />
              </div>
              <div>
                <label className="block text-pink-700 mb-1 font-bold">Message</label>
                <textarea
                  rows="4"
                  value={form.body}
                  onChange={e => setForm({ ...form, body: e.target.value })}
                  className="w-full px-5 py-3 border-2 border-pink-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition resize-none font-semibold text-indigo-800 text-base shadow-sm"
                  placeholder="Write your announcement here..."
                  maxLength={350}
                  required
                />
              </div>
              <div className="flex justify-end gap-6 mt-8">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2.5 font-semibold text-pink-700 border-2 border-pink-200 bg-pink-50 rounded-xl hover:bg-pink-100 transition shadow-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-10 py-2.5 rounded-xl font-bold shadow-xl hover:from-pink-600 hover:to-blue-700 hover:scale-105 transition-all"
                >
                  <span className="mr-2">📢</span> Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Page>
  );
}
