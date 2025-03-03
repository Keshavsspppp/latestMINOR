import React from 'react'

const Statistics = () => {
  const stats = [
    { number: '2M+', label: 'Citizens Served' },
    { number: '150+', label: 'Online Services' },
    { number: '24/7', label: 'Support' },
    { number: '95%', label: 'Resolution Rate' },
  ]

  return (
    // Update the background and text colors
    <div className="mt-12 p-8 bg-gradient-to-r from-[#1a237e] to-[#0d47a1] rounded-lg text-white shadow-xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <div key={index} className="p-4 backdrop-blur-sm bg-white/10 rounded-lg">
            <div className="text-3xl font-bold mb-2 text-blue-200">{stat.number}</div>
            <div className="text-blue-100">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Statistics