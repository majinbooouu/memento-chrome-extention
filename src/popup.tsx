import { useState } from "react"

import "./index.css" // Tailwind CSS 적용

function Popup() {
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount(count + 1)
  }

  return (
    <div className="w-[400px] h-[300px] p-6 bg-gradient-to-r from-purple-500 to-blue-500 flex flex-col items-center justify-center shadow-xl">
      <h1 className="text-2xl font-bold text-white mb-4 animate-bounce">
        Stylish Clicker
      </h1>
      <p className="text-lg text-white mb-6">Current count: {count}</p>
      <button
        className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
        onClick={increment}>
        Increase
      </button>
    </div>
  )
}

export default Popup
