import React, { useEffect, useState } from "react";
import Page from "../Components/Page.jsx";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";
import { apiGet, apiPost, apiDelete } from "../api";

// Custom Badge component for status display
function StatusBadge({ status }) {
  const colorClasses =
    status === "Active"
      ? "bg-green-100 text-green-800 border-green-400"
      : "bg-yellow-100 text-yellow-800 border-yellow-400";
  return (
    <span
      className={`px-3 py-1 rounded-full border text-xs font-semibold ${colorClasses}`}
    >
      {status}
    </span>
  );
}

export default function Students() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await apiGet('/api/students');
        setStudents(data.students || []);
      } catch (e) {
        setError('Failed to load students');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    phone: "",
    enrolled: "",
    status: "Active",
    img: "https://i.pravatar.cc/150",
  });

  const handleAddStudent = async () => {
    try {
      const { student } = await apiPost('/api/students', newStudent);
      setStudents([student, ...students]);
      setNewStudent({ name: "", email: "", phone: "", enrolled: "", status: "Active", img: "https://i.pravatar.cc/150" });
      setIsOpen(false);
    } catch (e) {
      alert('Failed to add student');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await apiDelete(`/api/students/${id}`);
      setStudents((prev) => prev.filter((s) => s._id !== id));
    } catch (e) {
      alert('Failed to delete');
    }
  };

  return (
    <Page
      title={
        <div className="flex items-center gap-3">
          <span className="bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full text-xl shadow-lg border-2 border-blue-200">👩‍🎓</span>
          <span className="font-extrabold tracking-tight text-gray-800">Students</span>
        </div>
      }
      icon={null}
      subtitle={<span className="font-medium text-blue-800/80">Empower & Track Your Students</span>}
      action={
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white px-5 py-2 rounded-xl font-semibold shadow-md hover:from-blue-700 hover:to-blue-500 transition"
        >
          <span className="text-lg">+</span> Add Student
        </button>
      }
    >
      <div className="bg-gradient-to-r from-gray-50 to-white rounded-3xl p-8 shadow-xl border border-gray-200 overflow-x-auto mt-4">
        <table className="min-w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="text-xs text-gray-500 border-b uppercase tracking-wider">
              <th className="py-4 px-6 border-b-2">Photo</th>
              <th className="py-4 px-6 border-b-2">Name</th>
              <th className="py-4 px-6 border-b-2">Email</th>
              <th className="py-4 px-6 border-b-2">Phone</th>
              <th className="py-4 px-6 border-b-2">Course</th>
              <th className="py-4 px-6 border-b-2">Status</th>
              <th className="py-4 px-6 border-b-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 && !loading ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-400">
                  No students found.
                </td>
              </tr>
            ) : (
              students.map((s, i) => (
                <tr
                  key={s._id || i}
                  className={`transition-all group ${
                    i % 2 === 0 ? "bg-white" : "bg-sky-50"
                  } hover:bg-blue-50/70`}
                >
                  <td className="py-4 px-6 border-b flex items-center justify-center">
                    <img
                      src={s.img}
                      alt="student"
                      className="w-12 h-12 rounded-xl border-4 border-blue-100 shadow group-hover:scale-110 transition"
                    />
                  </td>
                  <td className="py-4 px-6 border-b text-gray-800 font-semibold">
                    {s.name}
                  </td>
                  <td className="py-4 px-6 border-b text-gray-600">{s.email}</td>
                  <td className="py-4 px-6 border-b text-gray-600">{s.phone}</td>
                  <td className="py-4 px-6 border-b text-gray-600">{s.enrolled}</td>
                  <td className="py-4 px-6 border-b">
                    <StatusBadge status={s.status} />
                  </td>
                  <td className="py-4 px-6 border-b">
                    <div className="flex justify-center gap-4">
                      <button title="View" className="border-none bg-none p-1 hover:scale-110 transition text-blue-600">
                        <FaEye />
                      </button>
                      <button title="Edit" className="border-none bg-none p-1 hover:scale-110 transition text-green-600">
                        <FaEdit />
                      </button>
                      <button
                        title="Delete"
                        className="border-none bg-none p-1 hover:scale-125 transition text-red-600"
                        onClick={() => handleDelete(s._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {loading && (
        <div className="flex items-center justify-center mt-6 text-blue-600">
          <svg className="animate-spin h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <span className="font-medium">Loading students...</span>
        </div>
      )}
      {error && <p className="mt-4 text-base text-red-600 font-semibold text-center">{error}</p>}

      {/* Modal for Adding Student */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center transition-all">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative animate-pop">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl font-bold rounded-full w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-red-50 transition"
              onClick={() => setIsOpen(false)}
              title="Close"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-6 text-blue-800 text-center">
              Add New Student
            </h2>
            <form
              onSubmit={e => {
                e.preventDefault();
                handleAddStudent();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Name</label>
                <input
                  type="text"
                  autoFocus
                  placeholder="e.g. Ayesha Khan"
                  className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Email</label>
                <input
                  type="email"
                  placeholder="e.g. ayesha@email.com"
                  className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                  required
                />
              </div>
              <div className="flex gap-3">
                <div className="w-1/2">
                  <label className="block text-gray-700 mb-1 font-medium">Phone</label>
                  <input
                    type="text"
                    placeholder="e.g. 0300-1234567"
                    className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700 mb-1 font-medium">Course</label>
                  <input
                    type="text"
                    placeholder="e.g. Web Dev Bootcamp"
                    className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                    value={newStudent.enrolled}
                    onChange={(e) => setNewStudent({ ...newStudent, enrolled: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Status</label>
                <select
                  className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                  value={newStudent.status}
                  onChange={e => setNewStudent({ ...newStudent, status: e.target.value })}
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Profile Photo URL</label>
                <input
                  type="url"
                  placeholder="Paste image URL (optional)"
                  className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                  value={newStudent.img}
                  onChange={e => setNewStudent({ ...newStudent, img: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-2 rounded-lg font-bold shadow hover:from-blue-700 hover:to-blue-500 transition"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Page>
  );
}
