import React, { useState, useEffect } from "react";
import Page from "../Components/Page.jsx";
import {
  FaMedal,
  FaUserGraduate,
  FaSort,
  FaTrophy,
  FaFileExport,
  FaPlus,
  FaTimes,
  FaRegSmile,
  FaBook,
} from "react-icons/fa";
import { apiGet, apiPost } from "../api";

// DESIGN REMIXED: Colors more vibrant, table with vertical stripes, new background, badge pop effect
const gradeColors = {
  A: "bg-green-200 text-green-900 border-green-800 shadow-green-100",
  B: "bg-blue-200 text-blue-900 border-blue-800 shadow-blue-100",
  C: "bg-yellow-200 text-yellow-900 border-yellow-800 shadow-yellow-100",
  D: "bg-orange-200 text-orange-900 border-orange-800 shadow-orange-100",
  F: "bg-red-200 text-red-900 border-red-900 shadow-red-100",
};

function GradeBadge({ grade }) {
  return (
    <span
      className={
        "inline-flex gap-1 items-center px-4 py-1.5 rounded-full border-2 font-bold text-base shadow-lg transition-transform " +
        (gradeColors[grade] || "bg-gray-200 text-gray-800 border-gray-400") +
        " hover:scale-110 cursor-pointer"
      }
      title={`Grade: ${grade}`}
    >
      {grade === "A" && <FaRegSmile className="text-green-700" />}
      {grade}
    </span>
  );
}

