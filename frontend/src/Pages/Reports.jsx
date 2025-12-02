import React, { useState, useEffect } from "react";
import Page from "../Components/Page.jsx";
import { FaUserPlus, FaChartLine, FaRupeeSign } from "react-icons/fa";
import { apiGet } from "../api";

// Animated ring for badges
function MetricBadge({ icon, color }) {
  return (
    <span className="relative flex items-center justify-center mr-3">
      <span
        className={`absolute animate-spin-slow w-14 h-14 rounded-full border-2 border-dashed ${color} opacity-35`}
        style={{ borderColor: "rgba(99,102,241,0.25)" }}
        aria-hidden="true"
      />
      <span
        className={`relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-xl shadow-lg border-2 border-white bg-gradient-to-br ${color}`}
        style={{ fontSize: '2rem' }}
      >
        {icon}
      </span>
    </span>
  );
}

// Metric Card with new modern card design
function MetricCard({ metric, isOpen, onToggle }) {
  return (
    <div
      className={`
        group bg-gradient-to-br ${metric.accent}
        rounded-[2.5rem] shadow-xl ring-1 ring-inset ring-indigo-100
        p-9 flex flex-col gap-3 hover:-translate-y-2 hover:scale-[1.035] transition-all
        relative overflow-visible min-h-[210px]
        border-2 border-transparent hover:border-indigo-200
      `}
      style={{
        boxShadow: isOpen
          ? "0 0 0 0.35rem #a5b4fc30, 0 8px 32px -8px #6366f130"
          : undefined,
        transition: "box-shadow .33s"
      }}
    >
      {/* Faded background icon */}
      <div className="absolute -top-8 -right-7 opacity-15 group-hover:opacity-30 text-[7rem] pointer-events-none select-none scale-105 blur-[1px]">
        {metric.icon}
      </div>
      <div className="z-10 flex items-end gap-4 mb-1">
        <MetricBadge icon={metric.icon} color={metric.badge || "from-indigo-50 to-white"} />
        <span className="font-bold text-indigo-800 tracking-tight text-xl drop-shadow">{metric.title}</span>
      </div>
      <div className="z-10 font-extrabold text-5xl text-indigo-800 group-hover:text-indigo-900 tracking-tighter my-1 drop-shadow-lg flex items-end">
        {metric.value}
        {metric.suffix && <span className="ml-0.5 text-base font-bold">{metric.suffix}</span>}
      </div>
      <div className="z-10 text-xs font-semibold text-indigo-500 mb-2">{metric.desc}</div>

      {metric.details && (
        <div className="z-10">
          <button
            className="mt-1 px-5 py-1 text-xs rounded-lg shadow bg-blue-50/70 hover:bg-blue-100/90 text-blue-800 border border-blue-200 font-semibold tracking-wide transition focus:ring-2 focus:ring-offset-2 focus:ring-blue-200"
            onClick={onToggle}
            type="button"
            aria-expanded={isOpen}
            aria-controls={`metric-detail-${metric.title}`}
          >
            <span className="material-symbols-rounded align-bottom text-base mr-1" aria-hidden>
              {isOpen ? "visibility_off" : "visibility"}
            </span>
            {isOpen ? "Hide Details" : "How Added?"}
          </button>
          <div
            id={`metric-detail-${metric.title}`}
            className={`transition-all duration-300 ease-in-out ${isOpen
              ? "opacity-100 max-h-[350px] mt-4 pointer-events-auto"
              : "opacity-0 max-h-0 pointer-events-none"
              } bg-blue-50/80 rounded-2xl p-4 shadow-inner border border-blue-100 w-full overflow-hidden`}
            aria-hidden={!isOpen}
          >
            {metric.details}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Reports() {
  const [openDetail, setOpenDetail] = useState(null);
  const [reportData, setReportData] = useState({
    enrollments: [],
    completions: [],
    revenue: "0"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const data = await apiGet('/api/reports');
      // Backend returns { enrollments: [], completions: [], revenue: "..." }
      setReportData(data);
    } catch (error) {
      console.error("Failed to fetch reports", error);
      // Set demo data if API fails
      setReportData({
        enrollments: [
          { source: "Direct", count: 45, info: "via website" },
          { source: "Referral", count: 32, info: "from partners" },
          { source: "Social Media", count: 28, info: "Facebook, Instagram" }
        ],
        completions: [
          { course: "React Basics", completed: 85, total: 100, rate: "85%" },
          { course: "JavaScript Pro", completed: 72, total: 90, rate: "80%" },
          { course: "Node.js", completed: 45, total: 60, rate: "75%" }
        ],
        revenue: "₹45,000"
      });
    } finally {
      setLoading(false);
    }
  };

  // Metrics with more color variation and playful features
  const metrics = [
    {
      title: "Enrollments",
      value: (reportData.enrollments || []).reduce((acc, cur) => acc + cur.count, 0),
      desc: "Last 7 days",
      icon: <FaUserPlus className="text-blue-400 drop-shadow" />,
      accent: "from-cyan-100 via-blue-100 to-blue-50",
      badge: "from-blue-200 to-blue-50",
      details: (
        <div className="text-xs text-blue-900">
          <div className="font-bold mb-1">Enrollments Breakdown:</div>
          <ul className="list-disc list-inside space-y-1">
            {(reportData.enrollments || []).map((e) => (
              <li key={e.source}>
                <span className="font-medium">{e.count} </span>
                <span>{e.source}</span>
                <span className="text-gray-500 ml-2">({e.info})</span>
              </li>
            ))}
          </ul>
          <div className="mt-2 text-blue-700 font-bold">
            Total: {(reportData.enrollments || []).reduce((acc, cur) => acc + cur.count, 0)}
          </div>
        </div>
      ),
    },
    {
      title: "Completion Rate",
      value: (
        (reportData.completions || []).length > 0 ?
          Math.round(
            ((reportData.completions || []).reduce((sum, c) => sum + (c.completed / c.total), 0) /
              (reportData.completions || []).length) * 100
          ) + "%" : "0%"
      ),
      desc: "Average across courses",
      icon: <FaChartLine className="text-green-400 drop-shadow" />,
      accent: "from-green-100 via-green-50 to-white",
      badge: "from-green-200 to-white",
      details: (
        <div className="text-xs text-green-900">
          <div className="font-bold mb-1">Coursewise Completions:</div>
          <table className="w-full text-left mb-2">
            <thead>
              <tr>
                <th className="pr-2 py-1">Course</th>
                <th className="pr-2 py-1">Completion</th>
                <th className="pr-2 py-1 text-right">Enrolled</th>
              </tr>
            </thead>
            <tbody>
              {(reportData.completions || []).map((c) => (
                <tr key={c.course}>
                  <td className="pr-2 py-0.5">{c.course}</td>
                  <td className="pr-2 py-0.5">{c.rate}</td>
                  <td className="pr-2 py-0.5 text-right">
                    {c.completed}/{c.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-1 text-green-700 font-semibold">
            Average Completion:{" "}
            {(reportData.completions || []).length > 0 ? Math.round(
              ((reportData.completions || []).reduce((sum, c) => sum + (c.completed / c.total), 0) /
                (reportData.completions || []).length) *
              100
            ) : 0}
            %
          </div>
        </div>
      ),
    },
    {
      title: "Revenue",
      value: reportData.revenue,
      desc: "This month (est.)",
      icon: <FaRupeeSign className="text-yellow-500 drop-shadow" />,
      accent: "from-yellow-100 via-orange-50 to-white",
      badge: "from-yellow-200 to-yellow-50",
      details: (
        <div className="text-xs text-yellow-900">
          <div className="font-bold mb-1">How revenue is estimated:</div>
          <ul className="list-disc list-inside space-y-1 mb-1">
            <li>
              <span className="font-medium">₹200 per new enrollment</span> (last 7 days)
            </li>
            <li>
              <span className="font-medium">Old carryover</span> from previous enrollments included
            </li>
          </ul>
          <div className="mt-1 text-yellow-800 font-bold">Prediction logic beta 🚧</div>
        </div>
      ),
    },
    // Add more metrics for expansion
  ];

  // Decorative animated bar, moves subtly left-right
  function AnimatedBar() {
    return (
      <div className="w-full flex justify-center mb-10 select-none" aria-hidden>
        <span className="block h-3 rounded-xl w-1/2 bg-gradient-to-r from-blue-300 via-fuchsia-100 to-pink-200 shadow-lg animate-barWobble" />
        <style>
          {`
            @keyframes barWobble {
              0% { transform: scaleX(1) translateX(0); }
              25% { transform: scaleX(1.07) translateX(10px);}
              50% { transform: scaleX(0.95) translateX(-8px);}
              100% { transform: scaleX(1) translateX(0);}
            }
            .animate-barWobble {
              animation: barWobble 4.2s ease-in-out infinite;
            }
            .animate-spin-slow {
              animation: spin 7s linear infinite;
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <Page
      title={
        <div className="flex items-center gap-4 text-2xl md:text-3xl font-black text-indigo-800 tracking-tighter mb-2">
          <span className="relative bg-gradient-to-bl from-yellow-300 to-blue-200 text-blue-900 w-14 h-14 flex items-center justify-center rounded-2xl text-4xl shadow border-2 border-blue-100 ring-2 ring-blue-200/30">
            <span className="animate-bounce" role="img" aria-label="chart">📈</span>
          </span>
          <span className="mt-1">Reports & Analytics</span>
        </div>
      }
      icon={null}
      subtitle={
        <span className="flex items-center gap-2 font-medium text-blue-900/80">
          <span className="material-symbols-rounded text-blue-400 text-lg">tips_and_updates</span>
          <span>
            <span className="underline decoration-dotted decoration-blue-400">How Added?</span> click to see the logic behind each figure!
          </span>
        </span>
      }
    >
      <AnimatedBar />

      {/* Cards with extra hover + shadow effects */}
      <div className="grid gap-12 sm:gap-8 grid-cols-1 md:grid-cols-3 mb-16">
        {loading ? (
          <div className="col-span-3 flex justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
          </div>
        ) : (
          metrics.map((m, i) => (
            <MetricCard
              key={m.title}
              metric={m}
              isOpen={openDetail === i}
              onToggle={() => setOpenDetail(openDetail === i ? null : i)}
            />
          ))
        )}
      </div>

      {/* Analytics Coming Soon, new illustration design */}
      <div className="relative flex flex-col items-center p-12 pb-14 rounded-[2.5rem] border border-sky-100 bg-gradient-to-br from-white/80 via-sky-50 to-sky-100 shadow-[0_8px_40px_-10px_#60a5fa22] mt-6 overflow-hidden">
        <span className="absolute -top-20 left-3 opacity-20 text-[9rem] animate-blobMove pointer-events-none select-none">📊</span>
        <span className="absolute -bottom-16 -right-3 opacity-10 text-[13rem] pointer-events-none select-none">🔍</span>
        <div className="relative z-10 flex flex-col items-center">
          <span className="text-6xl mb-4 opacity-30 animate-bounce" aria-label="analytics" role="img">📈</span>
          <div className="text-gray-700 text-lg font-extrabold mb-1 tracking-wide flex items-center">
            <span className="material-symbols-rounded text-sky-400 text-lg mr-2">hourglass</span>
            Analytics & Visualizations coming soon!
          </div>
          <div className="text-base text-sky-600 text-center max-w-lg mb-2 font-medium">
            Interactive charts, detailed trends & insights coming up.<br />
            Check the breakdown above for now!
          </div>
          <span className="text-xs text-sky-300 tracking-wide font-semibold uppercase mt-2">Beta Preview · June 2024</span>
        </div>
        <style>
          {`
            @keyframes blobMove {
              0% { transform: translateY(0) scale(1);}
              50% { transform: translateY(18px) scale(1.04);}
              100% { transform: translateY(0) scale(1);}
            }
            .animate-blobMove {
              animation: blobMove 7s ease-in-out infinite;
            }
            .animate-bounce {
              animation: bounce 2.2s infinite cubic-bezier(.5,1.65,.5,1);
            }
          `}
        </style>
      </div>
    </Page>
  );
}
