import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
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

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showMap, setShowMap] = useState(true)
  const navigate = useNavigate()
  const { isSignedIn } = useUser()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleCloseMap = () => {
    setShowMap(false)
  }

  // Raipur coordinates
  const raipurPosition = [21.2514, 81.6296]

  // Department work locations with their specific colors and details
  const departmentWorks = [
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

  // Custom marker icon creator
  // Remove the default marker icon fix since we're not using it
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

  return (
    <div className="bg-[#2045DB] text-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold mb-6">Welcome to Raipur Municipal Corporation</h1>
        <p className="text-2xl mb-12">Serving the citizens of Raipur with dedication and excellence</p>
        
        {isSignedIn && showMap && (
          <div className="relative mt-8 bg-white rounded-lg overflow-hidden" style={{ height: '400px' }}>
            {/* Close Button */}
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={handleCloseMap}
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
              
              {departmentWorks.map((work, index) => (
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
                          ></div>
                        </div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white p-2 rounded-lg shadow-md z-[1000]">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Departments</h4>
              {departmentWorks.map((work, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: work.color }}
                  ></div>
                  <span>{work.department}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HeroSection