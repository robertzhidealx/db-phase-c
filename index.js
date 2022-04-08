const fs = require("fs");
require("dotenv").config();

const token = process.env.TOKEN;

// organization();
// commitStats();
// repository();

// Organization(orgID, login, name, description, email, location, type, createdAt, updatedAt)
async function organization() {
  const orgs = ["facebook", "google", "amzn", "angular"];
  const db = [];
  for (const org of orgs) {
    const {
      id,
      login,
      name,
      description,
      email,
      created_at,
      updated_at,
      location,
      type,
    } = await get(`https://api.github.com/orgs/${org}`);
    db.push(
      `${id},${login},${name},${description},${email},${created_at},${updated_at},${location},${type}`
    );
  }
  writeFile("organization.txt", db.join("\n"));
}

// Repository(repoID, name, description, url, forksCount, stargazersCount, watchersCount, openIssuesCount)
async function repository() {
  const pairs = [
    ["octocat", "hello-world"],
    ["Anduin2017", "HowToCook"],
    ["sveltejs", "svelte"],
    ["facebook", "react"],
    ["angular", "angular"],
    ["vuejs", "vue"],
    ["vercel", "next.js"],
    ["nuxt", "nuxt.js"],
    ["microsoft", "Web-Dev-For-Beginners"],
    ["airbnb", "javascript"],
    ["sveltejs", "kit"],
  ];
  const db = [];
  for (const pair of pairs) {
    owner = pair[0];
    repo = pair[1];
    const {
      id,
      name,
      description,
      url,
      forks_count,
      stargazers_count,
      watchers_count,
      open_issues_count,
    } = await get(`https://api.github.com/repos/${owner}/${repo}`);
    db.push(
      `${id},${name},${description},${url},${forks_count},${stargazers_count},${watchers_count},${open_issues_count}`
    );
  }
  writeFile("repository.txt", db.join("\n"));
}

//User(userID, login, url, type)
async function user() {}

// Package (packageName, stars, version, latestUpdated, latestCreated, size, packageHtmlUrl)
async function package() {}

// Issue(issueID, repoID, title, body, state)
async function issue() {}

// Commit(commitID, repoID, author, committer, message, commentCount, isVerified)
async function commit() {}

// CommitStats(commitID, additions, deletions, total)
async function commitStats() {}

// Downloads(packageName, startDate, endDate, downloadsCount)
async function downloads() {}

// DownloadsOnDate(packageName, day, downloads)
async function downloadsOnDate() {}

function get(url) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `token ${token}`,
    },
  };
  return fetch(url, options).then((res) => res.json());
}

function writeFile(fileName, content) {
  fs.writeFile(fileName, content, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}
