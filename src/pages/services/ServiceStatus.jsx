import React from 'react'
import { useUser } from '@clerk/clerk-react'

const ServiceStatus = () => {
  const { user } = useUser()

  const mockApplications = [
    {
      id: 1,
      service: "Property Tax",
      status: "In Progress",
      submittedDate: "2024-01-15",
      expectedCompletion: "2024-01-18"
    },
    {
      id: 2,
      service: "Water Supply",
      status: "Pending",
      submittedDate: "2024-01-14",
      expectedCompletion: "2024-01-21"
    }
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Application Status</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="divide-y divide-gray-200">
          {mockApplications.map((application) => (
            <div key={application.id} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{application.service}</h3>
                  <p className="text-sm text-gray-500">Submitted on: {application.submittedDate}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  application.status === 'In Progress' 
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {application.status}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">Expected completion: {application.expectedCompletion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServiceStatus