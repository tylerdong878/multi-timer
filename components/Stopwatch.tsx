'use client'

import { StopwatchData } from '@/app/page'

interface StopwatchProps {
  stopwatch: StopwatchData
  onToggle: (id: string) => void
  onReset: (id: string) => void
  onDelete: (id: string) => void
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export function Stopwatch({ stopwatch, onToggle, onReset, onDelete }: StopwatchProps) {
  const isFinished = stopwatch.remainingSeconds === 0
  const progress = stopwatch.totalSeconds > 0 
    ? (stopwatch.remainingSeconds / stopwatch.totalSeconds) * 100 
    : 0

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-900">{stopwatch.name}</h2>
        <button
          onClick={() => onDelete(stopwatch.id)}
          className="text-slate-400 hover:text-red-500 transition-colors"
          aria-label="Delete stopwatch"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="mb-4">
        <div className="text-4xl font-mono font-bold text-slate-900 mb-2">
          {formatTime(stopwatch.remainingSeconds)}
        </div>
        {isFinished && (
          <div className="text-sm text-red-500 font-medium">Time's up!</div>
        )}
      </div>

      <div className="mb-4">
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              isFinished ? 'bg-red-500' : 'bg-blue-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onToggle(stopwatch.id)}
          disabled={isFinished}
          className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
            stopwatch.isRunning
              ? 'bg-orange-500 hover:bg-orange-600 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          } ${isFinished ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {stopwatch.isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={() => onReset(stopwatch.id)}
          className="px-4 py-2 rounded-md font-medium bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  )
}

