import React from "react"

interface FullWidthBlueButtonProps {
  buttonName: string
  onClick: () => void
}

const FullWidthBlueButton: React.FC<FullWidthBlueButtonProps> = ({
  buttonName,
  onClick
}) => {
  return (
    <button
      id="generate-button"
      onClick={onClick}
      className="w-full bg-blue-500 text-white font-bold p-3 mt-4 rounded-lg">
      {buttonName}
    </button>
  )
}
export default FullWidthBlueButton
