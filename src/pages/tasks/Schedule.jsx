import React from 'react'
import { motion } from 'framer-motion'

const Schedule = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Task Schedule</h1>
          <div className="grid gap-6">
            {/* Weekly Calendar View */}
            <div className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Weekly Overview</h2>
              {/* Add calendar implementation here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Schedule