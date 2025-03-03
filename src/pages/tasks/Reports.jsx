import React from 'react'
import { motion } from 'framer-motion'

const Reports = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Task Reports</h1>
          <div className="space-y-6">
            {/* Reports content will go here */}
            <div className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
              {/* Add reports implementation here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports