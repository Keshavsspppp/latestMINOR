import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

const Schedule = () => {
  const [events, setEvents] = useState([
    {
      title: 'Water Supply Maintenance',
      start: new Date(2024, 0, 15),
      end: new Date(2024, 0, 17),
      department: 'Water Supply'
    },
    {
      title: 'Road Repair Project',
      start: new Date(2024, 0, 20),
      end: new Date(2024, 0, 25),
      department: 'Public Works'
    }
  ])

  const [view, setView] = useState('week')

  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: '#3B82F6',
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block'
    }
    return { style }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Task Schedule</h1>
            <div className="flex gap-2">
              <select 
                className="border rounded-md px-3 py-1"
                value={view}
                onChange={(e) => setView(e.target.value)}
              >
                <option value="month">Month</option>
                <option value="week">Week</option>
                <option value="day">Day</option>
                <option value="agenda">Agenda</option>
              </select>
            </div>
          </div>

          <div style={{ height: '700px' }}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              view={view}
              onView={setView}
              eventPropGetter={eventStyleGetter}
              views={['month', 'week', 'day', 'agenda']}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Schedule