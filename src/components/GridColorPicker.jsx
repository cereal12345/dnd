import React, { useState } from 'react'

function GridColorPicker({ gridColor, onGridColorChange, autoDetect, onAutoDetectChange }) {
  return (
    <div className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded relative">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium whitespace-nowrap">Grid Color:</label>
        <input
          type="color"
          value={gridColor}
          onChange={(e) => onGridColorChange(e.target.value)}
          className="w-8 h-8 rounded border-2 border-gray-500 hover:border-gray-300 transition cursor-pointer"
          title="Click to open color picker"
        />
        <span className="text-xs font-mono text-gray-300">{gridColor}</span>
      </div>

      <label className="flex items-center gap-2 ml-2 cursor-pointer">
        <input
          type="checkbox"
          checked={autoDetect}
          onChange={(e) => onAutoDetectChange(e.target.checked)}
          className="w-4 h-4"
        />
        <span className="text-xs text-gray-300 whitespace-nowrap">Auto-detect</span>
      </label>
    </div>
  )
}

export default GridColorPicker
