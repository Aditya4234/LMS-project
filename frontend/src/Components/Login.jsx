import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showCreateAccountMsg, setShowCreateAccountMsg] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!formData.email) return "Email is required";
    const re = /\S+@\S+\.\S+/;
    if (!re.test(formData.email)) return "Enter a valid email";
    if (formData.password.length < 6)
      return "Password must be at least 6 characters";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setShowCreateAccountMsg(false);

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    try {
      setLoading(true);
      // Simulate API call - In production, replace with actual API call
      await new Promise((r) => setTimeout(r, 1100));

      // Mock successful login - store token
      const mockToken = "demo_token_" + Date.now();
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify({
        name: "Aditya Gupta",
        email: formData.email,
        role: "student"
      }));

      setSuccess("Welcome back! 🙌");

      // Redirect to dashboard after 500ms
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);

    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    setShowCreateAccountMsg(true);
    // navigate('/signup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tl from-indigo-100 via-blue-50 to-blue-200 p-0 md:p-4 relative isolate overflow-hidden">
      {/* Ornamented Decorative Divs */}
      <div className="absolute left-0 top-0 right-0 h-64 z-0 pointer-events-none flex">
        <div className="w-1/2 h-full bg-gradient-to-tr from-violet-200 via-indigo-200 to-transparent rounded-br-full blur-2xl opacity-40 md:opacity-60"></div>
        <div className="w-1/2 h-full bg-gradient-to-tl from-blue-100 via-cyan-200 to-transparent rounded-bl-full blur-2xl opacity-30"></div>
      </div>
      <div className="absolute bottom-0 right-0 w-1/3 h-44 bg-gradient-to-bl from-amber-100 via-pink-100 to-transparent rounded-tl-3xl blur-2xl opacity-60 pointer-events-none"></div>
      {/* Glassmorphism Card */}
      <div className="max-w-lg w-full bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg border border-blue-200/40 z-10 px-3">
        <div className="pt-10 pb-8 px-6 md:px-14 flex flex-col items-center">
          <div className="mb-8 flex flex-col items-center">
            <span className="text-[2.7rem] mb-2 animate-bounce" aria-label="Lock">
              <svg width="46" height="46" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="22" fill="#6366F1" opacity="0.11" /><rect x="14" y="22" width="20" height="14" rx="3" fill="#8b5cf6" /><rect x="18" y="14" width="12" height="12" rx="6" fill="#6366f1" /><rect x="21.75" y="28" width="4.5" height="7" rx="2.25" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.3" /></svg>
            </span>
            <h2 className="text-3xl font-extrabold text-indigo-700 drop-shadow-sm tracking-tight mb-1">
              Welcome Back!
            </h2>
            <p className="text-indigo-500/80 text-lg font-medium mt-0.5 tracking-wide">
              Sign in to continue learning 🚀
            </p>
          </div>

          {/* Alerts */}
          <div className="relative mb-3 w-full h-8 flex items-center">
            {error && (
              <div className="absolute left-0 right-0 text-xs md:text-sm text-red-700 bg-red-100 border border-red-200 p-2 rounded shadow animate-fade-in">
                {error}
              </div>
            )}
            {success && (
              <div className="absolute left-0 right-0 text-xs md:text-sm text-green-700 bg-green-100 border border-green-200 p-2 rounded shadow animate-fade-in">
                {success}
              </div>
            )}
            {showCreateAccountMsg && (
              <div className="absolute left-0 right-0 text-xs md:text-sm text-blue-700 bg-blue-100 border border-blue-200 p-2 rounded text-center animate-fade-in">
                You clicked <b>Create Account!</b> 🆕
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 w-full"
            autoComplete="on"
          >
            <div>
              <label className="block text-[0.99rem] text-indigo-800 mb-1 font-semibold tracking-wide">
                Email Address
              </label>
              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-300 text-xl">
                  <svg width="19" height="19" fill="none"><path d="M2 5.5v8a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" stroke="#6366f1" strokeWidth="1.4" /><path d="M2.5 5.5 9.5 10.5l7-5" stroke="#6366f1" strokeWidth="1.4" /></svg>
                </span>
                <input
                  type="email"
                  name="email"
                  autoComplete="username"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none text-indigo-900 bg-indigo-50 transition font-medium placeholder:text-gray-400/70 shadow"
                />
              </div>
            </div>
            <div>
              <label className="block text-[0.99rem] text-indigo-800 mb-1 font-semibold tracking-wide">
                Password
              </label>
              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-300 text-xl">
                  <svg width="18" height="18" fill="none"><rect x="3" y="7" width="12" height="8" rx="2" stroke="#6366f1" strokeWidth="1.3" /><path d="M6 7V5a3 3 0 1 1 6 0v2" stroke="#6366f1" strokeWidth="1.3" /><circle cx="9" cy="11" r="1.4" fill="#6366f1" /></svg>
                </span>
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none text-indigo-900 bg-indigo-50 transition font-medium placeholder:text-gray-400/70 shadow"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 rounded-2xl font-bold shadow-md bg-gradient-to-r from-indigo-500 to-pink-400 hover:from-indigo-600 hover:to-pink-500 text-white text-lg tracking-wide uppercase transition disabled:opacity-60 ${loading ? "animate-pulse" : ""
                }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin" width="20" height="20" fill="none"><circle cx="10" cy="10" r="8" stroke="#fff" strokeOpacity=".3" strokeWidth="3" /><path d="M18 10a8 8 0 0 1-8 8" stroke="#fff" strokeWidth="3" strokeLinecap="round" /></svg>
                  Signing in...
                </span>
              ) : (
                <>
                  <span className="mr-1.5">🔑</span>Sign In
                </>
              )}
            </button>
          </form>

          {/* Action Links */}
          <div className="mt-8 w-full flex flex-col md:flex-row justify-between items-center gap-1">
            <a
              href="#"
              className="text-sm text-indigo-500 font-medium hover:underline hover:text-pink-500 transition flex items-center gap-1"
              tabIndex={0}
            >
              <svg width="16" height="16" fill="none" className="inline-block"><path d="M8 1.5a6.5 6.5 0 1 1 0 13A6.5 6.5 0 0 1 8 1.5Zm.01 7.4v-2m0 5.18h.005" stroke="#6366f1" strokeWidth="1.3" strokeLinecap="round" /></svg>
              Forgot password?
            </a>
            <span className="py-2 hidden md:inline text-[11px] text-gray-300">|</span>
            <a
              href="/signup"
              onClick={handleCreateAccount}
              className="text-sm text-white font-bold ml-0 md:ml-1 px-5 py-2 rounded-2xl bg-indigo-400 hover:bg-indigo-500 transition flex items-center gap-1 shadow"
              style={{
                boxShadow:
                  "0 2px 8px 0 rgba(99,102,241,0.13), 0 1.5px 6px 0 rgba(236,72,153,0.09)",
              }}
              tabIndex={0}
            >
              <span>🆕</span> Create Account
            </a>
          </div>
          {/* Footer */}
          <div className="mt-5 w-full flex flex-col items-center">
            <hr className="w-20 border-t-2 border-indigo-200 mb-1.5 opacity-60" />
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <span className="text-pink-400 animate-pulse mx-0.5 text-base">❤</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
