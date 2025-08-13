'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'

export default function CycleTimeCalculator() {
  const [cycleHours, setCycleHours] = useState<string>('')
  const [cycleMinutes, setCycleMinutes] = useState<string>('')
  const [cycleSeconds, setCycleSeconds] = useState<string>('')
  const [productionUnits, setProductionUnits] = useState<string>('')
  const [runningHoursPerDay, setRunningHoursPerDay] = useState<string>('8')

  // Calculate total cycle time in seconds
  const totalCycleTimeInSeconds = useMemo(() => {
    const hours = parseFloat(cycleHours) || 0
    const minutes = parseFloat(cycleMinutes) || 0
    const seconds = parseFloat(cycleSeconds) || 0
    return hours * 3600 + minutes * 60 + seconds
  }, [cycleHours, cycleMinutes, cycleSeconds])

  // Calculate production rates
  const results = useMemo(() => {
    const units = parseFloat(productionUnits) || 0
    const runningHours = parseFloat(runningHoursPerDay) || 0
    
    if (totalCycleTimeInSeconds === 0 || units === 0) {
      return {
        unitsPerSecond: 0,
        unitsPerMinute: 0,
        unitsPerHour: 0,
        unitsPerDay: 0,
        unitsPerWeek: 0,
        unitsPerMonth: 0
      }
    }

    // Units produced per cycle time
    const unitsPerSecond = units / totalCycleTimeInSeconds
    const unitsPerMinute = unitsPerSecond * 60
    const unitsPerHour = unitsPerMinute * 60
    
    // Use actual running hours instead of 24 hours
    const unitsPerDay = unitsPerHour * runningHours
    const unitsPerWeek = unitsPerDay * 7
    const unitsPerMonth = unitsPerDay * 30 // Approximate month (30 days)

    return {
      unitsPerSecond,
      unitsPerMinute,
      unitsPerHour,
      unitsPerDay,
      unitsPerWeek,
      unitsPerMonth
    }
  }, [totalCycleTimeInSeconds, productionUnits, runningHoursPerDay])

  const formatNumber = (num: number) => {
    if (num === 0) return '0'
    if (num < 1) return num.toFixed(4)
    if (num < 100) return num.toFixed(2)
    return Math.round(num).toLocaleString()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="mb-6">
            <Image
              src="/logo.jpg"
              alt="Leo Precision Logo"
              width={150}
              height={50}
              className="mx-auto"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Cycle Time Calculator
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Input Parameters
            </h2>
            
            {/* Cycle Time Inputs */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Cycle Time
              </label>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Hours</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={cycleHours}
                    onChange={(e) => setCycleHours(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Minutes</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={cycleMinutes}
                    onChange={(e) => setCycleMinutes(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Seconds</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={cycleSeconds}
                    onChange={(e) => setCycleSeconds(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* Cavity Mold Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cavity Mold
              </label>
              <div className="space-y-3">
                {/* Dropdown for common values */}
                <select
                  value={productionUnits}
                  onChange={(e) => setProductionUnits(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 text-lg"
                >
                  <option value="">Select common cavity values or enter custom below</option>
                  <option value="1">1 cavity mold</option>
                  <option value="2">2 cavity mold</option>
                  <option value="4">4 cavity mold</option>
                  <option value="6">6 cavity mold</option>
                  <option value="8">8 cavity mold</option>
                  <option value="12">12 cavity mold</option>
                  <option value="16">16 cavity mold</option>
                  <option value="24">24 cavity mold</option>
                  <option value="32">32 cavity mold</option>
                  <option value="48">48 cavity mold</option>
                  <option value="72">72 cavity mold</option>
                </select>
                
                {/* Custom input field */}
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={productionUnits}
                    onChange={(e) => setProductionUnits(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 text-lg"
                    placeholder="Or enter custom cavity number"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-gray-400 text-sm">cavities</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Choose from common cavity values above or enter any custom value in the text field
              </p>
            </div>

            {/* Machine Running Time Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Machine Running Hours per Day
              </label>
              <input
                type="number"
                min="0"
                max="24"
                step="0.1"
                value={runningHoursPerDay}
                onChange={(e) => setRunningHoursPerDay(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 text-lg"
                placeholder="Enter operating hours per day (e.g., 8 for single shift)"
              />
              <p className="text-xs text-gray-500 mt-1">
                Typical values: 8 hours (single shift), 16 hours (double shift), 24 hours (continuous)
              </p>
            </div>

            {/* Current Settings Display */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Current Settings:</h3>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Cycle Time:</span> {formatNumber(totalCycleTimeInSeconds)} seconds
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Cavity Mold:</span> {productionUnits || '0'}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Running Hours/Day:</span> {runningHoursPerDay || '0'} hours
              </p>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Production Results
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <span className="text-gray-700 font-medium">Units per Second</span>
                <span className="text-xl font-bold text-blue-600">
                  {formatNumber(results.unitsPerSecond)}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <span className="text-gray-700 font-medium">Units per Minute</span>
                <span className="text-xl font-bold text-green-600">
                  {formatNumber(results.unitsPerMinute)}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                <span className="text-gray-700 font-medium">Units per Hour</span>
                <span className="text-xl font-bold text-purple-600">
                  {formatNumber(results.unitsPerHour)}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                <div className="flex flex-col">
                  <span className="text-gray-700 font-medium">Units per Day</span>
                  <span className="text-xs text-gray-500">
                    Based on {runningHoursPerDay || '0'} running hours
                  </span>
                </div>
                <span className="text-xl font-bold text-orange-600">
                  {formatNumber(results.unitsPerDay)}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg border-2 border-red-200">
                <div className="flex flex-col">
                  <span className="text-gray-700 font-medium">Units per Week</span>
                  <span className="text-xs text-gray-500">
                    7 days × {runningHoursPerDay || '0'} hours/day
                  </span>
                </div>
                <span className="text-xl font-bold text-red-600">
                  {formatNumber(results.unitsPerWeek)}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-indigo-50 rounded-lg border-2 border-indigo-200">
                <div className="flex flex-col">
                  <span className="text-gray-700 font-medium">Units per Month</span>
                  <span className="text-xs text-gray-500">
                    30 days × {runningHoursPerDay || '0'} hours/day
                  </span>
                </div>
                <span className="text-xl font-bold text-indigo-600">
                  {formatNumber(results.unitsPerMonth)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Example Usage */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            How to Use
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Example 1: Single Cavity</h4>
              <p>Single shift production line:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Cycle: 2 min 30 sec</li>
                <li>Cavity mold: 1</li>
                <li>Running hours: 8/day</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Example 2: Multi-Cavity</h4>
              <p>Double shift operation:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Cycle: 45 seconds</li>
                <li>Cavity mold: 8</li>
                <li>Running hours: 16/day</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Example 3: High Volume</h4>
              <p>24/7 operation:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Cycle: 30 seconds</li>
                <li>Cavity mold: 32</li>
                <li>Running hours: 24/day</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
