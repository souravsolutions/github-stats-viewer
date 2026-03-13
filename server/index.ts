import express, {
  type Request,
  type Response as ExpressResponse,
} from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const query = `
query($username:String!, $cursor:String){
  user(login:$username){
    name
    login
    avatarUrl
    url

    followers{ totalCount }
    following{ totalCount }

    mergedPRs: pullRequests(first:1, states:MERGED){
      totalCount
    }

    closedIssues: issues(first:1, states:CLOSED){
      totalCount
    }

    repositories(
      first:100,
      after:$cursor,
      ownerAffiliations:OWNER
    ){
      totalCount

      nodes{
        name
        url
        stargazerCount
        forkCount

        languages(first:100){
          edges{
            size
            node{
              name
              color
            }
          }
        }
      }

      pageInfo{
        hasNextPage
        endCursor
      }
    }

    contributionsCollection{
      totalCommitContributions
      totalPullRequestContributions
      totalIssueContributions

      contributionCalendar{
        totalContributions
        weeks{
          contributionDays{
            date
            contributionCount
            color
          }
        }
      }
    }
  }
}
`;

type ContributionDay = {
  date: string;
  contributionCount: number;
  color: string;
};

type ContributionsCollection = {
  totalCommitContributions: number;
  totalPullRequestContributions: number;
  totalIssueContributions: number;
  contributionCalendar: {
    totalContributions: number;
    weeks: Array<{
      contributionDays: ContributionDay[];
    }>;
  };
};

type RepoLanguageEdge = {
  size: number;
  node: {
    name: string;
    color: string | null;
  };
};

type RepoNode = {
  name: string;
  url: string;
  stargazerCount: number;
  forkCount: number;
  languages: {
    edges: RepoLanguageEdge[];
  };
};

type GitHubUser = {
  name: string | null;
  login: string;
  avatarUrl: string;
  url: string;
  followers: { totalCount: number };
  following: { totalCount: number };
  mergedPRs: { totalCount: number };
  closedIssues: { totalCount: number };
  repositories: {
    totalCount: number;
    nodes: RepoNode[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
  contributionsCollection: ContributionsCollection;
};

type GraphQLResult = {
  data?: {
    user?: GitHubUser | null;
  };
};

type UserInfo = {
  name: string | null;
  login: string;
  avatarUrl: string;
  url: string;
  followers: number;
  following: number;
  totalRepositories: number;
  mergedPRs: number;
  closedIssues: number;
};

app.post("/github", async (req: Request, res: ExpressResponse) => {
  try {
    const { username } = req.body as { username?: string };
    if (!username) {
      return res.status(400).json({
        error: "Username is required",
      });
    }

    let hasNextPage = true;
    let cursor: string | null = null;

    let allRepos: RepoNode[] = [];

    let userInfo: UserInfo | null = null;
    let contributions: ContributionsCollection | null = null;

    while (hasNextPage) {
      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: {
            username,
            cursor,
          },
        }),
      });

      const result = (await response.json()) as GraphQLResult;

      if (!result.data?.user) {
        return res.status(404).json({
          error: "User not found",
        });
      }

      const user = result.data.user;

      if (!userInfo) {
        userInfo = {
          name: user.name,
          login: user.login,
          avatarUrl: user.avatarUrl,
          url: user.url,
          followers: user.followers.totalCount,
          following: user.following.totalCount,
          totalRepositories: user.repositories.totalCount,
          mergedPRs: user.mergedPRs.totalCount,
          closedIssues: user.closedIssues.totalCount,
        };

        contributions = user.contributionsCollection;
      }

      const repoData = user.repositories;

      allRepos.push(...repoData.nodes);

      hasNextPage = repoData.pageInfo.hasNextPage;

      cursor = repoData.pageInfo.endCursor;
    }

    let totalStars = 0;
    let totalForks = 0;
    let topRepository: { name: string; url: string; star: number } | null =
      null;
    const languageMap: Record<string, { size: number; color: string | null }> =
      {};

    allRepos.forEach((repo) => {
      totalStars += repo.stargazerCount;
      totalForks += repo.forkCount;

      if (!topRepository || repo.stargazerCount > topRepository.star) {
        topRepository = {
          name: repo.name,
          url: repo.url,
          star: repo.stargazerCount,
        };
      }

      repo.languages.edges.forEach((lang) => {
        const name = lang.node.name;
        const color = lang.node.color;
        const size = lang.size;

        if (!languageMap[name]) {
          languageMap[name] = {
            size: 0,
            color: color,
          };
        }

        languageMap[name].size += size;
      });
    });

    res.json({
      user: userInfo,
      totalStars,
      totalForks,
      languages: languageMap,
      topRepository,
      contributions,
      repositoryCount: allRepos.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error",
    });
  }
});

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
