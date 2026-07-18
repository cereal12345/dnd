import React, { useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import 'react-colorful/dist/index.css'

function GridColorPicker({ gridColor, onGridColorChange, autoDetect, onAutoDetectChange }) {
  const [showPicker, setShowPicker] = useState(false)

  return (
    <div className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded relative">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium whitespace-nowrap">Grid Color:</label>
        <div className="relative">
          <button
            onClick={() => setShowPicker(!showPicker)}
            className="w-8 h-8 rounded border-2 border-gray-500 hover:border-gray-300 transition cursor-pointer"
            style={{ backgroundColor: gridColor }}
            title="Click to open color picker"
          />
          {showPicker && (
            <div className="absolute top-full left-0 mt-2 z-50 bg-gray-800 p-3 rounded shadow-lg">
              <HexColorPicker color={gridColor} onChange={onGridColorChange} />
              <button
                onClick={() => setShowPicker(false)}
                className="mt-2 w-full text-xs bg-gray-600 hover:bg-gray-500 text-white py-1 px-2 rounded transition"
              >
                Done
              </button>
            </div>
          )}
        </div>
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
