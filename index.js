const fs = require('fs');
require('dotenv').config();

const token = process.env.TOKEN;

const pairs = [
	[ 'octocat', 'hello-world' ],
	[ 'Anduin2017', 'HowToCook' ],
	[ 'sveltejs', 'svelte' ],
	[ 'facebook', 'react' ],
	[ 'angular', 'angular' ],
	[ 'vuejs', 'vue' ],
	[ 'vercel', 'next.js' ],
	[ 'nuxt', 'nuxt.js' ],
	[ 'microsoft', 'Web-Dev-For-Beginners' ],
	[ 'airbnb', 'javascript' ],
	[ 'sveltejs', 'kit' ],
	[ 'lit', 'lit' ],
	[ 'solid', 'solid' ],
	[ 'mithriljs', 'mithril.js' ],
	[ 'alpinejs', 'alpine' ],
	[ 'aurelia', 'framework' ],
	[ 'jashkenas', 'backbone' ],
	[ 'emberjs', 'ember.js' ],
	[ 'meteor', 'meteor' ],
	[ 'ractivejs', 'ractive' ],
	[ 'vuejs', 'vue' ],
	[ 'sveltejs', 'svelte' ],
	[ 'knockout', 'knockout' ],
	[ 'spine', 'spine' ],
	[ 'techlayer', 'espresso.js' ],
	[ 'canjs', 'canjs' ],
	[ 'hyperapp', 'hyperapp' ],
	[ 'developit', 'preact' ],
	[ 'NativeScript', 'NativeScript' ],
	[ 'riot', 'riot' ],
	[ 'walmartlabs', 'thorax' ],
	[ 'chaplinjs', 'chaplin' ],
	[ 'marionettejs', 'backbone.marionette' ],
	[ 'ripplejs', 'ripple' ],
	[ 'mikeric', 'rivets' ],
	[ 'derbyjs', 'derby' ],
	[ 'russll', 'awesome-derby' ],
	[ 'gwendall', 'way.js' ],
	[ 'astoilkov', 'jsblocks' ],
	[ 'feathersjs', 'feathers' ],
	[ 'Wildhoney', 'Keo' ],
	[ 'emadalam', 'atvjs' ],
	[ 'alpinejs', 'alpine' ],
	[ 'infernojs', 'inferno' ],
	[ 'aidenybai', 'lucia' ],
	[ 'adonisjs', 'core' ],
	[ 'artf', 'grapesjs' ],
	[ 'retejs', 'rete' ],
	[ 'jagenjo', 'litegraph.js' ],
	[ 'jerosoler', 'Drawflow' ],
	[ 'google', 'blockly' ],
	[ 'aidenybai', 'million' ],
	[ 'Semantic-Org', 'Semantic-UI' ],
	[ 'vitmalina', 'w2ui' ],
	[ 'mrmrs', 'fluidity' ],
	[ 'sapo', 'ink' ],
	[ 'jashkenas', 'underscore' ],
	[ 'jashkenas', 'underscore' ],
	[ 'jashkenas', 'underscore' ],
	[ 'lodash', 'lodash' ],
	[ 'andrewplummer', 'sugar' ],
	[ 'ReactiveX', 'rxjs' ],
	[ 'baconjs', 'bacon.js' ],
	[ 'pozadi', 'kefir' ],
	[ 'caolan', 'highland' ],
	[ 'cujojs', 'most' ],
	[ 'mobxjs', 'mobx' ],
	[ 'cyclejs', 'cyclejs' ],
	[ 'concentjs', 'concent' ],
	[ 'immutable-js', 'immutable-js' ],
	[ 'swannodette', 'mori' ],
	[ 'mauriciosantos', 'buckets-js' ],
	[ 'flesler', 'hashmap' ],
	[ 'anvaka', 'ngraph.graph' ],
	[ 'moment', 'moment' ],
	[ 'rmm5t', 'jquery-timeago' ],
	[ 'matthewmueller', 'date' ],
	[ 'date-fns', 'date-fns' ],
	[ 'rmm5t', 'jquery-timeago' ],
	[ 'iamkun', 'dayjs' ],
	[ 'moment', 'luxon' ],
	[ 'gumroad', 'countdown.js' ],
	[ 'rmm5t', 'jquery-timeago' ],
	[ 'Anduin2017', 'HowToCook' ]
];

