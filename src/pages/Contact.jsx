
import React, { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { motion } from 'framer-motion'
import { complaintsApi } from '../services/complaintsApi'


const Contact = () => {
  const { isSignedIn, user } = useUser()
  const [complaints, setComplaints] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    complaintType: '',
    location: '',
    message: '',
    image: null
  })
  const [previewUrl, setPreviewUrl] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({ ...formData, image: file })
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const [userComplaints, setUserComplaints] = useState([])
  
  // Modify the handleSubmit functionbe a Add this effect to load complaints from localStorage when component mounts
  // Remove this useEffect
  useEffect(() => {
    const storedComplaints = localStorage.getItem('complaints')
    if (storedComplaints) {
      setComplaints(JSON.parse(storedComplaints))
    }
  }, [])
  
  // Modify the handleSubmit function to store complaints in localStorage
  // Modify the handleSubmit function to store image as base64
  // Replace the useEffect for loading complaints
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const fetchedComplaints = await complaintsApi.getAllComplaints(user?.id)
        setComplaints(fetchedComplaints)
      } catch (error) {
        console.error('Error fetching complaints:', error)
      }
    }
  
    if (isSignedIn) {
      fetchComplaints()
    }
  }, [isSignedIn, user?.id])
  
  // Update the handleSubmit function
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Convert image to base64 before storing
    const processComplaint = async () => {
      try {
        let imageData = null
        if (formData.image) {
          const reader = new FileReader()
          imageData = await new Promise((resolve) => {
            reader.onloadend = () => resolve(reader.result)
            reader.readAsDataURL(formData.image)
          })
        }
  
        const complaintData = {
          ...formData,
          image: imageData,
          status: 'Pending',
          date: new Date().toISOString(),
          userId: user?.id,
          userName: user?.fullName,
          userEmail: user?.primaryEmailAddress?.emailAddress
        }
  
        const newComplaint = await complaintsApi.createComplaint(complaintData)
        setComplaints(prev => [newComplaint, ...prev])
  
        // Reset form
        setFormData({
          name: user?.fullName || '',
          email: user?.primaryEmailAddress?.emailAddress || '',
          complaintType: '',
          location: '',
          message: '',
          image: null
        })
        setPreviewUrl(null)
        setIsSubmitted(true)
        alert('Complaint submitted successfully!')
      } catch (error) {
        console.error('Error submitting complaint:', error)
        alert('Failed to submit complaint. Please try again.')
      }
    }
  
    processComplaint()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Complaint Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">Submit a Complaint</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="complaintType">Complaint Type</label>
                <select
                  id="complaintType"
                  value={formData.complaintType}
                  onChange={(e) => setFormData({ ...formData, complaintType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="infrastructure">Infrastructure</option>
                  <option value="sanitation">Sanitation</option>
                  <option value="water">Water Supply</option>
                  <option value="electricity">Electricity</option>
                  <option value="roads">Roads</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter the location of the issue"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="message">Complaint Details</label>
                <textarea
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Please describe your complaint in detail"
                  required
                ></textarea>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="image">
                  Attach Image (optional)
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {previewUrl && (
                  <div className="mt-4">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-w-xs rounded-md shadow-sm"
                    />
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="bg-blue-800 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Submit Complaint
              </button>
            </form>
          </div>

          {/* Guidelines and Information */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">Complaint Guidelines</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">How to Submit a Complaint</h3>
                <ul className="list-disc list-inside text-gray-600 ml-4">
                  <li>Provide accurate location details</li>
                  <li>Include clear photos of the issue if possible</li>
                  <li>Be specific in your complaint description</li>
                  <li>Include your correct contact information</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Processing Time</h3>
                <p className="text-gray-600">Complaints are typically processed within 48-72 hours</p>
              </div>
              <div>
                <h3 className="font-semibold">Emergency Contact</h3>
                <p className="text-gray-600">For emergencies, please call: +91 XXXX XXXXXX</p>
              </div>
              <div>
                <h3 className="font-semibold">Track Your Complaint</h3>
                <p className="text-gray-600">You will receive a tracking number via email once your complaint is submitted</p>
              </div>
            </div>
          </div>
        </div>

        {/* Complaints List Section */}
        {isSignedIn && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Your Complaints History</h2>
            {complaints.length > 0 ? (
              <div className="grid gap-6">
                {complaints.map((complaint) => (
                  <motion.div
                    key={complaint.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            complaint.status === 'Pending' 
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {complaint.status}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(complaint.date).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {complaint.complaintType}
                        </h3>
                        <p className="text-gray-600 mb-2">
                          <span className="font-medium">Location:</span> {complaint.location}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Description:</span> {complaint.message}
                        </p>
                      </div>
                      {complaint.image && (
                        <div className="w-full md:w-48 flex-shrink-0">
                          <img
                            src={complaint.image} // Use the base64 string directly
                            alt="Complaint"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <p className="text-gray-500">No complaints submitted yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Contact