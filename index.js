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
  // new
  ["webpack", "webpack"],
  ["rollup", "rollup"],
  ["brunch", "brunch"],
  ["parcel-bundler", "parcel"],
  ["developit", "microbundle"],
  ["fuse-box", "fuse-box"],
  ["withastro", "snowpack"],
  ["microsoft", "typescript"],
  ["facebook", "flow"],
  ["jsmonk", "hegel"],
  ["getify", "TypL"],
  ["xodio", "hm-def"],
  ["mochajs", "mocha"],
  ["jasmine", "jasmine"],
  ["jquery", "qunit"],
  ["facebook", "jest"],
  ["azer", "prova"],
  ["dalekjs", "dalek"],
  ["angular", "protractor"],
  ["substack", "tape"],
  ["DevExpress", "testcafe"],
  ["avajs", "ava"],
  ["cypress-io", "cypress"],
  ["chaijs", "chai"],
  ["enzymejs", "enzyme"],
  ["kentcdodds", "react-testing-library"],
  ["sinonjs", "sinon"],
  ["Automattic", "expect.js"],
  ["thlorenz", "proxyquire"],
  ["panzerdp", "voca"],
  ["EvandroLG", "selecting"],
  ["epeli", "underscore.string"],
  ["jprichardson", "string.js"],
  ["mathiasbynens", "he"],
  ["sindresorhus", "multiline"],
  ["sindresorhus", "query-string"],
  ["URI.js", ""],
  ["Mikhus", "domurl"],
  ["alexei", "sprintf.js"],
  ["snd", "url-pattern"],
  ["plexis-js", "plexis"],
  ["marcuswestin", "store.js"],
  ["mozilla", "localForage"],
  ["andris9", "jStorage"],
  ["zendesk", "cross-storage"],
  ["addyosmani", "basket.js"],
  ["nodeca", "bag.js"],
  ["Wisembly", "basil.js"],
  ["carhartl", "jquery-cookie"],
  ["js-cookie", "js-cookie"],
  ["ScottHamper", "Cookies"],
  ["aaronpowell", "db.js"],
  ["lawnchair", ""],
  ["kripken", "sql.js"],
  ["pouchdb", "pouchdb"],
  ["nirtz89", "crumbsjs"],
  ["softvar", "awesome-web-storage"],
  ["StanfordHCI", "datavore"],
  ["hoodiehq", "hoodie"],
  ["louischatriot", "nedb"],
  ["cure53", "DOMPurify"],
  ["leizongmin", "js-xss"],
  ["yahoo", "xss-filters"],
  ["apostrophecms", "sanitize-html"],
  ["axios", "axios"],
  ["SGrondin", "bottleneck"],
  ["bettiolo", "oauth-signature-js"],
  ["lincolnloop", "amygdala"],
  ["jpillora", "jquery.rest"],
  ["victor-am", "rails-ranger"],
  ["elbywan", "wretch"],
  ["Bearer", "bearer-js"],
  ["WebsiteBeaver", "far-fetch"],
  ["opticdev", "optic"],
  ["vercel", "swr"],
  ["tannerlinsley", "react-query"],
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
  // new
  "webpack",
  "rollup",
  "brunch",
  "parcel-bundler",
  "developit",
  "fuse-box",
  "withastro",
  "microsoft",
  "facebook",
  "jsmonk",
  "getify",
  "xodio",
  "mochajs",
  "jasmine",
  "jquery",
  "facebook",
  "azer",
  "dalekjs",
  "angular",
  "substack",
  "DevExpress",
  "avajs",
  "cypress-io",
  "chaijs",
  "enzymejs",
  "kentcdodds",
  "sinonjs",
  "Automattic",
  "thlorenz",
  "panzerdp",
  "EvandroLG",
  "epeli",
  "jprichardson",
  "mathiasbynens",
  "sindresorhus",
  "sindresorhus",
  "URI.js",
  "Mikhus",
  "alexei",
  "snd",
  "plexis-js",
  "marcuswestin",
  "mozilla",
  "andris9",
  "zendesk",
  "addyosmani",
  "nodeca",
  "Wisembly",
  "carhartl",
  "js-cookie",
  "ScottHamper",
  "aaronpowell",
  "lawnchair",
  "kripken",
  "pouchdb",
  "nirtz89",
  "softvar",
  "StanfordHCI",
  "hoodiehq",
  "louischatriot",
  "cure53",
  "leizongmin",
  "yahoo",
  "apostrophecms",
  "axios",
  "SGrondin",
  "bettiolo",
  "lincolnloop",
  "jpillora",
  "victor-am",
  "elbywan",
  "Bearer",
  "WebsiteBeaver",
  "opticdev",
  "vercel",
  "tannerlinsley",
];

