import React from 'react'
import { useSearchParams } from 'react-router-dom'

const Search = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Search Results for "{query}"</h1>
        
        {/* Add your search results here */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">
            Implement your search functionality here based on the query: {query}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Search