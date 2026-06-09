import React, { useState, useRef } from 'react'
import Token from './Token'

function Grid({ tokens, background, gridColor, gridSize, backgroundDimensions, onTokenMove, onTokenDoubleClick, onTokenRightClick, selectedToken, onSelectToken }) {
  const gridRef = useRef(null)
  const [dragging, setDragging] = useState(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  const handleMouseDown = (e, tokenId) => {
    if (e.button === 2) return // Right-click handled separately
    
    const token = tokens.find(t => t.id === tokenId)
    const rect = gridRef.current.getBoundingClientRect()
    const offsetX = e.clientX - rect.left - token.x
    const offsetY = e.clientY - rect.top - token.y
    
    setDragging(tokenId)
    setDragOffset({ x: offsetX, y: offsetY })
    onSelectToken(tokenId)
  }

  const handleMouseMove = (e) => {
    if (!dragging || !gridRef.current) return

    const rect = gridRef.current.getBoundingClientRect()
    let x = e.clientX - rect.left - dragOffset.x
    let y = e.clientY - rect.top - dragOffset.y

    // Snap to grid size
    x = Math.round(x / gridSize) * gridSize
    y = Math.round(y / gridSize) * gridSize

    // Keep within bounds
    x = Math.max(0, Math.min(x, rect.width - 50))
    y = Math.max(0, Math.min(y, rect.height - 50))

    onTokenMove(dragging, x, y)
  }

  const handleMouseUp = () => {
    setDragging(null)
  }

  // Calculate container dimensions based on background
  const containerStyle = backgroundDimensions ? {
    width: `${backgroundDimensions.width}px`,
    height: `${backgroundDimensions.height}px`,
    minWidth: '100%',
    minHeight: '100%'
  } : {}

  return (
    <div
      ref={gridRef}
      className="relative bg-cover bg-center"
      style={{
        ...containerStyle,
        backgroundImage: background ? `url(${background})` : 'none',
        backgroundAttachment: 'local',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Grid overlay */}
      <svg
        className="absolute inset-0 pointer-events-none"
        width={backgroundDimensions ? `${backgroundDimensions.width}px` : '100%'}
        height={backgroundDimensions ? `${backgroundDimensions.height}px` : '100%'}
      >
        <defs>
          <pattern
            id="grid"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
              fill="none"
              stroke={gridColor}
              strokeWidth="1"
              opacity="0.3"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Tokens */}
      <div className="absolute inset-0">
        {tokens.map(token => (
          <Token
            key={token.id}
            token={token}
            isSelected={selectedToken === token.id}
            onMouseDown={(e) => handleMouseDown(e, token.id)}
            onDoubleClick={() => onTokenDoubleClick(token)}
            onRightClick={() => onTokenRightClick(token.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default Grid