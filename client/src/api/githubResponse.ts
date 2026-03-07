export type githubResponse = {
  user: {
    name: string | null;
    login: string;
    avatarUrl: string;
    url: string,
    followers: number;
    following: number;
    totalRepositories: number;
  };
  totalStars: number;
  totalForks: number;
  languages: Record<string, { size: number; color: string | null }>;
  topRepository: {
    name: string;
    stargazerCount: number;
    url: string;
  } | null;
  contributions: {
    totalCommitContributions: number;
    totalPullRequestContributions: number;
    totalIssueContributions: number;
    contributionCalendar: {
      totalContributions: number;
      weeks: Array<{
        contributionDays: Array<{
          date: string;
          contributionCount: number;
          color: string;
        }>;
      }>;
    };
  };
  repositoryCount: number;
};
