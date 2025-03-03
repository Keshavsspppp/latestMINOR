import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">About Raipur Municipal Corporation</h1>
          <p className="text-xl opacity-90">Building a better future for our city</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="prose max-w-none">
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Raipur Municipal Corporation is dedicated to providing efficient civic services 
                  and ensuring the sustainable development of Raipur city. We strive to create 
                  a better living environment for all our citizens.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold text-blue-800 mb-4">Our Mission</h2>
                    <p className="text-gray-700">
                      To transform Raipur into a modern, sustainable, and citizen-friendly city 
                      while preserving its rich cultural heritage.
                    </p>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold text-green-800 mb-4">Our Vision</h2>
                    <p className="text-gray-700">
                      To become a model municipal corporation known for transparency, efficiency, 
                      and citizen-centric governance.
                    </p>
                  </div>
                </div>

                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Key Objectives</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: 'Quality Services', icon: '🏛️', desc: 'Provide quality civic services to citizens' },
                    { title: 'Sustainable Development', icon: '🌱', desc: 'Promote sustainable urban development' },
                    { title: 'Clean City', icon: '✨', desc: 'Maintain cleanliness and hygiene' },
                    { title: 'Infrastructure', icon: '🏗️', desc: 'Develop and maintain urban infrastructure' },
                    { title: 'Transparency', icon: '⚖️', desc: 'Ensure transparent and efficient administration' },
                    { title: 'Smart City', icon: '🌆', desc: 'Implement smart city initiatives' },
                  ].map((objective, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <span className="text-2xl">{objective.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{objective.title}</h3>
                        <p className="text-gray-600">{objective.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats & Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Facts</h3>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <p className="text-sm text-gray-500">Established</p>
                  <p className="text-lg font-medium">1867</p>
                </div>
                <div className="border-b pb-4">
                  <p className="text-sm text-gray-500">Population Served</p>
                  <p className="text-lg font-medium">2.5 Million+</p>
                </div>
                <div className="border-b pb-4">
                  <p className="text-sm text-gray-500">Area Covered</p>
                  <p className="text-lg font-medium">226 sq. km</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Number of Zones</p>
                  <p className="text-lg font-medium">10 Zones</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-md p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3">
                <p className="flex items-center">
                  <span className="mr-2">📍</span> Main Office, Gandhi Chowk, Raipur
                </p>
                <p className="flex items-center">
                  <span className="mr-2">📞</span> 0771-2535780
                </p>
                <p className="flex items-center">
                  <span className="mr-2">✉️</span> info@rmcraipur.gov.in
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About