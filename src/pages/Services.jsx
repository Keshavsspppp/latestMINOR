import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ServiceCard from '../components/services/ServiceCard'
import CategoryFilter from '../components/services/CategoryFilter'
import SearchBar from '../components/services/SearchBar'
import ServicesHeader from '../components/services/ServicesHeader'
import { serviceData } from '../data/serviceData'

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  // Update the serviceCategories object with more categories
  const serviceCategories = {
    'Utilities': ['Property Tax', 'Water Supply', 'Electricity', 'Gas Connection', 'Internet Services'],
    'Certificates': ['Birth Certificate', 'Death Certificate', 'Marriage Certificate', 'Domicile Certificate', 'Income Certificate', 'Caste Certificate'],
    'Permissions': ['Building Permission', 'Shop License', 'Event Permission', 'Restaurant License', 'Trade License', 'Advertisement Permission'],
    'Health': ['Public Health', 'Waste Management', 'Sanitation', 'Vaccination Centers', 'Health Camps', 'Medical Emergency'],
    'Infrastructure': ['Road Maintenance', 'Street Lighting', 'Parks & Gardens', 'Public Transport', 'Drainage System', 'Public Toilets'],
    'Education': ['School Admission', 'Scholarship Programs', 'Skill Development', 'Library Services'],
    'Social Welfare': ['Senior Citizen Services', 'Disability Support', 'Women Empowerment', 'Child Care'],
    'Emergency': ['Fire Services', 'Disaster Management', 'Ambulance Services', 'Police Emergency']
  }

  const handleServiceClick = (serviceId) => {
    navigate(`/services/${serviceId}`)
  }

  const filterServices = () => {
    return serviceData.filter(service => {
      const matchesCategory = activeCategory === 'All' || 
        serviceCategories[activeCategory]?.includes(service.title)
      const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ServicesHeader />

        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <CategoryFilter 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categories={serviceCategories}
        />

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filterServices().map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onClick={() => handleServiceClick(service.id)}
            />
          ))}
        </motion.div>

        {filterServices().length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-600">
              No services found matching your criteria
            </h3>
          </div>
        )}
      </div>
    </div>
  )
}

export default Services