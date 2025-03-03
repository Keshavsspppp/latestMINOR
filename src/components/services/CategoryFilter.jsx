import React from 'react'

const CategoryFilter = ({ activeCategory, setActiveCategory, categories }) => {
  return (
    <div className="mb-12 overflow-x-auto">
      <div className="flex flex-nowrap justify-start md:justify-center gap-4 pb-4">
        <button 
          onClick={() => setActiveCategory('All')}
          className={`px-6 py-2 rounded-full whitespace-nowrap transition-colors ${
            activeCategory === 'All' 
              ? 'bg-blue-800 text-white' 
              : 'bg-white text-blue-800 hover:bg-gray-100'
          }`}
        >
          All Services
        </button>
        {Object.keys(categories).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-full whitespace-nowrap transition-colors ${
              activeCategory === category 
                ? 'bg-blue-800 text-white' 
                : 'bg-white text-blue-800 hover:bg-gray-100'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryFilter