import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useUser } from '@clerk/clerk-react'

// Initial announcements data
const initialAnnouncements = [
  {
    id: 1,
    title: "Property Tax Due Date Extended",
    date: "2024-02-15",
    description: "Last date for property tax payment has been extended to March 31st, 2024. This extension applies to all residential and commercial properties within the municipal limits. Property owners are requested to clear their dues before the revised deadline to avoid any penalties.",
    category: "taxes",
    ward: 12,
    contactInfo: "Property Tax Department: 1800-123-4567",
    documents: ["Property ID", "Previous Tax Receipts", "Identity Proof"],
    validityPeriod: "Until March 31st, 2024"
  },
  {
    id: 2,
    title: "New Water Connection Applications",
    date: "2024-02-10",
    description: "Online applications for new water connections are now being accepted. The new digital system aims to streamline the application process and reduce processing time.",
    category: "services",
    ward: 5,
    contactInfo: "Water Department: 1800-234-5678",
    documents: ["Property Documents", "ID Proof", "Address Proof"],
    validityPeriod: "Open"
  },
  // ... other announcements
]

const categories = [
  { id: 'all', label: 'All' },
  { id: 'important', label: 'Priority', color: 'red' },
  { id: 'taxes', label: 'Taxes', color: 'green' },
  { id: 'services', label: 'Services', color: 'blue' },
  { id: 'events', label: 'Events', color: 'purple' }
]

const Announcements = () => {
  const { isSignedIn, user } = useUser()
  const [filter, setFilter] = useState('all')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [expandedId, setExpandedId] = useState(null)
  const [announcements, setAnnouncements] = useState(initialAnnouncements)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'events',
    ward: '',
    contactInfo: '',
    documents: '',
    validityPeriod: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newAnnouncement = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      ...formData,
      documents: formData.documents.split(',').map(doc => doc.trim()),
      author: user?.fullName || 'Admin'
    }
    setAnnouncements([newAnnouncement, ...announcements])
    setIsFormOpen(false)
    setFormData({
      title: '',
      description: '',
      category: 'events',
      ward: '',
      contactInfo: '',
      documents: '',
      validityPeriod: ''
    })
  }

  const handleDeleteAnnouncement = (id) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id))
    if (expandedId === id) setExpandedId(null)
  }

  const toggleReadMore = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const filteredAnnouncements = filter === 'all' 
    ? announcements 
    : announcements.filter(a => a.category === filter)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl font-bold text-center sm:text-left"
            >
              Municipal Announcements
            </motion.h1>
            {isSignedIn && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setIsFormOpen(true)}
                className="bg-white text-blue-800 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Add Announcement
              </motion.button>
            )}
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl opacity-90 max-w-2xl text-center sm:text-left"
          >
            Stay informed about the latest updates and developments in our city
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Add Announcement Form */}
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 bg-white p-6 rounded-xl shadow-lg border border-gray-100"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Add New Announcement</h2>
              <button 
                onClick={() => setIsFormOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    {categories.filter(cat => cat.id !== 'all').map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Ward Number</label>
                  <input
                    type="number"
                    name="ward"
                    value={formData.ward}
                    onChange={handleChange}
                    min="1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Contact Information</label>
                  <input
                    type="text"
                    name="contactInfo"
                    value={formData.contactInfo}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Required Documents (comma-separated)</label>
                  <input
                    type="text"
                    name="documents"
                    value={formData.documents}
                    onChange={handleChange}
                    placeholder="Aadhar Card, Pan Card, etc."
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Validity Period</label>
                  <input
                    type="text"
                    name="validityPeriod"
                    value={formData.validityPeriod}
                    onChange={handleChange}
                    placeholder="e.g., Until March 31st, 2024"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Announcement
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-3 rounded-full capitalize transition-all duration-200 font-medium shadow-sm
                ${filter === category.id 
                  ? 'bg-blue-600 text-white shadow-blue-200' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 hover:shadow-md'}`}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        {/* Announcements Grid */}
        <motion.div layout className="grid gap-8">
          {filteredAnnouncements.map((announcement) => (
            <motion.div 
              key={announcement.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    {announcement.category === 'important' && (
                      <span className="bg-red-100 text-red-600 text-xs px-3 py-1.5 rounded-full font-medium">
                        Priority
                      </span>
                    )}
                    <span className="text-sm text-gray-500 font-medium">
                      {new Date(announcement.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    {announcement.ward && (
                      <span className="text-sm text-gray-500 font-medium">
                        Ward {announcement.ward}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {announcement.title}
                  </h3>
                  <div className="relative">
                    <p className={`text-gray-600 leading-relaxed mb-4 ${expandedId !== announcement.id && 'line-clamp-3'}`}>
                      {announcement.description}
                    </p>
                    {expandedId === announcement.id && (
                      <div className="mt-4 space-y-4">
                        {announcement.contactInfo && (
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">Contact Information</h4>
                            <p className="text-gray-600">{announcement.contactInfo}</p>
                          </div>
                        )}
                        {announcement.documents && announcement.documents.length > 0 && (
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">Required Documents</h4>
                            <ul className="list-disc list-inside text-gray-600">
                              {announcement.documents.map((doc, index) => (
                                <li key={index}>{doc}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {announcement.validityPeriod && (
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">Validity Period</h4>
                            <p className="text-gray-600">{announcement.validityPeriod}</p>
                          </div>
                        )}
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                          <h5 className="font-medium mb-2">Important Notes:</h5>
                          <ul className="list-disc list-inside space-y-1 text-gray-700">
                            <li>Keep all required documents ready before visiting</li>
                            <li>For urgent queries, contact the respective department</li>
                            <li>Reference Number: RMC-{new Date(announcement.date).getFullYear()}-{announcement.id}</li>
                          </ul>
                        </div>
                      </div>
                    )}
                    <button 
                      onClick={() => toggleReadMore(announcement.id)}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      {expandedId === announcement.id ? 'Show Less' : 'Read More'}
                      <svg 
                        className={`w-4 h-4 transform transition-transform ${
                          expandedId === announcement.id ? 'rotate-180' : ''
                        }`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default Announcements