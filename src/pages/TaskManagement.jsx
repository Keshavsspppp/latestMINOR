import React, { useState } from 'react'
import { motion } from 'framer-motion'
import CreateTask from './tasks/CreateTask'

const TaskManagement = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Road Construction Phase 1",
      type: "Inter-departmental",
      status: "In Progress",
      deadline: "2024-04-30",
      departments: ["Public Works", "Urban Planning", "Traffic Control"],
      progress: 35,
      assignedTo: "Public Works Department",
      priority: "high",
      description: "Phase 1 of city road expansion project"
    },
    {
      id: 2,
      title: "Water Treatment Plant Upgrade",
      type: "Multi-departmental",
      status: "Pending",
      deadline: "2024-05-15",
      departments: ["Water Resources", "Environmental", "Public Works"],
      progress: 0,
      assignedTo: "Water Resources Department",
      priority: "medium",
      description: "Upgrade of main water treatment facility"
    }
  ])

  const handleCreateTask = (newTaskData) => {
    const newTask = {
      id: tasks.length + 1,
      ...newTaskData,
      status: "Pending",
      progress: 0,
      assignedTo: newTaskData.departments[0] || "Unassigned"
    }
    setTasks([newTask, ...tasks])
    setIsCreateModalOpen(false)
  }

  const handleUpdateProgress = (taskId, newProgress) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            progress: newProgress,
            status: newProgress === 100 ? "Completed" : "In Progress"
          }
        : task
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Task Management</h1>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Create New Task
            </button>
          </div>
          
          {/* Task List */}
          <div className="space-y-4">
            {tasks.map(task => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                    <p className="text-sm text-gray-600">Assigned to: {task.assignedTo}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium
                      ${task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'}`}>
                      {task.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium
                      ${task.priority === 'high' ? 'bg-red-100 text-red-800' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'}`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                    </span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{task.progress}%</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          task.progress === 100 ? 'bg-green-600' : 'bg-blue-600'
                        }`}
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={task.progress}
                      onChange={(e) => handleUpdateProgress(task.id, parseInt(e.target.value))}
                      className="w-16 px-2 py-1 border rounded-md"
                    />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {task.departments.map(dept => (
                    <span key={dept} className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                      {dept}
                    </span>
                  ))}
                </div>

                <div className="mt-4 text-sm text-gray-600">
                  Deadline: {new Date(task.deadline).toLocaleDateString()}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Task Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-3xl w-full mx-4">
            <CreateTask
              onSubmit={handleCreateTask}
              onCancel={() => setIsCreateModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskManagement