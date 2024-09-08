import React from "react"
import { FaArrowRotateLeft } from "react-icons/fa6"

interface PreviewImageProps {
  inputImageSrc: string
  onReset: () => void
}

const PreviewImage: React.FC<PreviewImageProps> = ({
  inputImageSrc,
  onReset
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div>
        <img
          src={inputImageSrc}
          alt="Preview"
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <div className="w-full flex justify-end mt-2">
        <button
          className="reset-button"
          style={{ fontSize: "0.7rem" }}
          onClick={onReset}>
          <FaArrowRotateLeft />
        </button>
      </div>
    </div>
  )
}

export default PreviewImage
