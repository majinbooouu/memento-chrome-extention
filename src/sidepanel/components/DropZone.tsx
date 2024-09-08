import React from "react"

interface DropZoneProps {
  handleClick: () => void
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void
}

const DropZone: React.FC<DropZoneProps> = ({ handleClick, handleDrop }) => {
  return (
    <div
      id="drop-zone"
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="w-full h-48 border-2 border-dashed flex items-center justify-center text-gray-500 cursor-pointer">
      <span>Drop image here or click to select</span>
    </div>
  )
}

export default DropZone
