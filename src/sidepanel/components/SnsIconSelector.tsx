import React from "react"
import {
  FaFacebook,
  FaInstagram,
  FaThreads,
  FaXTwitter,
  FaYoutube
} from "react-icons/fa6"
import { IoMdCloseCircle } from "react-icons/io"

const snsIcons = [
  { id: "none", icon: <IoMdCloseCircle />, color: "#CCCCCC" },
  { id: "instagram", icon: <FaInstagram />, color: "#E4405F" },
  { id: "facebook", icon: <FaFacebook />, color: "#1877F2" },
  { id: "x", icon: <FaXTwitter />, color: "#1DA1F2" },
  { id: "youtube", icon: <FaYoutube />, color: "#FF0000" },
  { id: "threads", icon: <FaThreads />, color: "#FF0000" }
]

interface SnsIconSelectorProps {
  selectedIcon: string
  setSelectedIcon: (value: string) => void
}

const SnsIconSelector: React.FC<SnsIconSelectorProps> = ({
  selectedIcon,
  setSelectedIcon
}) => {
  return (
    <div className="flex space-x-4 mt-4">
      {snsIcons.map((sns) => (
        <div
          key={sns.id}
          onClick={() => setSelectedIcon(sns.id)}
          className="cursor-pointer"
          style={{
            color: selectedIcon === sns.id ? sns.color : "gray",
            // filter: selectedIcon === sns.id ? "none" : "grayscale(100%)",
            fontSize: "1rem", // 아이콘 크기 설정
            transition: "color 0.2s ease" // 부드러운 색상 전환
          }}>
          {sns.id === "none" && selectedIcon === "none" ? (
            <IoMdCloseCircle style={{ color: "red" }} /> // none 선택 시 빨간색 아이콘
          ) : (
            sns.icon
          )}
        </div>
      ))}
    </div>
  )
}

export default SnsIconSelector
