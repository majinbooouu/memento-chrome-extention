import React from "react"

interface HalfWidthButtonProps {
  buttonName: string
  addTailwindClassName: string
  onClick: () => void
}

const HalfWidthButton: React.FC<HalfWidthButtonProps> = ({
  buttonName,
  addTailwindClassName,
  onClick
}) => {
  return (
    <button
      id={`${buttonName}-button`}
      onClick={onClick}
      className={`w-1/2 ${addTailwindClassName} text-white font-bold p-3 mt-4 rounded-lg`}>
      {buttonName}
    </button>
  )
}
export default HalfWidthButton
