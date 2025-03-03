import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const Distribution = () => {
  const [workloadData, setWorkloadData] = useState({
    labels: ['Water Supply', 'Property Tax', 'Public Health', 'Building Permissions', 'Waste Management'],
    datasets: [{
      label: 'Active Tasks',
      data: [12, 8, 15, 6, 10],
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
    }]
  })

  const [departmentEfficiency, setDepartmentEfficiency] = useState([
    { department: 'Water Supply', completed: 45, total: 50, efficiency: 90 },
    { department: 'Property Tax', completed: 38, total: 40, efficiency: 95 },
    { department: 'Public Health', completed: 28, total: 35, efficiency: 80 },
    { department: 'Building Permissions', completed: 20, total: 25, efficiency: 80 },
    { department: 'Waste Management', completed: 30, total: 32, efficiency: 94 },
  ])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Task Distribution</h1>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Department Workload</h2>
              <Bar data={workloadData} />
            </div>

            <div className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Department Efficiency</h2>
              <div className="space-y-4">
                {departmentEfficiency.map((dept) => (
                  <div key={dept.department} className="border-b pb-2">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{dept.department}</span>
                      <span className="text-blue-600">{dept.efficiency}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${dept.efficiency}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {dept.completed} / {dept.total} tasks completed
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Distribution