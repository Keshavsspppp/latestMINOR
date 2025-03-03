import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { serviceData } from '../../data/serviceData'

const ServiceDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const service = serviceData.find(s => s.id === parseInt(id))

  if (!service) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Service not found</h1>
          <button 
            onClick={() => navigate('/services')}
            className="mt-4 text-blue-800 hover:text-blue-600"
          >
            Return to Services
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{service.title}</h1>
            <p className="text-gray-600 mb-6">{service.description}</p>
          </div>
          <div className="text-blue-800">
            {service.icon}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Processing Time</h3>
            <p className="text-gray-600">{service.processingTime}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Status</h3>
            <span className={`px-3 py-1 rounded-full text-sm ${
              service.status === 'Available' 
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {service.status}
            </span>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="font-semibold text-gray-900 mb-2">Requirements</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Valid ID proof</li>
            <li>Proof of residence</li>
            <li>Recent photograph</li>
            <li>Previous documents (if applicable)</li>
          </ul>
        </div>

        <div className="mt-8 flex gap-4">
          <button 
            onClick={() => navigate(`/services/${id}/apply`)}
            className="bg-blue-800 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Apply Now
          </button>
          <button 
            onClick={() => navigate('/services')}
            className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors"
          >
            Back to Services
          </button>
        </div>
      </div>
    </div>
  )
}

export default ServiceDetails