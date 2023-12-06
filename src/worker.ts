chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create({
    id: "GET_GITHUB_INFO",
    contexts: ["link"],
    title: "GitHub repo overview",
    type: "normal",
    targetUrlPatterns: ["*://*.github.com/*"],
  });
});
