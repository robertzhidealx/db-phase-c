const fs = require("fs");
require("dotenv").config();

const token = process.env.TOKEN;

// organization();
commitStats();

// Organization(orgID, login, name, description, email, location, type, createdAt, updatedAt)
async function organization() {
  const orgs = ["facebook", "google", "amzn"];
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
  writeFile("/files/organization.txt", db.join("\n"));
}

// Repository(repoID, name, description, url, forksCount, stargazersCount, watchersCount, openIssuesCount)
async function repository() {}

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
