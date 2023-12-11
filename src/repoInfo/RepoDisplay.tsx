import { FC } from "react";
import { RepoData } from "./types.ts";
import { Link } from "./Link.tsx";

export const RepoDisplay: FC<{ repoData: RepoData }> = ({ repoData }) => {
  return (
    <>
      <h2>
        <Link to={repoData.html_url}>{repoData.name}</Link>
      </h2>
      <hr />
      <details>
        <summary>{repoData.full_name}</summary>
        <p>{repoData.description}</p>
      </details>
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
              <Link to={`https://github.com/topics/${topic}`}>{topic}</Link>{" "}
            </>
          ))}
        </dd>
      </dl>
    </>
  );
};
