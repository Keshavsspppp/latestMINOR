import { ClerkProvider, SignIn, SignUp, SignedIn } from '@clerk/clerk-react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import Contact from './pages/Contact'
import About from './pages/About'
import Announcements from './pages/Announcements'
import Forum from './pages/Forum'
import Dashboard from './pages/Dashboard'
import Search from './pages/Search'
import Projects from './pages/Projects'
import TaskManagement from './pages/TaskManagement'
import CreateTask from './pages/tasks/CreateTask'
import ServiceDetails from "./pages/services/ServiceDetails"
import ServiceApplication from "./pages/services/ServiceApplication"
import ServiceStatus from "./pages/services/ServiceStatus"
import Schedule from './pages/tasks/Schedule'
import Reports from './pages/tasks/Reports'
import Distribution from './pages/tasks/Distribution'

function App() {
  const { isSignedIn } = useUser()
  const appearance = {
    layout: {
      socialButtonsPlacement: "bottom",
      logoPlacement: "inside",
      logoImageUrl: "/logo.png",
    },
    elements: {
      formButtonPrimary: 
        "bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors",
      card: 
        "bg-white shadow-lg rounded-lg p-8",
      headerTitle: 
        "text-2xl font-bold text-gray-900",
      headerSubtitle: 
        "text-gray-600",
      socialButtonsBlockButton: 
        "border border-gray-300 hover:border-gray-400 rounded-md",
      formFieldInput: 
        "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent",
      footerActionLink: 
        "text-blue-800 hover:text-blue-600 font-semibold",
      dividerLine: 
        "bg-gray-200",
      dividerText: 
        "text-gray-500"
    }
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Services Routes */}
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetails />} />
            <Route
              path="/services/:id/apply"
              element={
                <SignedIn>
                  <ServiceApplication />
                </SignedIn>
              }
            />
            <Route
              path="/services/status"
              element={
                <SignedIn>
                  <ServiceStatus />
                </SignedIn>
              }
            />
            <Route path="/contact" element={<Contact />} />
            {isSignedIn ? (
              <Route path="/about" element={<Projects />} />
            ) : (
              <Route path="/about" element={<About />} />
            )}
            <Route path="/announcements" element={<Announcements />} />
            <Route
              path="/sign-in/*"
              element={
                <div className="max-w-md mx-auto px-4 py-12">
                  <SignIn 
                    appearance={appearance}
                    routing="path" 
                    path="/sign-in"
                    afterSignInUrl="/"
                    signUpUrl="/sign-up"
                  />
                </div>
              }
            />
            <Route
              path="/sign-up/*"
              element={
                <div className="max-w-md mx-auto px-4 py-12">
                  <SignUp 
                    appearance={appearance}
                    routing="path" 
                    path="/sign-up"
                    afterSignUpUrl="/"
                    signInUrl="/sign-in"
                  />
                </div>
              }
            />
            <Route
              path="/forum"
              element={
                <SignedIn>
                  <Forum />
                </SignedIn>
              }
            />
            <Route
              path="/dashboard"
              element={
                <SignedIn>
                  <Dashboard />
                </SignedIn>
              }
            />
            <Route path="/search" element={<Search />} />
            <Route
              path="/task-management"
              element={
                <SignedIn>
                  <TaskManagement />
                </SignedIn>
              }
            />
            <Route
              path="/tasks/create"
              element={
                <SignedIn>
                  <CreateTask />
                </SignedIn>
              }
            />
            <Route path="/tasks/schedule" element={<Schedule />} />
            <Route path="/tasks/reports" element={<Reports />} />
            <Route path="/tasks/distribution" element={<Distribution />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
