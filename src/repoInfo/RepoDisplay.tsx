import { FC } from "react";
import { RepoData } from "./types.ts";

export const RepoDisplay: FC<{ repoData: RepoData }> = ({ repoData }) => {
  return (
    <>
      <h2>{repoData.name}</h2>
      <p>
        <details>
          <summary>{repoData.full_name}</summary>
          {repoData.description}
        </details>
      </p>
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
          <img src={repoData.owner.avatar_url} width={24} alt="" />{" "}
          {repoData.owner.login}
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
        <dd>{repoData.topics.join(", ")}</dd>
      </dl>
    </>
  );
};
