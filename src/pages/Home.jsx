
import React from 'react'
import { Link } from 'react-router-dom'
import LatestAnnouncements from '../components/LatestAnnouncements'
import HeroSection from '../components/HeroSection'
import QuickAccess from '../components/QuickAccess'
import Statistics from '../components/Statistics'

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />

      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuickAccess />
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Service Cards */}
                <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">Online Services</h3>
                  <p className="text-gray-600 mb-4">Access municipal services from the comfort of your home.</p>
                  <Link to="/services" className="text-blue-600 hover:text-blue-800">Learn More →</Link>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">City Development</h3>
                  <p className="text-gray-600 mb-4">Learn about ongoing and upcoming development projects.</p>
                  <Link to="/services" className="text-blue-600 hover:text-blue-800">View Projects →</Link>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">Public Services</h3>
                  <p className="text-gray-600 mb-4">Information about various public services and facilities.</p>
                  <Link to="/services" className="text-blue-600 hover:text-blue-800">Explore →</Link>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">Citizen Portal</h3>
                  <p className="text-gray-600 mb-4">Access citizen-centric services and information.</p>
                  <Link to="/services" className="text-blue-600 hover:text-blue-800">Visit Portal →</Link>
                </div>
              </div>

              <Statistics />
            </div>

            <div className="lg:w-80">
              <LatestAnnouncements />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home