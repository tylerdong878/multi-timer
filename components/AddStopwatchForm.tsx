'use client'

import { useState } from 'react'

interface AddStopwatchFormProps {
  onAdd: (name: string, minutes: number, seconds: number) => void
}

export function AddStopwatchForm({ onAdd }: AddStopwatchFormProps) {
  const [name, setName] = useState('')
  const [timeInput, setTimeInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim()) {
      alert('Please enter a name')
      return
    }

    // Parse time input (MM:SS format)
    const timeParts = timeInput.split(':')
    if (timeParts.length !== 2) {
      alert('Please enter time in MM:SS format')
      return
    }

    const minutes = parseInt(timeParts[0], 10)
    const seconds = parseInt(timeParts[1], 10)

    if (isNaN(minutes) || isNaN(seconds) || minutes < 0 || seconds < 0 || seconds >= 60) {
      alert('Please enter a valid time (MM:SS format)')
      return
    }

    if (minutes === 0 && seconds === 0) {
      alert('Time must be greater than 0')
      return
    }

    onAdd(name.trim(), minutes, seconds)
    setName('')
    setTimeInput('')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 border border-slate-200">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">Add New Stopwatch</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium text-slate-700 mb-1">
            Time (MM:SS)
          </label>
          <input
            id="time"
            type="text"
            value={timeInput}
            onChange={(e) => setTimeInput(e.target.value)}
            placeholder="MM:SS"
            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
          />
          <p className="mt-1 text-xs text-slate-500">
            Format: MM:SS
          </p>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium transition-colors"
        >
          Add Stopwatch
        </button>
      </div>
    </form>
  )
}

