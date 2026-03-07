import express from "express";
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

app.post("/github", async (req, res) => {
  try {
    const { username } = req.body;

    let hasNextPage = true;
    let cursor = null;

    let allRepos = [];

    let userInfo = null;
    let contributions = null;

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

      const result = await response.json();

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
    let topRepository = null;
    const languageMap = {};

    allRepos.forEach((repo) => {
      totalStars += repo.stargazerCount;
      totalForks += repo.forkCount;

      if (
        !topRepository ||
        repo.stargazerCount > topRepository.star
      ) {
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

app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`),
);
