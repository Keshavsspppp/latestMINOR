import React, { useState, useEffect, useRef } from 'react'
import { useUser } from '@clerk/clerk-react'
import { motion } from 'framer-motion'
import { complaintsApi } from '../services/complaintsApi';

const Forum = () => {
  const { user } = useUser()
  const [selectedDepartment, setSelectedDepartment] = useState(null)
  const [newPost, setNewPost] = useState('')
  const [selectedDiscussion, setSelectedDiscussion] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const chatEndRef = useRef(null)
  
  const departments = [
    { id: 1, name: 'Water Supply', color: 'bg-blue-100' },
    { id: 2, name: 'Property Tax', color: 'bg-green-100' },
    { id: 3, name: 'Public Health', color: 'bg-red-100' },
    { id: 4, name: 'Building Permissions', color: 'bg-yellow-100' },
    { id: 5, name: 'Waste Management', color: 'bg-purple-100' },
    { id: 6, name: 'Urban Planning', color: 'bg-indigo-100' },
    { id: 7, name: 'Environmental', color: 'bg-pink-100' },
    { id: 8, name: 'Traffic Control', color: 'bg-orange-100' }
  ]

  // Add messages state
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      title: "Inter-department Coordination Meeting",
      author: "John Doe",
      department: "Water Supply",
      content: "Discussion about coordinating water supply during road repairs",
      replies: 15,
      timestamp: "2 hours ago",
      tags: ["coordination", "planning"],
      messages: [
        {
          id: 1,
          author: "John Doe",
          department: "Water Supply",
          content: "We need to coordinate the water supply shutdown during road repairs.",
          timestamp: "2 hours ago"
        },
        {
          id: 2,
          author: "Jane Smith",
          department: "Public Works",
          content: "I agree. Let's schedule a meeting to discuss the timeline.",
          timestamp: "1 hour ago"
        }
      ]
    }
  ])

  const handlePostSubmit = (e) => {
    e.preventDefault()
    if (!newPost.trim() || !selectedDepartment) return

    const newDiscussion = {
      id: discussions.length + 1,
      title: newPost.split('\n')[0] || 'New Discussion',
      author: user?.fullName || 'Anonymous',
      department: selectedDepartment,
      content: newPost,
      replies: 0,
      timestamp: "Just now",
      tags: ["new"],
      messages: [{
        id: 1,
        author: user?.fullName || 'Anonymous',
        department: selectedDepartment,
        content: newPost,
        timestamp: "Just now"
      }]
    }

    setDiscussions(prevDiscussions => [newDiscussion, ...prevDiscussions])
    setNewPost('')
    setSelectedDepartment(null)
  }

  // Scroll to bottom of chat when new messages are added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [selectedDiscussion])

  const handleMessageSubmit = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const updatedDiscussions = discussions.map(disc => {
      if (disc.id === selectedDiscussion.id) {
        return {
          ...disc,
          messages: [...disc.messages, {
            id: disc.messages.length + 1,
            author: user?.fullName || 'Anonymous',
            department: selectedDepartment || 'Unknown Department',
            content: newMessage,
            timestamp: "Just now"
          }],
          replies: disc.replies + 1
        }
      }
      return disc
    })

    setDiscussions(updatedDiscussions)
    setNewMessage('')
    setSelectedDiscussion(updatedDiscussions.find(d => d.id === selectedDiscussion.id))
  }

  // Add this after your existing JSX for discussions list
  const renderChat = () => {
    if (!selectedDiscussion) return null

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">{selectedDiscussion.title}</h3>
              <p className="text-sm text-gray-600">{selectedDiscussion.department}</p>
            </div>
            <button 
              onClick={() => setSelectedDiscussion(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {selectedDiscussion.messages.map(message => (
              <div 
                key={message.id}
                className={`flex ${message.author === user?.fullName ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] ${
                  message.author === user?.fullName 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                } rounded-lg p-3`}>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium">{message.author}</span>
                    <span className="text-sm opacity-75">({message.department})</span>
                  </div>
                  <p>{message.content}</p>
                  <span className="text-xs opacity-75 mt-1 block">
                    {message.timestamp}
                  </span>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Message Input */}
          <form onSubmit={handleMessageSubmit} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-md"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    )
  }

  // Modify your discussion items to be clickable
  const renderDiscussionItem = (discussion) => (
    <div 
      key={discussion.id} 
      className="p-6 hover:bg-gray-50 cursor-pointer"
      onClick={() => setSelectedDiscussion(discussion)}
    >
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
  )

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
            {discussions.map((discussion) => renderDiscussionItem({
              ...discussion,
              onClick: () => setSelectedDiscussion(discussion)
            }))}
          </div>
        </div>
      </div>
      {/* Add the chat modal */}
      {renderChat()}
    </div>
  )
}

export default Forum