// organization();
// repository();
// commit();
// commitStats();
// downloads();
// downloadsOnDate();
// issue();
// package();
// ownsRepo();
// inOrg();

// Organization(orgID, login, name, description, email, location, type, createdAt, updatedAt)
async function organization() {
  let db = [];
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
      `${r(id)},${r(login)},${r(name)},${r(description)},${r(email)},${r(
        created_at
      )},${r(updated_at)},${r(location)},${r(type)}`
    );
  }
  db = [...new Set(db)];
  writeFile("files/organization.txt", db.join("\n"));
}

// Repository(repoID, name, description, url, forksCount, stargazersCount, watchersCount, openIssuesCount)
async function repository() {
  let db = [];
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
    db = [...new Set(db)];
    db.push(
      `${r(id)},${r(name)},${r(description)},${r(url)},${r(forks_count)},${r(
        stargazers_count
      )},${r(watchers_count)},${r(open_issues_count)}`
    );
  }
  writeFile("files/repository.txt", db.join("\n"));
}

// DO NOT CALL DIRECTLY
//User(userID, login, url, type)
async function user() {
  let db = [];
  for (const [owner] of pairs) {
    const { id, login, url, type } = await get(
      `https://api.github.com/users/${owner}`
    );
    db.push(`${r(id)},${r(login)},${r(url)},${r(type)}`);
  }
  // const users = await get(`https://api.github.com/users`);
  // for (let i = 0; i < 30; i++) {
  //   const { id, login, url, type } = users[i];
  //   db.push(`${id},${login},${url},${type}`);
  // }
  // writeFile("files/user.txt", db.join("\n"));
  db = [...new Set(db)];
  return db;
}

// Package (packageName, stars, version, latestUpdated, latestCreated, size, packageHtmlUrl)
async function package() {
  let package = [];
  let hasPackage = [];
  for (const [owner, repo] of pairs) {
    const { id } = await get(`https://api.github.com/orgs/${owner}`);
    if (!id) continue;
    const pkgRes = await get(`https://api.npms.io/v2/package/${repo}`);
    if (!pkgRes.collected || !pkgRes.collected.metadata) continue;
    const name = pkgRes.collected.metadata.name;
    const version = pkgRes.collected.metadata.version;
    const star = pkgRes.collected.npm.starsCount;
    const score = pkgRes.score.final;
    hasPackage.push(`${r(id)},${r(name)}`);
    package.push(`${r(name)},${r(version)},${r(star)},${r(score)}`);
  }
  package = [...new Set(package)];
  hasPackage = [...new Set(hasPackage)];
  writeFile("files/package.txt", package.join("\n"));
  writeFile("files/hasPackage.txt", hasPackage.join("\n"));
}

// Issue(issueID, repoURL, title, state)
async function issue() {
  let db = [];
  for (const [owner, repo] of pairs) {
    const target = await get(
      `https://api.github.com/repos/${owner}/${repo}/issues`
    );
    for (const { id, repository_url, title, state } of target) {
      db.push(`${r(id)},${r(repository_url)},${r(title)},${r(state)}`);
    }
  }
  db = [...new Set(db)];
  writeFile("files/issue.txt", db.join("\n"));
}

// Commit(commitID, repoID, author, committer, commentCount, isVerified)
async function commit() {
  let db = [];
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
        `${r(commitId)},${r(repoId)},${
          authorObj ? r(authorObj.login) : null
        },${r(commitObj.committer.name)},${r(commitObj.comment_count)},${r(
          commitObj.verification.verified
        )}`
      );
    }
  }
  db = [...new Set(db)];
  writeFile("files/commit.txt", db.join("\n"));
}

