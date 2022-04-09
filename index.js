const fs = require("fs");
require("dotenv").config();

const token = process.env.TOKEN;

// organization();
// repository();
// commit();
// commitStats();
// downloads();
// downloadsOnDate();
// user();
issue();
// package();

// Organization(orgID, login, name, description, email, location, type, createdAt, updatedAt)
async function organization() {
  const orgs = [
    "facebook",
    "google",
    "amzn",
    "angular",
    "github",
    "sveltejs",
    "vuejs",
    "vercel",
    "nuxt",
    "microsoft",
    "airbnb",
    "lit",
    "solid",
    "mithriljs",
    "alpinejs",
  ];
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
  writeFile("files/organization.txt", db.join("\n"));
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
    ["lit", "lit"],
    ["solid", "solid"],
    ["mithriljs", "mithril.js"],
    ["alpinejs", "alpine"],
  ];
  const db = [];
  for (const [owner, repo] of pairs) {
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
  writeFile("files/repository.txt", db.join("\n"));
}

//User(userID, login, url, type)
async function user() {
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
    ["lit", "lit"],
    ["solid", "solid"],
    ["mithriljs", "mithril.js"],
    ["alpinejs", "alpine"],
  ];
  const db = [];
  for (const [owner] of pairs) {
    const { id, login, url, type } = await get(
      `https://api.github.com/users/${owner}`
    );
    db.push(`${id},${login},${url},${type}`);
  }
  const users = await get(`https://api.github.com/users`);
  for (let i = 0; i < 30; i++) {
    const { id, login, url, type } = users[i];
    db.push(`${id},${login},${url},${type}`);
  }
  writeFile("files/user.txt", db.join("\n"));
}

// Package (packageName, stars, version, latestUpdated, latestCreated, size, packageHtmlUrl)
async function package() {
  const pairs = [
    ["octocat", "hello-world"],
    ["sveltejs", "svelte"],
    ["facebook", "react"],
    ["angular", "angular"],
    ["vuejs", "vue"],
    ["vercel", "next.js"],
    ["nuxt", "nuxt.js"],
    ["airbnb", "javascript"],
    ["sveltejs", "kit"],
  ];
  const db = [];
  for (let i = 0; i < pairs.length; i++) {
    let owner = pairs[i][1];
    const target = await get(`https://api.npms.io/v2/package/${owner}`);
    const name = target.collected.metadata.name;
    const version = target.collected.metadata.version;
    const star = target.collected.npm.starsCount;
    const score = target.score.final;
    db.push(`${name},${version},${star},${score}`);
  }
  writeFile("files/package.txt", db.join("\n"));
  //target = await get(`https://api.npms.io/v2/search?q=cross+spawn`);
  // console.log(JSON.stringify(target));
}

// ! removed body attribute
// Issue(issueID, repoID, title, body, state)
async function issue() {
  target = await get(`https://api.github.com/repos/octocat/hello-world/issues`);
  // console.log(target[0]);
  const pairs = [
    ["octocat", "hello-world"],
    ["sveltejs", "svelte"],
    ["facebook", "react"],
    ["angular", "angular"],
    ["vuejs", "vue"],
    ["vercel", "next.js"],
    ["nuxt", "nuxt.js"],
    ["microsoft", "Web-Dev-For-Beginners"],
    ["airbnb", "javascript"],
    ["sveltejs", "kit"],
    ["lit", "lit"],
    ["solid", "solid"],
    ["mithriljs", "mithril.js"],
    ["alpinejs", "alpine"],
  ];
  const db = [];
  for (let i = 0; i < pairs.length; i++) {
    owner = pairs[i][0];
    repo = pairs[i][1];
    target = await get(`https://api.github.com/repos/${owner}/${repo}/issues`);
    for (let j = 0; j < target.length; j++) {
      const { id, repository_url, title, state } = target[j];
      db.push(`${id},${repository_url},${title},${state}`);
    }
  }
  writeFile("files/issue.txt", db.join("\n"));
}

// ! removed message attribute
// Commit(commitID, repoID, author, committer, commentCount, isVerified)
async function commit() {
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
    ["lit", "lit"],
    ["solid", "solid"],
    ["mithriljs", "mithril.js"],
    ["alpinejs", "alpine"],
  ];
  const db = [];
  for (const [owner, repo] of pairs) {
    const { id: repoId } = await get(
      `https://api.github.com/repos/${owner}/${repo}`
    );
    const commits = await get(
      `https://api.github.com/repos/${owner}/${repo}/commits`
    );
    for (const {
      sha: commitId,
      author: authorObj,
      commit: commitObj,
    } of commits) {
      db.push(
        `${commitId},${repoId},${authorObj ? authorObj.login : null},${
          commitObj.committer.name
        },${commitObj.comment_count},${commitObj.verification.verified}`
      );
    }
  }
  writeFile("files/commit.txt", db.join("\n"));
}

// * very slow fetch
// CommitStats(commitID, additions, deletions, total)
async function commitStats() {
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
    ["lit", "lit"],
    ["solid", "solid"],
    ["mithriljs", "mithril.js"],
    ["alpinejs", "alpine"],
  ];
  const db = [];
  for (const [owner, repo] of pairs) {
    const commits = await get(
      `https://api.github.com/repos/${owner}/${repo}/commits`
    );
    for (const { sha: commitId } of commits) {
      const { stats: statsObj } = await get(
        `https://api.github.com/repos/${owner}/${repo}/commits/${commitId}`
      );
      db.push(
        `${commitId},${statsObj.additions},${statsObj.deletions},${statsObj.total}`
      );
    }
  }
  writeFile("files/commitStats.txt", db.join("\n"));
}

// Downloads(packageName, startDate, endDate, downloadsCount)
async function downloads() {
  const pkgs = [
    "react",
    "angular",
    "vue",
    "svelte",
    "next",
    "nuxt",
    "solid",
    "lit",
    "mithril",
    "alpine",
  ];
  const db = [];
  for (const pkg of pkgs) {
    const { package, start, end, downloads } = await get(
      `https://api.npmjs.org/downloads/point/2020-07-01:2022-01-01/${pkg}`,
      false
    );
    db.push(`${package},${start},${end},${downloads}`);
  }
  writeFile("files/downloads.txt", db.join("\n"));
}

// DownloadsOnDate(packageName, day, downloads)
async function downloadsOnDate() {
  const pkgs = [
    "react",
    "angular",
    "vue",
    "svelte",
    "next",
    "nuxt",
    "solid",
    "lit",
    "mithril",
    "alpine",
  ];
  const db = [];
  for (const pkg of pkgs) {
    const { package, downloads: days } = await get(
      `https://api.npmjs.org/downloads/range/2020-07-01:2022-01-01/${pkg}`,
      false
    );
    for (const { day, downloads } of days) {
      db.push(`${package},${day},${downloads}`);
    }
  }
  writeFile("files/downloadsOnDate.txt", db.join("\n"));
}

function get(url, withAuth = true) {
  const options = {
    method: "GET",
    headers: withAuth
      ? {
          Authorization: `token ${token}`,
        }
      : {},
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
