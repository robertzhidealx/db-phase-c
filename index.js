const fs = require("fs");
require("dotenv").config();

const token = process.env.TOKEN;

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
  ["aurelia", "framework"],
  ["jashkenas", "backbone"],
  ["emberjs", "ember.js"],
  ["meteor", "meteor"],
  ["ractivejs", "ractive"],
  ["vuejs", "vue"],
  ["sveltejs", "svelte"],
  ["knockout", "knockout"],
  ["spine", "spine"],
  ["techlayer", "espresso.js"],
  ["canjs", "canjs"],
  ["hyperapp", "hyperapp"],
  ["developit", "preact"],
  ["NativeScript", "NativeScript"],
  ["riot", "riot"],
  ["walmartlabs", "thorax"],
  ["chaplinjs", "chaplin"],
  ["marionettejs", "backbone.marionette"],
  ["ripplejs", "ripple"],
  ["mikeric", "rivets"],
  ["derbyjs", "derby"],
  ["russll", "awesome-derby"],
  ["gwendall", "way.js"],
  ["astoilkov", "jsblocks"],
  ["feathersjs", "feathers"],
  ["Wildhoney", "Keo"],
  ["emadalam", "atvjs"],
  ["alpinejs", "alpine"],
  ["infernojs", "inferno"],
  ["aidenybai", "lucia"],
  ["adonisjs", "core"],
  ["artf", "grapesjs"],
  ["retejs", "rete"],
  ["jagenjo", "litegraph.js"],
  ["jerosoler", "Drawflow"],
  ["google", "blockly"],
  ["aidenybai", "million"],
  ["Semantic-Org", "Semantic-UI"],
  ["vitmalina", "w2ui"],
  ["mrmrs", "fluidity"],
  ["sapo", "ink"],
  ["jashkenas", "underscore"],
  ["jashkenas", "underscore"],
  ["jashkenas", "underscore"],
  ["lodash", "lodash"],
  ["andrewplummer", "sugar"],
  ["ReactiveX", "rxjs"],
  ["baconjs", "bacon.js"],
  ["pozadi", "kefir"],
  ["caolan", "highland"],
  ["cujojs", "most"],
  ["mobxjs", "mobx"],
  ["cyclejs", "cyclejs"],
  ["concentjs", "concent"],
  ["immutable-js", "immutable-js"],
  ["swannodette", "mori"],
  ["mauriciosantos", "buckets-js"],
  ["flesler", "hashmap"],
  ["anvaka", "ngraph.graph"],
  ["moment", "moment"],
  ["rmm5t", "jquery-timeago"],
  ["matthewmueller", "date"],
  ["date-fns", "date-fns"],
  ["rmm5t", "jquery-timeago"],
  ["iamkun", "dayjs"],
  ["moment", "luxon"],
  ["gumroad", "countdown.js"],
  ["rmm5t", "jquery-timeago"],
  ["Anduin2017", "HowToCook"],
];

const singles = [
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
  "aurelia",
  "emberjs",
  "meteor",
  "ractivejs",
  "vuejs",
  "sveltejs",
  "knockout",
  "spine",
  "techlayer",
  "canjs",
  "hyperapp",
  "NativeScript",
  "riot",
  "walmartlabs",
  "chaplinjs",
  "marionettejs",
  "ripplejs",
  "derbyjs",
  "feathersjs",
  "infernojs",
  "adonisjs",
  "retejs",
  "Semantic-Org",
  "sapo",
  "lodash",
  "ReactiveX",
  "baconjs",
  "cujojs",
  "mobxjs",
  "cyclejs",
  "concentjs",
  "immutable-js",
  "moment",
  "date-fns",
  "gumroad",
  "Anduin2017",
];

organization();
repository();
commit();
commitStats();
downloads();
downloadsOnDate();
user();
issue();
package();

// Organization(orgID, login, name, description, email, location, type, createdAt, updatedAt)
async function organization() {
  const db = [];
  for (const org of singles) {
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
    if (!id) continue;
    db.push(
      `${id},${login},${name},${description},${email},${created_at},${updated_at},${location},${type}`
    );
  }
  writeFile("files/organization.txt", db.join("\n"));
}

