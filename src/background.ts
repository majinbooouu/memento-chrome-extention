// /src/background.ts
chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error))
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "image-drop") {
    chrome.storage.local.set({ draggedImage: message.src })
  }
})
