import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { useUser } from '@clerk/clerk-react'
import 'leaflet/dist/leaflet.css'
import 'leaflet.fullscreen/Control.FullScreen.css'
import L from 'leaflet'
import 'leaflet.fullscreen'

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Department data
const departments = [
  { name: 'Water Supply', color: '#4299E1' },
  { name: 'Property Tax', color: '#48BB78' },
  { name: 'Public Health', color: '#F56565' },
  { name: 'Building Permissions', color: '#ECC94B' },
  { name: 'Waste Management', color: '#9F7AEA' },
  { name: 'Urban Planning', color: '#667EEA' },
  { name: 'Environmental', color: '#ED64A6' },
  { name: 'Traffic Control', color: '#F6AD55' }
]

// Initial work locations
const initialWorkLocations = [
  {
    department: 'Public Works',
    color: '#FF0000',
    location: [21.2514, 81.6296],
    work: 'Road Construction',
    status: 'In Progress',
    completion: '60%'
  },
  {
    department: 'Water Resources',
    color: '#0000FF',
    location: [21.2489, 81.6382],
    work: 'Pipeline Installation',
    status: 'Ongoing',
    completion: '45%'
  },
  {
    department: 'Urban Planning',
    color: '#008000',
    location: [21.2431, 81.6297],
    work: 'Park Development',
    status: 'Starting',
    completion: '10%'
  },
  {
    department: 'Environmental',
    color: '#FFA500',
    location: [21.2456, 81.6341],
    work: 'Waste Management',
    status: 'In Progress',
    completion: '75%'
  }
]

// Map click handler component
const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => onMapClick(e)
  })
  return null
}

const HeroSection = () => {
  const [showMap, setShowMap] = useState(true)
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [workLocations, setWorkLocations] = useState(initialWorkLocations)
  const [isPinMode, setIsPinMode] = useState(false)
  const [newWorkLocation, setNewWorkLocation] = useState(null)
  const navigate = useNavigate()
  const { isSignedIn } = useUser()

  // Raipur coordinates
  const raipurPosition = [21.2514, 81.6296]

  // Custom marker icon creator
  const createCustomIcon = (color) => {
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        background-color: ${color};
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 0 4px rgba(0,0,0,0.4);
      "></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
      popupAnchor: [0, -10],
    })
  }

  // Handle map click for adding new work location
  const handleMapClick = (e) => {
    if (isPinMode) {
      setNewWorkLocation({
        department: departmentFilter,
        color: departments.find(d => d.name === departmentFilter)?.color || '#666666',
        location: [e.latlng.lat, e.latlng.lng],
        work: '',
        status: 'Planning',
        completion: '0%'
      })
    }
  }

  // Handle saving new work location
  const handleSaveLocation = () => {
    if (newWorkLocation && newWorkLocation.work.trim()) {
      setWorkLocations([...workLocations, newWorkLocation])
      setNewWorkLocation(null)
      setIsPinMode(false)
    }
  }

  // Filter work locations
  const filteredLocations = workLocations.filter(work => 
    departmentFilter === 'all' || work.department === departmentFilter
  )

  return (
    <div className="bg-gradient-to-r from-[#1a237e] to-[#0d47a1] text-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
          Welcome to Raipur Municipal Corporation
        </h1>
        <p className="text-2xl mb-12">Serving the citizens of Raipur with dedication and excellence</p>
        
        {isSignedIn && showMap && (
          <div className="relative mt-8 bg-white rounded-lg overflow-hidden" style={{ height: '400px' }}>
            {/* Close Button */}
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setShowMap(false)}
                className="p-2 bg-white rounded-md shadow-md hover:bg-gray-100 transition-colors"
                title="Close Map"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <MapContainer 
              center={raipurPosition} 
              zoom={13} 
              style={{ height: '100%', width: '100%' }}
              fullscreenControl={true}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              
              <MapClickHandler onMapClick={handleMapClick} />

              {filteredLocations.map((work, index) => (
                <Marker
                  key={index}
                  position={work.location}
                  icon={createCustomIcon(work.color)}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-bold text-lg mb-1">{work.department}</h3>
                      <p className="text-sm text-gray-600 mb-1">Work: {work.work}</p>
                      <p className="text-sm text-gray-600 mb-1">Status: {work.status}</p>
                      <div className="mt-2">
                        <div className="text-xs text-gray-500 mb-1">Completion: {work.completion}</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="rounded-full h-2 transition-all duration-500"
                            style={{ 
                              width: work.completion,
                              backgroundColor: work.color 
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {newWorkLocation && (
                <Marker
                  position={newWorkLocation.location}
                  icon={createCustomIcon(newWorkLocation.color)}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-bold text-lg mb-1">New Work Location</h3>
                      <select
                        value={newWorkLocation.department}
                        onChange={(e) => {
                          const dept = departments.find(d => d.name === e.target.value)
                          setNewWorkLocation({
                            ...newWorkLocation,
                            department: e.target.value,
                            color: dept?.color || '#666666'
                          })
                        }}
                        className="w-full p-1 border rounded mb-2 text-gray-700"
                      >
                        <option value="">Select Department</option>
                        {departments.map((dept, index) => (
                          <option key={index} value={dept.name}>
                            {dept.name}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        placeholder="Work Description"
                        className="w-full p-1 border rounded mb-2"
                        value={newWorkLocation.work}
                        onChange={(e) => setNewWorkLocation({
                          ...newWorkLocation,
                          work: e.target.value
                        })}
                      />
                      <select
                        value={newWorkLocation.status}
                        onChange={(e) => setNewWorkLocation({
                          ...newWorkLocation,
                          status: e.target.value
                        })}
                        className="w-full p-1 border rounded mb-2 text-gray-700"
                      >
                        <option value="Planning">Planning</option>
                        <option value="Starting">Starting</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                      </select>
                      <button
                        onClick={handleSaveLocation}
                        disabled={!newWorkLocation.department || !newWorkLocation.work.trim()}
                        className="w-full bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 
                        disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        Save Location
                      </button>
                    </div>
                  </Popup>
                </Marker>
              )}
            </MapContainer>

            {/* Controls Panel */}
            <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-md z-[1000] min-w-[200px]">
              <div className="flex flex-col gap-4">
                {/* Department Filter */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Filter Departments</h4>
                  <select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="w-full p-2 bg-blue-700 text-white rounded-md shadow-lg border border-blue-800
                    focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer font-medium"
                  >
                    <option value="all" className="bg-white text-gray-700">All Departments</option>
                    {departments.map((dept, index) => (
                      <option key={index} value={dept.name} className="bg-white text-gray-700">
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Pin Mode Toggle */}
                <div>
                  <button
                    onClick={() => setIsPinMode(!isPinMode)}
                    className={`w-full p-2 rounded-md shadow-md transition-colors ${
                      isPinMode 
                        ? 'bg-red-500 text-white hover:bg-red-600' 
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    {isPinMode ? 'Cancel Pinning' : 'Pin New Location'}
                  </button>
                </div>

                {/* Active Departments */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Active Departments</h4>
                  {filteredLocations.map((work, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: work.color }}
                      />
                      <span>{work.department}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HeroSection