import { useRef, useState } from "react"
import { IoMdCloseCircle } from "react-icons/io"

import AuthorInput from "./components/AuthorInput"
import DropZone from "./components/DropZone"
import FileInput from "./components/FileInput"
import FullWidthBlueButton from "./components/FullWidthBlueButton"
import HalfWidthButton from "./components/HalfWidthButton"
import PreviewImage from "./components/PreviewImage"
import QuoteInput from "./components/QuoteInput"
import SnsIconSelector from "./components/SnsIconSelector"

import "../index.css" // Tailwind CSS 적용

import facebookIconSrc from "../images/facebook-icon.png"
import instagramIconSrc from "../images/instagram-icon.png"
import threadsIconSrc from "../images/threads-icon.png"
import xIconSrc from "../images/x-icon.png"
import youtubeIconSrc from "../images/youtube-icon.png"

const Index = () => {
  const [outputImageSrc, setOutImageSrc] = useState<string>("")
  const [inputImageSrc, setInputImageSrc] = useState<string>("")
  const [isGenerated, setIsGenerated] = useState<Boolean>(false)
  const [quote, setQuote] = useState<string>("")
  const [author, setAuthor] = useState<string>("")
  const [selectedIcon, setSelectedIcon] = useState<string>("none")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef(null)

  // 각 아이콘에 대한 Image 객체 생성
  const instagramIcon = new Image()
  instagramIcon.src = instagramIconSrc

  const facebookIcon = new Image()
  facebookIcon.src = facebookIconSrc

  const xIcon = new Image()
  xIcon.src = xIconSrc

  const youtubeIcon = new Image()
  youtubeIcon.src = youtubeIconSrc

  const threadsIcon = new Image()
  threadsIcon.src = threadsIconSrc

  const handleFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target) {
        setInputImageSrc(e.target.result as string)
        console.log(inputImageSrc)
      }
    }
    reader.readAsDataURL(file)

    // 파일 선택 후 input 값을 리셋해 동일한 파일을 다시 선택할 수 있도록 함
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const loadImage = (src: string) => {
    setInputImageSrc(src)
  }

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    handleReset()
    // 먼저 URL 형식의 데이터를 확인
    const imageUrl = event.dataTransfer.getData("text/plain")

    if (imageUrl) {
      loadImage(imageUrl) // URL을 통해 이미지를 로드하는 함수
    } else {
      // URL이 없으면 파일을 처리
      const file = event.dataTransfer.files[0]
      if (file) {
        handleFile(file)
      }
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleGenerate = () => {
    if (inputImageSrc && quote && author) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      const img = new Image()
      img.src = inputImageSrc

      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx?.drawImage(img, 0, 0)

        // 흑백 변환
        const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData?.data
        if (data) {
          for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
            data[i] = avg
            data[i + 1] = avg
            data[i + 2] = avg
          }
          ctx?.putImageData(imageData, 0, 0)
        }

        // 그라디언트 추가
        const gradient = ctx.createLinearGradient(
          0,
          canvas.height,
          0,
          canvas.height / 3
        )
        gradient.addColorStop(0, "rgba(0, 0, 0, 1)")
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // 텍스트 추가
        const maxFontSize = canvas.width * 0.025
        const authorFontSize = maxFontSize * 0.8
        ctx!.font = `${maxFontSize}px serif`
        ctx!.fillStyle = "white"
        ctx!.textAlign = "center"

        const quoteLines = getLines(ctx!, quote, canvas.width - 100)
        let currentHeight = canvas.height - canvas.height / 3
        quoteLines.forEach((line) => {
          ctx!.fillText(line, canvas.width / 2, currentHeight)
          currentHeight += maxFontSize * 1.2
        })

        ctx!.font = `${authorFontSize}px serif`

        // 로고 크기와 텍스트 간격 정의
        const logoSize = 13
        const textPadding = 2

        // SNS 아이콘을 선택된 것에 따라 그리기
        let selectedSnsIcon
        switch (selectedIcon) {
          case "instagram":
            selectedSnsIcon = instagramIcon
            break
          case "facebook":
            selectedSnsIcon = facebookIcon
            break
          case "x":
            selectedSnsIcon = xIcon
            break
          case "youtube":
            selectedSnsIcon = youtubeIcon
            break
          case "threads":
            selectedSnsIcon = threadsIcon
            break
          default:
            selectedSnsIcon = null // 선택 안 된 경우
        }

        // 텍스트 너비 계산
        const textWidth = ctx!.measureText(`${author}`).width
        const totalWidth = textWidth + logoSize + textPadding

        // 텍스트와 로고를 중앙에 맞추기 위한 좌표 설정
        const textX = (canvas.width - totalWidth) / 2
        const logoX = textX - logoSize / 2

        // 1. 텍스트(Author) 그리기 (quote 아래에 배치)
        ctx!.fillText(`${author}`, canvas.width / 2, currentHeight)

        // 2. 로고 그리기 (author 텍스트 왼쪽에 배치)
        if (selectedSnsIcon) {
          ctx?.drawImage(
            selectedSnsIcon,
            logoX,
            currentHeight - logoSize + 3,
            logoSize,
            logoSize
          )
        }

        const imageDataUrl = canvas.toDataURL("image/png")
        setOutImageSrc(imageDataUrl)
        setIsGenerated(true)

        // 이미지 복사
        copyImageToClipboard(imageDataUrl)
      }
    }
  }

  const handleReset = () => {
    setOutImageSrc("")
    setInputImageSrc("")
    setIsGenerated(false)
    setQuote("")
    setAuthor("")
  }

  const handleDownload = () => {
    if (outputImageSrc) {
      const link = document.createElement("a")
      link.href = outputImageSrc // 이미지의 데이터 URL
      link.download = "memento_image.png" // 저장할 파일 이름
      link.click() // 다운로드 트리거
    }
  }

  function getLines(ctx, text, maxWidth) {
    const words = text.split(" ")
    const lines = []
    let currentLine = words[0]

    for (let i = 1; i < words.length; i++) {
      const word = words[i]
      const width = ctx.measureText(currentLine + " " + word).width

      if (width < maxWidth) {
        currentLine += " " + word
      } else {
        // 2줄이면 break
        lines.push(currentLine)
        currentLine = word

        if (lines.length === 3) {
          let nextLineWidth = ctx.measureText(currentLine).width

          // 두 번째 줄에 들어가는 단어가 길 때 마지막에 "..." 추가
          while (
            i + 1 < words.length &&
            nextLineWidth + ctx.measureText(" ...").width < maxWidth
          ) {
            i++
            currentLine += " " + words[i]
            nextLineWidth = ctx.measureText(currentLine).width
          }

          // "..."을 추가해서 두 번째 줄을 마무리
          currentLine += "..."
          break
        }
      }
    }

    lines.push(currentLine) // 마지막 줄 추가

    return lines
  }

  function copyImageToClipboard(dataUrl) {
    fetch(dataUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const item = new ClipboardItem({ "image/png": blob })
        navigator.clipboard.write([item])
      })
      .catch((error) => {
        console.error("Failed to copy image: ", error)
        document.getElementById("message").textContent = "Failed to copy image."
      })
  }

  return !isGenerated ? (
    <div
      className="container h-screen mx-auto p-4"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}>
      {inputImageSrc ? (
        <PreviewImage inputImageSrc={inputImageSrc} onReset={handleReset} />
      ) : (
        <>
          <DropZone handleClick={handleClick} handleDrop={handleDrop} />
          <FileInput fileInputRef={fileInputRef} handleFile={handleFile} />
        </>
      )}
      <QuoteInput quote={quote} setQuote={setQuote} />
      <SnsIconSelector
        selectedIcon={selectedIcon}
        setSelectedIcon={setSelectedIcon}
      />
      <AuthorInput author={author} setAuthor={setAuthor} />
      <FullWidthBlueButton buttonName="Generate" onClick={handleGenerate} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  ) : (
    <div className="container h-screen mx-auto p-4">
      <img src={outputImageSrc} alt="Processed" />
      <p className="mt-2 text-gray-500 animate-pulse">
        The image has been copied to your clipboard. Paste it wherever you like.
      </p>
      <div className="flex w-full">
        <HalfWidthButton
          buttonName="Download"
          addTailwindClassName="bg-blue-500"
          onClick={handleDownload}
        />
        <HalfWidthButton
          buttonName="Reset"
          addTailwindClassName="bg-red-500 ml-2"
          onClick={handleReset}
        />
      </div>
    </div>
  )
}

export default Index
