import React, { useRef } from 'react'

function BackgroundUpload({ onUpload }) {
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (event) => {
        onUpload(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current.click()}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
      >
        Upload Background
      </button>
    </div>
  )
}

export default BackgroundUpload
