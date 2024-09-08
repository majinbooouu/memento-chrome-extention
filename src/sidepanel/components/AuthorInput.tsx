import React from "react"

interface AuthorInputProps {
  author: string
  setAuthor: (value: string) => void
}

const AuthorInput: React.FC<AuthorInputProps> = ({ author, setAuthor }) => {
  return (
    <input
      id="author-input"
      type="text"
      value={author}
      onChange={(e) => setAuthor(e.target.value)}
      placeholder="Author"
      className="w-full border-2 p-2 mt-2"
    />
  )
}

export default AuthorInput
