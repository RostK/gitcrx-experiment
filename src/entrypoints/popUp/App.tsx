import { SIDEPANEL_PATH } from "../../consts.ts";
import { useEffect, useState } from "react";

const handleClickFavourites = async () => {
  const currentWindow = await chrome.windows.getCurrent();
  if (currentWindow.id) {
    void chrome.sidePanel.open({ windowId: currentWindow.id });
    void chrome.sidePanel.setOptions({
      path: SIDEPANEL_PATH,
    });
  }
};

function App() {
  const [urls, setUrls] = useState<string[]>([]);
  useEffect(() => {
    chrome.tabs.query(
      { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
      (tabs) => {
        const tab = tabs[0];
        const getRepos = () => {
          const repos: string[] = [];
          const hrefs = document.body.getElementsByTagName("a");

          for (const href in hrefs) {
            repos.push(hrefs[href].href);
          }
          return repos;
        };
        if (!tab.url?.includes("chrome://")) {
          if (tab.id) {
            void chrome.scripting
              .executeScript({
                target: { tabId: tab.id },
                func: getRepos,
              })
              .then((injectionResults) => {
                const pageUrls = new Set<string>();
                for (const frameResult of injectionResults) {
                  const { result } = frameResult;
                  for (const url of result) {
                    if (url?.indexOf("https://github.com/") === 0) {
                      const [company, repo] = url
                        .replace("https://github.com/", "")
                        .split("/");
                      if (company && repo) {
                        pageUrls.add(`${company}/${repo}`);
                      }
                    }
                  }
                }
                setUrls([...pageUrls]);
              });
          }
        }
      },
    );
  }, []);
  return (
    <>
      <a href="#" onClick={handleClickFavourites}>
        Show favourites
      </a>
      <hr />
      <strong>GitHub repo mentions:</strong>
      {urls.map((url) => (
        <div key={url}>{url}</div>
      ))}
    </>
  );
}

export default App;
