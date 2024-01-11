import { SIDEPANEL_PATH } from "../../consts.ts";

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
  return (
    <>
      <a href="#" onClick={handleClickFavourites}>
        Show favourites
      </a>
      <hr />
    </>
  );
}

export default App;
