import React from 'react'
import { Link } from 'react-router-dom'

const QuickAccess = () => {
  const services = [
    { title: 'Pay Property Tax', icon: '🏠' },
    { title: 'Water Bill', icon: '💧' },
    { title: 'Birth Certificate', icon: '📜' },
    { title: 'Lodge Complaint', icon: '📝' },
  ]

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Access</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {services.map((service, index) => (
          <Link
            key={index}
            to="/services"
            className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <span className="text-2xl mr-3">{service.icon}</span>
            <span className="font-medium text-gray-900">{service.title}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default QuickAccess