// Repository(repoID, name, description, url, forksCount, stargazersCount, watchersCount, openIssuesCount)
async function repository() {
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
  const db = [];
  for (const [owner] of pairs) {
    const { id, login, url, type } = await get(
      `https://api.github.com/users/${owner}`
    );
    db.push(`${id},${login},${url},${type}`);
  }
  // const users = await get(`https://api.github.com/users`);
  // for (let i = 0; i < 30; i++) {
  //   const { id, login, url, type } = users[i];
  //   db.push(`${id},${login},${url},${type}`);
  // }
  writeFile("files/user.txt", db.join("\n"));
}

// Package (packageName, stars, version, latestUpdated, latestCreated, size, packageHtmlUrl)
async function package() {
  const db = [];
  for (const [_, repo] of pairs) {
    const target = await get(`https://api.npms.io/v2/package/${repo}`, false);
    // const { sha: packageID } = await get(
    //   `https://api.github.com/orgs/${owner}/packages/npm/${repo}`
    // );
    // if (!packageID) continue;
    if (!target.collected || !target.score) continue;
    const name = target.collected.metadata.name;
    const version = target.collected.metadata.version;
    const star = target.collected.npm.starsCount;
    const score = target.score.final;
    db.push(`${name},${version},${star},${score}`);
  }
  writeFile("files/package.txt", db.join("\n"));
}

// Issue(issueID, repoID, title, body, state)
async function issue() {
  target = await get(`https://api.github.com/repos/octocat/hello-world/issues`);
  // console.log(target[0]);
  const db = [];
  for (const [owner, repo] of pairs) {
    target = await get(`https://api.github.com/repos/${owner}/${repo}/issues`);
    for (let j = 0; j < target.length; j++) {
      const { id, repository_url, title, state } = target[j];
      db.push(`${id},${repository_url},${title},${state}`);
    }
  }
  writeFile("files/issue.txt", db.join("\n"));
}

// Commit(commitID, repoID, author, committer, commentCount, isVerified)
async function commit() {
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

// * CAUTION: very slow fetch
// CommitStats(commitID, additions, deletions, total)
async function commitStats() {
  const db = [];
  for (const [owner, repo] of pairs) {
    const commits = await get(
      `https://api.github.com/repos/${owner}/${repo}/commits`
    );
    for (const { sha: commitId } of commits) {
      const { stats: statsObj } = await get(
        `https://api.github.com/repos/${owner}/${repo}/commits/${commitId}`
      );
      if (!statsObj) continue;
      db.push(
        `${commitId},${statsObj.additions},${statsObj.deletions},${statsObj.total}`
      );
    }
  }
  writeFile("files/commitStats.txt", db.join("\n"));
}

// Downloads(packageName, startDate, endDate, downloadsCount)
async function downloads() {
  const db = [];
  for (const pkg of singles) {
    const { package, start, end, downloads } = await get(
      `https://api.npmjs.org/downloads/point/2020-07-01:2022-01-01/${pkg}`,
      false
    );
    if (!package) continue;
    db.push(`${package},${start},${end},${downloads}`);
  }
  writeFile("files/downloads.txt", db.join("\n"));
}

// DownloadsOnDate(packageName, day, downloads)
async function downloadsOnDate() {
  const db = [];
  for (const pkg of singles) {
    const { package, downloads: days } = await get(
      `https://api.npmjs.org/downloads/range/2020-10-01:2022-01-01/${pkg}`,
      false
    );
    if (!days) continue;
    for (const { day, downloads } of days) {
      db.push(`${package},${day},${downloads}`);
    }
  }
  writeFile("files/downloadsOnDate.txt", db.join("\n"));
}
// InOrg(userID, orgID)
// Jessie
async function InOrg() {}

// HasPackage(orgID, packageName)
// Jessie
async function HasPackage() {}

// OwnsRepo(repoID, userID)
// Robert
async function OwnsRepo() {}

// IssueAssignee(issueID, assigneeID, assigneeLogin)
// Robert
async function IssueAssignee() {}

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
