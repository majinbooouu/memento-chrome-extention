import React from "react"

interface QuoteInputProps {
  quote: string
  setQuote: (value: string) => void
}

const QuoteInput: React.FC<QuoteInputProps> = ({ quote, setQuote }) => {
  return (
    <textarea
      id="quote-input"
      rows={4}
      value={quote}
      onChange={(e) => setQuote(e.target.value)}
      placeholder="Enter your quote"
      className="w-full border-2 p-2 mt-4"
    />
  )
}

export default QuoteInput
