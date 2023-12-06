export type RepoData = {
  created_at: string;
  description: string;
  full_name: string;
  homepage: string;
  html_url: string;
  name: string;
  owner: { login: string; html_url: string; avatar_url: string };
  topics: string[];
  updated_at: string;
  stargazers_count: number;
};