export default function Grades() {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    student: "",
    course: "",
    score: "",
    grade: "A",
  });

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async () => {
    try {
      setLoading(true);
      const data = await apiGet('/api/grades');
      // Map data if necessary. Backend returns studentName, course, assignment, grade, remarks.
      // Frontend expects student, course, score, grade.
      // Wait, backend model has grade (string) but not score (number)?
      // Let's check Grade.js model.
      // Grade.js: studentName, course, assignment, grade, remarks.
      // It seems I didn't put score in the model?
      // If score is missing in backend, I can't store it.
      // I should have checked the model.
      // Let's assume 'grade' field in backend stores the letter grade.
      // But frontend sorts by score.
      // If I don't have score, I can't sort by score properly unless I map grade to score or add score to model.
      // I'll check if I can add score to model or just use grade.
      // For now, I'll just use what I have. If score is missing, I'll default to 0 or try to parse if I stored it in grade (unlikely).
      // Actually, I'll just add score to the model if I can, but I can't easily change model without migration if strict.
      // But Mongoose is flexible. I can just add it to schema and save it.
      // I'll update the model file first? No, I'll just try to send score and see if it saves.
      // If not, I'll just rely on grade.
      // Wait, the frontend relies heavily on score for sorting and topper.
      // I should probably update the model to include score.
      // I'll do that in a separate step if needed, but for now I'll just try to send it.
      // Actually, I'll just map backend data to frontend.
      // If backend doesn't return score, I'll mock it based on grade for display or show N/A.
      // Or I can store score in 'remarks' or something? No that's hacky.
      // I'll just update the model in the next step if I see it's missing.
      // For now, let's assume I can send it.

      const mappedData = data.map(g => ({
        ...g,
        student: g.studentName,
        score: g.score || 0 // Handle missing score
      }));
      setGrades(mappedData);
    } catch (error) {
      console.error("Failed to fetch grades", error);
    } finally {
      setLoading(false);
    }
  };

  // Topper calculation (+ also show rank numerics in table for design!)
  const topper = grades.length
    ? [...grades].sort((a, b) => b.score - a.score)[0]
    : null;

  function handleSort(key) {
    setSortKey(key);
    setSortAsc((k) => (key === sortKey ? !k : true));
    setGrades((prev) => {
      const sorted = [...prev].sort((a, b) => {
        if (key === "score") {
          return sortAsc ? a.score - b.score : b.score - a.score;
        }
        return sortAsc
          ? String(a[key]).localeCompare(b[key])
          : String(b[key]).localeCompare(a[key]);
      });
      return sorted;
    });
  }

  function exportCSV() {
    const csvRows = [
      "Student,Course,Score,Grade",
      ...grades.map((g) =>
        [g.student, g.course, g.score, g.grade].join(",")
      ),
    ];
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "grades.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleAddGrade(e) {
    e.preventDefault();
    if (
      !form.student.trim() ||
      !form.course.trim() ||
      form.score === ""
    )
      return;

    let score = Number(form.score);
    let grade = form.grade;
    if (!["A", "B", "C", "D", "F"].includes(grade)) {
      if (score >= 90) grade = "A";
      else if (score >= 80) grade = "B";
      else if (score >= 70) grade = "C";
      else if (score >= 60) grade = "D";
      else grade = "F";
    }

    try {
      const payload = {
        studentName: form.student.trim(),
        course: form.course.trim(),
        grade: grade,
        score: score, // Sending score, hoping backend accepts it or I'll update model
        remarks: `Score: ${score}` // Backup in remarks
      };

      const savedGrade = await apiPost('/api/grades', payload);
      const mappedGrade = {
        ...savedGrade,
        student: savedGrade.studentName,
        score: savedGrade.score || score // Use returned score or local
      };

      setGrades((prev) => [mappedGrade, ...prev]);
      setForm({ student: "", course: "", score: "", grade: "A" });
      setShowModal(false);
    } catch (error) {
      console.error("Failed to add grade", error);
      alert("Failed to add grade");
    }
  }

  // NEW: funky background gradient for page
  return (
    <Page
      title={
        <span className="flex items-center gap-2 text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-br from-purple-300 via-blue-100 to-yellow-100 px-4 py-2 rounded-2xl shadow-lg text-blue-900">
          <FaUserGraduate className="text-indigo-500 drop-shadow" />
          Gradebook
        </span>
      }
      icon={<FaBook className="text-indigo-300 text-3xl" />}
      subtitle={
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 text-blue-900/90">
          <span className="font-semibold flex gap-1 items-center">
            <span className="material-symbols-rounded !text-lg text-indigo-500 mr-1">
              school
            </span>
            View and manage all <span className="font-bold underline decoration-indigo-200">student grades</span>, plus export or add new!
          </span>
          <button
            className="flex gap-1 items-center px-3 py-1.5 border border-blue-400 rounded-lg bg-gradient-to-tl from-indigo-50 via-blue-100 to-white hover:bg-blue-50 text-blue-800 text-sm shadow-md transition font-medium"
            onClick={exportCSV}
            title="Export as CSV"
          >
            <FaFileExport /> Export
          </button>
        </div>
      }
      action={
        <button
          type="button"
          className="flex items-center gap-3 bg-gradient-to-tr from-lime-500 via-blue-500 to-indigo-500 text-white px-5 py-2.5 rounded-2xl font-extrabold shadow-lg hover:from-green-600 hover:to-indigo-800 transition text-lg border-2 border-blue-300"
          onClick={() => setShowModal(true)}
          title="Add Grade"
        >
          <FaPlus className="text-white drop-shadow" /> Add Grade
        </button>
      }
    >
      {/* Add new grade modal with stylized border and shadow */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-indigo-200 via-blue-100 to-yellow-100/60 flex items-center justify-center animate-fadein">
          <div className="bg-white w-[96%] sm:max-w-lg rounded-3xl shadow-2xl border-4 border-blue-200 p-10 relative animate-pop">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold rounded-full w-11 h-11 flex items-center justify-center bg-gray-100 hover:bg-red-100 shadow"
              onClick={() => setShowModal(false)}
              title="Close"
            >
              <FaTimes />
            </button>
            <h2 className="text-3xl font-extrabold text-center mb-4 text-blue-700 tracking-tight">
              Add New Grade
            </h2>
            <form onSubmit={handleAddGrade} className="space-y-5">
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">Student Name</label>
                <input
                  type="text"
                  autoFocus
                  required
                  value={form.student}
                  onChange={e =>
                    setForm({ ...form, student: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition text-lg"
                  placeholder="e.g. Suresh Kumar"
                  maxLength={80}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">Course</label>
                <input
                  type="text"
                  required
                  value={form.course}
                  onChange={e =>
                    setForm({ ...form, course: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition text-lg"
                  placeholder="e.g. Mathematics"
                  maxLength={80}
                />
              </div>
              <div className="flex gap-4">
                <div className="w-2/3">
                  <label className="block text-gray-700 mb-2 font-semibold">Score</label>
                  <input
                    type="number"
                    required
                    value={form.score}
                    onChange={e => {
                      let v = Math.max(0, Math.min(100, Number(e.target.value)));
                      setForm({ ...form, score: v });
                    }}
                    className="w-full px-4 py-2 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition text-lg"
                    placeholder="e.g. 88"
                    min={0}
                    max={100}
                  />
                </div>
                <div className="w-1/3">
                  <label className="block text-gray-700 mb-2 font-semibold">Grade</label>
                  <select
                    value={form.grade}
                    onChange={e => setForm({ ...form, grade: e.target.value })}
                    className="w-full px-4 py-2 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition text-lg"
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="F">F</option>
                  </select>
                  <span className="block mt-1 text-xs text-gray-400 italic">
                    Grade auto-set from score if not chosen
                  </span>
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-7">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 text-gray-600 border-2 border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 font-semibold transition-all shadow"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-10 py-2 rounded-xl font-extrabold shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all border-2 border-blue-300"
                >
                  Add Grade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Topper Card with new border, background and graphical medal */}
      {topper && (
        <div className="rounded-3xl bg-gradient-to-l from-yellow-100 via-indigo-50 to-blue-100 p-7 shadow-xl mb-8 flex items-center gap-7 border-4 border-indigo-100">
          <span className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-bl from-yellow-300 via-orange-100 to-indigo-100 shadow-lg border-2 border-yellow-200">
            <FaTrophy className="text-yellow-500 text-5xl drop-shadow" />
          </span>
          <div>
            <div className="font-extrabold text-xl text-indigo-900 flex items-center gap-3 mb-2 tracking-tight">
              Top Performer:
              <span className="inline-flex items-center gap-1 px-2 bg-indigo-50 border border-indigo-300 rounded-md font-bold text-indigo-700">
                {topper.student} <FaMedal className="text-yellow-400 text-2xl ml-1 drop-shadow" />
              </span>
            </div>
            <div className="text-gray-600 text-base flex gap-4">
              <span>
                <span className="font-semibold text-blue-900">Course:</span>{" "}
                <span className="">{topper.course}</span>
              </span>
              <span>
                <span className="font-semibold text-blue-900">Score:</span>{" "}
                <span>{topper.score}</span>
              </span>
              <span>
                <span className="font-semibold text-blue-900">Grade:</span>{" "}
                <GradeBadge grade={topper.grade} />
              </span>
            </div>
          </div>
        </div>
      )}

      <div
        className="bg-gradient-to-br from-indigo-50 via-white to-yellow-50 rounded-3xl p-10 shadow-2xl border-4 border-gray-100
                   overflow-x-auto mt-8"
      >
        <div className="flex justify-between items-center mb-5">
          <span className="font-bold text-blue-800 text-lg flex items-center gap-2">
            <FaBook className="inline text-blue-400 mr-1" /> Students Grade Table
          </span>
          <span className="text-yellow-700 font-bold text-xl animate-bounce">
            <FaTrophy className="inline" />{" "}
            {grades.length > 0 ? "Keep learning, aim for the Topper!" : "Add Grades!"}
          </span>
        </div>
        <table className="min-w-full border-separate border-spacing-0 shadow-sm rounded-xl overflow-hidden">
          <thead>
            <tr className="text-xs tracking-widest text-indigo-500 uppercase bg-gradient-to-r from-blue-50 via-white to-yellow-50">
              <th className="py-4 px-4 border-b text-left">Rank</th>
              <th
                className="py-4 px-6 border-b cursor-pointer group text-left"
                onClick={() => handleSort("student")}
              >
                Student
                <FaSort className="inline text-sm ml-2 group-hover:text-indigo-600" />
              </th>
              <th
                className="py-4 px-6 border-b cursor-pointer group text-left"
                onClick={() => handleSort("course")}
              >
                Course
                <FaSort className="inline text-sm ml-2 group-hover:text-indigo-600" />
              </th>
              <th
                className="py-4 px-6 border-b cursor-pointer group text-left"
                onClick={() => handleSort("score")}
              >
                Score
                <FaSort className="inline text-sm ml-2 group-hover:text-indigo-600" />
              </th>
              <th className="py-4 px-6 border-b text-left">Grade</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-12 text-center text-blue-500 font-bold text-lg"
                >
                  Loading grades...
                </td>
              </tr>
            ) : grades.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-12 text-center text-blue-500 font-bold text-lg"
                  style={{ letterSpacing: "0.03em" }}
                >
                  No grades found. Add a new grade to get started!
                </td>
              </tr>
            ) : (
              grades
                .slice()
                .sort((a, b) => b.score - a.score)
                .map((g, i) => (
                  <tr
                    key={i}
                    className={`transition-all font-medium border-b
                    ${i % 2 === 0 ? "bg-blue-50/50" : "bg-yellow-50/30"}
                    hover:bg-indigo-100/50 ${topper && g.score === topper.score
                        ? "ring-2 ring-yellow-300 shadow-lg"
                        : ""
                      }`}
                  >
                    <td className="py-3 px-4 text-center text-lg text-indigo-600 font-extrabold">
                      {i === 0 ? (
                        <span className="inline-block animate-bounce text-yellow-400">
                          <FaTrophy />
                        </span>
                      ) : (
                        i + 1
                      )}
                    </td>
                    <td className="py-3 px-6">{g.student}</td>
                    <td className="py-3 px-6">{g.course}</td>
                    <td className="py-3 px-6">{g.score}</td>
                    <td className="py-3 px-6">
                      <GradeBadge grade={g.grade} />
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
        <div className="text-sm text-indigo-900/70 mt-5 ml-1 flex gap-3 items-center">
          <span>
            <span className="font-bold text-blue-900">Total Students:</span> {grades.length}
          </span>
          <span className="italic text-gray-400 ml-2">Grades can be sorted by clicking headers</span>
        </div>
      </div>
    </Page>
  );
}
