import "./App.css";

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const repoURL = urlParams.get("url");
  return (
    <>
      <div>{repoURL}</div>
    </>
  );
}

export default App;
