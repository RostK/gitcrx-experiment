import { FC, useEffect, useState } from "react";

export const Favourites: FC = () => {
  const [repos, setRepos] = useState<
    {
      full_name: string;
      html_url: string;
      description: string;
    }[]
  >([]);
  useEffect(() => {
    chrome.storage.sync.get(["repos"]).then(({ repos }) => {
      setRepos(repos ?? []);
    });
  });
  return (
    <>
      {repos.map((repo) => (
        <div key={repo.html_url}>
          <a href={`?url=${repo.html_url}`}>
            <strong>{repo.full_name}</strong>
          </a>
          <p>{repo.description}</p>
        </div>
      ))}
    </>
  );
};