const singles = [
	'facebook',
	'google',
	'amzn',
	'angular',
	'github',
	'sveltejs',
	'vuejs',
	'vercel',
	'nuxt',
	'microsoft',
	'airbnb',
	'lit',
	'solid',
	'mithriljs',
	'alpinejs',
	'aurelia',
	'emberjs',
	'meteor',
	'ractivejs',
	'vuejs',
	'sveltejs',
	'knockout',
	'spine',
	'techlayer',
	'canjs',
	'hyperapp',
	'NativeScript',
	'riot',
	'walmartlabs',
	'chaplinjs',
	'marionettejs',
	'ripplejs',
	'derbyjs',
	'feathersjs',
	'infernojs',
	'adonisjs',
	'retejs',
	'Semantic-Org',
	'sapo',
	'lodash',
	'ReactiveX',
	'baconjs',
	'cujojs',
	'mobxjs',
	'cyclejs',
	'concentjs',
	'immutable-js',
	'moment',
	'date-fns',
	'gumroad',
	'Anduin2017'
];

// organization();
// repository();
// commit();
// commitStats();
// downloads();
// downloadsOnDate();
// issue();
issueCreator();
// package();
// OwnsRepo();

// Organization(orgID, login, name, description, email, location, type, createdAt, updatedAt)
async function organization() {
	let db = [];
	for (const org of singles) {
		const { id, login, name, description, email, created_at, updated_at, location, type } = await get(
			`https://api.github.com/orgs/${org}`
		);
		if (!id) continue;
		db.push(`${id},${login},${name},${description},${email},${created_at},${updated_at},${location},${type}`);
	}
	db = [ ...new Set(db) ];
	writeFile('files/organization.txt', db.join('\n'));
}

// Repository(repoID, name, description, url, forksCount, stargazersCount, watchersCount, openIssuesCount)
async function repository() {
	let db = [];
	for (const [ owner, repo ] of pairs) {
		const {
			id,
			name,
			description,
			url,
			forks_count,
			stargazers_count,
			watchers_count,
			open_issues_count
		} = await get(`https://api.github.com/repos/${owner}/${repo}`);
		db = [ ...new Set(db) ];
		db.push(
			`${id},${name},${description},${url},${forks_count},${stargazers_count},${watchers_count},${open_issues_count}`
		);
	}
	writeFile('files/repository.txt', db.join('\n'));
}

// do not call
//User(userID, login, url, type)
async function user() {
	let db = [];
	for (const [ owner ] of pairs) {
		const { id, login, url, type } = await get(`https://api.github.com/users/${owner}`);
		db.push(`${id},${login},${url},${type}`);
	}
	// const users = await get(`https://api.github.com/users`);
	// for (let i = 0; i < 30; i++) {
	//   const { id, login, url, type } = users[i];
	//   db.push(`${id},${login},${url},${type}`);
	// }
	// writeFile("files/user.txt", db.join("\n"));
	db = [ ...new Set(db) ];
	return db;
}

// Package (packageName, stars, version, latestUpdated, latestCreated, size, packageHtmlUrl)
async function package() {
	let package = [];
	let hasPackage = [];
	for (const [ owner, repo ] of pairs) {
		const { id } = await get(`https://api.github.com/orgs/${owner}`);
		if (!id) continue;
		const pkgRes = await get(`https://api.npms.io/v2/package/${repo}`);
		if (!pkgRes.collected || !pkgRes.collected.metadata) continue;
		const name = pkgRes.collected.metadata.name;
		const version = pkgRes.collected.metadata.version;
		const star = pkgRes.collected.npm.starsCount;
		const score = pkgRes.score.final;
		hasPackage.push(`${id},'${name}',`);
		package.push(`'${name}','${version}',${star},${score},`);
	}
	package = [ ...new Set(package) ];
	hasPackage = [ ...new Set(hasPackage) ];
	writeFile('files/package.txt', package.join('\n'));
	writeFile('files/hasPackage.txt', hasPackage.join('\n'));
}

