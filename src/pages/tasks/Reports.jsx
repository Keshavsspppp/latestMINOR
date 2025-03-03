import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Line, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const Reports = () => {
  const [timeRange, setTimeRange] = useState('month')
  const [performanceData] = useState({
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Tasks Completed',
      data: [12, 19, 15, 25],
      borderColor: 'rgb(59, 130, 246)',
      tension: 0.1
    }]
  })

  const [taskStatus] = useState({
    labels: ['Completed', 'In Progress', 'Pending', 'Delayed'],
    datasets: [{
      data: [35, 25, 20, 10],
      backgroundColor: [
        'rgb(34, 197, 94)',
        'rgb(59, 130, 246)',
        'rgb(234, 179, 8)',
        'rgb(239, 68, 68)'
      ]
    }]
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Task Reports</h1>
            <select 
              className="border rounded-md px-3 py-1"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Performance Trend</h2>
              <Line data={performanceData} />
            </div>

            <div className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Task Status Overview</h2>
              <div className="w-3/4 mx-auto">
                <Doughnut data={taskStatus} />
              </div>
            </div>

            <div className="border rounded-lg p-4 md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Total Tasks', value: '90', change: '+12%' },
                  { label: 'Completion Rate', value: '85%', change: '+5%' },
                  { label: 'Avg. Response Time', value: '2.3 days', change: '-8%' },
                  { label: 'On-time Delivery', value: '92%', change: '+3%' }
                ].map((metric) => (
                  <div key={metric.label} className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">{metric.label}</div>
                    <div className="text-2xl font-bold mt-1">{metric.value}</div>
                    <div className={`text-sm mt-1 ${
                      metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.change}
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

export default Reports