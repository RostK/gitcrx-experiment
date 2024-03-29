import { SIDEPANEL_PATH } from "../consts.ts";

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
      path: `${SIDEPANEL_PATH}?url=${encodeURIComponent(info.linkUrl)}`,
    });
  }
});

function reddenPage() {
  document.body.style.backgroundColor = "red";
}

chrome.action.onClicked.addListener((tab) => {
  console.log(tab);
  if (!tab.url?.includes("chrome://")) {
    if (tab.id) {
      void chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: reddenPage,
      });
    }
  }
});
