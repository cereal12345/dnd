import React from 'react'

function Token({ token, isSelected, onMouseDown, onDoubleClick, onRightClick }) {
  return (
    <div
      className={`absolute token w-12 h-12 rounded-full flex flex-col items-center justify-center cursor-grab active:cursor-grabbing transition ${
        isSelected ? 'ring-2 ring-yellow-400' : ''
      }`}
      style={{
        left: `${token.x}px`,
        top: `${token.y}px`,
        backgroundColor: token.color || '#ef4444',
      }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
      onContextMenu={(e) => {
        e.preventDefault()
        onRightClick()
      }}
      title={`${token.name}\nHP: ${token.currentHp}/${token.maxHp}\nAC: ${token.ac}`}
    >
      <div className="text-white text-xs font-bold text-center px-1">
        {token.name ? token.name.substring(0, 3) : '?'}
      </div>
      <div className="text-white text-xs text-center px-1">
        {token.currentHp}/{token.maxHp}
      </div>
      <div className="text-white text-xs font-semibold">
        AC {token.ac}
      </div>
    </div>
  )
}

export default Token