// Issue(issueID, repoID, title, body, state)
async function issue() {
	let db = [];
	for (const [ owner, repo ] of pairs) {
		const target = await get(`https://api.github.com/repos/${owner}/${repo}/issues`);
		for (const { id, repository_url, title, state } of target) {
			db.push(`${id},${repository_url},${title},${state}`);
		}
	}
	db = [ ...new Set(db) ];
	writeFile('files/issue.txt', db.join('\n'));
}

// Commit(commitID, repoID, author, committer, commentCount, isVerified)
async function commit() {
	let db = [];
	for (const [ owner, repo ] of pairs) {
		const { id: repoId } = await get(`https://api.github.com/repos/${owner}/${repo}`);
		const commits = await get(`https://api.github.com/repos/${owner}/${repo}/commits`);
		for (const { sha: commitId, author: authorObj, commit: commitObj } of commits) {
			db.push(
				`${commitId},${repoId},${authorObj ? authorObj.login : null},${commitObj.committer
					.name},${commitObj.comment_count},${commitObj.verification.verified}`
			);
		}
	}
	db = [ ...new Set(db) ];
	writeFile('files/commit.txt', db.join('\n'));
}

// * CAUTION: very slow fetch
// CommitStats(commitID, additions, deletions, total)
async function commitStats() {
	let db = [];
	for (const [ owner, repo ] of pairs) {
		const commits = await get(`https://api.github.com/repos/${owner}/${repo}/commits`);
		for (const { sha: commitId } of commits) {
			const { stats: statsObj } = await get(`https://api.github.com/repos/${owner}/${repo}/commits/${commitId}`);
			if (!statsObj) continue;
			db.push(`${commitId},${statsObj.additions},${statsObj.deletions},${statsObj.total}`);
		}
	}
	db = [ ...new Set(db) ];
	writeFile('files/commitStats.txt', db.join('\n'));
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
		db.push(`${package},${start},${end},${downloads}`);
	}
	db = [ ...new Set(db) ];
	writeFile('files/downloads.txt', db.join('\n'));
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
			db.push(`${package},${day},${downloads}`);
		}
	}
	db = [ ...new Set(db) ];
	writeFile('files/downloadsOnDate.txt', db.join('\n'));
}
// InOrg(userID, orgID)
// Jessie
async function InOrg() {
	const db = [];
	for (const owner of singles) {
		let { id } = await get(`https://api.github.com/orgs/${owner}`);
		let list = await get(`https://api.github.com/orgs/${owner}/members`);
		for (const user of list) {
			const userID = user.id;
			db.push(`${userID},${id}`);
		}
	}
	writeFile('files/InOrg.txt', db.join('\n'));
}

// OwnsRepo(repoID, userID)
async function OwnsRepo() {
	let db = [];
	for (const [ owner, repo ] of pairs) {
		const { id: repoId } = await get(`https://api.github.com/repos/${owner}/${repo}`);
		const { id: userId } = await get(`https://api.github.com/users/${owner}`);
		db.push(`${repoId},${userId},`);
	}
	db = [ ...new Set(db) ];
	writeFile('files/ownsRepo.txt', db.join('\n'));
}

// IssueCreator(issueID, creatorID, creatorLogin)
async function issueCreator() {
	let db = [];
	let userArr = await user();
	for (const [ owner, repo ] of pairs) {
		const res = await get(`https://api.github.com/repos/${owner}/${repo}/issues`);
		for (const { id, user } of res) {
			db.push(`${id},${user.id},${user.login},`);
			userArr.push(`${user.id},${user.login},${user.url},${user.type},`);
		}
	}
	db = [ ...new Set(db) ];
	writeFile('files/issueCreator.txt', db.join('\n'));
	userArr = [ ...new Set(userArr) ];
	writeFile('files/user.txt', userArr.join('\n'));
}

function get(url, withAuth = true) {
	const options = {
		method: 'GET',
		headers: withAuth
			? {
					Authorization: `token ${token}`
				}
			: {}
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
