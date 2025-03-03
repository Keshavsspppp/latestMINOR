import React, { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import TaskModal from '../components/dashboard/TaskModal'

const Dashboard = () => {
  const { user } = useUser()
  const [activeTab, setActiveTab] = useState('overview')
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [dashboardData, setDashboardData] = useState({
    activeRequests: 0,
    completedTasks: 0,
    updates: 0,
    recentActivity: [],
    performanceData: [],
    tasks: []
  })
  const [settings, setSettings] = useState({
    fullName: user?.fullName || '',
    department: 'Water Supply',
    emailNotifications: true,
    forumNotifications: true,
    theme: 'light',
    language: 'en'
  })
  const [taskFilter, setTaskFilter] = useState('all')

  // Add task handler
  const handleAddTask = (taskData) => {
    const newTask = {
      id: dashboardData.tasks.length + 1,
      ...taskData,
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    setDashboardData(prev => ({
      ...prev,
      tasks: [newTask, ...prev.tasks],
      activeRequests: prev.activeRequests + 1
    }))

    // Add to recent activity
    const newActivity = {
      id: dashboardData.recentActivity.length + 1,
      title: 'New Task Added',
      time: 'Just now',
      type: 'task',
      description: `New task "${taskData.title}" has been created`
    }

    setDashboardData(prev => ({
      ...prev,
      recentActivity: [newActivity, ...prev.recentActivity]
    }))
  }

  // Update task status
  const handleUpdateTaskStatus = (taskId, newStatus) => {
    setDashboardData(prev => ({
      ...prev,
      tasks: prev.tasks.map(task => 
        task.id === taskId 
          ? { ...task, status: newStatus }
          : task
      ),
      completedTasks: newStatus === 'completed' 
        ? prev.completedTasks + 1 
        : prev.completedTasks
    }))
  }

  // Filter tasks
  const getFilteredTasks = () => {
    return dashboardData.tasks.filter(task => {
      if (taskFilter === 'all') return true
      return task.status === taskFilter
    })
  }

  // Simulate fetching dashboard data
  useEffect(() => {
    setDashboardData({
      activeRequests: Math.floor(Math.random() * 20),
      completedTasks: Math.floor(Math.random() * 50),
      updates: Math.floor(Math.random() * 10),
      performanceData: [
        { name: 'Mon', tasks: 4 },
        { name: 'Tue', tasks: 6 },
        { name: 'Wed', tasks: 8 },
        { name: 'Thu', tasks: 5 },
        { name: 'Fri', tasks: 9 },
        { name: 'Sat', tasks: 3 },
        { name: 'Sun', tasks: 2 }
      ],
      tasks: [
        { id: 1, title: 'Review Building Permit', status: 'pending', priority: 'high', deadline: '2024-02-20' },
        { id: 2, title: 'Process Tax Refund', status: 'in-progress', priority: 'medium', deadline: '2024-02-22' },
        { id: 3, title: 'Update Water Connection', status: 'completed', priority: 'low', deadline: '2024-02-18' }
      ],
      recentActivity: [
        { 
          id: 1,
          title: 'Complaint Resolved', 
          time: '2 hours ago', 
          type: 'task',
          description: 'Water supply issue in Ward 5 resolved'
        },
        { 
          id: 2,
          title: 'New Service Request', 
          time: '4 hours ago', 
          type: 'approval',
          description: 'Building permit application received'
        },
        { 
          id: 3,
          title: 'Department Meeting', 
          time: 'Yesterday', 
          type: 'meeting',
          description: 'Weekly progress review scheduled'
        }
      ]
    })
  }, [])

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Add this function
  const handleSettingsSubmit = (e) => {
    e.preventDefault()
    // Here you would typically make an API call to save the settings
    console.log('Saving settings:', settings)
    // Show success message
    alert('Settings updated successfully!')
  }

  const renderPerformanceChart = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Weekly Performance</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dashboardData.performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="tasks" stroke="#3B82F6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )

  // Add this to your renderTaskList function
  const renderTaskList = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold">Current Tasks</h2>
          <select
            value={taskFilter}
            onChange={(e) => setTaskFilter(e.target.value)}
            className="border rounded-md px-2 py-1"
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button
          onClick={() => setIsTaskModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Task
        </button>
      </div>
      <div className="divide-y divide-gray-200">
        {getFilteredTasks().map(task => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className={`w-3 h-3 rounded-full ${
                  task.priority === 'high' ? 'bg-red-500' :
                  task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}></span>
                <span className="font-medium">{task.title}</span>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={task.status}
                  onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    task.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <span className="text-sm text-gray-500">
                  Due: {new Date(task.deadline).toLocaleDateString()}
                </span>
              </div>
            </div>
            {task.description && (
              <p className="mt-2 text-sm text-gray-600">{task.description}</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderOverview = () => (
    <div className="space-y-6">
      {/* User Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-4">
          <img 
            src={user?.profileImageUrl} 
            alt="Profile" 
            className="w-16 h-16 rounded-full border-2 border-blue-500"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.firstName}!</h1>
            <p className="text-gray-600">Department Member</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <h3 className="text-lg font-semibold opacity-90">Active Requests</h3>
          <p className="text-3xl font-bold mt-2">{dashboardData.activeRequests}</p>
          <p className="text-sm opacity-75 mt-1">
            {Math.floor(dashboardData.activeRequests / 3)} pending approval
          </p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
          <h3 className="text-lg font-semibold opacity-90">Completed Tasks</h3>
          <p className="text-3xl font-bold mt-2">{dashboardData.completedTasks}</p>
          <p className="text-sm opacity-75 mt-1">This month</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <h3 className="text-lg font-semibold opacity-90">Department Updates</h3>
          <p className="text-3xl font-bold mt-2">{dashboardData.updates}</p>
          <p className="text-sm opacity-75 mt-1">New updates</p>
        </div>
      </motion.div>

      {/* Performance Chart */}
      {renderPerformanceChart()}

      {/* Task List */}
      {renderTaskList()}

      {/* Recent Activity */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow-sm"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {dashboardData.recentActivity.map((activity) => (
            <div key={activity.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center
                  ${activity.type === 'task' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'approval' ? 'bg-green-100 text-green-600' :
                    'bg-purple-100 text-purple-600'}`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {activity.type === 'task' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    ) : activity.type === 'approval' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    )}
                  </svg>
                </div>
                <div>
                  <p className="text-gray-900 font-medium">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                  <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )

  const renderSettings = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>
      
      <form onSubmit={handleSettingsSubmit} className="space-y-6">
        {/* Profile Settings */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium mb-4">Profile Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={settings.fullName}
                onChange={(e) => handleSettingChange('fullName', e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <select 
                value={settings.department}
                onChange={(e) => handleSettingChange('department', e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="Water Supply">Water Supply</option>
                <option value="Property Tax">Property Tax</option>
                <option value="Public Health">Public Health</option>
                <option value="Building Permissions">Building Permissions</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Email Notifications</h4>
                <p className="text-sm text-gray-500">Receive updates via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.emailNotifications}
                  onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Forum Notifications</h4>
                <p className="text-sm text-gray-500">Get notified about forum activities</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.forumNotifications}
                  onChange={(e) => handleSettingChange('forumNotifications', e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button 
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'overview' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'settings' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Settings
          </button>
        </div>

        {/* Content */}
        {activeTab === 'settings' ? renderSettings() : renderOverview()}

        {/* Task Modal */}
        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          onSubmit={handleAddTask}
        />
      </div>
    </div>
  )
}

export default Dashboard