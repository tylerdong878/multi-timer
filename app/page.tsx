'use client'

import { useState, useEffect, useCallback } from 'react'
import { Stopwatch } from '@/components/Stopwatch'
import { AddStopwatchForm } from '@/components/AddStopwatchForm'

export interface StopwatchData {
  id: string
  name: string
  totalSeconds: number
  remainingSeconds: number
  isRunning: boolean
}

export default function Home() {
  const [stopwatches, setStopwatches] = useState<StopwatchData[]>([])

  // Update all running stopwatches every second
  useEffect(() => {
    const interval = setInterval(() => {
      setStopwatches((prev) =>
        prev
          .map((sw) => {
            if (sw.isRunning && sw.remainingSeconds > 0) {
              return {
                ...sw,
                remainingSeconds: sw.remainingSeconds - 1,
              }
            }
            return { ...sw, isRunning: false }
          })
          .sort((a, b) => a.remainingSeconds - b.remainingSeconds)
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleAdd = useCallback((name: string, minutes: number, seconds: number) => {
    const totalSeconds = minutes * 60 + seconds
    const newStopwatch: StopwatchData = {
      id: crypto.randomUUID(),
      name,
      totalSeconds,
      remainingSeconds: totalSeconds,
      isRunning: true,
    }
    setStopwatches((prev) =>
      [...prev, newStopwatch].sort((a, b) => a.remainingSeconds - b.remainingSeconds)
    )
  }, [])

  const handleToggle = useCallback((id: string) => {
    setStopwatches((prev) =>
      prev
        .map((sw) =>
          sw.id === id
            ? { ...sw, isRunning: !sw.isRunning }
            : sw
        )
        .sort((a, b) => a.remainingSeconds - b.remainingSeconds)
    )
  }, [])

  const handleReset = useCallback((id: string) => {
    setStopwatches((prev) =>
      prev
        .map((sw) =>
          sw.id === id
            ? { ...sw, remainingSeconds: sw.totalSeconds, isRunning: false }
            : sw
        )
        .sort((a, b) => a.remainingSeconds - b.remainingSeconds)
    )
  }, [])

  const handleDelete = useCallback((id: string) => {
    setStopwatches((prev) => prev.filter((sw) => sw.id !== id))
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Multi Timer</h1>
        
        <AddStopwatchForm onAdd={handleAdd} />

        <div className="mt-8 space-y-4">
          {stopwatches.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <p className="text-lg">No stopwatches yet. Add one to get started!</p>
            </div>
          ) : (
            stopwatches.map((stopwatch) => (
              <Stopwatch
                key={stopwatch.id}
                stopwatch={stopwatch}
                onToggle={handleToggle}
                onReset={handleReset}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
    </main>
  )
}

