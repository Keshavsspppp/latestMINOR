import React from 'react'
import { motion } from 'framer-motion'

const ServiceCard = ({ service, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-md p-8 cursor-pointer"
      onClick={onClick}
    >
      <div className="text-blue-800 mb-4">
        {service.icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
      <p className="text-gray-600 mb-4">{service.description}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className={`px-3 py-1 rounded-full text-sm ${
          service.status === 'Available' 
            ? 'bg-green-100 text-green-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {service.status}
        </span>
        <span className="text-blue-800">
          View Details →
        </span>
      </div>
    </motion.div>
  )
}

export default ServiceCard