import React from 'react'

const Statistics = () => {
  const stats = [
    { number: '2M+', label: 'Citizens Served' },
    { number: '150+', label: 'Online Services' },
    { number: '24/7', label: 'Support' },
    { number: '95%', label: 'Resolution Rate' },
  ]

  return (
    <div className="mt-12 p-8 bg-blue-800 rounded-lg text-white">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <div key={index}>
            <div className="text-3xl font-bold mb-2">{stat.number}</div>
            <div className="text-blue-100">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Statistics