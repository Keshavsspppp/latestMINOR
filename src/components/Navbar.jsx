import { Link } from 'react-router-dom'
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react'
import { useState } from 'react'

const Navbar = () => {
  const { isSignedIn } = useUser()
  const [isMenuOpen, setIsMenuOpen] = useState(false) // Add this state

  return (
    <nav className="bg-gradient-to-r from-indigo-800 to-blue-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
            <img src="/LOGO.png" alt="RMC Logo" className="h-16 w-auto" />
            <div>
              <span className="font-bold text-2xl tracking-tight">RMC</span>
              <p className="text-xs text-blue-100">Raipur Municipal Corporation</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className="px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">Home</Link>
            <Link to="/services" className="px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">Services</Link>
            <Link 
              to="/about" 
              className="px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              {isSignedIn ? 'Projects' : 'About'}
            </Link>
            <Link to="/contact" className="px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">Contact</Link>
            <Link to="/announcements" className="px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">Announcements</Link>
            <SignedIn>
              <Link to="/dashboard" className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-500 transition-colors ml-2">
                Dashboard
              </Link>
              <Link to="/forum" className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 transition-colors">
                Forum
              </Link>
              <div className="relative group">
                <button className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-500 transition-colors flex items-center">
                  Task Management
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link to="/tasks/create" className="block px-4 py-2 text-gray-800 hover:bg-purple-50">Create Task</Link>
                  <Link to="/tasks/schedule" className="block px-4 py-2 text-gray-800 hover:bg-purple-50">Schedule</Link>
                  <Link to="/tasks/distribution" className="block px-4 py-2 text-gray-800 hover:bg-purple-50">Work Distribution</Link>
                  <Link to="/tasks/reports" className="block px-4 py-2 text-gray-800 hover:bg-purple-50">Reports</Link>
                </div>
              </div>
            </SignedIn>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <SignedIn>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-10 h-10 border-2 border-white"
                  }
                }}
              />
            </SignedIn>
            <SignedOut>
              <Link
                to="/sign-in"
                className="px-4 py-2 rounded-md bg-white text-blue-800 hover:bg-blue-50 transition-colors font-medium"
              >
                Sign in
              </Link>
              <Link
                to="/sign-up"
                className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 transition-colors font-medium"
              >
                Sign up
              </Link>
            </SignedOut>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden p-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link to="/" className="block px-4 py-2 hover:bg-blue-600 transition-colors">Home</Link>
            <Link to="/services" className="block px-4 py-2 hover:bg-blue-600 transition-colors">Services</Link>
            <Link 
              to="/about" 
              className="block px-4 py-2 hover:bg-blue-600 transition-colors"
            >
              {isSignedIn ? 'Projects' : 'About'}
            </Link>
            <Link to="/contact" className="block px-4 py-2 hover:bg-blue-600 transition-colors">Contact</Link>
            <Link to="/announcements" className="block px-4 py-2 hover:bg-blue-600 transition-colors">Announcements</Link>
            
            <SignedIn>
              <Link to="/dashboard" className="block px-4 py-2 hover:bg-green-600 transition-colors">Dashboard</Link>
              <Link to="/forum" className="block px-4 py-2 hover:bg-indigo-600 transition-colors">Forum</Link>
            </SignedIn>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar