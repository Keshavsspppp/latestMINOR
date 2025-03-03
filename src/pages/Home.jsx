
import React from 'react'
import { Link } from 'react-router-dom'
import LatestAnnouncements from '../components/LatestAnnouncements'
import HeroSection from '../components/HeroSection'
import QuickAccess from '../components/QuickAccess'
import Statistics from '../components/Statistics'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <HeroSection />
    
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuickAccess />
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Service Cards */}
                <div className="p-6 bg-gradient-to-br from-purple-50 to-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-purple-100 group">
                  <h3 className="text-xl font-semibold mb-2 text-purple-900">Online Services</h3>
                  <p className="text-gray-600 mb-4">Access municipal services from the comfort of your home.</p>
                  <Link to="/services" className="text-teal-600 hover:text-teal-800 group-hover:translate-x-2 transition-transform inline-flex items-center">
                    Learn More 
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                {/* Apply similar styles to other service cards */}
                <div className="p-6 bg-gradient-to-br from-teal-50 to-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-teal-100 group">
                  <h3 className="text-xl font-semibold mb-2 text-teal-900">City Development</h3>
                  <p className="text-gray-600 mb-4">Learn about ongoing and upcoming development projects.</p>
                  <Link to="/services" className="text-purple-600 hover:text-purple-800 group-hover:translate-x-2 transition-transform inline-flex items-center">
                    View Projects 
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                {/* Continue with similar styling for other cards */}
              </div>
    
              <Statistics />
            </div>
    
            <div className="lg:w-96">
              <LatestAnnouncements />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home