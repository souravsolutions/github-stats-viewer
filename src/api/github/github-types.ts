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

export type { GithubUser };
