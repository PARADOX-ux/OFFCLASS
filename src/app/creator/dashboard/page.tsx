'use client';

import React from 'react';
import { Plus, BarChart3, Users, Clock, PlayCircle } from 'lucide-react';

export default function CreatorDashboardPage() {
  return (
    <div className="max-w-5xl mx-auto animate-[fade-in_0.4s_ease]">
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, John</h1>
          <p className="text-sm text-gray-500 mt-1">Here is what is happening with your content today.</p>
        </div>
        <button className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm">
          <Plus size={16} />
          Create New Course
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Total Students</h3>
            <div className="w-8 h-8 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users size={16} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">1,248</p>
          <p className="text-xs text-green-600 font-medium mt-2 flex items-center gap-1">
            <BarChart3 size={12} /> +12% from last month
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Total Watch Time</h3>
            <div className="w-8 h-8 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center">
              <Clock size={16} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">842 hrs</p>
          <p className="text-xs text-green-600 font-medium mt-2 flex items-center gap-1">
            <BarChart3 size={12} /> +5% from last month
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Active Courses</h3>
            <div className="w-8 h-8 rounded-md bg-green-50 text-green-600 flex items-center justify-center">
              <PlayCircle size={16} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">3</p>
          <p className="text-xs text-gray-500 font-medium mt-2">
            1 Draft pending
          </p>
        </div>
      </div>

      {/* Your Courses Table */}
      <h2 className="text-lg font-bold text-gray-900 mb-4">Your Content</h2>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 font-medium text-gray-500">Course Name</th>
              <th className="px-6 py-3 font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 font-medium text-gray-500">Students</th>
              <th className="px-6 py-3 font-medium text-gray-500">Rating</th>
              <th className="px-6 py-3 font-medium text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[
              { title: 'The Blueprint to Modern Investing', status: 'Published', students: '840', rating: '4.9' },
              { title: 'Freelance Tax Guide 101', status: 'Published', students: '408', rating: '4.7' },
              { title: 'Understanding Crypto Cycles', status: 'Draft', students: '-', rating: '-' },
            ].map((course, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{course.title}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    course.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {course.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{course.students}</td>
                <td className="px-6 py-4 text-gray-600">{course.rating}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 hover:text-blue-800 font-medium">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
