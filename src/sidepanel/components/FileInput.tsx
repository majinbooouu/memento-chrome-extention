import React from "react"

interface FileInputProps {
  fileInputRef: React.RefObject<HTMLInputElement>
  handleFile: (file: File) => void
}

const FileInput: React.FC<FileInputProps> = ({ fileInputRef, handleFile }) => {
  return (
    <input
      ref={fileInputRef}
      type="file"
      id="image-input"
      accept="image/*"
      onChange={(e) => handleFile(e.target.files![0])}
      className="hidden"
    />
  )
}

export default FileInput
