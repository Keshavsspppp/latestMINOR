import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import ProjectForm from '../components/projects/ProjectForm'
import ProjectCard from '../components/projects/ProjectCard'
import { FiFilter, FiSearch } from 'react-icons/fi'

const Projects = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Smart City Development Phase 1",
      status: "In Progress",
      progress: 65,
      description: "Implementation of smart traffic management and LED street lighting systems across major city intersections.",
      startDate: "2024-01-15",
      endDate: "2024-06-30",
      budget: "₹25 Crores",
      location: "Central Raipur"
    },
    {
      id: 2,
      title: "Public Park Renovation",
      status: "Upcoming",
      progress: 0,
      description: "Renovation of 5 public parks with modern amenities, walking tracks, and children's play areas.",
      startDate: "2024-03-01",
      endDate: "2024-08-31",
      budget: "₹8 Crores",
      location: "Various Locations"
    },
    {
      id: 3,
      title: "Waste Management System",
      status: "Completed",
      progress: 100,
      description: "Installation of smart waste bins and implementation of segregated waste collection system.",
      startDate: "2023-07-01",
      endDate: "2024-01-31",
      budget: "₹12 Crores",
      location: "Citywide"
    }
  ])

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [sortBy, setSortBy] = useState('date') // 'date', 'budget', 'progress'
  const [sortOrder, setSortOrder] = useState('desc')
  const handleAddProject = (newProject) => {
    setProjects([
      ...projects,
      {
        ...newProject,
        id: projects.length + 1,
        progress: parseInt(newProject.progress) || 0
      }
    ])
    setIsFormOpen(false)
  }
  const handleEditProject = (updatedProject) => {
    setProjects(projects.map(project => 
      project.id === updatedProject.id ? updatedProject : project
    ))
    setEditingProject(null)
  }
  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(project => project.id !== projectId))
    }
  }
  // Filter and Sort Projects
  const filteredProjects = useMemo(() => {
    return projects
      .filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.location.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = filterStatus === 'All' || project.status === filterStatus
        return matchesSearch && matchesStatus
      })
      .sort((a, b) => {
        if (sortBy === 'date') {
          return sortOrder === 'desc' 
            ? new Date(b.startDate) - new Date(a.startDate)
            : new Date(a.startDate) - new Date(b.startDate)
        }
        if (sortBy === 'budget') {
          const budgetA = parseInt(a.budget.replace(/[^0-9]/g, ''))
          const budgetB = parseInt(b.budget.replace(/[^0-9]/g, ''))
          return sortOrder === 'desc' ? budgetB - budgetA : budgetA - budgetB
        }
        if (sortBy === 'progress') {
          return sortOrder === 'desc' ? b.progress - a.progress : a.progress - b.progress
        }
        return 0
      })
  }, [projects, searchQuery, filterStatus, sortBy, sortOrder])

  // Project Statistics
  const projectStats = useMemo(() => {
    return {
      total: projects.length,
      completed: projects.filter(p => p.status === 'Completed').length,
      inProgress: projects.filter(p => p.status === 'In Progress').length,
      upcoming: projects.filter(p => p.status === 'Upcoming').length,
      totalBudget: projects.reduce((sum, p) => {
        const budget = parseInt(p.budget.replace(/[^0-9]/g, ''))
        return sum + budget
      }, 0)
    }
  }, [projects])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Stats */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-bold mb-4"
              >
                Municipal Projects
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl opacity-90"
              >
                Track the progress of ongoing and upcoming city development projects
              </motion.p>
            </div>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-white text-blue-800 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Add New Project
            </button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
            >
              <p className="text-sm opacity-80">Total Projects</p>
              <p className="text-3xl font-bold">{projectStats.total}</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              delay={0.1}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
            >
              <p className="text-sm opacity-80">In Progress</p>
              <p className="text-3xl font-bold">{projectStats.inProgress}</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              delay={0.2}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
            >
              <p className="text-sm opacity-80">Completed</p>
              <p className="text-3xl font-bold">{projectStats.completed}</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              delay={0.3}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
            >
              <p className="text-sm opacity-80">Total Budget</p>
              <p className="text-3xl font-bold">₹{projectStats.totalBudget}Cr</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Status</option>
                <option value="Upcoming">Upcoming</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="date">Sort by Date</option>
                <option value="budget">Sort by Budget</option>
                <option value="progress">Sort by Progress</option>
              </select>
              <button
                onClick={() => setSortOrder(order => order === 'asc' ? 'desc' : 'asc')}
                className="border rounded-lg px-4 py-2 hover:bg-gray-50"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No projects found matching your criteria</p>
          </div>
        ) : (
          <div className="grid gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={() => setEditingProject(project)}
                onDelete={() => handleDeleteProject(project.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Project Form Modal */}
      {(isFormOpen || editingProject) && (
        <ProjectForm
          project={editingProject}
          onSubmit={editingProject ? handleEditProject : handleAddProject}
          onClose={() => {
            setIsFormOpen(false)
            setEditingProject(null)
          }}
        />
      )}
    </div>
  )
}

export default Projects