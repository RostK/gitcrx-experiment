import { RepoData } from "./types.ts";

export const getRepoInfo = async (url: string): Promise<RepoData | null> => {
  const path = new URL(url).pathname.split("/");
  if (path[1] && path[2]) {
    const response = await fetch(
      `https://api.github.com/repos/${[path[1], path[2]].join("/")}`,
    );
    const repoData = await response.json();
    const {
      created_at,
      description,
      full_name,
      homepage,
      name,
      owner,
      html_url,
      topics,
      updated_at,
      stargazers_count,
    } = repoData;

    return {
      created_at,
      description,
      full_name,
      homepage,
      name,
      owner,
      topics,
      html_url,
      updated_at,
      stargazers_count,
    };
  } else {
    return null;
  }
};

export * from "./types.ts";
export * from "./RepoDisplay.tsx";
