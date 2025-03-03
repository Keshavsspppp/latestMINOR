import React, { useState } from 'react'
import { motion } from 'framer-motion'

const CreateTask = ({ onSubmit, onCancel }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    type: 'inter-departmental',
    departments: [],
    startDate: '',
    endDate: '',
    deadline: '',
    priority: 'medium'
  })

  const departments = [
    'Public Works',
    'Urban Planning',
    'Water Resources',
    'Environmental',
    'Transportation',
    'Health',
    'Education',
    'Traffic Control'
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...taskData,
      deadline: taskData.endDate
    })
  }

  const validateDates = () => {
    if (!taskData.startDate || !taskData.endDate) return true
    return new Date(taskData.startDate) <= new Date(taskData.endDate)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Create New Task</h1>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Task Title
          </label>
          <input
            type="text"
            value={taskData.title}
            onChange={(e) => setTaskData({...taskData, title: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={taskData.description}
            onChange={(e) => setTaskData({...taskData, description: e.target.value})}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Type
            </label>
            <select
              value={taskData.type}
              onChange={(e) => setTaskData({...taskData, type: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="inter-departmental">Inter-departmental</option>
              <option value="multi-departmental">Multi-departmental</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              value={taskData.priority}
              onChange={(e) => setTaskData({...taskData, priority: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Involved Departments
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {departments.map(dept => (
              <label key={dept} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={taskData.departments.includes(dept)}
                  onChange={(e) => {
                    const newDepts = e.target.checked
                      ? [...taskData.departments, dept]
                      : taskData.departments.filter(d => d !== dept)
                    setTaskData({...taskData, departments: newDepts})
                  }}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{dept}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={taskData.startDate}
              onChange={(e) => setTaskData({...taskData, startDate: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={taskData.endDate}
              min={taskData.startDate}
              onChange={(e) => setTaskData({...taskData, endDate: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {!validateDates() && (
          <p className="text-red-500 text-sm">End date must be after start date</p>
        )}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!validateDates()}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Task
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default CreateTask