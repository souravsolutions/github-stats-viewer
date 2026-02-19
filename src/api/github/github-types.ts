type GithubUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  location: string | null;
  blog: string | null;
  company: string | null;
  html_url: string;

  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;

  created_at: string;
};

type GithubRepo = {
  id: number;
  node_id: string;

  name: string;
  full_name: string;

  private: boolean;
  fork: boolean;
  archived: boolean;
  disabled: boolean;

  html_url: string;
  clone_url: string;
  homepage: string | null;

  description: string | null;

  language: string | null;
  topics: string[];

  size: number;

  stargazers_count: number;
  watchers_count: number;
  forks_count: number;

  open_issues_count: number;

  default_branch: string;

  created_at: string;
  updated_at: string;
  pushed_at: string;

  visibility: string;

  owner: {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
  };
};

export type { GithubUser, GithubRepo };
