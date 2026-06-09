import React, { useState, useRef, useEffect } from 'react'
import Grid from './components/Grid'
import TokenForm from './components/TokenForm'
import BackgroundUpload from './components/BackgroundUpload'
import './App.css'

function App() {
  const [tokens, setTokens] = useState([])
  const [background, setBackground] = useState(null)
  const [gridColor, setGridColor] = useState('black')
  const [selectedToken, setSelectedToken] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingToken, setEditingToken] = useState(null)

  // Calculate grid color based on background brightness
  useEffect(() => {
    if (!background) {
      setGridColor('black')
      return
    }

    const img = new Image()
    img.onload = () => {
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
    const newToken = {
      id: Date.now(),
      x: 100,
      y: 100,
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
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold">DnD Battle Map</h1>
        <div className="flex gap-3">
          <BackgroundUpload onUpload={handleBackgroundUpload} />
          <button
            onClick={() => {
              setShowForm(true)
              setEditingToken(null)
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
          >
            Add Token
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <Grid
          tokens={tokens}
          background={background}
          gridColor={gridColor}
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