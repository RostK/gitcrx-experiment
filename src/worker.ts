chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create({
    id: "GET_GITHUB_INFO",
    contexts: ["link"],
    title: "GitHub repo overview",
    type: "normal",
    targetUrlPatterns: ["https://github.com/*/*"],
  });
});
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "GET_GITHUB_INFO" && tab && info.linkUrl) {
    void chrome.sidePanel.open({ windowId: tab.windowId });
    void chrome.sidePanel.setOptions({
      path: `?url=${encodeURIComponent(info.linkUrl)}`,
    });
  }
});
