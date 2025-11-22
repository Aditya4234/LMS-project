import React from "react";

export default function About() {
  return (
    <div className="p-6 md:p-10 bg-gradient-to-br from-indigo-50 via-white to-blue-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          📖 About Us
        </h1>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-6 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🎯 Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            We are dedicated to providing top-quality learning experiences through our comprehensive 
            Learning Management System. Our platform empowers students, instructors, and institutions 
            to achieve their educational goals with cutting-edge technology and innovative teaching methods.
          </p>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-6 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">✨ What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📚</span>
              <div>
                <h3 className="font-medium text-gray-800">Comprehensive Courses</h3>
                <p className="text-sm text-gray-600">Wide range of courses across multiple disciplines</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">👨‍🏫</span>
              <div>
                <h3 className="font-medium text-gray-800">Expert Instructors</h3>
                <p className="text-sm text-gray-600">Learn from industry professionals</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">📊</span>
              <div>
                <h3 className="font-medium text-gray-800">Progress Tracking</h3>
                <p className="text-sm text-gray-600">Monitor your learning journey</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🏆</span>
              <div>
                <h3 className="font-medium text-gray-800">Certificates</h3>
                <p className="text-sm text-gray-600">Get recognized for your achievements</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 shadow-lg mb-6 text-white">
          <h2 className="text-2xl font-semibold mb-6 text-center">📈 Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold">1,245+</div>
              <div className="text-blue-100">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold">32+</div>
              <div className="text-blue-100">Courses</div>
            </div>
            <div>
              <div className="text-4xl font-bold">50+</div>
              <div className="text-blue-100">Instructors</div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">👥 Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 mx-auto mb-3 flex items-center justify-center text-3xl">
                👤
              </div>
              <h3 className="font-semibold text-gray-800">Aditya Gupta</h3>
              <p className="text-sm text-gray-600">Founder & CEO</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 mx-auto mb-3 flex items-center justify-center text-3xl">
                👤
              </div>
              <h3 className="font-semibold text-gray-800">Riya Sharma</h3>
              <p className="text-sm text-gray-600">Head of Education</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-blue-500 mx-auto mb-3 flex items-center justify-center text-3xl">
                👤
              </div>
              <h3 className="font-semibold text-gray-800">Karan Singh</h3>
              <p className="text-sm text-gray-600">Tech Lead</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

