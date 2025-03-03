import React, { useState } from 'react'
import { useUser } from '@clerk/clerk-react'

const Forum = () => {
  const { user } = useUser()
  const [selectedDepartment, setSelectedDepartment] = useState(null)
  const [newPost, setNewPost] = useState('')
  // Add discussions to state
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      title: "Inter-department Coordination Meeting",
      author: "John Doe",
      department: "Water Supply",
      content: "Discussion about coordinating water supply during road repairs",
      replies: 15,
      timestamp: "2 hours ago",
      tags: ["coordination", "planning"]
    }
  ])

  const departments = [
    { id: 1, name: 'Water Supply', color: 'bg-blue-100' },
    { id: 2, name: 'Property Tax', color: 'bg-green-100' },
    { id: 3, name: 'Public Health', color: 'bg-red-100' },
    { id: 4, name: 'Building Permissions', color: 'bg-yellow-100' },
    { id: 5, name: 'Waste Management', color: 'bg-purple-100' }
  ]

  const handlePostSubmit = (e) => {
    e.preventDefault()
    
    // Create new discussion object
    const newDiscussion = {
      id: discussions.length + 1,
      title: newPost.split('\n')[0] || 'New Discussion', // First line as title
      author: user?.fullName || 'Anonymous',
      department: selectedDepartment,
      content: newPost,
      replies: 0,
      timestamp: "Just now",
      tags: ["new"], // You can modify this as needed
    }

    // Add new discussion to the beginning of the list
    setDiscussions(prevDiscussions => [newDiscussion, ...prevDiscussions])

    // Reset form
    setNewPost('')
    setSelectedDepartment(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Inter-Department Forum</h1>
          <p className="mt-2 text-gray-600">Collaborate and communicate across departments</p>
        </div>

        {/* Create New Post */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Start a Discussion</h2>
          <form onSubmit={handlePostSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Department(s)
              </label>
              <select
                className="w-full p-2 border rounded-md"
                onChange={(e) => setSelectedDepartment(e.target.value)}
                required
              >
                <option value="">Select department</option>
                <option value="all">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Message
              </label>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="w-full p-3 border rounded-md min-h-[100px]"
                placeholder="Type your message here..."
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Post Discussion
            </button>
          </form>
        </div>

        {/* Department Quick Access */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {departments.map((dept) => (
            <div 
              key={dept.id} 
              className={`${dept.color} p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
              onClick={() => setSelectedDepartment(dept.name)}
            >
              <h3 className="text-xl font-semibold text-gray-900">{dept.name}</h3>
              <p className="text-gray-600 mt-2">View department discussions</p>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <span>12 active members</span>
                <span className="mx-2">•</span>
                <span>5 topics today</span>
              </div>
            </div>
          ))}
        </div>

        {/* Discussions List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Recent Discussions</h2>
            <div className="flex gap-2">
              <select className="border rounded-md px-3 py-1">
                <option>All Departments</option>
                {departments.map((dept) => (
                  <option key={dept.id}>{dept.name}</option>
                ))}
              </select>
              <select className="border rounded-md px-3 py-1">
                <option>Most Recent</option>
                <option>Most Active</option>
                <option>Unanswered</option>
              </select>
            </div>
          </div>

          <div className="divide-y">
            {discussions.map((discussion) => (
              <div key={discussion.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start space-x-3">
                  <img 
                    src={user?.profileImageUrl || 'default-avatar.png'} 
                    alt="User" 
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      {discussion.title}
                    </h3>
                    <p className="mt-1 text-gray-600">{discussion.content}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {discussion.department}
                      </span>
                      {discussion.tags.map((tag) => (
                        <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          #{tag}
                        </span>
                      ))}
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-500">{discussion.timestamp}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-500">{discussion.replies} replies</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Forum