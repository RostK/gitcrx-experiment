import { FC, useCallback, useEffect, useState } from "react";
import { FavouriteRepoData, RepoData } from "./types.ts";
import { Link } from "./Link.tsx";

const checkIsFavourite = async (repoData: RepoData): Promise<boolean> => {
  const { repos } = await chrome.storage.sync.get(["repos"]);
  return Boolean(
    (repos as FavouriteRepoData[])?.find(
      (repo) => repo.html_url === repoData.html_url,
    ),
  );
};

export const RepoDisplay: FC<{ repoData: RepoData }> = ({ repoData }) => {
  const [isFavourite, setIsFavourite] = useState(false);
  useEffect(() => {
    const updateIsFavourite = () => {
      checkIsFavourite(repoData).then((itIs) => setIsFavourite(itIs));
    };
    updateIsFavourite();
    chrome.storage.sync.onChanged.addListener(updateIsFavourite);
    return () => {
      chrome.storage.sync.onChanged.removeListener(updateIsFavourite);
    };
  }, [repoData]);

  const handleAddToFavourites = useCallback(async () => {
    if (repoData) {
      const { repos: currentRepos } = await chrome.storage.sync.get(["repos"]);
      const { full_name, html_url, description } = repoData;
      const newRepos = [
        ...(currentRepos ?? []),
        { full_name, html_url, description },
      ];
      await chrome.storage.sync.set({ repos: newRepos });
    }
  }, [repoData]);

  const handleRemoveFromFavourites = useCallback(async () => {
    if (repoData) {
      const { repos: currentRepos } = await chrome.storage.sync.get(["repos"]);
      const newRepos = ((currentRepos as FavouriteRepoData[]) ?? []).filter(
        (repo) => repo.full_name !== repoData.full_name,
      );
      await chrome.storage.sync.set({ repos: newRepos });
    }
  }, [repoData]);

  return (
    <>
      <h2>
        <Link to={repoData.html_url}>{repoData.name}</Link>
      </h2>
      <hr />
      <strong>{repoData.full_name}</strong>
      <p>{repoData.description}</p>
      <dl>
        <dt>Stars:</dt>
        <dd>{repoData.stargazers_count}</dd>
      </dl>
      <dl>
        <dt>Created:</dt>
        <dd>{repoData.created_at}</dd>
      </dl>
      <dl>
        <dt>Last updated:</dt>
        <dd>{repoData.updated_at}</dd>
      </dl>
      <dl>
        <dt>Owner:</dt>
        <dd>
          <Link to={repoData.owner.html_url}>
            <img src={repoData.owner.avatar_url} width={24} alt="" />{" "}
            {repoData.owner.login}
          </Link>
        </dd>
      </dl>
      <dl>
        <dt>Homepage:</dt>
        <dd>{repoData.homepage}</dd>
      </dl>
      <dl>
        <dt>Repo page:</dt>
        <dd>{repoData.html_url}</dd>
      </dl>
      <dl>
        <dt>Topics:</dt>
        <dd>
          {repoData.topics.map((topic) => (
            <>
              <Link to={`https://github.com/topics/${topic}`}>{topic}</Link>
              {", "}
            </>
          ))}
        </dd>
      </dl>
      <hr />
      {isFavourite ? (
        <a onClick={handleRemoveFromFavourites}>Remove from favourites</a>
      ) : (
        <a onClick={handleAddToFavourites}>Add to favourites</a>
      )}
    </>
  );
};
