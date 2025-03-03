import React from 'react'
import { Link } from 'react-router-dom'

const LatestAnnouncements = () => {
  const announcements = [
    {
      id: 1,
      title: "Property Tax Due Date Extended",
      date: "2024-02-15",
      description: "Last date for property tax payment has been extended to March 31st, 2024"
    },
    {
      id: 2,
      title: "New Water Connection Applications",
      date: "2024-02-10",
      description: "Online applications for new water connections are now being accepted"
    },
    {
      id: 3,
      title: "City Cleanliness Drive",
      date: "2024-02-08",
      description: "Join the weekend cleanliness drive in your ward"
    }
  ]

  return (
    // Update the card and text colors
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-lg shadow-md h-full border border-blue-100">
      <div className="p-4 border-b border-blue-200">
        <h2 className="text-xl font-semibold text-[#1a237e]">Latest Announcements</h2>
      </div>
      <div className="divide-y divide-blue-100">
        {announcements.map((announcement) => (
          <div 
            key={announcement.id} 
            className="p-4 hover:bg-blue-50/50 transition-colors"
          >
            <h3 className="font-medium text-[#0d47a1]">{announcement.title}</h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {announcement.description}
            </p>
            <span className="text-xs text-gray-500 mt-2 block">
              {new Date(announcement.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-blue-200">
        <Link 
          to="/announcements" 
          className="text-[#1a237e] hover:text-[#0d47a1] font-medium text-sm flex items-center"
        >
          View All Announcements
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default LatestAnnouncements