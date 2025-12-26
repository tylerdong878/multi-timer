# Multi Timer

A clean, simple webapp for managing multiple stopwatches simultaneously. Built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

- Create multiple stopwatches with custom names and durations
- Time format: MM:SS
- Stopwatches start automatically when added
- Automatic sorting by least time remaining (shortest time at the top)
- Pause, reset, and delete individual stopwatches
- Visual progress bar for each stopwatch
- Clean, modern UI with gradient background

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Enter a name for your stopwatch
2. Enter the time in MM:SS format
3. Click "Add Stopwatch" (it will start automatically)
4. Use Pause to pause the countdown, then Start to resume
5. Use Reset to restore the original time
6. Use the X button to delete a stopwatch

Stopwatches are automatically sorted by remaining time, with the shortest time always at the top.

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hooks** - State management

## Build

```bash
npm run build
npm start
```