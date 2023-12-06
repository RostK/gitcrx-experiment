import "./App.css";
import { getRepoInfo, RepoData, RepoDisplay } from "./repoInfo";
import { useState } from "react";

function App() {
  const [repoData, setRepoData] = useState<RepoData | null>(null);
  const urlParams = new URLSearchParams(window.location.search);
  const repoURL = urlParams.get("url");
  if (repoURL) {
    getRepoInfo(repoURL).then((data) => {
      setRepoData(data);
    });
  }
  return <>{repoData && <RepoDisplay repoData={repoData} />}</>;
}

export default App;