// * CAUTION: very slow fetch
// CommitStats(commitID, additions, deletions, total)
async function commitStats() {
  let db = [];
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
        `${r(commitId)},${r(statsObj.additions)},${r(statsObj.deletions)},${r(
          statsObj.total
        )}`
      );
    }
  }
  db = [...new Set(db)];
  writeFile("files/commitStats.txt", db.join("\n"));
}

// Downloads(packageName, startDate, endDate, downloadsCount)
async function downloads() {
  let db = [];
  for (const pkg of singles) {
    const { package, start, end, downloads } = await get(
      `https://api.npmjs.org/downloads/point/2020-07-01:2022-01-01/${pkg}`,
      false
    );
    if (!package) continue;
    db.push(`${r(package)},${r(start)},${r(end)},${r(downloads)}`);
  }
  db = [...new Set(db)];
  writeFile("files/downloads.txt", db.join("\n"));
}

// DownloadsOnDate(packageName, day, downloads)
async function downloadsOnDate() {
  let db = [];
  for (const pkg of singles) {
    const { package, downloads: days } = await get(
      `https://api.npmjs.org/downloads/range/2020-10-01:2022-01-01/${pkg}`,
      false
    );
    if (!days) continue;
    for (const { day, downloads } of days) {
      db.push(`${r(package)},${r(day)},${r(downloads)}`);
    }
  }
  db = [...new Set(db)];
  writeFile("files/downloadsOnDate.txt", db.join("\n"));
}
// InOrg(userID, orgID)
async function inOrg() {
  let db = [];
  let userArr = await issueCreator();
  for (const owner of singles) {
    let { id } = await get(`https://api.github.com/orgs/${owner}`);
    let list = await get(`https://api.github.com/orgs/${owner}/members`);
    if (!list) continue;
    for (const user of Array.from(list)) {
      db.push(`${r(user.id)},${r(id)}`);
      userArr.push(
        `${r(user.id)},${r(user.login)},${r(user.url)},${r(user.type)}`
      );
    }
  }
  db = [...new Set(db)];
  writeFile("files/InOrg.txt", db.join("\n"));
  userArr = [...new Set(userArr)];
  writeFile("files/user.txt", userArr.join("\n"));
}

// OwnsRepo(repoID, userID)
async function ownsRepo() {
  let db = [];
  for (const [owner, repo] of pairs) {
    const { id: repoId } = await get(
      `https://api.github.com/repos/${owner}/${repo}`
    );
    const { id: userId } = await get(`https://api.github.com/users/${owner}`);
    db.push(`${r(repoId)},${r(userId)}`);
  }
  db = [...new Set(db)];
  writeFile("files/ownsRepo.txt", db.join("\n"));
}

// DO NOT CALL DIRECTLY
// IssueCreator(issueID, creatorID, creatorLogin)
async function issueCreator() {
  let db = [];
  let userArr = await user();
  for (const [owner, repo] of pairs) {
    const res = await get(
      `https://api.github.com/repos/${owner}/${repo}/issues`
    );
    if (!res) continue;
    for (const { id, user } of Array.from(res)) {
      db.push(`${r(id)},${r(user.id)},${r(user.login)}`);
      userArr.push(
        `${r(user.id)},${r(user.login)},${r(user.url)},${r(user.type)}`
      );
    }
  }
  db = [...new Set(db)];
  writeFile("files/issueCreator.txt", db.join("\n"));
  userArr = [...new Set(userArr)];
  writeFile("files/user.txt", userArr.join("\n"));
  return userArr;
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

function appendFile(fileName, content) {
  fs.appendFile(fileName, content, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

function r(s) {
  if (typeof s !== "string") return s;
  return s.replace(/[,]|[^a-zA-Z0-9\s(){}|\/\\;.\-_]/g, "");
}
// console.log("!?.，".replace(/[,]|[^a-zA-Z0-9\s(){}|\/\\;.\-_?!]/g, ""));
