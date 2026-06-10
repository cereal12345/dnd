import React, { useState, useRef, useEffect } from 'react'
import Grid from './components/Grid'
import TokenForm from './components/TokenForm'
import BackgroundUpload from './components/BackgroundUpload'
import './App.css'

function App() {
  const [tokens, setTokens] = useState([])
  const [background, setBackground] = useState(null)
  const [gridColor, setGridColor] = useState('black')
  const [gridSize, setGridSize] = useState(40)
  const [backgroundScale, setBackgroundScale] = useState(100)
  const [selectedToken, setSelectedToken] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingToken, setEditingToken] = useState(null)
  const [backgroundDimensions, setBackgroundDimensions] = useState(null)

  // Calculate grid color based on background brightness
  useEffect(() => {
    if (!background) {
      setGridColor('black')
      return
    }

    const img = new Image()
    img.onload = () => {
      // Store background dimensions
      setBackgroundDimensions({ width: img.width, height: img.height })
      
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      let brightness = 0

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        brightness += (r * 299 + g * 587 + b * 114) / 1000
      }

      brightness /= (data.length / 4)
      setGridColor(brightness > 128 ? 'black' : 'white')
    }
    img.src = background
  }, [background])

  const addToken = (tokenData) => {
    // Calculate center position based on background dimensions
    let centerX = 100
    let centerY = 100

    if (backgroundDimensions) {
      centerX = (backgroundDimensions.width * backgroundScale) / 100 / 2 - 25
      centerY = (backgroundDimensions.height * backgroundScale) / 100 / 2 - 25
    }

    const newToken = {
      id: Date.now(),
      x: centerX,
      y: centerY,
      ...tokenData,
    }
    setTokens([...tokens, newToken])
    setShowForm(false)
  }

  const updateToken = (id, updates) => {
    setTokens(tokens.map(t => t.id === id ? { ...t, ...updates } : t))
    setEditingToken(null)
  }

  const deleteToken = (id) => {
    if (confirm('Delete this token?')) {
      setTokens(tokens.filter(t => t.id !== id))
      setSelectedToken(null)
    }
  }

  const moveToken = (id, x, y) => {
    updateToken(id, { x, y })
  }

  const handleBackgroundUpload = (dataUrl) => {
    setBackground(dataUrl)
  }

  return (
    <div className="w-full h-screen flex flex-col bg-gray-900">
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-lg gap-4 overflow-x-auto">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold whitespace-nowrap">DnD Battle Map</h1>
          <div className="text-sm text-gray-300 border-l border-gray-600 pl-3 whitespace-nowrap">
            Drag to move | Double-click to edit | Right-click to delete
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded whitespace-nowrap">
            <label className="text-sm font-medium">Grid:</label>
            <input
              type="range"
              min="20"
              max="100"
              step="5"
              value={gridSize}
              onChange={(e) => setGridSize(parseInt(e.target.value))}
              className="w-20"
            />
            <span className="text-sm font-semibold w-8">{gridSize}px</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded whitespace-nowrap">
            <label className="text-sm font-medium">Zoom:</label>
            <input
              type="range"
              min="25"
              max="200"
              step="25"
              value={backgroundScale}
              onChange={(e) => setBackgroundScale(parseInt(e.target.value))}
              className="w-20"
            />
            <span className="text-sm font-semibold w-12">{backgroundScale}%</span>
          </div>
          <BackgroundUpload onUpload={handleBackgroundUpload} />
          <button
            onClick={() => {
              setShowForm(true)
              setEditingToken(null)
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition whitespace-nowrap"
          >
            Add Token
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <Grid
          tokens={tokens}
          background={background}
          gridColor={gridColor}
          gridSize={gridSize}
          backgroundScale={backgroundScale}
          backgroundDimensions={backgroundDimensions}
          onTokenMove={moveToken}
          onTokenDoubleClick={(token) => {
            setEditingToken(token)
          }}
          onTokenRightClick={deleteToken}
          selectedToken={selectedToken}
          onSelectToken={setSelectedToken}
        />
      </div>

      {showForm && (
        <TokenForm
          onSubmit={addToken}
          onClose={() => setShowForm(false)}
        />
      )}

      {editingToken && (
        <TokenForm
          token={editingToken}
          onSubmit={(data) => updateToken(editingToken.id, data)}
          onClose={() => setEditingToken(null)}
        />
      )}
    </div>
  )
}

export default App
