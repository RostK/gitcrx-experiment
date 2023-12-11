import "./App.css";
import { getRepoInfo, RepoData, RepoDisplay } from "./repoInfo";
import { useEffect, useState } from "react";
import { Favourites } from "./Favourites.tsx";

function App() {
  const [repoData, setRepoData] = useState<RepoData | null>(null);
  const urlParams = new URLSearchParams(window.location.search);
  const repoURL = urlParams.get("url");
  useEffect(() => {
    if (repoURL) {
      getRepoInfo(repoURL).then((data) => {
        setRepoData(data);
      });
    } else {
      setRepoData(null);
    }
  }, [repoURL]);

  return (
    <>
      {!repoURL && (
        <>
          <strong>Saved repos</strong>
          <Favourites />
        </>
      )}
      {repoData && (
        <>
          <a href=".">Favourites</a>
          <RepoDisplay repoData={repoData} />
        </>
      )}
    </>
  );
}

export default App;
